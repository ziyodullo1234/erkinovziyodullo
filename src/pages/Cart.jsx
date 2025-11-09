import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart_items")) || [];
    setCart(saved);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter((p) => p.id !== id);
    setCart(updated);
    localStorage.setItem("cart_items", JSON.stringify(updated));
  };

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price.replace("$", "")),
    0
  );

  // ✅ Checkout tugmasi Checkout sahifasiga olib o‘tadi
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <motion.div
      className="cart-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="cart-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <button className="back-btn" onClick={() => navigate("/products")}>
          <ArrowLeft size={18} /> Ortga
        </button>
        <h2>🛒 Buyurtma maxsulot</h2>
      </motion.div>

      {cart.length === 0 ? (
        <motion.p
          className="empty-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          😢 Biror nima Buyurtma qiling!!
        </motion.p>
      ) : (
        <>
          <AnimatePresence>
            <div className="cart-items">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="cart-item"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <img src={item.img} alt={item.name} />
                  <div className="cart-info">
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                  </div>
                  <motion.button
                    className="remove-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          <motion.div
            className="cart-footer"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h3>Total: ${total.toFixed(2)}</h3>
            <motion.button
              className="checkout-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckout} // ✅ Endi Checkout sahifasiga yo‘naltiradi
            >
              Buyurtma qilish
            </motion.button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Cart;
