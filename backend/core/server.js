const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./database");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/jobs", require("../modules/Job/jobRoutes"));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Job-Tracker Backend is Running!" });
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server startup error:", error);
        process.exit(1);
    }
}

startServer();