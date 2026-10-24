
const express = require("express");
const { getAboutStats } = require("../controllers/aboutController");

const router = express.Router();

// Public endpoint for About Us statistics
router.get("/stats", getAboutStats);

module.exports = router;
