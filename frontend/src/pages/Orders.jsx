// ================== IMPORTS ==================

import { useContext, useEffect, useState } from 'react';

import Title from '../components/Title';

import { ShopContext } from '../context/ShopContext';


// ================== COMPONENT ==================

const Orders = () => {


  // ================== CONTEXT ==================

  const {
    currency,
    products,
    backendUrl,
    token
  } = useContext(ShopContext);



  // ================== STATE ==================

  const [orderData, setOrderData] = useState([]);




  // ============================================================
  // ================== FETCH ORDERS =============================
  // ============================================================

  const loadOrderData = async () => {

    try {

      // If not logged in → stop
      if (!token) return;


      const response = await fetch(
        `${backendUrl}/api/order/userorders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
        }
      );


      // Convert response to JSON
      const data = await response.json();

      console.log('ORDERS RESPONSE:', data);



      // ================== SUCCESS ==================

      if (data.success) {

        let allOrdersItem = [];


        // Flatten orders → items
        data.orders.forEach((order) => {

          order.items.forEach((item) => {

            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              date: order.date,
              paymentMethod: order.paymentMethod,
            });

          });

        });


        // Sort latest first
        const sortedOrders = allOrdersItem.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );


        setOrderData(sortedOrders);
      }

    } catch (error) {

      console.log('ORDER FETCH ERROR:', error);

    }
  };



  // ================== EFFECT ==================

  useEffect(() => {

    loadOrderData();

  }, [token]);



  // ============================================================
  // ================== LOADING / EMPTY STATE ====================
  // ============================================================

  // Prevent crash if products not loaded
  if (!products || products.length === 0) {

    return (
      <div className='pt-16 border-t text-center text-gray-500'>
        No orders found.
      </div>
    );

  }



  // ============================================================
  // ================== UI ============================
  // ============================================================

  return (

    <div className='pt-16 border-t'>


      {/* ================== TITLE ================== */}

      <div className='mb-3 text-2xl'>

        <Title text1={'MY'} text2={'ORDERS'} />

      </div>



      {/* ================== ORDERS LIST ================== */}

      <div>

        {orderData.map((item, index) => (

          <div
            key={index}
            className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
          >


            {/* ================== LEFT SIDE ================== */}

            <div className='flex items-start gap-6'>


              {/* Product Image */}
              <img
                src={item.imageUrl?.[0] || '/no-image.png'}
                alt=''
                className='w-16 sm:w-20'
              />


              {/* Product Details */}
              <div>

                <p className='sm:text-base font-medium'>
                  {item.name}
                </p>


                <div className='flex items-center gap-5 mt-1 text-base text-gray-700'>

                  {/* Price */}
                  <p>
                    {currency}
                    {item.price}
                  </p>

                  {/* Quantity */}
                  <p>Quantity: {item.quantity}</p>

                  {/* Size */}
                  <p>Size: {item.size}</p>

                </div>


                {/* Date */}
                <p className='mt-1'>
                  Date:{' '}
                  <span className='text-gray-400'>
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </p>


                {/* Payment */}
                <p className='mt-1'>
                  Payment Method:{' '}
                  <span className='text-gray-400'>
                    {item.paymentMethod}
                  </span>
                </p>

              </div>

            </div>



            {/* ================== RIGHT SIDE ================== */}

            <div className='flex justify-between md:w-1/2'>


              {/* Status */}
              <div className='flex items-center gap-2'>

                <p className='min-w-2 h-2 rounded-full bg-green-400'></p>

                <p className='text-sm md:text-base'>
                  {item.status}
                </p>

              </div>


              {/* Action Button */}
              <button
                className='border px-4 py-2 text-sm font-medium rounded-sm text-gray-700 cursor-pointer hover:bg-gray-100'
              >
                Track Order
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};


// ================== EXPORT ==================

export default Orders;
