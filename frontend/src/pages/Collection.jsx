// ================== IMPORTS ==================

import { use, useContext, useEffect } from 'react';
import { useState } from 'react';

import { ShopContext } from '../context/shopContext';
import { assets } from '../assets/frontend_assets/assets';

import Title from '../components/Title';
import ProductItem from '../components/ProductItem';


// ================== COMPONENT ==================

function Collection() {

  // ================== CONTEXT ==================

  const { products, search, showSearch } = useContext(ShopContext);


  // ================== STATES ==================

  const [showFilter, setShowFilter] = useState(false);

  const [filterProducts, setFilterProducts] = useState([]);

  const [Category, setCategory] = useState([]);

  const [subCategory, setSubCategory] = useState([]);

  const [sortType, setSortType] = useState('relevent');


  // ================== CATEGORY TOGGLE ==================

  const toggleCategory = (e) => {

    if (Category.includes(e.target.value)) {
      setCategory(prev =>
        prev.filter(item => item !== e.target.value)
      );
    } 
    else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };


  // ================== SUB-CATEGORY TOGGLE ==================

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev =>
        prev.filter(item => item !== e.target.value)
      );
    } 
    else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };


  // ================== APPLY FILTER ==================

  const applyFilter = () => {

    if (!products || products.length === 0) return;

    let productsCopy = products.slice();


    // Search Filter
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name
          .toLowerCase()
          .includes(search.toLowerCase().trim())
      );
    }


    // Category Filter
    if (Category.length > 0) {
      productsCopy = productsCopy.filter(item =>
        Category.includes(item.category)
      );
    }


    // Sub Category Filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      );
    }


    setFilterProducts(productsCopy);
  };


  // ================== SORT PRODUCTS ==================

  const sortProducts = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {

      case 'low-high':

        setFilterProducts(
          fpCopy.sort((a, b) => a.price - b.price)
        );
        break;


      case 'high-low':

        setFilterProducts(
          fpCopy.sort((a, b) => b.price - a.price)
        );
        break;


      default:

        applyFilter();
        break;
    }
  };


  // ================== EFFECTS ==================

  // Run when sorting changes
  useEffect(() => {
    sortProducts();
  }, [sortType]);


  // Run when filters/search change
  useEffect(() => {
    applyFilter();
  }, [Category, subCategory, search, showSearch , products]);


  // ================== UI ==================

  return (

    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>


      {/* ================== FILTER SECTION ================== */}

      <div className='min-w-52'>


        {/* Filter Heading */}
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS

          <img
            src={assets.dropdown_icon}
            alt=''
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
          />
        </p>



        {/* ================== CATEGORY FILTER ================== */}

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 
          ${showFilter ? '' : 'hidden'} sm:block`}
        >

          <p className='font-medium text-sm mb-3'>CATEGORIES</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>


            {/* MEN */}
            <p className='flex gap-2'>
              <input
                type='checkbox'
                className='w-3'
                value={'Men'}
                onChange={toggleCategory}
              />
              MEN
            </p>


            {/* WOMEN */}
            <p className='flex gap-2'>
              <input
                type='checkbox'
                className='w-3'
                value={'Women'}
                onChange={toggleCategory}
              />
              WOMEN
            </p>


            {/* KIDS */}
            <p className='flex gap-2'>
              <input
                type='checkbox'
                className='w-3'
                value={'Kids'}
                onChange={toggleCategory}
              />
              KIDS
            </p>

          </div>
        </div>



        {/* ================== SUB-CATEGORY FILTER ================== */}

        <div
          className={`border border-gray-300 pl-5 py-3 my-5 
          ${showFilter ? '' : 'hidden'} sm:block`}
        >

          <p className='mb-3 text-sm font-medium'>TYPES</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>


            {/* TOPWEAR */}
            <p className='flex gap-2'>
              <input
                type='checkbox'
                className='w-3'
                value={'Topwear'}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>


            {/* BOTTOMWEAR */}
            <p className='flex gap-2'>
              <input
                type='checkbox'
                className='w-3'
                value={'Bottomwear'}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>


            {/* WINTERWEAR */}
            <p className='flex gap-2'>
              <input
                type='checkbox'
                className='w-3'
                value={'Winterwear'}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>

          </div>
        </div>

      </div>



      {/* ================== PRODUCTS SECTION ================== */}

      <div className='flex-1'>


        {/* Title & Sort */}
        <div className='flex justify-between text-sm sm:text-xl lg:text-2xl mb-4'>

          <Title text1={'ALL'} text2={'COLLECTIONS'} />


          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
            className='border border-gray-300 text-sm px-2'
          >

            <option value='relevent'>
              Sort by: Relevent
            </option>

            <option value='low-high'>
              Sort by: Low to High
            </option>

            <option value='high-low'>
              Sort by: High to Low
            </option>

          </select>
        </div>



        {/* Products Grid */}
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6'>

          {filterProducts.map((product) => (

            <ProductItem
              key={product._id}
              id={product._id}
              image={product.imageUrl}
              name={product.name}
              price={product.price}
            />

          ))}

        </div>

      </div>

    </div>
  );
}

export default Collection;
