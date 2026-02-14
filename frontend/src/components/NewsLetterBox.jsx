// ================== COMPONENT ==================

const NewsLetterBox = () => {


  // ================== FORM SUBMIT HANDLER ==================

  const onSubmitHandler = (e) => {

    e.preventDefault();

    // Show success message
    alert('Subscribed successfully!');

  };



  // ================== UI ==================

  return (

    <div className='text-center'>


      {/* ================== HEADING ================== */}

      <p className='text-2xl font-medium text-gray-800'>
        Subscribe now & get 20% off
      </p>


      {/* ================== SUBTEXT ================== */}

      <p className='text-gray-500 mt-3'>
        Be the first to know about new arrivals, sales & promos!
      </p>



      {/* ================== FORM ================== */}

      <form
        onSubmit={onSubmitHandler}
        className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'
      >


        {/* ================== EMAIL INPUT ================== */}

        <input
          type='email'
          placeholder='Enter your email'
          className='w-full sm:flex-1 outline-none'
          required
        />


        {/* ================== SUBMIT BUTTON ================== */}

        <button
          type='submit'
          className='bg-black text-white text-xs px-10 py-4'
        >
          Subscribe
        </button>

      </form>

    </div>
  );
};


// ================== EXPORT ==================

export default NewsLetterBox;
