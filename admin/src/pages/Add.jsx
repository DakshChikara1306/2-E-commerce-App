// ================== IMPORTS ==================

import React, { useState } from 'react';

import assets from '../assets/assets.js';

import axios from 'axios';

import { backendUrl } from '../App.jsx';

import { toast } from 'react-toastify';


// ================== COMPONENT ==================

const Add = ({ token }) => {


  // ================== STATES ==================

  // Images
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // Product details
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [isBestSeller, setIsBestSeller] = useState(false);



  // ================== SUBMIT HANDLER ==================

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    try {

      // ================== FORM DATA ==================

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("isBestSeller", isBestSeller);

      // Images
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);



      // ================== API CALL ==================

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );



      // ================== SUCCESS ==================

      if (response.data.success) {

        toast.success(response.data.message);

        // Reset form
        setName("");
        setDescription("");
        setCategory("Men");
        setSubCategory("Topwear");
        setPrice("");
        setSizes([]);
        setIsBestSeller(false);

        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);

      } else {

        toast.error(response.data.message || "Error adding product");
      }

    } catch (err) {

      // ================== ERROR ==================

      console.error("ERROR RESPONSE =", err.response?.data);
      console.error("STATUS =", err.response?.status);

    }
  };



  // ================== UI ==================

  return (

    <form onSubmit={onSubmitHandler} className='p-5 flex flex-col gap-3 w-full items-start'>


      {/* ================== IMAGE UPLOAD ================== */}

      <div>

        <p className='mb-2'>Upload Image</p>

        <div className='flex gap-2'>


          {/* IMAGE 1 */}
          <label htmlFor='image1'>
            <img
              className='w-20 cursor-pointer'
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=''
            />
            <input
              type='file'
              id='image1'
              hidden
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>


          {/* IMAGE 2 */}
          <label htmlFor='image2'>
            <img
              className='w-20 cursor-pointer'
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=''
            />
            <input
              type='file'
              id='image2'
              hidden
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>


          {/* IMAGE 3 */}
          <label htmlFor='image3'>
            <img
              className='w-20 cursor-pointer'
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=''
            />
            <input
              type='file'
              id='image3'
              hidden
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>


          {/* IMAGE 4 */}
          <label htmlFor='image4'>
            <img
              className='w-20 cursor-pointer'
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=''
            />
            <input
              type='file'
              id='image4'
              hidden
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>

        </div>

      </div>



      {/* ================== PRODUCT NAME ================== */}

      <div className='w-full'>

        <p className='mb-2'>Product Name</p>

        <input
          type='text'
          required
          placeholder='Type here'

          value={name}
          onChange={(e) => setName(e.target.value)}

          className='w-full max-w-[500px] px-3 py-2'
        />

      </div>



      {/* ================== PRODUCT DESCRIPTION ================== */}

      <div className='w-full'>

        <p className='mb-2'>Product Description</p>

        <textarea
          required
          placeholder='Write content here'

          value={description}
          onChange={(e) => setDescription(e.target.value)}

          className='w-full max-w-[500px] px-3 py-2'
        />

      </div>



      {/* ================== CATEGORY + PRICE ================== */}

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>


        {/* CATEGORY */}
        <div>

          <p className='mb-2'>Product Category</p>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full px-3 py-2'
          >
            <option value='Men'>Men</option>
            <option value='Women'>Women</option>
            <option value='Kids'>Kids</option>
          </select>

        </div>



        {/* SUB CATEGORY */}
        <div>

          <p className='mb-2'>Product Sub category</p>

          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className='w-full px-3 py-2'
          >
            <option value='Topwear'>Topwear</option>
            <option value='Bottomwear'>Bottomwear</option>
            <option value='Winterwear'>Winterwear</option>
          </select>

        </div>



        {/* PRICE */}
        <div>

          <p className='mb-2'>Product Price</p>

          <input
            type='number'
            required
            placeholder='2500'

            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}

            className='w-full sm:w-[120px] px-3 py-2'
          />

        </div>

      </div>



      {/* ================== SIZES ================== */}

      <div>

        <p className='mb-2'>Product Sizes</p>

        <div className='flex gap-3'>


          {/* SIZES BUTTONS */}
          {["S", "M", "L", "XL", "XXL"].map((size) => (

            <div
              key={size}
              onClick={() =>
                setSizes(prev =>
                  prev.includes(size)
                    ? prev.filter(item => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${sizes.includes(size)
                  ? "bg-slate-800 text-white"
                  : "bg-slate-200"
                  } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>

          ))}

        </div>

      </div>



      {/* ================== BESTSELLER ================== */}

      <div className='flex items-center gap-2 mt-5'>

        <input
          type='checkbox'
          id='bestseller'

          checked={isBestSeller}
          onChange={() => setIsBestSeller(prev => !prev)}

          className='w-3 h-3 cursor-pointer'
        />

        <label htmlFor='bestseller' className='cursor-pointer'>
          Add to Bestseller
        </label>

      </div>



      {/* ================== SUBMIT ================== */}

      <button
        type='submit'
        className='bg-gray-800 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer mt-5'
      >
        Add Product
      </button>


    </form>
  );
};

export default Add;
