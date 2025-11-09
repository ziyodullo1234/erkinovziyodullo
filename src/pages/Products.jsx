import React, { useState, useEffect } from "react";
import "../styles/Products.css";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [wishlistIds, setWishlistIds] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // 🔹 qo‘shildi
  const navigate = useNavigate();

  const baseProducts = [
   
    { id: 3, name: "Casual T-shirt", category: "Clothes", price: "$35", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600" },
    { id: 4, name: "Classic Watch", category: "Accessories", price: "$99", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" },
    { id: 5, name: "Leather Backpack", category: "Accessories", price: "$89", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
   
    { id: 7, name: "Sunglasses", category: "Accessories", price: "$40", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600" },
    { id: 8, name: "Smartphone", category: "Tech", price: "$499", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600" },
    { id: 9, name: "Gaming Laptop", category: "Tech", price: "$1299", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600" },
   
  ];

  const categories = ["All", "Shoes", "Clothes", "Accessories", "Tech"];

  useEffect(() => {
    // 🔹 Wishlistni yuklash
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist_items")) || [];
    setWishlistIds(savedWishlist.map((it) => it.id));

    // 🔹 Admin qo‘shgan mahsulotlarni yuklash
    const customProducts = JSON.parse(localStorage.getItem("custom_products")) || [];

    // 🔹 format to‘g‘rilash (Admin narxni raqam sifatida saqlaydi)
    const formattedCustoms = customProducts.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category || "Uncategorized",
      price: `$${p.price}`,
      img: p.img || "https://via.placeholder.com/300x220?text=No+Image",
    }));

    // 🔹 Barchasini birlashtirish
    setAllProducts([...formattedCustoms, ...baseProducts]);
  }, []);

  const filtered = allProducts.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (item) => {
    const saved = JSON.parse(localStorage.getItem("cart_items")) || [];
    const exists = saved.find((p) => p.id === item.id);
    if (!exists) {
      const updated = [...saved, item];
      localStorage.setItem("cart_items", JSON.stringify(updated));
    }
    toast.success("🛒 Mahsulot savatchaga qo‘shildi!");
    setTimeout(() => navigate("/cart"), 700);
  };

  const toggleWishlist = (item) => {
    const saved = JSON.parse(localStorage.getItem("wishlist_items")) || [];
    const exists = saved.find((p) => p.id === item.id);

    let updated;
    if (exists) updated = saved.filter((p) => p.id !== item.id);
    else updated = [...saved, item];

    localStorage.setItem("wishlist_items", JSON.stringify(updated));
    setWishlistIds(updated.map((it) => it.id));

    if (!exists) toast.info("❤️ Yoqtirdingiz!");
  };

  const isInWishlist = (id) => wishlistIds.includes(id);

  return (
    <div className="products-wrapper">
      <motion.div
        className="header-bar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Qidirish"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-tabs">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`category-btn ${category === cat ? "active" : ""}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <h2 className="section-title">✨ Premium Maxsulotlar</h2>

      <div className="product-grid">
        <AnimatePresence>
          {filtered.length > 0 ? (
            filtered.map((p, i) => (
              <motion.div
                key={p.id}
                className="product-card"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="product-image">
                  <img
                    src={p.img}
                    alt={p.name}
                    onError={(e) => (e.target.src = "https://via.placeholder.com/300x220?text=No+Image")}
                  />
                </div>

                <div className="product-info">
                  <h3>{p.name}</h3>
                  <p className="price">{p.price}</p>
                </div>

                <div className="product-actions">
                  <button
                    className={`wishlist-btn ${isInWishlist(p.id) ? "active" : ""}`}
                    onClick={() => toggleWishlist(p)}
                  >
                    <Heart size={18} />
                  </button>

                  <motion.button
                    className="buy-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(p)}
                  >
                    <ShoppingCart size={18} /> buyurtma berish
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="no-results">😢 Maxsulot topilmadi!</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Products;
