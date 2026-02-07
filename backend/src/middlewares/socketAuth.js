const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const User = require("../Models/User");

const socketAuth = async (socket, next) => {
  try {
    const rawCookies = socket.request.headers.cookie;

    if (!rawCookies) {
      return next(new Error("No cookies found"));
    }

    const parsedCookies = cookie.parse(rawCookies);

    const token = parsedCookies.token;

    if (!token) {
      return next(new Error("No token found"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = user;  // 🔥 attach authenticated user

    next();
  } catch (err) {
    console.log("Socket Auth Error:", err.message);
    next(new Error("Authentication failed"));
  }
};

module.exports = socketAuth;
