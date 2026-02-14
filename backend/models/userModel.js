// ================== IMPORTS ==================

import mongoose from "mongoose";


// ================== USER SCHEMA ==================

const userSchema = new mongoose.Schema(

  {
    // ================== USER NAME ==================

    name: {
      type: String,
      required: true,
    },


    // ================== EMAIL ==================

    email: {
      type: String,
      required: true,
      unique: true,
    },


    // ================== PASSWORD ==================

    password: {
      type: String,
      required: true,
    },


    // ================== CART ==================

    // Structure: { productId: { size: quantity } }
    cart: {
      type: Object,
      default: {},
    },

  },

  // ================== OPTIONS ==================

  {
    minimize: false, // keep empty objects (important for cart)
  }

);


// ================== MODEL ==================

const userModel =
  mongoose.models.user ||
  mongoose.model('user', userSchema);


// ================== EXPORT ==================

export default userModel;
