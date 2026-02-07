const socket = require("socket.io");
const socketAuth = require("../middlewares/socketAuth");

const initiallizeSocket = (server) => {

  const io = socket(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,   // 🔥 VERY IMPORTANT
  },
});

  // 🔐 Apply Authentication Middleware
  io.use(socketAuth);

  io.on("connection", (socket) => {

    console.log("User connected:", socket.user._id);

    socket.on("joinChat", ({ targetUserid }) => {

      const userId = socket.user._id;  // 🔥 NEVER trust frontend

      const roomId = [userId, targetUserid].sort().join("_");

      socket.join(roomId);

      console.log(socket.user.firstName + " joined room - " + roomId);
    });

    socket.on("sendMessage", ({ targetUserid, newMsg }) => {

      const userId = socket.user._id;

      const roomId = [userId, targetUserid].sort().join("_");

      io.to(roomId).emit("receiveMessage", {
        senderId: userId,
        message: newMsg,
      });
    });

  });
};

module.exports = initiallizeSocket;
