// ================== IMPORTS ==================

import React from "react";


// ================== COMPONENT ==================

const Title = ({ text1, text2 }) => {


  // ================== UI ==================

  return (

    <div className="inline-flex gap-2 items-center mb-3">


      {/* ================== TEXT ================== */}

      <p className="text-gray-500">

        {/* First part of title */}
        {text1}

        {/* Highlighted part */}
        <span className="text-gray-700 font-medium">
          {text2}
        </span>

      </p>


      {/* ================== DECORATIVE LINE ================== */}

      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>

    </div>
  );
};


// ================== EXPORT ==================

export default Title;
