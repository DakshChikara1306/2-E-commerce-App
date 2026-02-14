// ================== IMPORTS ==================

import { useContext, useEffect, useState } from 'react';

import { ShopContext } from '../context/ShopContext';

import Title from './Title';

import ProductItem from './ProductItem';


// ================== COMPONENT ==================

const BestSeller = () => {


  // ================== CONTEXT ==================

  const { products } = useContext(ShopContext);


  // ================== STATE ==================

  const [bestSeller, setBestSeller] = useState([]);


  // ================== DEBUG ==================

  console.log(bestSeller);


  // ================== FILTER BEST SELLERS ==================

  useEffect(() => {

    if (products) {

      // Filter only best seller products
      const bestProduct = products.filter(
        (product) => product.bestSeller
      );

      // Take top 5 products
      setBestSeller(bestProduct.slice(0, 5));

    }

  }, [products]);



  // ================== UI ==================

  return (

    <div className="my-10">


      {/* ================== TITLE ================== */}

      <div className="text-center text-3xl py-8">

        <Title text1={'BEST'} text2={'SELLERS'} />

        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Our best-selling products that our customers can not get enough of.
          Shop the most popular items from our store.
        </p>

      </div>



      {/* ================== PRODUCT GRID ================== */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">

        {bestSeller.map((product, idx) => (

          <ProductItem
            key={idx}
            id={product._id}
            image={product.imageUrl}
            name={product.name}
            price={product.price}
          />

        ))}

      </div>

    </div>
  );
};

export default BestSeller;
