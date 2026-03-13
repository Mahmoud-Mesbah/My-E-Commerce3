import React from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../Features/cartSlice";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../../Features/wishlistSlice";

const ProductCard = ({ description, title, image, price, rate, id }) => {

  const { wishlist } = useSelector((state) => state.wishlistSlice)

  const dispatch = useDispatch()

  const isInWishlist = wishlist?.includes(id)

  return (
    <div className="group relative bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm mx-auto transition hover:shadow-xl">

      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-center transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-4 text-center">

        <h3 className="text-lg font-semibold text-gray-800">
          {title ? title.split(" ", 2).join(" ") : ""}...
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          {description ? description.split(" ", 3).join(" ") : ""}...
        </p>

        {/* Price & Rating */}
        <div className="flex items-center justify-between mt-3">

          <span className="text-lg font-bold text-purple-800">
            EGP {price}
          </span>

          <div className="flex items-center gap-1 text-yellow-400">
            <FaStar />
            <span className="text-gray-600 font-medium">{rate}</span>
          </div>

        </div>
      </div>

      {/* Side Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 flex flex-col gap-3 md:opacity-100 lg:opacity-0 lg:translate-x-10 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 transition-all duration-300 p-3">

        {/* Add To Cart */}
        <button
          onClick={() => dispatch(addProductToCart(id))}
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
        >
          <BsCart4 size={18} />
        </button>

        {/* Wishlist */}
        {isInWishlist ? (
          <button
            onClick={() => dispatch(removeFromWishlist(id))}
            className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition"
          >
            <FaHeart size={18} />
          </button>
        ) : (
          <button
            onClick={() => dispatch(addToWishlist(id))}
            className="bg-white text-red-500 border p-3 rounded-full hover:bg-red-50 transition"
          >
            <FaHeart size={18} />
          </button>
        )}

        {/* Show Details */}
        <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-black transition">
          <Link to={`/productDetails/${id}`}>
            <FiEye size={18} />
          </Link>
        </button>

      </div>

      <Toaster position="top-center" reverseOrder={false} />

    </div>
  );
};

export default ProductCard;