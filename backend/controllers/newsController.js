const axios = require("axios");
const ArticleEngagement = require("../models/ArticleEngagement");

//general news -> to fetch from newsapi
const getNews = async (req, res) => {
  try {
    const category = req.query.category || "general";
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;

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

    const cleanedArticles = response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.urlToImage || "https://via.placeholder.com/400x200?text=No+Image",
      source: article.source.name,
      publishedAt: article.publishedAt
    }));

    res.json({
      page,
      totalResults: response.data.totalResults,
      articles: cleanedArticles
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching news" });
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

    const cleanedArticles = response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.urlToImage || "https://via.placeholder.com/400x200?text=No+Image",
      source: article.source.name,
      publishedAt: article.publishedAt
    }));

    res.json(cleanedArticles);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Error searching news" });
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

//Personalized content
const User = require("../models/User");

const getPersonalizedNews = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const categories = user.preferences;

    if (!categories || categories.length === 0) {
      return res.status(400).json({ message: "No preferences set" });
    }

    // fetch all categories in parallel
    const requests = categories.map(category =>
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
    
    let allArticles = responses.flatMap(res =>
      res.data.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.urlToImage || "https://via.placeholder.com/400x200?text=No+Image",
        source: article.source.name,
        publishedAt: article.publishedAt
  }))
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
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  getNews,
  searchNews,
  getPersonalizedNews,
  recordEngagement,
  getTrendingNews
};