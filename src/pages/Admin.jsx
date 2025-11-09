import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // 🔹 animatsiyalar uchun

const ADMIN_PASSWORD = "admin123"; // ← parol

function Admin() {
  const [authorized, setAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [products, setProducts] = useState([]);

  // form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  // 🔹 localStorage dan yuklash
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("custom_products")) || [];
    setProducts(saved);
  }, []);

  // 🔹 parol kiritish
  const handleAuth = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthorized(true);
      setPasswordInput("");
    } else {
      alert("Noto‘g‘ri parol");
    }
  };

  // 🔹 rasm tanlash
  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setImageFile(null);
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    setImageFile(file);
  };

  // 🔹 file -> base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      if (!file) resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  // 🔹 mahsulot qo‘shish
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Mahsulot nomini kiriting");
    if (!price || isNaN(Number(price))) return alert("To‘g‘ri narx kiriting");

    setSaving(true);
    try {
      const imgData = await fileToBase64(imageFile);

      const newProduct = {
        id: Date.now(),
        name: name.trim(),
        price: Number(price),
        category: category || "Uncategorized",
        img: imgData,
      };

      const saved = JSON.parse(localStorage.getItem("custom_products")) || [];
      const updated = [newProduct, ...saved];
      localStorage.setItem("custom_products", JSON.stringify(updated));
      setProducts(updated);

      // 🔹 avtomatik ravishda Products sahifasida chiqadi, chunki localStorage dan olinadi

      // tozalash
      setName("");
      setPrice("");
      setCategory("Uncategorized");
      setImageFile(null);
      setPreview(null);

      alert("✅ Mahsulot qo‘shildi");
    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi. Qayta urinib ko‘ring.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Haqiqatan o‘chirmoqchimisiz?")) return;
    const updated = products.filter((p) => p.id !== id);
    localStorage.setItem("custom_products", JSON.stringify(updated));
    setProducts(updated);
  };

  // 🔹 LOGIN sahifasi (animatsiya bilan)
  if (!authorized) {
    return (
      <div style={styles.wrap}>
        <AnimatePresence>
          <motion.div
            style={styles.box}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 style={{ marginBottom: 8 }}>🔐 Admin kirish</h2>
            <form onSubmit={handleAuth} style={{ width: "100%" }}>
              <input
                type="password"
                placeholder="Parol"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                style={styles.input}
              />
              <button style={styles.button} type="submit">
                Kirish
              </button>
            </form>
            <p style={{ marginTop: 12, color: "#666", fontSize: 14 }}>
              Parolni o‘zgartirish uchun: <code>ADMIN_PASSWORD</code> ni tahrirlang.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.div
      style={styles.wrap}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={{ ...styles.box, maxWidth: 900 }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <h2 style={{ margin: 0 }}>⚙️ Admin panel — Mahsulot qo‘shish</h2>
          <button
            onClick={() => {
              setAuthorized(false);
              setPasswordInput("");
            }}
            style={{ ...styles.button, background: "#ddd", color: "#111" }}
          >
            Chiqish
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleAddProduct} style={{ marginTop: 16 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <input
              placeholder="Mahsulot nomi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ ...styles.input, flex: 1, minWidth: 220 }}
            />
            <input
              placeholder="Narx (raqam)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ ...styles.input, width: 140 }}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ ...styles.input, width: 200 }}
            >
              <option>Uncategorized</option>
              <option>Shoes</option>
              <option>Clothes</option>
              <option>Accessories</option>
              <option>Tech</option>
            </select>
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 12, alignItems: "center" }}>
            <label style={styles.fileLabel}>
              📁 Rasm yuklash
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>

            {preview ? (
              <motion.div
                style={{ display: "flex", alignItems: "center", gap: 12 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={preview}
                  alt="preview"
                  style={{
                    width: 90,
                    height: 70,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #eee",
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setImageFile(null);
                  }}
                  style={{ ...styles.button, background: "#f3f3f3", color: "#111" }}
                >
                  O‘chirish
                </button>
              </motion.div>
            ) : (
              <div style={{ color: "#666", fontSize: 14 }}>Hech qanday rasm tanlanmadi</div>
            )}
          </div>

          <div style={{ marginTop: 14 }}>
            <button type="submit" disabled={saving} style={styles.button}>
              {saving ? "Saqlanmoqda..." : "Mahsulot qo‘shish"}
            </button>
          </div>
        </form>

        {/* MAHSULOTLAR */}
        <div style={{ marginTop: 24 }}>
          <h3>Qo‘shilgan mahsulotlar</h3>
          {products.length === 0 ? (
            <p style={{ color: "#666" }}>Hech qanday maxsulot qo‘shilmagan</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 12,
                marginTop: 12,
              }}
            >
              <AnimatePresence>
                {products.map((p) => (
                  <motion.div
                    key={p.id}
                    style={{
                      border: "1px solid #eee",
                      padding: 12,
                      borderRadius: 10,
                      background: "#fff",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      style={{
                        height: 120,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 8,
                      }}
                    >
                      {p.img ? (
                        <img
                          src={p.img}
                          alt={p.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "cover",
                            borderRadius: 6,
                          }}
                        />
                      ) : (
                        <div style={{ color: "#999" }}>Rasm yo‘q</div>
                      )}
                    </div>
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <div style={{ color: "#555", marginBottom: 8 }}>${p.price}</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(JSON.stringify(p))
                        }
                        style={{
                          ...styles.button,
                          background: "#f3f3f3",
                          color: "#111",
                        }}
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        style={{
                          ...styles.button,
                          background: "#ffecec",
                          color: "#b51a1a",
                        }}
                      >
                        O‘chirish
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

const styles = {
  wrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 24,
    background: "linear-gradient(135deg, #e8f0ff, #f5f7fa)",
  },
  box: {
    width: "100%",
    maxWidth: 980,
    background: "#fafafa",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  input: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #e6e6e6",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    transition: "0.3s",
  },
  fileLabel: {
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px dashed #ccc",
    cursor: "pointer",
    color: "#333",
    background: "#fff",
  },
};

export default Admin;
