import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import listingRoutes from "./routes/listings.js";

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


// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});