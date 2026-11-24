require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", () => console.error("Database connection failed"));
db.once("open", () => console.log("Connected to MongoDB"));

app.get("/", (req, res) => {
    res.send({ message: "Blog API is running" });
});

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.use((req, res) => {
    return res.status(404).send({ message: "Route not found" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = { app, mongoose };
