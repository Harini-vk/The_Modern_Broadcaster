const mongoose = require("mongoose");

const articleEngagementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true, index: true },
    image: { type: String, default: "" },
    source: { type: String, default: "" },
    category: { type: String, default: "general" },
    views: { type: Number, default: 0 },
    lastEngagedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ArticleEngagement", articleEngagementSchema);
