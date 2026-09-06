import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();


// =========================================
// Register user
// =========================================

router.post("/register", async (req, res) => {
    try {

        const hashedPassword = await bcrypt.hash(
            req.body.password,
            10
        );

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            brokerage: req.body.brokerage,
            headshot: req.body.headshot,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: "Registration successful",
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                phone: savedUser.phone,
                brokerage: savedUser.brokerage,
                headshot: savedUser.headshot,
                role: savedUser.role
            }
        });

    } catch (error) {

        console.log("Registration error:", error);

        res.status(500).json({
            message: error.message
        });

    }
});


// =========================================
// Login user
// =========================================

router.post("/login", async (req, res) => {
    try {

        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const passwordMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Incorrect password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({

            message: "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                brokerage: user.brokerage,
                headshot: user.headshot,
                role: user.role
            }

        });

    } catch (error) {

        console.log("Login error:", error);

        res.status(500).json({
            message: error.message
        });

    }
});


export default router;