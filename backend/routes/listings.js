import express from "express";
import Listing from "../models/Listing.js";

const router = express.Router();


// Get all listings
router.get("/", async (req, res) => {
    try {
        const listings = await Listing.find();

        res.json(listings);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


export default router;