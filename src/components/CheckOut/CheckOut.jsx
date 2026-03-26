import axios from 'axios'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from "yup";
import { addAddress } from '../../Features/userAddresses';

export default function CheckOut() {
  const { cartItems } = useSelector((state) => state.cartSlice)
  const [isLoading, setLoading] = useState(false)


  let token = localStorage.getItem('token')
  let CheckoutSession = async (shippingAddress) => {
    try {
      setLoading(true)
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartItems?._id}?url=https://mesbah-ecommerce3.vercel.app/`, shippingAddress, {
        headers: {
          token
        }
      })
      console.log(data.session.url);
      location.href = data.session.url
      toast.success(data?.status)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      let message = error?.response?.data.message
      console.log(message);
    }
  }
  let validationSchema = yup.object().shape({

    details: yup.string().required("Details is required"),
    phone: yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone")
      .required("Phone is required"),
    city: yup.string().required("City is required")
  })
  let formik = useFormik({
    initialValues: {

      details: "",
      phone: "",
      city: ""
    }, onSubmit: CheckoutSession,
    validationSchema
  })
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto pt-8">


        {/* details */}
        <div className="relative z-0 w-full mb-5 px-8 ">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            type="text"
            name="details"
            id="details"
            placeholder=" "

            className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer"
          />
          <label
            htmlFor="details"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >

            Details
          </label>
        </div>
        {formik.errors.details && formik.touched.details && <p className='text-red-400 pb-2 font-sm pl-8'>{formik.errors.details}</p>}

        {/* phone */}
        <div className="relative z-0 w-full mb-5 px-8 ">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            type="text"
            name="phone"
            id="phone"
            placeholder=" "

            className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer"
          />
          <label
            htmlFor="phone"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
        </div>
        {formik.errors.phone && formik.touched.phone && <p className='text-red-400 pb-2 font-sm pl-8'>{formik.errors.phone}</p>}

        {/* city */}
        <div className="relative z-0 w-full mb-5 px-8 ">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            type="text"
            name="city"
            id="city"
            placeholder=" "

            className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer"
          />
          <label
            htmlFor="city"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            City
          </label>
        </div>
        {formik.errors.city && formik.touched.city && <p className='text-red-400 pb-2 font-sm pl-8'>{formik.errors.city}</p>}
        {isLoading ? (
          <button
            className="h-10 flex ml-8 justify-center items-center text-white bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow font-medium rounded-md text-sm px-4 focus:outline-none"
          >
            <Oval
              visible={true}
              height="30"
              width="30"
              color="#fff"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </button>
        ) : (
          <button
            type='submit'
            className="text-white ml-8 bg-blue-600 hover:bg-blue-700 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 focus:ring-4 focus:ring-blue-300 shadow font-medium rounded-md text-sm px-4 py-2.5 focus:outline-none"
          >
            Buy Now
          </button>
        )}

      </form>
    </>
  )
}
