// ================== IMPORTS ==================

import React, { useContext, useEffect } from 'react';

import { ShopContext } from '../context/ShopContext';

import { assets } from '../assets/frontend_assets/assets';

import { useLocation } from 'react-router-dom';


// ================== COMPONENT ==================

const SearchBar = () => {


  // ================== CONTEXT ==================

  const {
    search,
    setSearch,
    showSearch,
    setShowSearch,
  } = useContext(ShopContext);


  // ================== STATE ==================

  // Controls visibility of search bar
  const [visible, setVisible] = React.useState(false);


  // ================== ROUTE INFO ==================

  // Get current route
  const location = useLocation();



  // ================== EFFECT ==================

  // Show search bar only when:
  // 1. User is on "collection" page
  // 2. Search is enabled (showSearch = true)

  useEffect(() => {

    if (
      location.pathname.includes('collection') &&
      showSearch
    ) {
      setVisible(true);
    } else {
      setVisible(false);
    }

  }, [location, showSearch]);



  // ================== UI ==================

  return showSearch && visible ? (

    <div className='border-t border-b bg-gray-50 text-center'>


      {/* ================== SEARCH BOX ================== */}

      <div className='w-[450px] inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-8 rounded-full'>


        {/* ================== INPUT ================== */}

        <input
          type='text'
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none bg-inherit text-sm'
        />


        {/* ================== ICON ================== */}

        <img
          src={assets.search_icon}
          alt=''
          className='w-4'
        />

      </div>



      {/* ================== CLOSE BUTTON ================== */}

      <img
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        alt=''
        className='w-4 h-4 ml-3 inline cursor-pointer'
      />

    </div>

  ) : null;
};


// ================== EXPORT ==================

export default SearchBar;
