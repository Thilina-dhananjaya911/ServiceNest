const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/auth/me", protect, (req, res) => {
  res.json({
    message: "Authenticated user retrieved successfully",
    user: req.user,
  });
});

app.get("/", (req, res) => {
  res.json({ message: "ServiceNest Auth API is running" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Auth server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
