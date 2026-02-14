// ================== IMPORTS ==================

import { useContext, useEffect, useState } from 'react';

import { ShopContext } from '../context/ShopContext';

import axios from 'axios';

import { toast } from 'react-toastify';


// ================== COMPONENT ==================

const Login = () => {


  // ================== STATE ==================

  // Toggle between Login / Sign Up
  const [currentState, setCurrentState] = useState('Login');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  // ================== CONTEXT ==================

  const { setToken, navigate, backendUrl } = useContext(ShopContext);



  // ============================================================
  // ================== FORM SUBMIT HANDLER ======================
  // ============================================================

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    try {

      let response;


      // ================== SIGN UP ==================

      if (currentState === 'Sign Up') {

        response = await axios.post(
          backendUrl + '/api/user/register',
          {
            name,
            email,
            password,
          }
        );

      }


      // ================== LOGIN ==================

      else {

        response = await axios.post(
          backendUrl + '/api/user/login',
          {
            email,
            password,
          }
        );

      }


      console.log('AUTH RESPONSE =', response.data);



      // ================== SUCCESS ==================

      if (response.data.success) {

        const token = response.data.token;

        // Save token
        setToken(token);
        localStorage.setItem('token', token);

        // Show success message
        toast.success(
          currentState === 'Login'
            ? 'Login Successful!'
            : 'Signup Successful!'
        );

        // Redirect to home
        navigate('/');

      }


      // ================== FAILURE ==================

      else {

        toast.error(
          response.data.message || 'Authentication failed'
        );

      }

    }


    // ================== ERROR ==================

    catch (error) {

      console.log('AUTH ERROR =', error);

      toast.error(
        error.response?.data?.message || 'Something went wrong'
      );

    }
  };



  // ============================================================
  // ================== AUTO LOGIN CHECK =========================
  // ============================================================

  useEffect(() => {

    const existingToken = localStorage.getItem('token');

    // If already logged in → redirect
    if (existingToken) {

      setToken(existingToken);

      navigate('/');

    }

  }, [navigate, setToken]);



  // ============================================================
  // ================== UI ============================
  // ============================================================

  return (

    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >


      {/* ================== TITLE ================== */}

      <div className='inline-flex items-center gap-2 mb-2 mt-10'>

        <p className='prata-regular text-3xl'>
          {currentState}
        </p>

        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />

      </div>



      {/* ================== FORM FIELDS ================== */}

      <div className='w-full px-3 py-2 flex flex-col gap-4'>


        {/* ================== NAME (SIGNUP ONLY) ================== */}

        {currentState !== 'Login' && (

          <input
            type='text'
            placeholder='Name'
            value={name}
            required

            onChange={(e) => setName(e.target.value)}

            className='w-Full px-3 py-2 border border-gray-880'
          />

        )}



        {/* ================== EMAIL ================== */}

        <input
          type='email'
          placeholder='Email'
          value={email}
          required

          onChange={(e) => setEmail(e.target.value)}

          className='w-Full px-3 py-2 border border-gray-880'
        />



        {/* ================== PASSWORD ================== */}

        <input
          type='password'
          placeholder='Password'
          value={password}
          required

          onChange={(e) => setPassword(e.target.value)}

          className='w-Full px-3 py-2 border border-gray-880'
        />



        {/* ================== SWITCH LOGIN / SIGNUP ================== */}

        <div className='w-full flex justify-between text-sm mt-[-8px]'>

          <p className='cursor-pointer'>
            Forgot your password?
          </p>


          {currentState === 'Login' ? (

            <p
              onClick={() => setCurrentState('Sign Up')}
              className='cursor-pointer'
            >
              Create Account
            </p>

          ) : (

            <p
              onClick={() => setCurrentState('Login')}
              className='cursor-pointer'
            >
              Login Here
            </p>

          )}

        </div>



        {/* ================== SUBMIT BUTTON ================== */}

        <button
          className='w-1/2 m-auto bg-black text-white px-8 py-2 mt-4 cursor-pointer'
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>

      </div>

    </form>
  );
};


// ================== EXPORT ==================

export default Login;
