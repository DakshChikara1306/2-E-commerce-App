// ================== IMPORTS ==================

import React, { useContext, useEffect, useState } from 'react';

import { ShopContext } from '../context/ShopContext';

import Title from '../components/Title';

import { assets } from '../assets/frontend_assets/assets';

import CartTotal from '../components/CartTotal';


// ================== COMPONENT ==================

function Cart() {


  // ================== CONTEXT ==================

  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate
  } = useContext(ShopContext);


  // ================== STATE ==================

  // Flattened cart data for UI rendering
  const [cartData, setCartData] = useState([]);




  // ================== PREPARE CART DATA ==================

  useEffect(() => {

    if (products.length > 0) {

      let tempData = [];

      // Convert nested cart object into flat array
      for (const item in cartItems) {

        for (const size in cartItems[item]) {

          if (cartItems[item][size] > 0) {

            tempData.push({
              _id: item,
              size: size,
              quantity: cartItems[item][size],
            });

          }
        }
      }

      setCartData(tempData);
    }

  }, [products, cartItems]);



  // ================== UI ==================

  return (

    <div className='pt-14 border-t'>


      {/* ================== PAGE TITLE ================== */}

      <div className='mb-3 text-2xl'>

        <Title text1={'YOUR'} text2={'CART'} />

      </div>



      {/* ================== CART ITEMS ================== */}

      <div>

        {cartData.map((item, index) => {

          // Find product details from products list
          const productsData = products.find(
            (product) => product._id === item._id
          );

          // Skip if product not found
          if (!productsData) return null;


          return (

            <div
              key={index}
              className='py-3 border-b border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
            >


              {/* ================== PRODUCT INFO ================== */}

              <div className='flex items-start gap-6'>

                {/* Product Image */}
                <img
                  src={productsData.imageUrl?.[0] || "/no-image.png"}
                  alt=''
                  className='w-16 sm:w-20'
                />


                {/* Product Details */}
                <div>

                  <p className='text-sm sm:text-lg font-medium'>
                    {productsData.name}
                  </p>

                  <div className='flex items-center gap-5 mt-2'>

                    {/* Price */}
                    <p>
                      {currency}
                      {productsData.price}
                    </p>

                    {/* Size */}
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>
                      {item.size}
                    </p>

                  </div>

                </div>

              </div>



              {/* ================== QUANTITY INPUT ================== */}

              <input
                type='number'
                min={1}
                defaultValue={item.quantity}
                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'

                onChange={(e) => {

                  // Prevent invalid values
                  if (e.target.value === '' || e.target.value < 0) return;

                  updateQuantity(
                    item._id,
                    item.size,
                    Number(e.target.value)
                  );

                }}
              />



              {/* ================== DELETE BUTTON ================== */}

              <img
                src={assets.bin_icon}
                alt=''
                className='w-4 mr-4 sm:w-5 cursor-pointer'

                onClick={() => updateQuantity(item._id, item.size, 0)}
              />

            </div>
          );

        })}

      </div>



      {/* ================== CART TOTAL + CHECKOUT ================== */}

      <div className='flex justify-end my-20'>

        <div className='w-full sm:w-[450px]'>

          {/* Total Section */}
          <CartTotal />


          {/* Checkout Button */}
          <div className='w-full text-end'>

            <button
              onClick={() => navigate('/place-order')}
              className='my-8 px-8 py-3 bg-black text-white text-sm cursor-pointer'
            >
              PROCEED TO CHECKOUT
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


// ================== EXPORT ==================

export default Cart;
