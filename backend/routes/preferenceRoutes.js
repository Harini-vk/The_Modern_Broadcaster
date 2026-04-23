const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  savePreferences,
  getPreferences
} = require("../controllers/preferenceController");

router.post("/", authMiddleware, savePreferences);
router.get("/", authMiddleware, getPreferences);

module.exports = router;