const express = require("express");
const router = express.Router();

const {
  getNews,
  searchNews,
  recordEngagement,
  getTrendingNews
} = require("../controllers/newsController");

router.get("/search", searchNews);
router.get("/trending", getTrendingNews);
router.post("/engagement", recordEngagement);
router.get("/:category", getNews);   
router.get("/", getNews);


module.exports = router;