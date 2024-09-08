const Message = require("../models/Message");

exports.getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, text, user, email } = req.body;
  try {
    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      text,
      user: user,
      email: email,
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
