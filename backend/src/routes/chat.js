const express = require("express");

const chatRouter = express.Router();

const userauth = require("../middlewares/auth");

const Chat = require("../Models/chat");

const ConnectionRequest = require("../Models/connectionRequest");

chatRouter.get("/chat/:targetUserId", userauth, async (req, res) => {
  try {
    const userId = req.user._id;

     const { targetUserId } = req.params;

    const isConnected = await ConnectionRequest.exists({
      status: "accept",
      $or: [
        { fromUserId: userId, toUserId: targetUserId },
        { fromUserId: targetUserId, toUserId: userId },
      ],
    });


    if (!isConnected) {
      return res.status(403).json({
        message: "You are not connected with this user",
      });
    }

    const chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    });

    if (!chat) {
      return res.json([]);
    }

    res.json(chat.messages);
  } catch (err) {
    console.error("Chat Fetch Error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = chatRouter;
