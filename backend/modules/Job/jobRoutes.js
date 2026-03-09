const express = require("express");
const router = express.Router();
const jobController = require("./jobController");

// Advanced queries - moved UP to avoid being caught by :id
// Search can be by path parameter or query string (?q=)
router.get("/search", jobController.searchJobs);
router.get("/search/:query", jobController.searchJobs);

// Filters generally use query string (?status=Applied)
router.get("/filter", jobController.filterJobs);

// Sort generally use query string (?sortBy=salary&order=asc)
router.get("/sort", jobController.sortJobs);
router.get("/sort/:field", jobController.sortJobs);

// Basic CRUD
router.get("/", jobController.getAllJobs);
router.post("/", jobController.createJob);
router.get("/:id", jobController.getJobById);
router.put("/:id", jobController.updateJob);
router.delete("/:id", jobController.deleteJob);

module.exports = router;
