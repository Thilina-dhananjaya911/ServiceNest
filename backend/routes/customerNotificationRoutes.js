const express = require("express");
const {
  getCustomerNotifications,
  getLatestNotifications,
} = require("../controllers/customerNotificationController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Keep "/latest" before any "/:id" style route
router.get("/latest", protect, authorize("customer"), getLatestNotifications);
router.get("/", protect, authorize("customer"), getCustomerNotifications);

module.exports = router;