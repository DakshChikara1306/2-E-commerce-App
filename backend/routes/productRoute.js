// ================== IMPORTS ==================

import express from 'express';

import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct
} from '../controllers/productController.js';

import upload from '../middleware/multer.js';

import adminAuth from '../middleware/adminAuth.js';


// ================== ROUTER ==================

const productRouter = express.Router();



// ================== ADD PRODUCT ==================

/**
 * @route   POST /api/product/add
 * @desc    Add new product
 * @access  Private (Admin)
 */
productRouter.post(
  '/add',
  adminAuth,

  // Upload multiple images
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),

  addProduct
);



// ================== GET ALL PRODUCTS ==================

/**
 * @route   GET /api/product/list
 * @desc    Get all products
 * @access  Public
 */
productRouter.get('/list', listProducts);



// ================== REMOVE PRODUCT ==================

/**
 * @route   POST /api/product/remove
 * @desc    Remove product
 * @access  Private (Admin)
 */
productRouter.post('/remove', adminAuth, removeProduct);



// ================== SINGLE PRODUCT ==================

/**
 * @route   POST /api/product/single
 * @desc    Get single product details
 * @access  Public
 */
productRouter.post('/single', singleProduct);



// ================== EXPORT ==================

export default productRouter;
