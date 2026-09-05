
import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        listingType: {
            type: String,
            enum: ["For Sale", "For Rent"],
            required: true
        },

        propertyType: {
            type: String,
            enum: ["Condo", "Co-op", "Townhouse", "Rental"],
            required: true
        },

        address: {
            type: String,
            required: true
        },

        apartmentNumber: {
            type: String,
            default: ""
        },

        borough: {
            type: String,
            enum: [
                "Manhattan",
                "Brooklyn",
                "Queens",
                "Bronx",
                "Staten Island"
            ],
            required: true
        },

        neighborhood: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        state: {
            type: String,
            required: true,
            default: "NY"
        },

        zipCode: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        bedrooms: {
            type: Number,
            default: 0
        },

        bathrooms: {
            type: Number,
            default: 0
        },

        description: {
            type: String,
            default: ""
        },

        images: {
            type: [String],
            default: []
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },

    {
        timestamps: true
    }
);

const Listing = mongoose.model(
    "Listing",
    listingSchema
);

export default Listing;