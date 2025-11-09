import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <ShoppingCart className="logo-icon" />
        <h1>Erkinov Ziyodullo Shopping market</h1>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/cart" className="cart-link">🛒 Cart</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
