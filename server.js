import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./src/router/router.routes.js";
import { rateLimit } from 'express-rate-limit'
import apierrorhandler from "./src/utils/apierrorhandler.js";
dotenv.config();

const mongodburl = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;



const app = express();


// ✅ Proper rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,                // max 100 requests per IP
  message: "Too many requests, please try again later."
});
app.use(limiter);

// ✅ Concurrency limiter
let activeRequests = 0;
const MAX_CONCURRENT = 50;

app.use((req, res, next) => {
  if (activeRequests >= MAX_CONCURRENT) {
    return res.status(503).json({
      message: "Too many requests occurred at the moment, please try again later"
    });
  }

  activeRequests++;

  // Decrement once request completes
  res.on("finish", () => {
    activeRequests--;
  });

  next();
});
// ✅ CORS must come BEFORE routes
app.use(cors({
  origin: "*",  // Frontend origin
  credentials: true,                // Allow cookies/headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Routes after middleware
app.use("/", router);

// ✅ Connect and run server
const mongoconnection = async () => {
  try {
    const connection = await mongoose.connect(mongodburl);
    
    if (!connection) {
      console.error("❌ Error occurred in connecting to MongoDB");
      process.exit(1);
    }
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error occurred while connecting to database:", error.message);
    process.exit(1);
  }
};

mongoconnection();
