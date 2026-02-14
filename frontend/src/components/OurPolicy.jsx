// ================== IMPORTS ==================

import React from 'react';

import { assets } from '../assets/frontend_assets/assets';


// ================== COMPONENT ==================

const OurPolicy = () => {


  // ================== UI ==================

  return (

    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">


      {/* ================== EXCHANGE POLICY ================== */}

      <div>
        <img
          src={assets.exchange_icon}
          alt=""
          className="w-12 m-auto mb-5"
        />

        <p className="font-semibold">
          Easy Exchange Policy
        </p>

        <p className="text-gray-400">
          We offer hassle free exchange policy
        </p>
      </div>



      {/* ================== RETURN POLICY ================== */}

      <div>
        <img
          src={assets.quality_icon}
          alt=""
          className="w-12 m-auto mb-5"
        />

        <p className="font-semibold">
          7-day return policy
        </p>

        <p className="text-gray-400">
          We provide 7-day return policy
        </p>
      </div>



      {/* ================== SUPPORT ================== */}

      <div>
        <img
          src={assets.support_img}
          alt=""
          className="w-12 m-auto mb-5"
        />

        <p className="font-semibold">
          Best customer support
        </p>

        <p className="text-gray-400">
          We provide 24/7 customer support
        </p>
      </div>

    </div>
  );
};


// ================== EXPORT ==================

export default OurPolicy;
