const axios = require("axios");

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
    const query = req.query.q;   // ✅ get search text

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


module.exports = { getNews, searchNews, getPersonalizedNews };