import userModel from "../models/userModel.js";

// add products
const addToCart = async (req, res) => {
    try {
        const { itemId, size } = req.body;
        const userId = req.userId;

        const userdata = await userModel.findById(userId);
        const cartdata = userdata.cart;

        if (!cartdata[itemId]) {
            cartdata[itemId] = {};
        }

        if (cartdata[itemId][size]) {
            cartdata[itemId][size] += 1;
        } else {
            cartdata[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cart: cartdata });

        res.status(200).json({
            message: "Item added to cart successfully",
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding item to cart",
            success: false,
            error: error.message
        });
    }
};

const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        const userId = req.userId;

        const userdata = await userModel.findById(userId);
        const cartdata = userdata.cart;

        if (!cartdata[itemId]) {
            cartdata[itemId] = {};
        }

        cartdata[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cart: cartdata });

        res.status(200).json({
            message: "Cart updated successfully",
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating cart",
            success: false,
            error: error.message
        });
    }
};

const getCart = async (req, res) => {
    try {
       const userId = req.userId;

        const user = await userModel.findById(userId);

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

const removeFromCart = async (req, res) => {
    try {
        const { itemId, size } = req.body;
        const userId = req.userId;

        const user = await userModel.findById(userId);
        const cart = user.cart;

        if (cart[itemId] && cart[itemId][size]) {

            delete cart[itemId][size];

            if (Object.keys(cart[itemId]).length === 0) {
                delete cart[itemId];
            }
        }

        await userModel.findByIdAndUpdate(userId, { cart });

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



export {
    addToCart,
    updateCart,
    getCart,
    removeFromCart
};
