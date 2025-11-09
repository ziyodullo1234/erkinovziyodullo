import React from "react";
import { motion } from "framer-motion";
import "../styles/About.css";

function About() {
  return (
    <div className="about-container">
      {/* HEADER */}
      <motion.div
        className="about-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1>
          Biz haqimizda <span>ZiyoShop</span>
        </h1>
        <p>O‘zbekistonning ishonchli onlayn savdo manzili 🛍️</p>
      </motion.div>

      {/* MISSION */}
      <motion.div
        className="about-section"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>🎯 Bizning maqsadimiz</h2>
        <p>
          <strong>ZiyoShop</strong> — bu shunchaki onlayn do‘kon emas, balki
          sizning qulay va ishonchli xarid hamrohingiz. Biz xarid jarayonini
          soddalashtirish, tezlashtirish va yoqimli qilishga intilamiz.
        </p>
      </motion.div>

      {/* STORY */}
      <motion.div
        className="about-section"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>📖 Bizning tariximiz</h2>
        <p>
          2022-yilda yosh innovatorlar jamoasi tomonidan asos solingan{" "}
          <strong>ZiyoShop</strong> bugungi kunda minglab mijozlarga xizmat
          ko‘rsatib kelmoqda. Har bir mahsulot — bu sifat, ishonch va muhabbat
          bilan tanlangan buyum.
        </p>
      </motion.div>

      {/* HIGHLIGHTS */}
      <div className="about-highlights">
        {[
          {
            img: "https://cdn-icons-png.flaticon.com/512/2331/2331970.png",
            title: "Sifat birinchi o‘rinda",
            text: "Biz faqat sinovdan o‘tgan, yuqori sifatli mahsulotlarni taqdim etamiz.",
          },
          {
            img: "https://cdn-icons-png.flaticon.com/512/1040/1040230.png",
            title: "24/7 qo‘llab-quvvatlash",
            text: "Har doim siz bilan — savolingiz bo‘lsa, biz shu yerdamiz.",
          },
          {
            img: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
            title: "Innovatsiya yo‘lida",
            text: "Texnologiyalar orqali xarid qilishni yanada qulay qilamiz.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="highlight-card"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* TEAM */}
      <motion.div
        className="about-team"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>👥 Bizning jamoa</h2>
        <p>
          Har bir muvaffaqiyat ortida fidoyi dasturchilar, dizaynerlar va
          yetakchilar jamoasi turibdi. Biz siz uchun ishlaymiz!
        </p>
        <div className="team-photos">
          <motion.img
            whileHover={{ rotate: 5, scale: 1.1 }}
            src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
            alt="Team Member"
          />
          <motion.img
            whileHover={{ rotate: -5, scale: 1.1 }}
            src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
            alt="Team Member"
          />
          <motion.img
            whileHover={{ rotate: 5, scale: 1.1 }}
            src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
            alt="Team Member"
          />
        </div>
      </motion.div>

      {/* FOOTER */}
      <motion.div
        className="about-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2>💚 Nega bizni tanlashadi?</h2>
        <p>
          ✅ 10 000+ dan ortiq baxtli mijozlar  
          <br />✅ 100% xavfsiz to‘lov  
          <br />✅ Tez yetkazib berish  
          <br />✅ Qulay qaytarish va ishonchli xizmat
        </p>
        <p className="thank-you">
          Siz <strong>ZiyoShop</strong> oilasining bir qismisiz! 💫
        </p>
      </motion.div>
    </div>
  );
}

export default About;
