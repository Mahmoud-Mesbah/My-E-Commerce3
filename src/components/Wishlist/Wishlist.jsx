import React, { useEffect } from 'react'
import { BsCart4 } from 'react-icons/bs'
import { FaStar, FaTrash } from 'react-icons/fa'
import { Oval } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProductToCart, getUserCart } from '../../Features/cartSlice'
import { getUserWishlist, removeFromWishlist } from '../../Features/wishlistSlice'

export default function Wishlist() {
  let { wishlist, loading } = useSelector((state) => state.wishlistSlice)
  let dispatch = useDispatch()

  useEffect(() => {

    dispatch(getUserWishlist())
    dispatch(getUserCart())
  }, [dispatch])

  return (
    <>
      {loading?<div className='h-screen flex justify-center items-center'>
          <Oval
            visible={true}
            height="60"
            width="60"
            color="#fff"
            ariaLabel="oval-loading"
          />
        </div>:<div className="container mx-auto px-4 py-10">

<h2 className="text-2xl font-bold mb-8 text-center">
  My Wishlist
</h2>

{wishlist.length === 0 ? (

  <div className="text-center text-gray-500 text-lg">
    Your wishlist is empty
  </div>

) : (

  <div className="grid gap-6 
sm:grid-cols-2 
md:grid-cols-3 
lg:grid-cols-4">

    {wishlist.map((product) => (

      <div
        key={product._id}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
      >


        {/* Content */}
        <div className="p-4">

          <Link to={`/productDetails/${product._id}`}>
            {/* Image */}
            <div className="overflow-hidden">

              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
              />

            </div>

            <h3 className="font-semibold text-gray-800 mb-2 hover:text-purple-700">
              {product.title?.split(" ").slice(0,2).join(" ")}
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              {product.description?.split("").slice(0, 20).join("")}...
            </p>
          </Link>



          {/* Price & Rating */}
          <div className="flex justify-between items-center mb-4">

            <span className="text-purple-700 font-bold">
              EGP {product.price}
            </span>

            <div className="flex items-center gap-1 text-yellow-400">
              <FaStar />
              <span className="text-gray-600 text-sm">
                {product.ratingsAverage}
              </span>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-between">

            <button
              onClick={() => dispatch(addProductToCart(product._id))}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:from-blue-500 hover:via-purple-700 hover:to-pink-800 transition text-white px-3 py-2 rounded-lg "
            >
              <BsCart4 />
              Cart
            </button>

            <button
              onClick={async() => {await dispatch(removeFromWishlist(product._id))
                await dispatch(getUserWishlist())}}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
            >
              <FaTrash />
            </button>

          </div>

        </div>

      </div>

    ))}

  </div>

)}

</div>}
    </>
  )
}
