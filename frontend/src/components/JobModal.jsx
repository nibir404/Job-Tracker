import React, { useState } from 'react';
import { FaTimes, FaPlus, FaSave } from 'react-icons/fa';

const JobModal = ({ isOpen, onClose, onSubmit, jobToEdit }) => {
  const [formData, setFormData] = useState({
    title: jobToEdit?.title || '',
    company: jobToEdit?.company || '',
    location: jobToEdit?.location || '',
    description: jobToEdit?.description || '',
    salary: jobToEdit?.salary || '',
    status: jobToEdit?.status || 'Applied'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl bg-base-100 rounded-2xl shadow-2xl relative overflow-visible">
        <button 
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 hover:bg-error/20 hover:text-error transition-colors z-10"
        >
          <FaTimes />
        </button>

        <h3 className="font-extrabold text-2xl mb-8 flex items-center gap-3">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            {jobToEdit ? <FaSave /> : <FaPlus />}
          </div>
          <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
            {jobToEdit ? 'Edit Job' : 'Add New Job'}
          </span>
        </h3>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text">Job Title</span>
              </label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="e.g. Senior Backend Developer" 
                className="input input-bordered focus:input-primary w-full transition-all" 
                required 
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text">Company</span>
              </label>
              <input 
                type="text" 
                name="company" 
                value={formData.company} 
                onChange={handleChange} 
                placeholder="e.g. Google" 
                className="input input-bordered focus:input-primary w-full transition-all" 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text">Location</span>
              </label>
              <input 
                type="text" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                placeholder="e.g. Remote / New York" 
                className="input input-bordered focus:input-primary w-full transition-all" 
                required 
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text">Salary (Annual)</span>
              </label>
              <div className="join w-full">
                <span className="join-item flex items-center px-4 bg-base-200 border border-base-300 font-bold">$</span>
                <input 
                  type="number" 
                  name="salary" 
                  value={formData.salary} 
                  onChange={handleChange} 
                  placeholder="e.g. 120000" 
                  className="input input-bordered join-item focus:input-primary w-full transition-all" 
                  required 
                />
              </div>
            </div>
          </div>

          <div className="form-control">
            <label className="label font-semibold">
              <span className="label-text">Status</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {['Applied', 'Interview', 'Offer', 'Rejected'].map((status) => (
                <label key={status} className="label cursor-pointer flex gap-2 group">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={formData.status === status}
                    onChange={handleChange}
                    className={`radio radio-sm ${
                      status === 'Applied' ? 'radio-info' : 
                      status === 'Interview' ? 'radio-warning' : 
                      status === 'Offer' ? 'radio-success' : 'radio-error'
                    }`}
                  />
                  <span className={`label-text font-medium group-hover:text-primary transition-colors ${formData.status === status ? 'text-primary' : ''}`}>
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-control">
            <label className="label font-semibold">
              <span className="label-text">Description</span>
            </label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="textarea textarea-bordered focus:textarea-primary min-h-[120px] transition-all" 
              placeholder="Tell us about the job..." 
              required
            ></textarea>
          </div>

          <div className="modal-action mt-8 pt-6 border-t border-base-200">
            <button type="button" onClick={onClose} className="btn btn-ghost hover:bg-base-300">Cancel</button>
            <button type="submit" className="btn btn-primary px-8 gap-2 shadow-lg shadow-primary/30">
              {jobToEdit ? <FaSave /> : <FaPlus />}
              {jobToEdit ? 'Save Changes' : 'Add Job'}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
    </div>
  );
};

export default JobModal;
