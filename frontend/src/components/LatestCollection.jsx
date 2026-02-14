// ================== IMPORTS ==================

import React, { useContext, useEffect } from 'react';

import { ShopContext } from '../context/ShopContext.jsx';

import Title from './Title.jsx';

import ProductItem from '../components/ProductItem.jsx';


// ================== COMPONENT ==================

const LatestCollection = () => {


  // ================== CONTEXT ==================

  const { products } = useContext(ShopContext);


  // ================== STATE ==================

  const [latestProducts, setLatestProducts] = React.useState([]);


  // ================== GET LATEST PRODUCTS ==================

  useEffect(() => {

    // Take first 10 products as latest
    setLatestProducts(products.slice(0, 10));

  }, [products]);



  // ================== UI ==================

  return (

    <div className='my-10'>


      {/* ================== TITLE ================== */}

      <div className='text-center py-8 text-3xl'>

        <Title text1={'LATEST'} text2={'COLLECTION'} />

        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest arrivals that blend style and comfort. Explore the
          latest trends in fashion, curated just for you.
        </p>

      </div>



      {/* ================== PRODUCT GRID ================== */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">

        {latestProducts.map((product, idx) => (

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


// ================== EXPORT ==================

export default LatestCollection;
