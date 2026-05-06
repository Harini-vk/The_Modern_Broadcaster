const User = require("../models/User");

// 🎯 SAVE
exports.savePreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.preferences = req.body.preferences;
    await user.save();

    res.json({ message: "Preferences saved" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📄 GET
exports.getPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ preferences: user.preferences });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};