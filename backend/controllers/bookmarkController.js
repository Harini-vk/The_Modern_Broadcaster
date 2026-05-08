const User = require("../models/User");


exports.addBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, url, image, source } = req.body;

    const user = await User.findById(userId);

    // prevent duplicate using URL
    const exists = user.bookmarks.some(b => b.url === url);
    if (exists) {
      const existingBookmark = user.bookmarks.find((b) => b.url === url);
      return res.json({ message: "Already bookmarked", _id: existingBookmark?._id });
    }

    user.bookmarks.push({ title, url, image, source });
    await user.save();

    const addedBookmark = user.bookmarks[user.bookmarks.length - 1];
    res.json({ message: "Bookmark added", _id: addedBookmark?._id });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  GET BOOKMARKS
exports.getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// REMOVE BOOKMARK (by id)
exports.removeBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.bookmarks = user.bookmarks.filter(
      (b) => b._id.toString() !== req.params.id
    );

    await user.save();

    res.json({ message: "Bookmark removed" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};