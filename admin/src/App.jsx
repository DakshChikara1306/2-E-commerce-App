// ================== IMPORTS ==================

import React, { useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// ================== CONSTANTS ==================

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const currency = "$";


// ================== COMPONENT ==================

const App = () => {


  // ================== AUTH STATE ==================

  // Restore token from localStorage
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  );


  // ================== LOGOUT HANDLER ==================

  const logoutHandler = () => {

    // Remove token from storage
    localStorage.removeItem('token');

    // Reset state
    setToken('');
  };



  // ================== UI ==================

  return (

    <div className="bg-gray-50 min-h-screen">


      {/* ================== TOAST ================== */}

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />



      {/* ================== AUTH CHECK ================== */}

      {/* If NOT logged in → Show Login */}
      {!token ? (

        <Login setToken={setToken} />

      ) : (


        <>
          {/* ================== HEADER ================== */}

          <Navbar onLogout={logoutHandler} />

          <hr />


          {/* ================== MAIN LAYOUT ================== */}

          <div className="flex w-full">


            {/* Sidebar */}
            <Sidebar />


            {/* Content Area */}
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">


              {/* ================== ROUTES ================== */}

              <Routes>

                <Route
                  path="/add"
                  element={<Add token={token} />}
                />

                <Route
                  path="/list"
                  element={<List token={token} />}
                />

                <Route
                  path="/orders"
                  element={<Orders token={token} />}
                />

              </Routes>

            </div>

          </div>

        </>

      )}

    </div>
  );
};

export default App;
