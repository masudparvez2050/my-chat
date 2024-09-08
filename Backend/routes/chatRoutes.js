const express = require("express");
const { getMessages, sendMessage } = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/messages/:senderId/:receiverId", protect, getMessages);
router.post("/message", protect, sendMessage);

module.exports = router;
