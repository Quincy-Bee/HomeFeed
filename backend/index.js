import express from "express";
import cors from "cors";

const app = express();

// Middleware

app.use(cors());
app.use(express.json());

// route created for home
app.get("/", (req, res) => {
    res.json({
        message: "HomeFeed API Running"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

