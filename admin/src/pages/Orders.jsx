import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets'; // ✅ make sure path is correct

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([]);

  // ================= FETCH ORDERS =================
  const fetchAllOrders = async () => {
    if (!token) return;

    try {

      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("ALL ORDERS:", response.data);

      if (response.data.success) {
          const sortedOrders = response.data.orders.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
        setOrders(sortedOrders);
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }

    } catch (err) {

      console.log("FETCH ORDERS ERROR:", err.response?.data || err);

      toast.error(
        err.response?.data?.message ||
        "An error occurred while fetching orders"
      );
    }
  };

  // ================= UPDATE STATUS =================
  const orderStatusHandler = async (e, orderId) => {

    const status = e.target.value;

    try {

      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        
        toast.success("Order status updated");
        fetchAllOrders(); // refresh
      } else {
        toast.error(response.data.message);
      }

    } catch (err) {
      console.log("STATUS ERROR:", err);
      toast.error("Failed to update status");
    }
  };

  // ================= USE EFFECT =================
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // ================= UI =================
  return (
    <div>

      <h3>Order Page</h3>

      <div>
        {orders.map((order, index) => (

          <div
            key={index}
            className='grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-300 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
          >

            {/* ICON */}
            <img
              className='w-12'
              src={assets.parcel_icon}
              alt=''
            />

            {/* ITEMS + ADDRESS */}
            <div>

              {/* ITEMS */}
              <div>
                {order.items.map((item, i) => {

                  if (i === order.items.length - 1) {
                    return (
                      <p className='py-0.5' key={i}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return ( // ✅ return added
                      <p className='py-0.5' key={i}>
                        {item.name} x {item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }

                })}
              </div>

              {/* NAME */}
              <p className='mt-3 mb-2 font-medium'>
                {order.address.firstName} {order.address.lastName}
              </p>

              {/* ADDRESS */}
              <div>
                <p>{order.address.street},</p>

                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>

              <p>{order.address.phone}</p>

            </div>

            {/* PAYMENT INFO */}
            <div>

              <p className='text-sm sm:text-[15px]'>
                Items : {order.items.length}
              </p>

              <p className='mt-3'>
                Method: {order.paymentMethod}
              </p>

              <p>
                Payment Status: {order.payment ? 'Done' : 'Pending'}
              </p>

              <p>
                Date : {new Date(order.date).toLocaleDateString()}
              </p>

            </div>

            {/* AMOUNT */}
            <p className='text-sm sm:text-[15px]'>
              Amount : {currency}
              {order.amount}
            </p>

            {/* STATUS */}
            <select
              onChange={(e) => orderStatusHandler(e, order._id)}
              value={order.status} // ✅ fixed
              className='p-2 font-semibold cursor-pointer'
            >

              <option value='Order placed'>Order Placed</option>
              <option value='Packing'>Packing</option>
              <option value='Shipped'>Shipped</option>
              <option value='Out for Delivery'>Out for Delivery</option>
              <option value='Delivered'>Delivered</option>

            </select>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Orders;
