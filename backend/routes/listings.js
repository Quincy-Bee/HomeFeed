import express from "express";
import Listing from "../models/Listing.js";

const router = express.Router();


// Get all listings
router.get("/", async (req, res) => {
    try {
        const listings = await Listing.find();

        res.json(listings);

    } catch (error) {
        res.json({
            message: error.message
        });
    }
});


// Create a new listing
router.post("/", async (req, res) => {
    try {
        const newListing = new Listing(req.body);

        const savedListing = await newListing.save();

        res.json(savedListing);

    } catch (error) {
        res.json({
            message: error.message
        });
    }
});


export default router;