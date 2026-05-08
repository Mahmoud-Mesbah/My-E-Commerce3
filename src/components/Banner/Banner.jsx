import React from "react";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[70vh] md:h-screen overflow-hidden rounded-2xl shadow-2xl">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
        alt="E-commerce Banner"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-20 text-white max-w-3xl">

        <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-4">
          Discover & Shop Anything You Love
        </h1>

        <p className="text-sm md:text-lg text-gray-200 mb-6">
          Find the best products at unbeatable prices. Fast delivery, secure payment, and thousands of brands in one place.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="w-fit px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 shadow-lg font-semibold"
        >
          Start Shopping
        </button>

      </div>
    </div>
  );
}