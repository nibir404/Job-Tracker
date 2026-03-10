import React from 'react';
import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaTrash, FaDollarSign } from 'react-icons/fa';

const JobCard = ({ job, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Applied': return 'badge-info';
      case 'Interview': return 'badge-warning';
      case 'Offer': return 'badge-success';
      case 'Rejected': return 'badge-error';
      default: return 'badge-ghost';
    }
  };

  const formattedDate = new Date(job.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 hover:border-primary transition-all group">
      <div className="card-body p-6">
        <div className="flex justify-between items-start mb-4">
          <div className={`badge ${getStatusBadge(job.status)} badge-sm font-semibold uppercase tracking-wider`}>
            {job.status}
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit(job)}
              className="btn btn-circle btn-xs btn-outline btn-primary"
            >
              <FaEdit size={12} />
            </button>
            <button 
              onClick={() => onDelete(job._id)}
              className="btn btn-circle btn-xs btn-outline btn-error"
            >
              <FaTrash size={12} />
            </button>
          </div>
        </div>

        <h2 className="card-title text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {job.title}
        </h2>

        <div className="space-y-2 text-base-content/70">
          <div className="flex items-center gap-2">
            <FaBuilding className="text-primary/60" />
            <span className="font-medium text-base-content">{job.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-secondary/60" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaDollarSign className="text-success/60" />
            <span className="font-bold text-success">${job.salary.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-base-200 mt-4 text-xs">
            <FaCalendarAlt />
            <span>Applied on {formattedDate}</span>
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <p className="text-sm line-clamp-2 italic text-base-content/60">
            {job.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
