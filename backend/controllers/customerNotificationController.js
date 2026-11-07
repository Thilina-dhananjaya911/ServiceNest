const Notification = require("../models/Notification");

const TYPES = ["service_request", "request_update", "review", "system"];

// GET /api/customer/notifications?filter=all|unread&type=&page=&limit=
const getCustomerNotifications = async (req, res) => {
  try {
    const { filter = "all", type, page = 1, limit = 10 } = req.query;
    const query = { userId: req.user._id };

    if (!["all", "unread"].includes(filter)) {
      return res.status(400).json({ message: "Invalid filter" });
    }
    if (filter === "unread") query.isRead = false;

    if (type) {
      if (!TYPES.includes(type)) {
        return res.status(400).json({ message: "Invalid type" });
      }
      query.type = type;
    }

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit) || 10, 1), 50);

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Notification.countDocuments(query),
      Notification.countDocuments({ userId: req.user._id, isRead: false }),
    ]);

    res.status(200).json({
      message: "Notifications retrieved successfully",
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      unreadCount,
      notifications,
    });
  } catch (error) {
    console.error("Get customer notifications error:", error);
    res
      .status(500)
      .json({ message: "Server error while retrieving notifications" });
  }
};

// GET /api/customer/notifications/latest?limit=5  (bell dropdown)
const getLatestNotifications = async (req, res) => {
  try {
    const limitNum = Math.min(Math.max(parseInt(req.query.limit) || 5, 1), 10);

    const [notifications, unreadCount] = await Promise.all([
      Notification.find({ userId: req.user._id })
        .sort({ createdAt: -1 })
        .limit(limitNum),
      Notification.countDocuments({ userId: req.user._id, isRead: false }),
    ]);

    res.status(200).json({
      message: "Latest notifications retrieved successfully",
      unreadCount,
      notifications,
    });
  } catch (error) {
    console.error("Get latest notifications error:", error);
    res
      .status(500)
      .json({ message: "Server error while retrieving notifications" });
  }
};

module.exports = { getCustomerNotifications, getLatestNotifications };