const Notification = require("../models/Notification");

// Create a notification
const createNotification = async ({
  userId,
  title,
  message,
  type = "system",
  relatedId = null,
}) => {
  try {

    if (!userId || !title || !title.trim() || !message || !message.trim()) {
  return null;
}
    const allowedTypes = [
  "service_request",
  "request_update",
  "review",
  "system",
];

if (!allowedTypes.includes(type)) {
  return null;
}
    const notification = await Notification.create({
      userId,
      title,
      message,
      type,
      relatedId,
    });

    return notification;
  } catch (error) {
    console.error("Create notification error:", error);
    return null;
  }
};


// Get logged-in user's notifications
const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    const unreadCount = await Notification.countDocuments({
      userId: req.user._id,
      isRead: false,
    });

    res.status(200).json({
      message: "Notifications retrieved successfully",
      unreadCount,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    console.error("Get notifications error:", error);

    res.status(500).json({
      message: "Server error while retrieving notifications",
    });
  }
};


// Get unread notifications
const getUnreadNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user._id,
      isRead: false,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Unread notifications retrieved successfully",
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    console.error("Get unread notifications error:", error);

    res.status(500).json({
      message: "Server error while retrieving unread notifications",
    });
  }
};


// Mark one notification as read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error("Mark notification as read error:", error);

    res.status(500).json({
      message: "Server error while updating notification",
    });
  }
};


// Mark all notifications as read
const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        userId: req.user._id,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      }
    );

    res.status(200).json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("Mark all notifications as read error:", error);

    res.status(500).json({
      message: "Server error while updating notifications",
    });
  }
};


// Delete one notification
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    await notification.deleteOne();

    res.status(200).json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Delete notification error:", error);

    res.status(500).json({
      message: "Server error while deleting notification",
    });
  }
};


module.exports = {
  createNotification,
  getMyNotifications,
  getUnreadNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};