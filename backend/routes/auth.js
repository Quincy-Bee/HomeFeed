import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();


// Register user

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


        res.json(savedUser);


    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

});


export default router;