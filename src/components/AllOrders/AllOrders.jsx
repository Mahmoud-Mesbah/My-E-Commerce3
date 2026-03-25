import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { Oval } from 'react-loader-spinner';

export default function AllOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  let token = localStorage.getItem('token')
  const { id } = jwtDecode(token);
  console.log(id);
  let getAllOrders = async () => {
    try {
      setLoading(true)
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      console.log(data);
      setOrders(data)
      setLoading(false)
    } catch (error) {

    }
  }

  useEffect(() => {
    getAllOrders()
  }, [id])


  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">All Orders</h1>

        {loading?<div className='h-screen flex justify-center items-center'>
          <Oval
            visible={true}
            height="60"
            width="60"
            color="#fff"
            ariaLabel="oval-loading"
          />
        </div>:<>
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg shadow-lg p-4 bg-white"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                  <h2 className="font-semibold text-lg">Order ID: {order.id}</h2>
                  <p className="text-sm text-gray-600 mt-1 sm:mt-0">
                    Payment:{" "}
                    <span
                      className={`font-semibold ${order.isPaid ? "text-green-600" : "text-red-500"
                        }`}
                    >
                      {order.isPaid ? "Paid" : "Not Paid"}
                    </span>
                  </p>
                  <p className="text-lg font-semibold mt-1 sm:mt-0">
                    Total: {order.totalOrderPrice} EGP
                  </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.cartItems.map((item, index) => (
                    <div
                    key={item.productId + "-" + index}
                      className="flex items-center gap-4 p-3 border rounded-lg hover:shadow-md transition"
                    >
                      <img
                        src={item.imageCover || item.product?.imageCover || "/fallback.jpg"}
                        alt={item.name || item.product?.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.count}
                        </p>
                        <p className="text-sm font-semibold">
                          Price: {item.price * item.count} EGP
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <p>Delivery: {order.isDelivered ? "Delivered" : "Pending"}</p>
                  <p>Payment Method: {order.paymentMethodType}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">No orders found</p>
        )}
        </>}
      </div>
    </>
  )
}
