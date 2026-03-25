import React from "react";
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../../assets/pngtree-e-letter-logo-ecommerce-shop-store-design-png-image_4381099.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 mt-5 text-gray-200 pt-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="flex flex-col space-y-4">
            <img src={logo} alt="Amazon Logo" className=" w-40" />
            <p className="text-gray-400 text-sm">
              E-Commerce is your one-stop online shop for millions of products.  
              Shop electronics, fashion, home goods, and more at unbeatable prices.
            </p>
            <div className="flex space-x-3 mt-2">
              <Link to={"https://www.facebook.com/share/1ZRNgjyJGq/"} className="hover:text-purple-600"><BsFacebook size={20} /></Link>
              <Link to={"https://x.com/MahmoudMes80419"} className="hover:text-purple-600"><BsTwitter size={20} /></Link>
              <Link to={"https://www.instagram.com/m_mesbah2?igsh=MTk5eTBkc2phYm4zMg=="} className="hover:text-purple-600"><BsInstagram size={20} /></Link>
              <Link to={"#"} className="hover:text-purple-600"><BsYoutube size={20} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-2 text-center">
            <h3 className="text-white font-semibold mb-2">Quick Links</h3>
            <Link to={"/home"} className="hover:text-purple-600 text-gray-400 text-sm">Home</Link>
            <Link to={"/products"} className="hover:text-purple-600 text-gray-400 text-sm">Products</Link>
            <Link to={"/brands"} className="hover:text-purple-600 text-gray-400 text-sm">Brands</Link>
            <Link to={"/categories"} className="hover:text-purple-600 text-gray-400 text-sm">Categories</Link>
          </div>

          {/* Customer Service */}


          {/* Newsletter / Info */}
          <div className="flex flex-col space-y-2 text-center">
            <h3 className="text-white font-semibold mb-2">Subscribe</h3>
            <p className="text-gray-400 text-sm">Get the latest deals and updates delivered to your inbox.</p>
            <div className="flex mt-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-3 py-2 rounded-l-md text-gray-900 focus:outline-none" 
              />
              <button className="text-white bg-blue-600 hover:bg-blue-700 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 focus:ring-4 focus:ring-blue-300 shadow font-medium rounded-md text-sm px-4 py-2.5 focus:outline-none">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
}