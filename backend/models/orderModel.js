// ================== IMPORTS ==================

import mongoose from 'mongoose';


// ================== ORDER SCHEMA ==================

const orderSchema = new mongoose.Schema(

  {
    // ================== USER ==================

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },


    // ================== ITEMS ==================

    items: {
      type: Array,
      required: true,
    },


    // ================== TOTAL AMOUNT ==================

    amount: {
      type: Number,
      required: true,
    },


    // ================== SHIPPING ADDRESS ==================

    address: {
      type: Object,
      required: true,
    },


    // ================== ORDER STATUS ==================

    status: {
      type: String,
      default: "Order placed",
      required: true,
    },


    // ================== PAYMENT METHOD ==================

    paymentMethod: {
      type: String,
      required: true,
    },


    // ================== PAYMENT STATUS ==================

    payment: {
      type: Boolean,
      default: false,
      required: true,
    },


    // ================== ORDER DATE ==================

    date: {
      type: Number,
      required: true,
    }

  },

  // ================== OPTIONS ==================

  {
    timestamps: true,
  }

);


// ================== MODEL ==================

const orderModel =
  mongoose.models.order ||
  mongoose.model("order", orderSchema);


// ================== EXPORT ==================

export default orderModel;
