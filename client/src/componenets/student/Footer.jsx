import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Footer = () => {
  const { backendUrl, getToken } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const token = await getToken?.();
      const response = await fetch(`${backendUrl}/api/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Footer subscribe error:", error);
      setStatus("Network error. Try again later.");
    }
  };

  return (
    <footer className="bg-gray-900 md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
        
        {/* Logo + About */}
        <div className="flex flex-col md:items-start items-center w-full">
          <img
            src={assets.logo}
            alt="logo"
            className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer"
          />
          <h1 className="text-xl font-semibold text-white">DORMY</h1>
          <p className="mt-6 text-center md:text-left text-sm text-white/80">
            We are dedicated to empowering learners with high-quality resources
            and guidance to support every step of their journey.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-5">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/course-list">Courses</Link></li> {/* ✅ Added */}
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="font-semibold text-white mb-5">
            Subscribe to our newsletter
          </h2>
          <p className="text-sm text-white/80">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 pt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-500/30 bg-gray-800 text-gray-200 placeholder-gray-400 outline-none w-64 h-9 rounded px-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 w-24 h-9 text-white rounded"
            >
              Subscribe
            </button>
          </form>
          {status && <p className="mt-2 text-sm text-green-400">{status}</p>}
        </div>
      </div>

      <p className="py-4 text-center text-xs md:text-sm text-white/60">
        Copyright 2025 © Dormy | Mstack. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
