import React from 'react';
import { assets } from '../assets/assets.js';

const Navbar = ({ onLogout }) => {
  return (
    <div className="flex justify-between items-center py-2 px-[4%] bg-gray-200">

      <img
        className="w-[max(10%,80px)]"
        src={assets.logo}
        alt="logo"
      />

      <button
        onClick={onLogout}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer"
      >
        Logout
      </button>

    </div>
  );
};

export default Navbar;
