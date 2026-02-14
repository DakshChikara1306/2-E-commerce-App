// ================== IMPORTS ==================

import express from "express";

import {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} from "../controllers/cartController.js";

import authUser from "../middleware/auth.js";


// ================== ROUTER ==================

const cartRouter = express.Router();


// ================== ROUTES ==================

/**
 * @route   POST /api/cart/add
 * @desc    Add item to cart
 * @access  Private (User)
 */
cartRouter.post("/add", authUser, addToCart);


/**
 * @route   GET /api/cart/get
 * @desc    Get user cart
 * @access  Private (User)
 */
cartRouter.get("/get", authUser, getCart);


/**
 * @route   POST /api/cart/update
 * @desc    Update item quantity in cart
 * @access  Private (User)
 */
cartRouter.post("/update", authUser, updateCart);


/**
 * @route   POST /api/cart/remove
 * @desc    Remove item from cart
 * @access  Private (User)
 */
cartRouter.post("/remove", authUser, removeFromCart);



// ================== EXPORT ==================

export default cartRouter;
