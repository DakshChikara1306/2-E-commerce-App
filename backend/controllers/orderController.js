// ================== IMPORTS ==================

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


// ================== PLACE ORDER (COD) ==================

const placeOrder = async (req, res) => {
  try {

    // ================== REQUEST DATA ==================

    const userId = req.userId; // from auth middleware
    const { items, amount, address } = req.body;


    // ================== ORDER DATA ==================

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };


    // ================== SAVE ORDER ==================

    const newOrder = new orderModel(orderData);
    await newOrder.save();


    // ================== CLEAR USER CART ==================

    await userModel.findByIdAndUpdate(userId, { cart: {} });


    // ================== RESPONSE ==================

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
    });

  } catch (error) {

    console.log("ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message,
    });
  }
};



// ================== STRIPE ORDER ==================

const placeOrderStripe = async (req, res) => {
  // TODO: Implement Stripe payment logic
};



// ================== RAZORPAY ORDER ==================

const placeOrderRazorpay = async (req, res) => {
  // TODO: Implement Razorpay payment logic
};



// ================== ALL ORDERS (ADMIN) ==================

const allOrders = async (req, res) => {
  try {

    const orders = await orderModel.find({});


    // ================== RESPONSE ==================

    res.json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });

  } catch (error) {

    console.log("ALL ORDERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};



// ================== USER ORDERS ==================

const userOrders = async (req, res) => {
  try {

    // ================== USER ==================

    const userId = req.userId;


    // ================== FETCH ORDERS ==================

    const orders = await orderModel.find({ userId });


    // ================== RESPONSE ==================

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });

  } catch (error) {

    console.log("USER ORDERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};



// ================== UPDATE ORDER STATUS ==================

const updateStatus = async (req, res) => {
  try {

    // ================== REQUEST DATA ==================

    const { orderId, status } = req.body;


    // ================== UPDATE ==================

    await orderModel.findByIdAndUpdate(orderId, { status });


    // ================== RESPONSE ==================

    res.json({
      success: true,
      message: "Order status updated",
    });

  } catch (error) {

    console.log("UPDATE STATUS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error updating order status",
      error: error.message,
    });
  }
};



// ================== EXPORTS ==================

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus
};
