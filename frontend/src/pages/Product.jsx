// ================== IMPORTS ==================

import React, { useContext, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { ShopContext } from '../context/ShopContext';

import { assets } from '../assets/frontend_assets/assets';

import RelatedProducts from '../components/RelatedProducts';


// ================== COMPONENT ==================

const Product = () => {


  // ================== ROUTE PARAM ==================

  const { productId } = useParams();


  // ================== CONTEXT ==================

  const { products, currency, addToCart } = useContext(ShopContext);


  // ================== STATE ==================

  const [productData, setProductData] = useState(null);

  const [image, setImage] = useState('');

  const [size, setSize] = useState('');



  // ============================================================
  // ================== FETCH PRODUCT ============================
  // ============================================================

  const fetchProductData = () => {

    const foundProduct = products.find(
      (product) => product._id === productId
    );

    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.imageUrl[0]);
    }
  };



  // ============================================================
  // ================== EFFECT ============================
  // ============================================================

  useEffect(() => {

    if (products.length > 0) {
      fetchProductData();
    }

  }, [productId, products]);



  // ============================================================
  // ================== LOADING STATE ============================
  // ============================================================

  if (!productData) {
    return <div className='pt-10 text-center'>Loading...</div>;
  }



  // ============================================================
  // ================== UI ============================
  // ============================================================

  return (

    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>


      {/* ============================================================
          ================== PRODUCT DATA ===========================
      ============================================================ */}

      <div className='flex gap-12 flex-col sm:flex-row'>


        {/* ================== IMAGE SECTION ================== */}

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>


          {/* Thumbnails */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:w-[18.7%] w-full'>

            {productData.imageUrl.map((item, index) => (

              <img
                key={index}
                src={item}
                alt='product'
                onClick={() => setImage(item)}
                className='cursor-pointer w-[24%] sm:w-full sm:mb-3 flex-shrink-0 object-cover'
              />

            ))}

          </div>


          {/* Main Image */}
          <div className='w-full sm:w-[80%]'>

            <img
              src={image}
              alt='product'
              className='w-full h-auto object-cover'
            />

          </div>

        </div>



        {/* ================== DETAILS ================== */}

        <div className='flex-1'>

          {/* Name */}
          <h1 className='font-medium text-2xl mt-2'>
            {productData.name}
          </h1>


          {/* Rating */}
          <div className='flex items-center gap-1 mt-2'>

            {[1, 2, 3, 4].map((_, i) => (
              <img key={i} src={assets.star_icon} alt='' className='w-3.5' />
            ))}

            <img src={assets.star_dull_icon} alt='' className='w-3.5' />

            <p className='pl-2'>(122)</p>

          </div>


          {/* Price */}
          <p className='mt-5 text-3xl font-medium'>
            {currency}{productData.price}
          </p>


          {/* Description */}
          <p className='mt-5 text-gray-500 md:w-4/5'>
            {productData.description}
          </p>


          {/* ================== SIZE SELECT ================== */}

          <div className='flex flex-col gap-4 my-8'>

            <p>Select Size</p>

            <div className='flex gap-2'>

              {productData.sizes.map((item, index) => (

                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`w-8 h-8 border bg-gray-100 flex items-center justify-center cursor-pointer
                  ${item === size ? 'border-orange-500' : ''}`}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>


          {/* ================== ADD TO CART ================== */}

          <button
            onClick={() => addToCart(productData._id, size)}
            className='bg-black text-white py-3 px-8 text-sm active:bg-gray-700 cursor-pointer'
          >
            ADD TO CART
          </button>


          <hr className='mt-8 sm:w-4/5' />


          {/* Info */}
          <div className='flex flex-col gap-1 mt-5 text-sm text-gray-500'>
            <p>100% Original product</p>
            <p>Free delivery on order above $49</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>

        </div>

      </div>



      {/* ============================================================
          ================== DESCRIPTION / REVIEWS ===================
      ============================================================ */}

      <div className='mt-20'>

        <div className='flex'>
          <b className='px-5 py-3 text-sm border'>Description</b>
          <p className='px-5 py-3 text-sm border'>Reviews (122)</p>
        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>

          <p>
            An e-commerce website is an online platform that facilitates the buying
            and selling of products or services over the internet.
          </p>

          <p>
            Products are displayed with descriptions, images, prices, and variations
            such as sizes and colors.
          </p>

        </div>

      </div>



      {/* ================== RELATED PRODUCTS ================== */}

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />

    </div>
  );
};


// ================== EXPORT ==================

export default Product;
