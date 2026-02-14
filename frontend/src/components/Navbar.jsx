// ================== IMPORTS ==================

import React from 'react';

import { assets } from '../assets/frontend_assets/assets';

import { Link, NavLink } from 'react-router-dom';

import { ShopContext } from '../context/ShopContext';


// ================== COMPONENT ==================

function Navbar() {


  // ================== STATE ==================

  const [visible, setVisible] = React.useState(false);


  // ================== CONTEXT ==================

  const {
    setShowSearch,
    getCartCount,
    setToken,
    navigate,
    token,
  } = React.useContext(ShopContext);



  // ================== LOGOUT FUNCTION ==================

  const handleLogout = () => {

    localStorage.removeItem('token');

    setToken('');

    navigate('/login');

    window.location.reload(); // force refresh

  };



  // ================== UI ==================

  return (

    <div className='flex items-center justify-between py-5 font-medium'>


      {/* ================== LOGO ================== */}

      <Link to='/'>
        <img
          src={assets.logo}
          alt="Logo"
          className='w-36'
        />
      </Link>



      {/* ================== DESKTOP NAVIGATION ================== */}

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>


        <NavLink className='flex flex-col items-center gap-1' to='/'>
          Home
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>


        <NavLink className='flex flex-col items-center gap-1' to='/collection'>
          Collections
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>


        <NavLink className='flex flex-col items-center gap-1' to='/about'>
          About
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>


        <NavLink className='flex flex-col items-center gap-1' to='/contact'>
          Contact
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

      </ul>



      {/* ================== RIGHT SECTION ================== */}

      <div className='flex items-center gap-6'>


        {/* ================== SEARCH ICON ================== */}

        <img
          onClick={() => setShowSearch(prev => !prev)}
          src={assets.search_icon}
          alt="Search"
          className='w-5 cursor-pointer'
        />



        {/* ================== PROFILE ================== */}

        {token ? (

          <div className='group relative'>

            <img
              src={assets.profile_icon}
              alt="Profile"
              className='w-5 cursor-pointer'
            />


            {/* ================== DROPDOWN ================== */}

            <div className='hidden group-hover:block absolute right-0 pt-4'>

              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>

                <p className='hover:text-black cursor-pointer'>
                  My Profile
                </p>

                <p
                  onClick={() => navigate('/orders')}
                  className='hover:text-black cursor-pointer'
                >
                  Orders
                </p>

                <p
                  onClick={handleLogout}
                  className='hover:text-black cursor-pointer'
                >
                  Logout
                </p>

              </div>

            </div>

          </div>

        ) : (

          <Link to='/login'>
            <img
              src={assets.profile_icon}
              alt="Login"
              className='w-5 cursor-pointer'
            />
          </Link>

        )}



        {/* ================== CART ================== */}

        <Link to='/cart' className='relative'>

          <img
            src={assets.cart_icon}
            alt="Cart"
            className='w-5 cursor-pointer'
          />

          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>

        </Link>



        {/* ================== MOBILE MENU ICON ================== */}

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="Menu"
          className='w-5 cursor-pointer sm:hidden'
        />

      </div>



      {/* ================== MOBILE SIDEBAR ================== */}

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white 
        ease-in duration-300 ${visible ? 'w-full' : 'w-0'}`}
      >

        <div className='flex flex-col text-gray-700'>


          {/* Back Button */}

          <div
            onClick={() => setVisible(false)}
            className='flex items-center gap-4 p-3'
          >
            <img
              src={assets.dropdown_icon}
              alt="Back"
              className='h-4 rotate-180'
            />
            <p className='cursor-pointer'>Back</p>
          </div>


          {/* Links */}

          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b' to='/'>
            Home
          </NavLink>

          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b' to='/collection'>
            Collections
          </NavLink>

          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b' to='/about'>
            About
          </NavLink>

          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b' to='/contact'>
            Contact
          </NavLink>

        </div>

      </div>

    </div>
  );
}


// ================== EXPORT ==================

export default Navbar;
