const axios = require("axios");
const ArticleEngagement = require("../models/ArticleEngagement");
const User = require("../models/User");

const { extract } = require("@extractus/article-extractor");
const { convert } = require("html-to-text");

const FALLBACK_IMAGE = "https://via.placeholder.com/400x200?text=No+Image";
const ALL_CATEGORIES = ["general", "business", "entertainment", "health", "science", "sports", "technology"];

const toCleanArticle = (article, category = "general") => ({
  title: article?.title || "Latest News Update",
  description: article?.description || "Stay updated with the latest developments.",
  url: article?.url || `https://example.com/news/${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  image: article?.urlToImage || article?.image || FALLBACK_IMAGE,
  source: article?.source?.name || article?.source || "PulseNews",
  publishedAt: article?.publishedAt || new Date().toISOString(),
  category
});

const buildFallbackArticles = (category, pageSize = 10) => {
  const targetCategories = category === "all" ? ALL_CATEGORIES : [category];
  const now = Date.now();
  const articles = [];

  targetCategories.forEach((cat, catIndex) => {
    for (let i = 0; i < Math.max(2, Math.ceil(pageSize / targetCategories.length)); i += 1) {
      articles.push({
        title: `${cat.charAt(0).toUpperCase() + cat.slice(1)} Brief ${i + 1}`,
        description: `Fallback story for ${cat} while live news source is unavailable.`,
        url: `https://fallback.local/${cat}/${now}-${catIndex}-${i}`,
        image: FALLBACK_IMAGE,
        source: "PulseNews",
        publishedAt: new Date(now - i * 60000).toISOString(),
        category: cat
      });
    }
  });

  return articles.slice(0, pageSize);
};

//general news -> to fetch from newsapi
const getNews = async (req, res) => {
  try {
    const category = (req.query.category || "general").toLowerCase();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;

    if (category === "all") {
      const requests = ALL_CATEGORIES.map((cat) =>
        axios.get("https://newsapi.org/v2/top-headlines", {
          params: {
            country: "us",
            category: cat,
            page,
            pageSize: Math.max(1, Math.floor(pageSize / 2)),
            apiKey: process.env.NEWS_API_KEY
          }
        })
      );

      const responses = await Promise.all(requests);
      const merged = responses.flatMap((response, index) =>
        response.data.articles.map((article) => toCleanArticle(article, ALL_CATEGORIES[index]))
      );

      const uniqueArticles = [];
      const seen = new Set();
      for (const article of merged) {
        if (!article.url || seen.has(article.url)) continue;
        seen.add(article.url);
        uniqueArticles.push(article);
      }

      return res.json({
        page,
        totalResults: uniqueArticles.length,
        articles: uniqueArticles.slice(0, pageSize)
      });
    }

    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines",
      {
        params: {
          country: "us",
          category,
          page,
          pageSize,
          apiKey: process.env.NEWS_API_KEY
        },
      }
    );

    const cleanedArticles = response.data.articles.map((article) => toCleanArticle(article, category));

    res.json({
      page,
      totalResults: response.data.totalResults,
      articles: cleanedArticles
    });

  } catch (error) {
    console.error("getNews failed:", error.response?.data || error.message);
    const category = (req.query.category || "general").toLowerCase();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const fallbackArticles = buildFallbackArticles(category, pageSize);
    res.json({
      page,
      totalResults: fallbackArticles.length,
      articles: fallbackArticles,
      fallback: true
    });
  }
};


//search news 
const searchNews = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query || !query.trim()) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const response = await axios.get(
      "https://newsapi.org/v2/everything",
      {
        params: {
          q: query,
          apiKey: process.env.NEWS_API_KEY,
        },
      }
    );

    const cleanedArticles = response.data.articles.map((article) => toCleanArticle(article));

    res.json(cleanedArticles);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.json(buildFallbackArticles("all", 10).filter((item) =>
      item.title.toLowerCase().includes(String(req.query.q || "").toLowerCase())
    ));
  }
};

const recordEngagement = async (req, res) => {
  try {
    const { url, title, image, source, category } = req.body;

    if (!url || !title) {
      return res.status(400).json({ message: "Article url and title are required" });
    }

    const now = new Date();
    const updated = await ArticleEngagement.findOneAndUpdate(
      { url },
      {
        $set: {
          title,
          image: image || "",
          source: source || "",
          category: category || "general",
          lastEngagedAt: now
        },
        $inc: { views: 1 }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ message: "Engagement recorded", views: updated.views });
  } catch (error) {
    res.status(500).json({ message: "Error recording engagement" });
  }
};

const getTrendingNews = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 6, 20);
    const since = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);

    const trending = await ArticleEngagement.find({
      lastEngagedAt: { $gte: since }
    })
      .sort({ views: -1, lastEngagedAt: -1 })
      .limit(limit)
      .select("title url image source category views lastEngagedAt");

    res.json(trending);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trending news" });
  }
};

const getPersonalizedNews = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const categories = user.preferences;

    if (!categories || categories.length === 0) {
      return res.json([]);
    }

    // fetch all categories in parallel
    const normalizedCategories = categories.map((cat) => String(cat).toLowerCase());
    const requests = normalizedCategories.map(category =>
      axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
          country: "us",
          category,
          apiKey: process.env.NEWS_API_KEY
        }
      })
    );

    const responses = await Promise.all(requests);

    // merge all articles
    
    let allArticles = responses.flatMap((res, index) =>
      res.data.articles.map((article) => toCleanArticle(article, normalizedCategories[index]))
);

    // 🔁 remove duplicates (based on URL)
    const uniqueArticles = [];
    const seen = new Set();

    for (let article of allArticles) {
      if (!seen.has(article.url)) {
        seen.add(article.url);
        uniqueArticles.push(article);
      }
    }

    // 🎲 shuffle for mix
    uniqueArticles.sort(() => Math.random() - 0.5);

    res.json(uniqueArticles);

  } catch (err) {
    console.error("getPersonalizedNews failed:", err.response?.data || err.message);
    const user = await User.findById(req.user.id);
    const normalizedCategories = (user?.preferences || []).map((cat) => String(cat).toLowerCase());
    const fallback = normalizedCategories.length
      ? buildFallbackArticles("all", 20).filter((item) => normalizedCategories.includes(item.category))
      : [];
    res.json(fallback);
  }
};

const getFullArticle = async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Article URL is required"
      });
    }

    const article = await extract(url);

convert(article.content || "", {
  wordwrap: 130,
  selectors: [
    { selector: "a", options: { ignoreHref: true } },
    { selector: "table", format: "dataTable" }
  ]
});

// remove markdown-style links
cleanContent = cleanContent.replace(/\[https?:\/\/[^\]]+\]/g, "");

// remove extra empty lines
cleanContent = cleanContent.replace(/\n\s*\n/g, "\n\n");

    // extractor failed or empty content
    if (!article || !article.content) {
      return res.json({
        success: false,
        extracted: false
      });
    }

    res.json({
      success: true,
      extracted: true,
      article: {
        title: article.title || "News Article",
        content: cleanContent,
        image: article.image || FALLBACK_IMAGE,
        author: article.author || "Unknown",
        published: article.published || null,
        url
      }
    });

  } catch (error) {
    console.log("Extractor Error:", error.message);

    // IMPORTANT:
    // DO NOT THROW ERROR TO FRONTEND
    // just return extracted false
    res.json({
      success: false,
      extracted: false
    });
  }
};

module.exports = {
  getNews,
  searchNews,
  getPersonalizedNews,
  recordEngagement,
  getTrendingNews,
  getFullArticle
};