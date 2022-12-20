import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [totalExchange, setTotalExchange] = useState('USD')
  const [currency, setCurrency] = useState(1)
  const [bannerIndex, setBannerIndex] = useState(0)
  const [slugProduct, setSlugProduct] =useState([])

  let foundProduct;

  useEffect(()=>{
    const data = window.localStorage.setItem(
      "currency",
      JSON.stringify(currency))
  }, [currency])
  useEffect(()=>{
    const data = window.localStorage.setItem(
      "exchange",
      JSON.stringify(totalExchange))
  }, [totalExchange])
  useEffect(()=>{
    const data = window.localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems))
  }, [cartItems])


  const incQty = ()=>{
    setQty((prevQty) => prevQty+1)
  }
  const decQty = () =>{
    setQty((prevQty) =>{
      if (prevQty - 1 < 1) return 1
      return  prevQty -1 

    })
  }

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + +product.price * +quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + +quantity);
    if(checkProductInCart) {
      const filterCartItems = cartItems.filter((cartProduct) => cartProduct._id !== product._id)
      const changeCartItems = cartItems.filter((cartProduct) => cartProduct._id === product._id)
      changeCartItems[0].quantity = changeCartItems[0].quantity + quantity 
      setCartItems([...changeCartItems, ...filterCartItems]);
    } else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  } 
 


  const remove = (id) =>{
    const removed = cartItems.filter(item => item._id !== id)
    const deletedItem = cartItems.filter(item => item._id === id)
    setTotalPrice((prevTotalPrice) => prevTotalPrice - deletedItem[0].price * deletedItem[0].quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - deletedItem[0].quantity);
    setCartItems([...removed])
  }
  const toggleCartItemQuantities = (id, value) =>{
    let newCartItems = [... cartItems]
    foundProduct = cartItems.find(item => item._id === id)
    let index = cartItems.findIndex(item => item._id === id)
    if(value === 'inc'){
      foundProduct.quantity +=1
      newCartItems[index] = foundProduct
      setCartItems([...newCartItems])
      setTotalPrice (prevTotalPrice => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities +1)
    } else if (value === 'dec'){
      if (foundProduct.quantity >1){
        foundProduct.quantity -=1
        newCartItems[index] = foundProduct
        setCartItems([...newCartItems])
        setTotalPrice (prevTotalPrice => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  return (
    <Context.Provider
      value={{
        totalExchange,
        setTotalExchange,
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        setQty,
        currency,
        setCurrency,
        bannerIndex,
        setBannerIndex,
        slugProduct, setSlugProduct,
        incQty,
        decQty,
        onAdd,
        remove,
        toggleCartItemQuantities,
        

      }}
    >
      {children}
    </Context.Provider>
  );
};


export const useStateContext = () => useContext(Context)

