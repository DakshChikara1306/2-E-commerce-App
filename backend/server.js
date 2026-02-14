// ================== IMPORTS ==================

import express from "express";

import cors from "cors";

import 'dotenv/config';

import connectDB from "./config/mongodb.js";

import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";

import productRouter from "./routes/productRoute.js";

import cartRouter from "./routes/cartRoute.js";

import orderRouter from "./routes/orderRoute.js";



// ================== APP CONFIG ==================

const app = express();

const PORT = process.env.PORT || 4000;


// ================== DATABASE CONNECTION ==================

connectDB();


// ================== CLOUDINARY CONNECTION ==================

connectCloudinary();



// ================== MIDDLEWARE ==================

// Parse JSON body
app.use(express.json());

// Enable CORS
app.use(cors());



// ================== API ROUTES ==================

app.use('/api/user', userRouter);

app.use('/api/product', productRouter);

app.use('/api/cart', cartRouter);

app.use('/api/order', orderRouter);



// ================== ROOT ROUTE ==================

app.get("/", (req, res) => {
  res.send("API is working Properly");
});



// ================== SERVER START ==================

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
