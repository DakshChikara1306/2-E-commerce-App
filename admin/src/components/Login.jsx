import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/admin`,
        {
          email,
          password,
        }
      );

      if (data.success) {
        const token = data.data.token;

        // Save token
        localStorage.setItem('token', token);
        setToken(token);

        toast.success('Login Successful!');
        navigate('/add');
      } else {
        toast.error(data.message || 'Login failed');
      }

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        'Server error. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full">

        <h1 className="text-2xl font-bold mb-4 text-center">
          Admin Panel
        </h1>

        <form onSubmit={onSubmitHandler}>

          {/* Email */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">
              Email Address
            </p>

            <input
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-gray-400"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <p className="text-sm font-medium mb-2">
              Password
            </p>

            <input
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-gray-400"
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
