import React, {useRef, } from "react";
import Link from "next/link";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import {TiDeleteOutline} from 'react-icons/ti'
import toast from "react-hot-toast";
import { useStateContext } from "../../context/StateContext";
import {urlFor} from '../../lib/client'

const Cart = () => {
  const cartRef = useRef()
  const {totalPrice,totalQuantities, incQty, decQty, cartItems, setShowCart, totalExchange, remove, currency, toggleCartItemQuantities} = useStateContext();

  return (
  <div className="cart-wrapper" ref={cartRef} onClick={(e) => e.stopPropagation(setShowCart(false))}>
    <div className="cart-container">
      <button type="button" className="cart-heading" onClick={()=> setShowCart(false)}>
        <AiOutlineLeft />
        <span className="heading">Your Cart:</span>
        <span className="cart-num-items">({totalQuantities} items)</span>
      </button>
      {cartItems.length <1 ? 
      <div className="empty-cart">
        <AiOutlineShopping size={150} />
        <h3> Your shopping cart is empty.</h3>
        <Link href='/'>
          <button type="button" className="btn" onClick={()=> setShowCart(false)}>
            Continue Shopping
          </button>
        </Link>
        </div>
        :
      <div className="product-container">
        {cartItems.map((product, index) =>(
          <div key={product._id} className={'product'}>
            <img src={urlFor(product?.image[0])} className='cart-product-image'/>
            <div className="item-desc">
                <div className="flex top">
                  <h5>{product.name}</h5>
                  <h4>{product.price* currency} {totalExchange} </h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
              <span className="minus" onClick={()=>toggleCartItemQuantities(product._id, 'dec')}>
                <AiOutlineMinus />
              </span>
              <span className="num">{product.quantity}</span>
              <span className="plus" onClick={()=> toggleCartItemQuantities(product._id, 'inc')}>
                <AiOutlinePlus />
              </span>
            </p>
                    </div>
                    <button type="button" className="remove-item" onClick={()=>remove(product._id)}>
                      <TiDeleteOutline />
                    </button>
                  </div>
              </div>
            </div>
        ))}
      </div>
      }
      {cartItems.length >0 &&
      <div className="cart-bottom">
          <div className="total">
            <h3>Subtotal:</h3>
            <h3>{totalPrice * currency} {totalExchange} </h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={()=> console.log(1)}> Pay with stripe</button>
              </div>
        </div>
      }
    </div>
  </div>
)};

export default Cart;
