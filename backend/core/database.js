const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        // Let the caller handle the error instead of swallowing it
        throw error;
    }
}

module.exports = connectDB;
