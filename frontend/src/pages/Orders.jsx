import { useContext } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import { useState } from 'react';
import { useEffect } from 'react';
const Orders = () => {
  const { currency, products, backendUrl, token } = useContext(ShopContext);
  const[orderData, setOrderData] = useState([]);
  const loadOrderData = async () => {
  try {
    if (!token) return;

    const response = await fetch(
      `${backendUrl}/api/order/userorders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    const data = await response.json(); // ✅ THIS WAS MISSING

    console.log("ORDERS RESPONSE:", data);

    if (data.success) {

      let allOrdersItem = [];

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
      const sortedOrders = allOrdersItem.sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

setOrderData(sortedOrders);

    }

  } catch (error) {
    console.log("ORDER FETCH ERROR:", error);
  }
};


  useEffect(() => {
    loadOrderData();
  }, [token]);

  // Prevent crash if products not loaded yet
  if (!products || products.length === 0) {
    return (
      <div className="pt-16 border-t text-center text-gray-500">
        No orders found.
      </div>
    );
  }

  return (
    <div className='pt-16 border-t'>
      <div className='mb-3 text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((item, index) => {
          return (
            <div
              key={index}
              className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between g4'
            >
              <div className='flex items-start gap-6'>

                {/* ✅ FIXED IMAGE */}
                <img
                  src={item.imageUrl?.[0] || '/no-image.png'}
                  alt=''
                  className='w-16 sm:w-20'
                />

                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>

                  <div className='flex items-center gap-5 mt-1 text-base text-gray-700'>
                    <p>
                      {currency}
                      {item.price}
                    </p>

                    {/* Dummy data (for now) */}
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>

                  <p className='mt-1'>
                    Date: <span className='text-gray-400'>{new Date(item.date).toLocaleDateString()}</span>
                  </p>

                  <p className='mt-1'>Payment Method:&nbsp;
                    <span className='text-gray-400'>
                      {item.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>

              <div className='flex justify-between md:w-1/2'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-400'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>

                <button
                  className='border px-4 py-2 text-sm font-medium rounded-sm text-gray-700 cursor-pointer hover:bg-gray-100'
                >
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
