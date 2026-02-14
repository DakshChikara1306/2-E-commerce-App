// ================== IMPORTS ==================

import express from 'express';

import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus
} from '../controllers/orderController.js';

import adminAuth from '../middleware/adminAuth.js';

import authUser from '../middleware/auth.js';


// ================== ROUTER ==================

const orderRouter = express.Router();



// ================== ADMIN ROUTES ==================

/**
 * @route   POST /api/order/list
 * @desc    Get all orders (Admin)
 * @access  Private (Admin)
 */
orderRouter.post('/list', adminAuth, allOrders);


/**
 * @route   POST /api/order/status
 * @desc    Update order status (Admin)
 * @access  Private (Admin)
 */
orderRouter.post('/status', adminAuth, updateStatus);



// ================== USER / PAYMENT ROUTES ==================

/**
 * @route   POST /api/order/place
 * @desc    Place order (COD)
 * @access  Private (User)
 */
orderRouter.post('/place', authUser, placeOrder);


/**
 * @route   POST /api/order/stripe
 * @desc    Place order with Stripe
 * @access  Private (User)
 */
orderRouter.post('/stripe', authUser, placeOrderStripe);


/**
 * @route   POST /api/order/razorpay
 * @desc    Place order with Razorpay
 * @access  Private (User)
 */
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);



// ================== USER ORDERS ==================

/**
 * @route   POST /api/order/userorders
 * @desc    Get logged-in user orders
 * @access  Private (User)
 */
orderRouter.post('/userorders', authUser, userOrders);



// ================== EXPORT ==================

export default orderRouter;
