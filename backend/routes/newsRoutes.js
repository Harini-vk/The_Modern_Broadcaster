const express = require("express");
const router = express.Router();

const { getNews, searchNews } = require("../controllers/newsController");

router.get("/search", searchNews);
router.get("/:category", getNews);   
router.get("/", getNews);


module.exports = router;