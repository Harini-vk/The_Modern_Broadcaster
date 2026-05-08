const express = require("express");
const router = express.Router();

const {
  getNews,
  searchNews,
  recordEngagement,
  getTrendingNews,
  getPersonalizedNews
} = require("../controllers/newsController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/search", searchNews);
router.get("/trending", getTrendingNews);
router.get("/personalized", authMiddleware, getPersonalizedNews);
router.post("/engagement", recordEngagement);
router.get("/:category", getNews);   
router.get("/", getNews);


module.exports = router;