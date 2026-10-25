
const express = require("express");

const {
  getConversations,
  getMessages,
  sendMessage,
  markMessagesAsRead,
} = require("../controllers/messageController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/conversations", protect, getConversations);
router.put("/:userId/read", protect, markMessagesAsRead);
router.get("/:userId", protect, getMessages);
router.post("/", protect, sendMessage);

module.exports = router;
