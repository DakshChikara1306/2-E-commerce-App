// ================== IMPORTS ==================

import React, { useContext, useEffect, useState } from 'react';

import { ShopContext } from '../context/ShopContext';

import ProductdItem from './ProductItem';

import Title from './Title';


// ================== COMPONENT ==================

const RelatedProducts = ({ category, subCategory }) => {


  // ================== CONTEXT ==================

  const { products } = useContext(ShopContext);


  // ================== STATE ==================

  const [related, setRelated] = useState([]);



  // ================== FILTER RELATED PRODUCTS ==================

  useEffect(() => {

    if (products.length > 0) {

      let productsCopy = products.slice();

      // Filter by category & subCategory
      productsCopy = productsCopy.filter(
        (item) =>
          category === item.category &&
          subCategory === item.subCategory
      );

      // Take first 5 related products
      setRelated(productsCopy.slice(0, 5));
    }

  }, [products]);



  // ================== UI ==================

  return (

    <div>


      {/* ================== TITLE ================== */}

      <div className='text-center text-2xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>



      {/* ================== PRODUCT GRID ================== */}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>

        {related.map((item, index) => (

          <ProductdItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.imageUrl}
            className='cursor-pointer w-[24%] sm:w-full sm:mb-3 flex-shrink-0 object-cover'
          />

        ))}

      </div>

    </div>
  );
};


// ================== EXPORT ==================

export default RelatedProducts;
