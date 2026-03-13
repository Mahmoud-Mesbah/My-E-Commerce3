import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, deleteProduct, getUserCart, updateProductCount } from '../../Features/cartSlice'

export default function Cart() {

  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cartSlice)

  useEffect(() => {
    dispatch(getUserCart())
  }, [])

  const totalPrice = cartItems?.reduce((acc, item) => {
    return acc + item.price * item.count
  }, 0)

  return (
    <>

      <div className="container mx-auto p-5 space-y-4">

        {cartItems?.length > 0 ? (
          cartItems.map((item, index) => (

            <div key={item._id + index} className="flex flex-col md:flex-row items-center justify-between gap-4  rounded-lg p-4 shadow-sm">

              {/* Product Image */}
              <img
                src={item.product?.imageCover}
                alt={item.product?.title}
                className="w-28 h-28 object-cover rounded"
              />

              {/* Product Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-semibold text-lg">{item.product?.title}</h3>
                <p className="text-purple-600 font-bold">
                  {item.price * item.count} EGP
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">

                {item.count > 1 ? (
                  <button
                    onClick={() =>
                      dispatch(updateProductCount({
                        productId: item.product._id,
                        count: item.count - 1
                      }))
                    }
                    className="bg-gray-200 px-3 py-1 rounded text-lg"
                  >
                    -
                  </button>
                ) : (
                  <button className="bg-gray-200 px-3 py-1 rounded text-lg">-</button>
                )}

                <span className="font-bold text-lg">{item.count}</span>

                <button
                  onClick={() =>
                    dispatch(updateProductCount({
                      productId: item.product._id,
                      count: item.count + 1
                    }))
                  }
                  className="bg-gray-200 px-3 py-1 rounded text-lg"
                >
                  +
                </button>

              </div>

              
              <button
                onClick={() => dispatch(deleteProduct(item.product._id))}
                className="text-red-500 font-semibold"
              >
                Delete
              </button>

            </div>
          ))
        ) : (
          <h2 className="text-center text-gray-500 text-xl">
            Your cart is empty
          </h2>
        )}

      </div>

     
      {cartItems?.length > 0 && (

        <div className="container mx-auto mt-6 p-5  flex flex-col md:flex-row justify-between items-center gap-4">

          <h2 className="text-xl font-bold">
            Total: {totalPrice} EGP
          </h2>

          <button
            className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:from-blue-500 hover:via-purple-700 hover:to-pink-800 transition duration-300  text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Buy Now
          </button>

        </div>

      )}

      {cartItems?.length > 0 && (
        <h1
          onClick={() => dispatch(clearCart())}
          className='text-xl font-bold  text-red-500 text-center hover:text-red-700 mt-4'
        >
          <button>Clear Cart</button>
        </h1>
      )}

    </>
  )
}