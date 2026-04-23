const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  title: String,
  url: String,
  image: String,
  source: String
}, { _id: true });

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  preferences: [String],
  bookmarks: [bookmarkSchema]
});

module.exports = mongoose.model("User", userSchema);