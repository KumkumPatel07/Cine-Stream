require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const uploadsRouter = require("./routes/uploads");

const app = express();

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Express Middleware
app.use(cors());
app.use(express.json());

// Existing API Routes
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/upload", uploadsRouter);

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Cine-Stream Backend is running",
  });
});

// Socket.io Connection
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Receive message and broadcast
  socket.on("chat:message", (message) => {
    console.log("Message received:", message);

    io.emit("chat:message", message);
  });

  // Client disconnected
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected successfully");

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });