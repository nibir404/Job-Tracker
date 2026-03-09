const express = require("express");
const router = express.Router();
const jobController = require("./jobController");

// Basic CRUD
router.get("/", jobController.getAllJobs);
router.post("/", jobController.createJob);
router.get("/:id", jobController.getJobById);
router.put("/:id", jobController.updateJob);
router.delete("/:id", jobController.deleteJob);

// Advanced queries
router.get("/search", jobController.searchJobs);
router.get("/filter", jobController.filterJobs);
router.get("/sort", jobController.sortJobs);

module.exports = router;
