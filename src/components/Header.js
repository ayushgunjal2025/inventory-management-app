import React from 'react';
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Image from "../assest/profilepic-removebg-preview.png";

const Header = () => {
  return (
    <header className="bg-black p-4 text-white">
      <div className="flex justify-between items-center max-w-5xl mx-auto">

        <div className="flex items-center space-x-4">
          <img
            src={Image}
            alt="Profile"
            className="rounded-full w-10 h-10"
          />
          <span className="text-sky-600">Ayush Gunjal</span>
        </div>

        <nav className="flex space-x-6">
          <Link to="/" className="hover:text-sky-600">Dashboard</Link>
          <Link to="/customers" className="hover:text-sky-600">Customer Management</Link>
          <Link to="/inventory" className="hover:text-sky-600">Inventory Management</Link>
          <Link to="/billing" className="hover:text-sky-600">Billing System</Link>
        </nav>


        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
          />
          <button className="text-sky-600 text-2xl">
            <FaBell />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
