import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing order using COD method
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId; // ✅ from middleware
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cart: {} });

    res.status(200).json({
      message: "Order placed successfully",
      success: true,
    });

  } catch (error) {
    console.log("ORDER ERROR:", error); // ✅ important
    res.status(500).json({
      message: "Error placing order",
      success: false,
      error: error.message,
    });
  }
};


const placeOrderStripe = async (req, res) => {

}

const placeOrderRazorpay = async (req, res) => {

}

// All orders data for admin panel
const allOrders = async (req, res) => {
  try{
    const orders = await orderModel.find({});
    res.json({
      message: "Orders fetched successfully",
      success: true,
      orders,
    });
  }catch(error){
    console.log("ALL ORDERS ERROR:", error);
    res.status(500).json({
      message: "Error fetching orders",
      success: false,
      error: error.message,
    });

  }

}

// user order data for frontend
const userOrders = async (req, res) => {
  try {

    const userId = req.userId; // ✅ from auth middleware

    const orders = await orderModel.find({ userId });

    res.status(200).json({
      message: "Orders fetched successfully",
      success: true,
      orders,
    });

  } catch (error) {

    console.log("USER ORDERS ERROR:", error);

    res.status(500).json({
      message: "Error fetching orders",
      success: false,
      error: error.message,
    });
  }
};


// update order status for admin panel

const updateStatus = async (req, res) => {
  try{
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({
      message: "Order status updated",
      success: true,
    });

  }catch(error){
    console.log("UPDATE STATUS ERROR:", error);
    res.status(500).json({
      message: "Error updating order status",
      success: false,
      error: error.message,
    });

  }

}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }