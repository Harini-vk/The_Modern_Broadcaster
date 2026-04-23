const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

//Routes
const connectDB = require("./config/db");
connectDB();


const newsRoutes = require("./routes/newsRoutes");
app.use("/api/news", newsRoutes);


const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


const bookmarkRoutes = require("./routes/bookmarkRoutes");
app.use("/api/bookmarks", bookmarkRoutes);


const preferenceRoutes = require("./routes/preferenceRoutes");
app.use("/api/preferences", preferenceRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});