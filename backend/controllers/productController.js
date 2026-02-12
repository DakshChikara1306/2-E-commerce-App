import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";


// function for add product
// const addProduct = async (req, res) =>{
//     try{
//         const { name, description, price, category, subCategory, sizes ,bestseller } = req.body;
//         const image1 = req.files.image1[0];
//         const image2 = req.files.image2[0];
//         const image3 = req.files.image3[0];
//         const image4 = req.files.image4[0];
//         const images = [image1, image2, image3, image4].filter((image) => image !== undefined);

//         let imageUrls = await Promise.all(images.map(async (item) => {
//             let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
//             return result.secure_url;
//         }));
//         const productData = {
//             name,
//             description,
//             price: Number(price),
//             category,
//             subCategory,
//             sizes: JSON.parse(sizes),
//             bestSeller: bestseller === "true" ? true : false,
//             imageUrl: imageUrls,
//             date: Date.now()
//         }
//         console.log(productData);

//         const newProduct = new productModel(productData);
//         await newProduct.save();
//         res.status(201).json({sucess: true, message: "Product added successfully", product: newProduct});
        
//     }catch(error){
//         res.status(500).json({ message: "Error adding product", error });
//     }
// }
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      isBestSeller,
    } = req.body;

    const images = [];

    if (req.files?.image1) images.push(req.files.image1[0]);
    if (req.files?.image2) images.push(req.files.image2[0]);
    if (req.files?.image3) images.push(req.files.image3[0]);
    if (req.files?.image4) images.push(req.files.image4[0]);

    const imageUrls = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: sizes ? JSON.parse(sizes) : [],
      bestSeller: isBestSeller === "true" || isBestSeller === true,
      imageUrl: imageUrls,
      date: Date.now(),
    };

    console.log("PRODUCT =", productData);

    const newProduct = new productModel(productData);
    await newProduct.save();

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


//function for get all products
const listProducts = async (req, res) =>{
    try{
        const products = await productModel.find({});
        res.status(200).json({ success: true, products });

    }catch(error){
        res.status(500).json({ message: "Error fetching products", error });
    }
}

// funtion for remove product
const removeProduct = async (req, res) =>{
    try{
        await productModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Product removed successfully" });
    }catch(error){
        res.status(500).json({ message: "Error removing product", error });
    }
}

// function for single product info
const singleProduct = async (req, res) =>{

    try{
        const{productId} = req.body;
        const product = await productModel.findById(productId);
        if(product){
            res.status(200).json({ success: true, product });
        }else{
            res.status(404).json({ success: false, message: "Product not found" });
        }

    }catch(error){
        res.status(500).json({ message: "Error fetching product", error });
    }
}

export{ addProduct, listProducts, removeProduct, singleProduct }