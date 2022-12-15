import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href={"/"}> Toys</Link>
      </p>
      <button type="button" className="cart-icon" onClick={() => alert(1)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">1</span>
      </button>
    </div>
  );
};

export default Navbar;
