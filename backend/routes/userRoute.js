// ================== IMPORTS ==================

import express from 'express';

import {
  loginUser,
  registerUser,
  loginAdmin
} from '../controllers/userController.js';


// ================== ROUTER ==================

const userRouter = express.Router();



// ================== USER AUTH ROUTES ==================

/**
 * @route   POST /api/user/login
 * @desc    Login user
 * @access  Public
 */
userRouter.post('/login', loginUser);


/**
 * @route   POST /api/user/register
 * @desc    Register new user
 * @access  Public
 */
userRouter.post('/register', registerUser);



// ================== ADMIN AUTH ROUTE ==================

/**
 * @route   POST /api/user/admin
 * @desc    Admin login
 * @access  Public
 */
userRouter.post('/admin', loginAdmin);



// ================== EXPORT ==================

export default userRouter;
