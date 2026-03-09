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


const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
startServer();