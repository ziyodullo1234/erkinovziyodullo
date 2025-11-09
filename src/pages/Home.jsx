import React, { useEffect } from "react";
import "../styles/Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom"; // ✅ qo‘shildi

const Home = () => {
  const navigate = useNavigate(); // ✅ qo‘shildi

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-text" data-aos="fade-right">
          <h1 className="animate-text">
            Welcome to <span>ShopZone</span> 🛍️
          </h1>
          <p className="subtitle">
            Discover amazing products and exclusive deals every day!
          </p>
          <button
            className="shop-btn"
            data-aos="zoom-in"
            data-aos-delay="200"
            onClick={() => navigate("/products")} // ✅ tugma bosilganda mahsulotlarga o‘tadi
          >
            Start Shopping
          </button>
        </div>

        <div className="hero-image" data-aos="fade-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
            alt="Shopping"
          />
        </div>
      </div>

      <div className="features">
        <div className="feature-card" data-aos="flip-left" data-aos-delay="100">
          <img
            src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
            alt="Delivery"
          />
          <h3>Fast Delivery</h3>
          <p>Get your items delivered to your door quickly and safely.</p>
        </div>

        <div className="feature-card" data-aos="flip-up" data-aos-delay="300">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png"
            alt="Support"
          />
          <h3>24/7 Support</h3>
          <p>Our team is always ready to help you anytime, anywhere.</p>
        </div>

        <div className="feature-card" data-aos="flip-right" data-aos-delay="500">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
            alt="Secure Payment"
          />
          <h3>Secure Payment</h3>
          <p>Shop confidently with our encrypted payment gateway.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
