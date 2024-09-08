const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://192.168.31.105:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let users = [];

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("login", (userId) => {
    users = users.filter((user) => user.id !== userId);

    users.push({ id: userId, socketId: socket.id });
    console.log("User logged in:", users);
    io.emit("userList", users);
  });

  socket.on("logout", (userId) => {
    users = users.filter((user) => user.id !== userId);
    console.log("User logged out:", users);
    io.emit("userList", users);
  });

  socket.on("chat message", (message) => {
    io.emit("chat message", message);
  });

  // // Handle 1-to-1 chat messages
  // socket.on("chat message", ({ senderId, receiverId, text }) => {
  //   console.log("Current users:", users); // Log the current users array
  //   const sender = users.find((user) => user.id === senderId);
  //   const receiver = users.find((user) => user.id === receiverId);

  //   if (!sender) {
  //     console.log("Sender not found:", senderId);
  //     socket.emit("error", "Sender not found");
  //     return;
  //   }

  //   if (!receiver) {
  //     console.log("Receiver not found or offline:", receiverId);
  //     socket.emit("error", "Receiver not found or offline");
  //     return;
  //   }

  //   console.log("Message received:", senderId, receiverId, text);
  //   io.to(receiver.socketId).emit("chat message", {
  //     senderId,
  //     text,
  //     timestamp: new Date().toISOString(),
  //   });
  // });

  // Handle 1-to-many (broadcast) chat message
  socket.on("broadcast message", ({ senderId, text }) => {
    io.emit("broadcast message", {
      senderId,
      text,
      timestamp: new Date().toISOString(),
    });
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");

    // Remove the user who disconnected
    users = users.filter((user) => user.socketId !== socket.id);

    console.log("User disconnected:", users);

    // Broadcast the updated user list
    io.emit("userList", users);
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});
