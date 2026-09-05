import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            default: ""
        },

        brokerage: {
            type: String,
            default: ""
        },

        headshot: {
            type: String,
            default: ""
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },

        savedListings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Listing"
            }
        ]
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;