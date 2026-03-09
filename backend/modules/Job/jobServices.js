const Job = require("./jobModel");

const jobServices = {
    getAllJobs: async () => {
        try {
            const jobs = await Job.find().sort({ createdAt: -1 });
            return jobs;
        } catch (error) {
            throw new Error(`Error fetching jobs: ${error.message}`);
        }
    },

    createJob: async (jobData) => {
        try {
            const newJob = new Job(jobData);
            return await newJob.save();
        } catch (error) {
            throw new Error(`Error creating job: ${error.message}`);
        }
    },

    getJobById: async (id) => {
        try {
            const job = await Job.findById(id);
            return job;
        } catch (error) {
            throw new Error(`Error finding job with id ${id}: ${error.message}`);
        }
    },

    updateJob: async (id, jobData) => {
        try {
            const updatedJob = await Job.findByIdAndUpdate(id, jobData, { new: true, runValidators: true });
            return updatedJob;
        } catch (error) {
            throw new Error(`Error updating job with id ${id}: ${error.message}`);
        }
    },

    deleteJob: async (id) => {
        try {
            return await Job.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error deleting job with id ${id}: ${error.message}`);
        }
    },

    searchJobs: async (query) => {
        try {
            const searchCriteria = {
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { company: { $regex: query, $options: 'i' } },
                    { location: { $regex: query, $options: 'i' } }
                ]
            };
            return await Job.find(searchCriteria);
        } catch (error) {
            throw new Error(`Error searching jobs with query "${query}": ${error.message}`);
        }
    },

    filterJobs: async (filters) => {
        try {
            // Assuming filters is an object like { status: 'Applied', company: 'Google' }
            return await Job.find(filters);
        } catch (error) {
            throw new Error(`Error filtering jobs: ${error.message}`);
        }
    },

    sortJobs: async (sortBy, order = 'desc') => {
        try {
            const sortOptions = {};
            sortOptions[sortBy] = order === 'asc' ? 1 : -1;
            return await Job.find().sort(sortOptions);
        } catch (error) {
            throw new Error(`Error sorting jobs by ${sortBy}: ${error.message}`);
        }
    }
};

module.exports = jobServices;
