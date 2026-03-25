import React, { useEffect } from 'react'
import { BsCart4 } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';
import { Oval } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { addProductToCart } from '../../Features/cartSlice';
import { getSpecificProduct } from '../../Features/productSlice';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Toaster } from 'react-hot-toast';
import { addToWishlist, removeFromWishlist } from '../../Features/wishlistSlice';

export default function ProductDetails() {
  let { id } = useParams()
  let { product, loading } = useSelector((state) => state.productSlice)
  let { wishlist } = useSelector((state) => state.wishlistSlice)
  let dispatch = useDispatch()
  let isInWishlist = wishlist?.includes(id)
  useEffect(() => {
    dispatch(getSpecificProduct(id))
  }, [dispatch, id])

  return (
    <>
      {loading ? (
        <div className='h-screen flex justify-center items-center'>
          <Oval
            visible={true}
            height="60"
            width="60"
            color="#fff"
            ariaLabel="oval-loading"
          />
        </div>
      ) : (
        <div className="bg-white md:h-90 rounded-lg shadow-lg overflow-hidden m-4 flex flex-col md:flex-row">


          <div className="w-full md:w-1/3 h-48 md:h-auto">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 2000, disableOnInteraction: true }}
              spaceBetween={10}
              slidesPerView={1}
              loop={false}
              className="h-full"
            >
              {(product.images && product.images.length > 0 ? product.images : [product.imageCover]).map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`Product Image ${index + 1}`}
                    className="w-full h-48 md:h-full object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="p-4 flex flex-col flex-1">
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 text-sm mb-2 flex-1">{product.description}</p>

            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-gray-900">{product.price} EGP</span>
              <span className="text-yellow-500 font-semibold">
                {"⭐".repeat(Math.round(product.ratingsAverage || 0))}
              </span>
            </div>

            <div className="mb-4">
              <span className="text-gray-700 font-medium">
                Available: {product.quantity || 0}
              </span>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <button
                onClick={() => dispatch(addProductToCart(product.id))}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white px-4 py-2 rounded transition"
              >
                <BsCart4 size={18} /> Add to Cart
              </button>
             {isInWishlist? <button
             onClick={()=>dispatch(removeFromWishlist(id))}
                className="p-2 rounded-full bg-red-500 hover:bg-red-300 transition text-white"
              >
                <FiHeart size={20} />
              </button>: <button
              onClick={()=>dispatch(addToWishlist(id))}
                className="p-2 rounded-full bg-gray-200 hover:bg-red-100 transition text-red-700"
              >
                <FiHeart size={20} />
              </button>}
            </div>
          </div> <Toaster
            position="top-center"
            reverseOrder={false}
          />
        </div>

      )}
    </>
  )
}