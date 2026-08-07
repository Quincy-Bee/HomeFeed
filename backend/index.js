import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import listingRoutes from "./routes/listings.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });


// Middleware
app.use(cors());
app.use(express.json());


// Route created for home
app.get("/", (req, res) => {
    res.json({
        message: "HomeFeed API Running"
    });
});

// Listing routes
app.use("/api/listings", listingRoutes);

// authRoutes for user authorization
app.use("/api/auth", authRoutes);


// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});