import React, { useState, useEffect } from 'react';
import jobService from '../services/jobService';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import { FaSearch, FaPlus, FaFilter, FaSortAmountDown, FaExclamationCircle, FaLaptopCode } from 'react-icons/fa';

const DUMMY_JOBS = [
  {
    _id: 'demo1',
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    description: 'Focusing on large-scale distributed systems and developer tools for Google Cloud Platform.',
    salary: 185000,
    status: 'Interview',
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    _id: 'demo2',
    title: 'Backend Developer',
    company: 'Microsoft',
    location: 'Redmond, WA',
    description: 'Designing and implementing cloud-native microservices using Node.js and Azure.',
    salary: 160000,
    status: 'Applied',
    createdAt: '2026-03-03T14:30:00Z'
  },
  {
    _id: 'demo3',
    title: 'Frontend Architect',
    company: 'Meta',
    location: 'Remote',
    description: 'Leading the architectural direction of consumer-facing web applications using React.',
    salary: 195000,
    status: 'Offer',
    createdAt: '2026-02-25T09:15:00Z'
  },
  {
    _id: 'demo4',
    title: 'Product Designer',
    company: 'Apple',
    location: 'Cupertino, CA',
    description: 'Crafting intuitive user experiences for the next generation of creative tools.',
    salary: 170000,
    status: 'Applied',
    createdAt: '2026-03-05T11:45:00Z'
  },
  {
    _id: 'demo5',
    title: 'Full Stack Developer',
    company: 'Netflix',
    location: 'Los Gatos, CA',
    description: 'Building scalable and performant content management and streaming systems.',
    salary: 210000,
    status: 'Rejected',
    createdAt: '2026-02-20T08:00:00Z'
  },
  {
    _id: 'demo6',
    title: 'DevOps Engineer',
    company: 'Amazon',
    location: 'Seattle, WA',
    description: 'Automating CI/CD pipelines and managing Kubernetes clusters at scale.',
    salary: 175000,
    status: 'Interview',
    createdAt: '2026-03-07T16:20:00Z'
  }
];

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [usingDemoData, setUsingDemoData] = useState(false);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobService.getAllJobs();
      setJobs(data);
      setAllJobs(data);
      setError(null);
      setUsingDemoData(false);
    } catch (err) {
      console.error(err);
      // Fallback to dummy data so the UI is never empty
      setJobs(DUMMY_JOBS);
      setAllJobs(DUMMY_JOBS);
      setUsingDemoData(true);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setJobs(allJobs);
      return;
    }
    const q = searchQuery.toLowerCase();
    const filtered = allJobs.filter(job =>
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q)
    );
    setJobs(filtered);
  };

  const handleFilter = (status) => {
    setStatusFilter(status);
    if (!status) {
      setJobs(allJobs);
      return;
    }
    setJobs(allJobs.filter(job => job.status === status));
  };

  const handleSort = (field) => {
    setSortBy(field);
    const sorted = [...jobs].sort((a, b) => {
      if (field === 'salary') return b.salary - a.salary;
      if (field === 'company') return a.company.localeCompare(b.company);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setJobs(sorted);
  };

  const handleCreateJob = async (jobData) => {
    if (usingDemoData) {
      const newJob = {
        ...jobData,
        _id: 'demo' + Date.now(),
        createdAt: new Date().toISOString()
      };
      const updated = [newJob, ...allJobs];
      setAllJobs(updated);
      setJobs(updated);
      setIsModalOpen(false);
      return;
    }
    try {
      await jobService.createJob(jobData);
      setIsModalOpen(false);
      fetchJobs();
    } catch (err) {
      alert("Failed to create job: " + err.message);
    }
  };

  const handleUpdateJob = async (jobData) => {
    if (usingDemoData) {
      const updated = allJobs.map(j => j._id === editingJob._id ? { ...j, ...jobData } : j);
      setAllJobs(updated);
      setJobs(updated);
      setIsModalOpen(false);
      setEditingJob(null);
      return;
    }
    try {
      if (!editingJob?._id) return;
      await jobService.updateJob(editingJob._id, jobData);
      setIsModalOpen(false);
      setEditingJob(null);
      fetchJobs();
    } catch (err) {
      alert("Failed to update job: " + err.message);
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      if (usingDemoData) {
        const updated = allJobs.filter(j => j._id !== id);
        setAllJobs(updated);
        setJobs(updated);
        return;
      }
      try {
        await jobService.deleteJob(id);
        fetchJobs();
      } catch (err) {
        alert("Failed to delete job: " + err.message);
      }
    }
  };

  const openAddModal = () => {
    setEditingJob(null);
    setIsModalOpen(true);
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-base-200/50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div>
            <h1 className="text-4xl font-black mb-1 bg-clip-text text-transparent bg-linear-to-r from-primary via-secondary to-accent">
              Job Applications
            </h1>
            <p className="text-base-content/60 font-medium">Keep track of your career progress.</p>
          </div>
          <button 
            onClick={openAddModal}
            className="btn btn-primary px-8 gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-bold"
          >
            <FaPlus /> Add New Job
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12 sticky top-20 z-10">
          <div className="lg:col-span-2">
            <form onSubmit={handleSearch} className="relative group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search job titles, companies, locations..." 
                className="input input-lg w-full pl-12 bg-base-100 shadow-sm border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="hidden">Search</button>
            </form>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-lg bg-base-100 border-base-300 shadow-sm gap-2">
                <FaFilter className="text-primary/70" /> {statusFilter || 'All Status'}
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-20 w-52 p-2 shadow-xl border border-base-200 mt-2">
                <li><button onClick={() => handleFilter('')}>All Status</button></li>
                <li><button onClick={() => handleFilter('Applied')}>Applied</button></li>
                <li><button onClick={() => handleFilter('Interview')}>Interview</button></li>
                <li><button onClick={() => handleFilter('Offer')}>Offer</button></li>
                <li><button onClick={() => handleFilter('Rejected')}>Rejected</button></li>
              </ul>
            </div>

            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-lg bg-base-100 border-base-300 shadow-sm gap-2">
                <FaSortAmountDown className="text-secondary/70" /> Sort
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-20 w-52 p-2 shadow-xl border border-base-200 mt-2">
                <li><button className={sortBy === 'createdAt' ? 'active' : ''} onClick={() => handleSort('createdAt')}>Date Created</button></li>
                <li><button className={sortBy === 'salary' ? 'active' : ''} onClick={() => handleSort('salary')}>Salary</button></li>
                <li><button className={sortBy === 'company' ? 'active' : ''} onClick={() => handleSort('company')}>Company</button></li>
              </ul>
            </div>
          </div>
        </div>

        {usingDemoData && (
          <div className="alert alert-info mb-8 shadow-lg border-none">
            <FaLaptopCode className="text-2xl" />
            <span className="font-medium">Demo Mode — Showing sample data. Start MongoDB & backend for live data.</span>
          </div>
        )}

        {error && (
          <div className="alert alert-error mb-8 shadow-lg border-none animate-in fade-in duration-500">
            <FaExclamationCircle className="text-2xl" />
            <span className="font-bold">{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="font-bold text-primary animate-pulse tracking-widest text-sm uppercase">Synchronizing your future...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="hero min-h-[400px] bg-base-100 rounded-3xl overflow-hidden shadow-2xl border border-dashed border-base-300">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <div className="p-8 bg-base-200 rounded-full inline-block mb-8 animate-bounce">
                  <FaLaptopCode className="text-6xl text-base-content/20" />
                </div>
                <h2 className="text-3xl font-black mb-4">No jobs tracked yet!</h2>
                <p className="mb-8 text-base-content/50 font-medium italic">
                  Start your journey by adding your first application.
                </p>
                <button onClick={openAddModal} className="btn btn-primary btn-lg shadow-xl shadow-primary/20">
                  <FaPlus className="mr-2" /> Track First Job
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div key={job._id} className="animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-both">
                <JobCard 
                  job={job} 
                  onEdit={openEditModal} 
                  onDelete={handleDeleteJob} 
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <JobModal 
        key={editingJob?._id || (isModalOpen ? 'new' : 'none')}
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
        jobToEdit={editingJob}
      />

      <footer className="footer footer-center p-12 bg-base-100 text-base-content/40 border-t border-base-200 mt-20">
        <div className="flex items-center gap-2">
          <FaLaptopCode className="text-2xl opacity-20" />
          <p className="font-bold tracking-widest text-xs uppercase">
            Built with Passion by JobTracker &copy; 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
