import express from 'express';  
import { loginUser , registerUser , loginAdmin } from '../controllers/userController.js';

const userRouter = express.Router();

// Route for user login
userRouter.post('/login', loginUser);

// Route for user registration
userRouter.post('/register', registerUser);

// Route for admin login
userRouter.post('/admin', loginAdmin);

export default userRouter;