import React, { useEffect, useState } from "react";
import "../styles/Wishlist.css";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist_items")) || [];
    setItems(saved);
  }, []);

  const removeItem = (id) => {
    const updated = items.filter((it) => it.id !== id);
    setItems(updated);
    localStorage.setItem("wishlist_items", JSON.stringify(updated));
  };

  return (
    <motion.div className="wishlist-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="wishlist-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>
        <h2>💖 Like</h2>
      </div>

      {items.length === 0 ? (
        <p className="empty">yoqtirganlaringiz</p>
      ) : (
        <div className="wishlist-grid">
          <AnimatePresence>
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                className="wishlist-card"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
              >
                <img src={item.img} alt={item.name} />
                <div className="wish-info">
                  <h4>{item.name}</h4>
                  <p className="price">{item.price}</p>
                </div>
                <button className="remove-wish" onClick={() => removeItem(item.id)}>
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default Wishlist;
