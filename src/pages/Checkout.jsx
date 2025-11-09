import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/Checkout.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "Naqd",
  });
  const [loading, setLoading] = useState(false);

  // ✅ To‘g‘ri bot ma’lumotlaringiz
  const BOT_TOKEN = "7334947032:AAE7XNJ_UjENOKZksTvOEg_N4fNnmpIIEjg";
  const CHAT_ID = "-1002566851369";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ To‘g‘ri saqlangan savatcha nomi
    const cart = JSON.parse(localStorage.getItem("cart_items")) || [];

    if (cart.length === 0) {
      toast.error("🛒 Savatchangiz bo‘sh!");
      setLoading(false);
      return;
    }

    const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

    const message = `
🛍 <b>Yangi Buyurtma!</b>

👤 <b>Ism:</b> ${form.name}
📞 <b>Telefon:</b> ${form.phone}
🏠 <b>Manzil:</b> ${form.address}
💳 <b>To‘lov turi:</b> ${form.payment}

🧾 <b>Buyurtma ro‘yxati:</b>
${cart.map((item) => `• ${item.name} - $${item.price}`).join("\n")}

💰 <b>Jami summa:</b> $${total}
`;

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "HTML",
          }),
        }
      );

      if (res.ok) {
        toast.success("✅ Buyurtmangiz muvaffaqiyatli yuborildi!");
        localStorage.removeItem("cart_items");
        setTimeout(() => navigate("/"), 3000);
      } else {
        toast.error("❌ Telegramga yuborishda xatolik yuz berdi!");
      }
    } catch (error) {
      console.error("Telegram xatosi:", error);
      toast.error("⚠️ Tarmoq xatosi! Keyinroq urinib ko‘ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="checkout-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="checkout-title">💳 Buyurtma berish</h2>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>Ism</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ismingizni kiriting"
          required
        />

        <label>Telefon raqami</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+998901234567"
          required
        />

        <label>Manzil</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Manzilingizni kiriting"
          required
        />

        <label>To‘lov turi</label>
        <select
          name="payment"
          value={form.payment}
          onChange={handleChange}
        >
          <option value="Naqd">Naqd</option>
          <option value="Karta">Karta</option>
        </select>

        <motion.button
          type="submit"
          className="checkout-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? "⏳ Yuborilmoqda..." : "Buyurtma berish"}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default Checkout;
