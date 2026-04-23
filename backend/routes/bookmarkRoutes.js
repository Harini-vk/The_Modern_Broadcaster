const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  addBookmark,
  getBookmarks,
  removeBookmark
} = require("../controllers/bookmarkController");

// all protected
router.post("/", authMiddleware, addBookmark);
router.get("/", authMiddleware, getBookmarks);
router.delete("/:id", authMiddleware, removeBookmark);

module.exports = router;