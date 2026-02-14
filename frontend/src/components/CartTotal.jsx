// ================== IMPORTS ==================

import { useContext } from 'react';

import { ShopContext } from '../context/ShopContext';

import Title from './Title';


// ================== COMPONENT ==================

const CartTotal = () => {


  // ================== CONTEXT ==================

  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);


  // ================== UI ==================

  return (

    <div className='w-full'>


      {/* ================== TITLE ================== */}

      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTAL'} />
      </div>



      {/* ================== PRICE DETAILS ================== */}

      <div className='flex flex-col gap-2 mt-2 text-sm '>


        {/* ================== SUBTOTAL ================== */}

        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>
            {currency} {getCartAmount()}.00
          </p>
        </div>


        {/* ================== SHIPPING ================== */}

        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>
            {currency} {delivery_fee}.00
          </p>
        </div>


        {/* ================== TOTAL ================== */}

        <div className='flex justify-between'>
          <p>Total</p>
          <p>
            {currency}{' '}
            {
              getCartAmount() === 0
                ? 0
                : getCartAmount() + delivery_fee
            }.00
          </p>
        </div>

      </div>

    </div>
  );
};


// ================== EXPORT ==================

export default CartTotal;
