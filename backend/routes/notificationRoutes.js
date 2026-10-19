const express = require("express");

const {
  getMyNotifications,
  getUnreadNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all notifications for logged-in user
router.get(
  "/",
  protect,
  getMyNotifications
);

// Get unread notifications
router.get(
  "/unread",
  protect,
  getUnreadNotifications
);

// Mark all notifications as read
router.put(
  "/read-all",
  protect,
  markAllAsRead
);

// Mark one notification as read
router.put(
  "/:id/read",
  protect,
  markAsRead
);

// Delete one notification
router.delete(
  "/:id",
  protect,
  deleteNotification
);

module.exports = router;