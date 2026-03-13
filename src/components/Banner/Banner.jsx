import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/pngtree-e-letter-logo-ecommerce-shop-store-design-png-image_4381099.png'

export default function Banner() {
    let navigate = useNavigate()
    let goShop= ()=>{
        navigate('/products')
    }
    return (
        <div className="relative w-full h-64 md:h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 overflow-hidden rounded-lg shadow-lg">
            {/* Background Image */}
            <div className="w-38"><img
                src={logo}
                alt="E-commerce Banner"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
            /></div>
            

            {/* Overlay Text */}
            <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-16 text-white">
                <h1 className="text-2xl md:text-5xl font-bold mb-2">
                    Welcome to E-Commerce
                </h1>
                <p className="text-sm md:text-lg mb-4 max-w-md">
                    Discover millions of products at unbeatable prices. Shop the latest tech, fashion, and more.
                </p>
                <button
                onClick={()=>goShop()} className="text-white bg-blue-600 hover:bg-blue-700 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 focus:ring-4 focus:ring-blue-300 shadow font-medium rounded-md text-sm px-4 py-2.5 focus:outline-none">
                    Shop Now
                </button>
            </div>
        </div>
    );
}