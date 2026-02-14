// ================== IMPORTS ==================

import React from 'react';

import { assets } from '../assets/assets.js';


// ================== COMPONENT ==================

const Navbar = ({ onLogout }) => {


  // ================== UI ==================

  return (

    <div className="flex justify-between items-center py-2 px-[4%] bg-gray-200">


      {/* ================== LOGO ================== */}

      <img
        src={assets.logo}
        alt="logo"
        className="w-[max(10%,80px)]"
      />



      {/* ================== LOGOUT BUTTON ================== */}

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
