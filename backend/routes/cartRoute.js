import express from "express";
import {
    addToCart,
    getCart,
    updateCart,
    removeFromCart
} from "../controllers/cartController.js";

import authUser from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.get("/get", authUser, getCart);
cartRouter.post("/update", authUser, updateCart);
cartRouter.post("/remove", authUser, removeFromCart);

export default cartRouter;