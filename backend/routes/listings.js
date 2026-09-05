import express from "express";
import mongoose from "mongoose";
import Listing from "../models/Listing.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// GET ALL LISTINGS
// Public
// ==========================================

router.get("/", async (req, res) => {
    try {

        const listings = await Listing.find()
            .populate(
                "owner",
                "name email phone brokerage headshot"
            )
            .sort({ createdAt: -1 });

        res.json(listings);

    } catch (error) {

        console.error("Get listings error:", error);

        res.status(500).json({
            message: "Failed to fetch listings"
        });

    }
});


// ==========================================
// GET MY LISTINGS
// Admin = ALL LISTINGS
// User = OWN LISTINGS
// ==========================================

router.get("/my-listings", authMiddleware, async (req, res) => {
    try {

        let listings;

        if (req.user.role === "admin") {

            listings = await Listing.find()
                .populate(
                    "owner",
                    "name email phone brokerage headshot"
                )
                .sort({ createdAt: -1 });

        } else {

            listings = await Listing.find({
                owner: req.user.id
            })
                .populate(
                    "owner",
                    "name email phone brokerage headshot"
                )
                .sort({ createdAt: -1 });

        }

        res.json(listings);

    } catch (error) {

        console.error("Get my listings error:", error);

        res.status(500).json({
            message: "Failed to fetch your listings"
        });

    }
});


// ==========================================
// GET SINGLE LISTING
// ==========================================

router.get("/:id", async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid listing ID"
            });
        }

        const listing = await Listing.findById(req.params.id)
            .populate(
                "owner",
                "name email phone brokerage headshot"
            );

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found"
            });
        }

        res.json(listing);

    } catch (error) {

        console.error("Get listing error:", error);

        res.status(500).json({
            message: "Failed to fetch listing"
        });

    }
});


// ==========================================
// CREATE LISTING
// ==========================================

router.post("/", authMiddleware, async (req, res) => {
    try {

        const listing = new Listing({
            listingType: req.body.listingType,
            propertyType: req.body.propertyType,
            address: req.body.address,
            apartmentNumber: req.body.apartmentNumber,
            borough: req.body.borough,
            neighborhood: req.body.neighborhood,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            price: req.body.price,
            bedrooms: req.body.bedrooms,
            bathrooms: req.body.bathrooms,
            description: req.body.description,

            // Multiple property images
            images: req.body.images,

            // Automatically assign the logged-in user
            owner: req.user.id
        });

        const savedListing = await listing.save();

        const populatedListing = await Listing.findById(
            savedListing._id
        ).populate(
            "owner",
            "name email phone brokerage headshot"
        );

        res.status(201).json(populatedListing);

    } catch (error) {

        console.error("Create listing error:", error);

        res.status(500).json({
            message: error.message
        });

    }
});


// ==========================================
// UPDATE LISTING
// Owner OR Admin
// ==========================================

router.put("/:id", authMiddleware, async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid listing ID"
            });
        }

        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found"
            });
        }

        const isOwner =
            listing.owner &&
            listing.owner.toString() === req.user.id;

        const isAdmin =
            req.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                message:
                    "You do not have permission to edit this listing"
            });
        }

        listing.listingType = req.body.listingType;
        listing.propertyType = req.body.propertyType;
        listing.address = req.body.address;
        listing.apartmentNumber = req.body.apartmentNumber;
        listing.borough = req.body.borough;
        listing.neighborhood = req.body.neighborhood;
        listing.city = req.body.city;
        listing.state = req.body.state;
        listing.zipCode = req.body.zipCode;
        listing.price = req.body.price;
        listing.bedrooms = req.body.bedrooms;
        listing.bathrooms = req.body.bathrooms;
        listing.description = req.body.description;

        // Update multiple property images
        listing.images = req.body.images;

        const updatedListing = await listing.save();

        const populatedListing = await Listing.findById(
            updatedListing._id
        ).populate(
            "owner",
            "name email phone brokerage headshot"
        );

        res.json(populatedListing);

    } catch (error) {

        console.error("Update listing error:", error);

        res.status(500).json({
            message: error.message
        });

    }
});


// ==========================================
// DELETE LISTING
// Owner OR Admin
// ==========================================

router.delete("/:id", authMiddleware, async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid listing ID"
            });
        }

        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found"
            });
        }

        const isOwner =
            listing.owner &&
            listing.owner.toString() === req.user.id;

        const isAdmin =
            req.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                message:
                    "You do not have permission to delete this listing"
            });
        }

        await Listing.findByIdAndDelete(req.params.id);

        res.json({
            message: "Listing deleted successfully"
        });

    } catch (error) {

        console.error("Delete listing error:", error);

        res.status(500).json({
            message: "Failed to delete listing"
        });

    }
});


export default router;