const mongoose = require("mongoose");
const Job = require("../modules/Job/jobModel");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

const dummyJobs = [
    {
        title: "Senior Software Engineer",
        company: "Google",
        location: "Mountain View, CA",
        description: "Focusing on large-scale distributed systems and developer tools.",
        salary: 185000,
        status: "Interview"
    },
    {
        title: "Backend Developer",
        company: "Microsoft",
        location: "Redmond, WA",
        description: "Designing and implementing cloud-native services using Node.js and Azure.",
        salary: 160000,
        status: "Applied"
    },
    {
        title: "Frontend Architect",
        company: "Meta",
        location: "Remote",
        description: "Leading the architectural direction of consumer-facing web applications using React.",
        salary: 195000,
        status: "Offer"
    },
    {
        title: "Product Designer",
        company: "Apple",
        location: "Cupertino, CA",
        description: "Crafting intuitive user experiences for the next generation of creative tools.",
        salary: 170000,
        status: "Applied"
    },
    {
        title: "Full Stack Developer",
        company: "Netflix",
        location: "Los Gatos, CA",
        description: "Building scalable and performant content management systems.",
        salary: 210000,
        status: "Rejected"
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        await Job.deleteMany();
        console.log("Cleared existing jobs.");

        await Job.insertMany(dummyJobs);
        console.log("Successfully added dummy data!");

        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedDatabase();
