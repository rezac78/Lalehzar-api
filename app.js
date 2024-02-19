const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const redis = require("redis");
const cookieParser = require("cookie-parser");
const limiter = require("./api/middlewares/rateLimit");
const sanitize = require("./api/middlewares/sanitize");
const securityHeaders = require("./api/middlewares/securityHeaders");
const errorHandler = require("./api/middlewares/errorHandler");
// import File
const connectDB = require("./config/db");
const authRoutes = require("./api/routes/authRoutes");
// const adminRoutes = require("./api/routes/AdminRoute");
// Create a Redis client
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || "lalehzar-api-75mo.onrender.com", // Replace with your Redis server host
  port: process.env.REDIS_PORT || 6379, // Replace with your Redis server port
});
// Load Config
dotEnv.config({ path: "./config/config.env" });

// Connect to MongoDB
connectDB();

// Start Express
const app = express();

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Middleware setup
const allowedOrigins = [
  "https://lalehzar.netlify.app",
  "http://localhost:3000",
];
app.use(express.json());
app.use(
  cors((req, callback) => {
    const origin = allowedOrigins.includes(req.header("Origin"))
      ? req.header("Origin")
      : false;
    callback(null, { origin, credentials: true });
  })
);
// Rate limiting middleware
app.use(limiter);
// Define a root route
app.get("/", (req, res) => {
  res.send("Hello World from Express.js");
});
app.use(cookieParser());
app.use(errorHandler);
app.use(limiter);
// Data sanitization against NoSQL query injection
app.use(sanitize);
// Set various HTTP headers for security
app.use(securityHeaders);
// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes); // Admin-related routes
// Select a port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
