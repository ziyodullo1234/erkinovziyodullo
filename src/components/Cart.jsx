import React, { useState, useEffect } from "react";
import "../styles/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // 🔹 LocalStorage'dan ma'lumot olish
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart_items")) || [];
    setCartItems(savedCart);
  }, []);

  // 🔹 Mahsulotni o‘chirish
  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart_items", JSON.stringify(updated));
  };

  // 🔹 Umumiy narx (raqamdan $ belgisi olib tashlaymiz)
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price.replace("$", "")),
    0
  );

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Buyurtmalaringzi</h1>

      {cartItems.length === 0 ? (
        <p className="empty"> Narsa buyurtma qilmadingiz 😔</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.img} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>
                  ❌ O'chirish
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="checkout-btn">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
