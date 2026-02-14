// ================== IMPORTS ==================

import { v2 as cloudinary } from "cloudinary";

import productModel from "../models/productModel.js";



// ================== ADD PRODUCT ==================

const addProduct = async (req, res) => {
  try {

    // ================== REQUEST DATA ==================

    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      isBestSeller,
    } = req.body;


    // ================== HANDLE IMAGES ==================

    const images = [];

    if (req.files?.image1) images.push(req.files.image1[0]);
    if (req.files?.image2) images.push(req.files.image2[0]);
    if (req.files?.image3) images.push(req.files.image3[0]);
    if (req.files?.image4) images.push(req.files.image4[0]);


    // ================== UPLOAD TO CLOUDINARY ==================

    const imageUrls = await Promise.all(
      images.map(async (item) => {

        const result = await cloudinary.uploader.upload(
          item.path,
          { resource_type: "image" }
        );

        return result.secure_url;
      })
    );


    // ================== PREPARE PRODUCT DATA ==================

    const productData = {

      name,
      description,

      // Convert price to number
      price: Number(price),

      category,
      subCategory,

      // Parse sizes array
      sizes: sizes ? JSON.parse(sizes) : [],

      // Convert string to boolean
      bestSeller:
        isBestSeller === "true" || isBestSeller === true,

      imageUrl: imageUrls,

      date: Date.now(),

    };


    console.log("PRODUCT =", productData);


    // ================== SAVE PRODUCT ==================

    const newProduct = new productModel(productData);

    await newProduct.save();


    // ================== RESPONSE ==================

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });

  } catch (error) {

    console.error("ADD PRODUCT ERROR:", error);

    res.status(500).json({
      message: "Error adding product",
      error: error.message,
    });
  }
};



// ================== LIST ALL PRODUCTS ==================

const listProducts = async (req, res) => {
  try {

    const products = await productModel.find({});


    // ================== RESPONSE ==================

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {

    res.status(500).json({
      message: "Error fetching products",
      error,
    });
  }
};



// ================== REMOVE PRODUCT ==================

const removeProduct = async (req, res) => {
  try {

    const { id } = req.body;


    // ================== DELETE ==================

    await productModel.findByIdAndDelete(id);


    // ================== RESPONSE ==================

    res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Error removing product",
      error,
    });
  }
};



// ================== GET SINGLE PRODUCT ==================

const singleProduct = async (req, res) => {
  try {

    // ================== REQUEST DATA ==================

    const { productId } = req.body;


    // ================== FETCH PRODUCT ==================

    const product = await productModel.findById(productId);


    // ================== RESPONSE ==================

    if (product) {

      res.status(200).json({
        success: true,
        product,
      });

    } else {

      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

  } catch (error) {

    res.status(500).json({
      message: "Error fetching product",
      error,
    });
  }
};



// ================== EXPORTS ==================

export {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct
};
