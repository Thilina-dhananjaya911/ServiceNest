
const mongoose = require("mongoose");
const Message = require("../models/Message");
const User = require("../models/User");

// Get the logged-in user's conversations
const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .sort({ createdAt: -1 })
      .populate("senderId", "fullName username profileImage role")
      .populate("receiverId", "fullName username profileImage role")
      .lean();

    const conversations = new Map();

    for (const message of messages) {
      const sender = message.senderId;
      const receiver = message.receiverId;

      if (!sender || !receiver) continue;

      const otherUser =
        sender._id.toString() === userId.toString() ? receiver : sender;
      const otherUserId = otherUser._id.toString();

      if (!conversations.has(otherUserId)) {
        conversations.set(otherUserId, {
          user: otherUser,
          lastMessage: message,
          unreadCount: 0,
        });
      }

      if (
        message.receiverId._id.toString() === userId.toString() &&
        !message.isRead
      ) {
        conversations.get(otherUserId).unreadCount += 1;
      }
    }

    return res.status(200).json({
      message: "Conversations retrieved successfully",
      conversations: Array.from(conversations.values()),
    });
  } catch (error) {
    console.error("Get conversations error:", error);
    return res.status(500).json({
      message: "Server error while retrieving conversations",
    });
  }
};

// Get messages exchanged with another user
const getMessages = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    if (userId === currentUserId.toString()) {
      return res.status(400).json({
        message: "You cannot open a conversation with yourself",
      });
    }

    const otherUser = await User.findById(userId).select(
      "fullName username profileImage role"
    );

    if (!otherUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: userId },
        { senderId: userId, receiverId: currentUserId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("senderId", "fullName username profileImage")
      .populate("receiverId", "fullName username profileImage");

    return res.status(200).json({
      message: "Messages retrieved successfully",
      user: otherUser,
      messages,
    });
  } catch (error) {
    console.error("Get messages error:", error);
    return res.status(500).json({
      message: "Server error while retrieving messages",
    });
  }
};

// Send a message to another user
const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId, message } = req.body;

    if (!receiverId || !mongoose.isValidObjectId(receiverId)) {
      return res.status(400).json({ message: "Valid receiverId is required" });
    }

    if (receiverId === senderId.toString()) {
      return res.status(400).json({
        message: "You cannot send a message to yourself",
      });
    }

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    if (message.trim().length > 2000) {
      return res.status(400).json({
        message: "Message cannot exceed 2000 characters",
      });
    }

    const receiver = await User.findById(receiverId).select("_id");

    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message: message.trim(),
    });

    const populatedMessage = await Message.findById(newMessage._id)
      .populate("senderId", "fullName username profileImage")
      .populate("receiverId", "fullName username profileImage");

    return res.status(201).json({
      message: "Message sent successfully",
      data: populatedMessage,
    });
  } catch (error) {
    console.error("Send message error:", error);
    return res.status(500).json({
      message: "Server error while sending message",
    });
  }
};

// Mark messages from another user as read
const markMessagesAsRead = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const result = await Message.updateMany(
      {
        senderId: userId,
        receiverId: currentUserId,
        isRead: false,
      },
      { $set: { isRead: true } }
    );

    return res.status(200).json({
      message: "Messages marked as read",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Mark messages as read error:", error);
    return res.status(500).json({
      message: "Server error while marking messages as read",
    });
  }
};

module.exports = {
  getConversations,
  getMessages,
  sendMessage,
  markMessagesAsRead,
};
