const express = require("express");

const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get logged-in user's profile
router.get("/profile", protect, getProfile);

// Update logged-in user's profile
router.put("/profile", protect, updateProfile);

// Change logged-in user's password
router.put("/change-password", protect, changePassword);

module.exports = router;