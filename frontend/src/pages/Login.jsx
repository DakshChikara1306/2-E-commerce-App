import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');

  const { setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      let response;

      // ================= SIGNUP =================
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

      // ================= LOGIN =================
      else {

        response = await axios.post(
          backendUrl + '/api/user/login',
          {
            email,
            password,
          }
        );

      }

      console.log("AUTH RESPONSE =", response.data);

      // ================= SUCCESS =================
      if (response.data.success) {

        const token = response.data.token; // ✅ FIXED

        setToken(token);
        localStorage.setItem('token', token);

        toast.success(
          currentState === 'Login'
            ? 'Login Successful!'
            : 'Signup Successful!'
        );

        navigate('/'); // optional: go home after login
      }

      // ================= FAIL =================
      else {

        toast.error(response.data.message || 'Authentication failed');

      }

    }

    // ================= ERROR =================
    catch (error) {

      console.log("AUTH ERROR =", error);

      toast.error(
        error.response?.data?.message || 'Something went wrong'
      );

    }
  };

  useEffect(() => {
    // If already logged in, redirect to home
    const existingToken = localStorage.getItem('token');
    if (existingToken) {
      setToken(existingToken);
      navigate('/');
    }
  }, [navigate, setToken]);


  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text 3x1'> {currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800 ' />
      </div>

      <div className='w-full px-3 py-2 flex flex-col gap-4'>

        {currentState === 'Login' ? null : (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type='text'
            className='w-Full px-3 py-2 border border-gray-880'
            placeholder='Name'
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type='email'
          className='w-Full px-3 py-2 border border-gray-880'
          placeholder='Email'
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type='password'
          className='w-Full px-3 py-2 border border-gray-880'
          placeholder='Password'
          required
        />

        <div className='w-full flex justify-between text-sm mt-[-8px]'>

          <p className=' cursor-pointer'>Forgot your password?</p>

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

        <button className='w-1/2 m-auto bg-black text-white px-8 py-2 mt-4 cursor-pointer '>
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>

      </div>
    </form>
  );
};

export default Login;
