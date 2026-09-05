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
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: "Registration successful",
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role
            }
        });

    } catch (error) {

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
                role: user.role
            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }
});


export default router;