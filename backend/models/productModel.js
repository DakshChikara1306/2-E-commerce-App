// ================== IMPORTS ==================

import mongoose from "mongoose";


// ================== PRODUCT SCHEMA ==================

const productSchema = new mongoose.Schema({

  // ================== PRODUCT NAME ==================

  name: {
    type: String,
    required: true,
  },


  // ================== DESCRIPTION ==================

  description: {
    type: String,
    required: true,
  },


  // ================== PRICE ==================

  price: {
    type: Number,
    required: true,
  },


  // ================== IMAGES ==================

  imageUrl: {
    type: Array,
    required: true,
  },


  // ================== CATEGORY ==================

  category: {
    type: String,
    required: true,
  },


  // ================== SUB CATEGORY ==================

  subCategory: {
    type: String,
    required: true,
  },


  // ================== AVAILABLE SIZES ==================

  sizes: {
    type: Array,
    required: true,
  },


  // ================== BEST SELLER FLAG ==================

  bestSeller: {
    type: Boolean,
    default: false,
  },


  // ================== CREATED DATE ==================

  date: {
    type: Number,
    required: true,
  }

});


// ================== MODEL ==================

const productModel =
  mongoose.models.product ||
  mongoose.model('product', productSchema);


// ================== EXPORT ==================

export default productModel;
