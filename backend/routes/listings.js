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

// route to edit a listing
router.put("/:id", async (req, res) => {
    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedListing);

    }   catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Delete Listing

router.delete("/:id", async (req, res) => {
    try {
        const deletedListing = await Listing.findByIdAndDelete(req.params.id);

        res.json(deletedListing);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


export default router;