import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/jobs';

const getAllJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getJobById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createJob = async (jobData) => {
  const response = await axios.post(API_URL, jobData);
  return response.data;
};

const updateJob = async (id, jobData) => {
  const response = await axios.put(`${API_URL}/${id}`, jobData);
  return response.data;
};

const deleteJob = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const searchJobs = async (query) => {
  const response = await axios.get(`${API_URL}/search`, { params: { q: query } });
  return response.data;
};

const filterJobs = async (filters) => {
  const response = await axios.get(`${API_URL}/filter`, { params: filters });
  return response.data;
};

const sortJobs = async (sortBy, order) => {
  const response = await axios.get(`${API_URL}/sort`, { params: { sortBy, order } });
  return response.data;
};

const jobService = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  searchJobs,
  filterJobs,
  sortJobs
};

export default jobService;
