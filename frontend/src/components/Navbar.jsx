import React from 'react';
import { FaLaptopCode } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4 lg:px-12 sticky top-0 z-50">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl flex items-center gap-2 normal-case">
          <div className="bg-primary text-primary-content p-2 rounded-lg">
            <FaLaptopCode className="text-xl" />
          </div>
          <span className="font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
            JobTracker
          </span>
        </a>
      </div>
      <div className="flex-none gap-2">
        <ul className="menu menu-horizontal px-1">
          <li><a>Dashboard</a></li>
          <li><a>Statistics</a></li>
        </ul>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-primary">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
