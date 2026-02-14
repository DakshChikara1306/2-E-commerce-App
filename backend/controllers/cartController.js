// ================== IMPORTS ==================

import userModel from "../models/userModel.js";


// ================== ADD TO CART ==================

const addToCart = async (req, res) => {
  try {

    // ================== REQUEST DATA ==================

    const { itemId, size } = req.body;
    const userId = req.userId;


    // ================== FETCH USER ==================

    const userdata = await userModel.findById(userId);
    const cartdata = userdata.cart;


    // ================== INIT ITEM ==================

    if (!cartdata[itemId]) {
      cartdata[itemId] = {};
    }


    // ================== ADD / INCREMENT ==================

    if (cartdata[itemId][size]) {

      // If already exists → increase quantity
      cartdata[itemId][size] += 1;

    } else {

      // New size entry
      cartdata[itemId][size] = 1;
    }


    // ================== SAVE ==================

    await userModel.findByIdAndUpdate(userId, { cart: cartdata });


    // ================== RESPONSE ==================

    res.status(200).json({
      success: true,
      message: "Item added to cart successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message
    });
  }
};



// ================== UPDATE CART ==================

const updateCart = async (req, res) => {
  try {

    // ================== REQUEST DATA ==================

    const { itemId, size, quantity } = req.body;
    const userId = req.userId;


    // ================== FETCH USER ==================

    const userdata = await userModel.findById(userId);
    const cartdata = userdata.cart;


    // ================== INIT ITEM ==================

    if (!cartdata[itemId]) {
      cartdata[itemId] = {};
    }


    // ================== UPDATE QUANTITY ==================

    cartdata[itemId][size] = quantity;


    // ================== SAVE ==================

    await userModel.findByIdAndUpdate(userId, { cart: cartdata });


    // ================== RESPONSE ==================

    res.status(200).json({
      success: true,
      message: "Cart updated successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error updating cart",
      error: error.message
    });
  }
};



// ================== GET CART ==================

const getCart = async (req, res) => {
  try {

    // ================== USER ==================

    const userId = req.userId;

    const user = await userModel.findById(userId);


    // ================== RESPONSE ==================

    res.status(200).json({
      success: true,
      cart: user.cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ================== REMOVE FROM CART ==================

const removeFromCart = async (req, res) => {
  try {

    // ================== REQUEST DATA ==================

    const { itemId, size } = req.body;
    const userId = req.userId;


    // ================== FETCH USER ==================

    const user = await userModel.findById(userId);
    const cart = user.cart;


    // ================== REMOVE ITEM ==================

    if (cart[itemId] && cart[itemId][size]) {

      // Remove specific size
      delete cart[itemId][size];

      // If no sizes left, remove product
      if (Object.keys(cart[itemId]).length === 0) {
        delete cart[itemId];
      }
    }


    // ================== SAVE ==================

    await userModel.findByIdAndUpdate(userId, { cart });


    // ================== RESPONSE ==================

    res.status(200).json({
      success: true,
      message: "Item removed from cart"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ================== EXPORTS ==================

export {
  addToCart,
  updateCart,
  getCart,
  removeFromCart
};
