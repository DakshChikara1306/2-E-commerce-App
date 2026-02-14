// ================== IMPORTS ==================

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { backendUrl, currency } from '../App';

import { toast } from 'react-toastify';

import { assets } from '../assets/assets';


// ================== COMPONENT ==================

const Orders = ({ token }) => {


  // ================== STATES ==================

  // Stores all orders
  const [orders, setOrders] = useState([]);



  // ================== FETCH ORDERS ==================

  const fetchAllOrders = async () => {

    // If no token, don't fetch
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


      // ================== SUCCESS ==================

      if (response.data.success) {

        // Sort orders by latest date
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



  // ================== UPDATE ORDER STATUS ==================

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


      // ================== SUCCESS ==================

      if (response.data.success) {

        toast.success("Order status updated");

        // Refresh orders after update
        fetchAllOrders();

      } else {

        toast.error(response.data.message);
      }

    } catch (err) {

      console.log("STATUS ERROR:", err);

      toast.error("Failed to update status");
    }
  };



  // ================== EFFECT ==================

  // Fetch orders when token changes
  useEffect(() => {
    fetchAllOrders();
  }, [token]);



  // ================== UI ==================

  return (

    <div>


      {/* ================== TITLE ================== */}

      <h3>Order Page</h3>



      {/* ================== ORDERS LIST ================== */}

      <div>

        {orders.map((order, index) => (

          <div
            key={index}
            className='grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-300 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
          >


            {/* ================== ICON ================== */}

            <img
              src={assets.parcel_icon}
              alt=''
              className='w-12'
            />



            {/* ================== ITEMS + ADDRESS ================== */}

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

                    return (
                      <p className='py-0.5' key={i}>
                        {item.name} x {item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }

                })}

              </div>


              {/* CUSTOMER NAME */}
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


              {/* PHONE */}
              <p>{order.address.phone}</p>

            </div>



            {/* ================== PAYMENT INFO ================== */}

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



            {/* ================== AMOUNT ================== */}

            <p className='text-sm sm:text-[15px]'>
              Amount : {currency} {order.amount}
            </p>



            {/* ================== STATUS ================== */}

            <select
              value={order.status}
              onChange={(e) => orderStatusHandler(e, order._id)}
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
