// ================== IMPORTS ==================

import React from 'react';

import { NavLink } from 'react-router-dom';

import { assets } from '../assets/assets';


// ================== COMPONENT ==================

const Sidebar = () => {


  // ================== UI ==================

  return (

    <div className='w-[18%] min-h-screen border-r-2 border-gray-300'>


      {/* ================== MENU CONTAINER ================== */}

      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>


        {/* ================== ADD ITEMS ================== */}

        <NavLink
          to='/add'
          className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg'
        >

          <img
            src={assets.add_icon}
            alt=''
            className='w-5 h-5'
          />

          <p className='hidden md:block'>
            Add Items
          </p>

        </NavLink>



        {/* ================== LIST ITEMS ================== */}

        <NavLink
          to='/list'
          className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg'
        >

          <img
            src={assets.order_icon}
            alt=''
            className='w-5 h-5'
          />

          <p className='hidden md:block'>
            List Items
          </p>

        </NavLink>



        {/* ================== ORDERS ================== */}

        <NavLink
          to='/orders'
          className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg'
        >

          <img
            src={assets.order_icon}
            alt=''
            className='w-5 h-5'
          />

          <p className='hidden md:block'>
            Orders
          </p>

        </NavLink>


      </div>

    </div>
  );
};

export default Sidebar;
