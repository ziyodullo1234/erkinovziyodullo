import React from "react";
import { motion } from "framer-motion";
import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact-container">
      {/* HEADER */}
      <motion.div
        className="contact-header"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>📞 Biz bilan bog‘laning</h1>
        <p>
          Sizning fikringiz biz uchun juda muhim. Har qanday savol, taklif yoki
          hamkorlik uchun biz bilan bemalol aloqaga chiqing!
        </p>
      </motion.div>

      {/* INFO CARDS */}
      <motion.div
        className="contact-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="info-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <h3>📱 Telefon raqam</h3>
          <p>+998 95 057 10 17</p>
        </motion.div>

        <motion.div
          className="info-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <h3>📧 Elektron pochta</h3>
          <p>ziyodulloerkinov906@gmail.com</p>
        </motion.div>

        <motion.div
          className="info-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <h3>💬 Telegram</h3>
          <a
            href="https://t.me/erkinov_blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            @erkinov_blog
          </a>
        </motion.div>
      </motion.div>

      {/* MAP */}
      <motion.div
        className="contact-map"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2>📍 Joylashuvimiz</h2>
        <p>Andijon viloyati, Paxtaobod tumani</p>
        <iframe
          title="Andijon Paxtaobod"
          src="https://www.google.com/maps?q=Andijon%20Paxtaobod&output=embed"
          loading="lazy"
        ></iframe>
      </motion.div>

      {/* FOOTER MESSAGE */}
      <motion.div
        className="contact-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p>
          💚 <strong>ZiyoShop</strong> — siz bilan har doim aloqadamiz!
          Ishonchingiz uchun tashakkur.
        </p>
      </motion.div>
    </div>
  );
}

export default Contact;
