import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Home Feed API Running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
})