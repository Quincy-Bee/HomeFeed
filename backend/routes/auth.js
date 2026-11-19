
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// =========================================
// REGISTER USER
// =========================================

router.post("/register", async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            brokerage,
            headshot,
            password,
            accountType
        } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                message: "Please complete all required fields."
            });
        }

        // Validate account type
        const selectedAccountType = accountType || "personal";

        if (!["personal", "broker"].includes(selectedAccountType)) {
            return res.status(400).json({
                message: "Invalid account type."
            });
        }

        // Brokerage is required for brokers only
        if (
            selectedAccountType === "broker" &&
            !brokerage?.trim()
        ) {
            return res.status(400).json({
                message: "Please enter your brokerage name."
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Check whether email already exists
        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create account
        const newUser = new User({
            name: name.trim(),
            email: normalizedEmail,
            phone: phone.trim(),

            brokerage:
                selectedAccountType === "broker"
                    ? brokerage.trim()
                    : "",

            headshot:
                selectedAccountType === "broker"
                    ? headshot?.trim() || ""
                    : "",

            accountType: selectedAccountType,
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
                accountType: savedUser.accountType,
                role: savedUser.role
            }
        });

    } catch (error) {
        console.log("Registration error:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        res.status(500).json({
            message: error.message
        });
    }
});


// =========================================
// LOGIN USER
// =========================================

router.post("/login", async (req, res) => {
    try {
        const normalizedEmail = req.body.email?.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail
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
                role: user.role,
                accountType: user.accountType
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
                accountType: user.accountType,
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
