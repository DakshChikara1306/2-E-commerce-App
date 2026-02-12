import { createContext, use, useEffect, useState } from "react"; 
import axios from "axios";
import { toast } from "react-toastify";
export const ShopContext = createContext(null); 
import { useNavigate } from 'react-router-dom';


const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const[cartItems, setCartItems] = useState({});
    const navigate = useNavigate(); 
    const[products , setProducts] = useState([]);
    const[token, setToken] = useState(localStorage.getItem('token') || null);


    const addToCart = async( itemId , size)=>{
        if(!size){
            toast.error("Please select a size before adding to cart.");
            return;
        }
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if(token){
          try{
            await axios.post(
              backendUrl + '/api/cart/add', {itemId, size}, {
                headers: {
                  token,
                },
              }
            );
          }
          catch(error){
            console.log(error);
            toast.error(error.response.data.message);
          }
        }
    }
    useEffect(() => {
        console.log(cartItems); 
    }, [cartItems]);

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalCount += cartItems[items][item];
                    }   
                } catch(e){

                }
            }
        }   
        return totalCount;
    }


    const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + '/api/cart/update',
          {
            itemId,
            size,
            quantity,
          },
          {
            headers: {
              token,
            },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

   const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      const productInfo = products.find((product) => product._id === item);
      if (productInfo) {
        for (const size in cartItems[item]) {
          try {
            if (cartItems[item][size] > 0) {
              totalAmount += productInfo.price * cartItems[item][size];
            }
          } catch (error) {
            console.log('error', error);
          }
        }
      }
    }
    return totalAmount;
  };

  const getsProductsData = async () => {
    try{
        const response = await axios.get(
  backendUrl + '/api/product/list',
);
console.log("Response from products list API:", response.data);
console.log("BACKEND URL =", backendUrl);

        if(response.data.success){
            setProducts(response.data.products);
        }else{
            toast.error(response.data.message || "Error fetching products data");
        } 


    }catch(e){

        console.log("Error while fetching products data", e);
        toast.error("Error while fetching products data");
    }
  }

  const getUserCart = async (token) => {
    try{
      const response = await axios.get(
        backendUrl + '/api/cart/get',
        {
          headers: {
            token,
          },
        }
      );
      if(response.data.success){
        setCartItems(response.data.cart);
      }else{
        toast.error(response.data.message || "Error fetching cart data");
      }

    }catch(e){
      console.log("Error while fetching cart data", e);
      toast.error("Error while fetching cart data");

    }
  }
  useEffect(()=>{
    getsProductsData();
  },[])

   useEffect(() => {
  if (token) {
    getUserCart(token);
  }
}, [token]);


    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        setCartItems,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
