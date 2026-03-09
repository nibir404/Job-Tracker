const jobServices = require("./jobServices");

const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobServices.getAllJobs();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createJob = async (req, res) => {
    try {
        const job = await jobServices.createJob(req.body);
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getJobById = async (req, res) => {
    try {
        const job = await jobServices.getJobById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateJob = async (req, res) => {
    try {
        const job = await jobServices.updateJob(req.params.id, req.body);
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        const job = await jobServices.deleteJob(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchJobs = async (req, res) => {
    try {
        const query = req.params.query || req.query.q || "";
        const jobs = await jobServices.searchJobs(query);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const filterJobs = async (req, res) => {
    try {
        // Assume query params are the filters (e.g., ?status=Applied)
        const filters = req.query;
        const jobs = await jobServices.filterJobs(filters);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const sortJobs = async (req, res) => {
    try {
        const sortBy = req.params.field || req.query.sortBy || "createdAt";
        const order = req.query.order || "desc";
        const jobs = await jobServices.sortJobs(sortBy, order);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllJobs,
    createJob,
    getJobById,
    updateJob,
    deleteJob,
    searchJobs,
    filterJobs,
    sortJobs
};
