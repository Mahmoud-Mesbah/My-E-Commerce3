import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setLoading, setError, setUserName } from "../../Features/userSlice";

export default function Register() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();

  async function register(values) {
    try {
      dispatch(setLoading(true));

      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      console.log(data);
      dispatch(setUserName(data.user.name))
      dispatch(setToken(data.token));
      toast.success('Successfully registered!');
      navigate('/home');

    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch(setError(message));
    
    } finally {
      dispatch(setLoading(false));
    }
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required").min(3, 'min is 3').max(20, 'max is 20'),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required").matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Invalid password ex: Mahmoud@123'
    ),
    rePassword: yup.string().required("Re-password is required").oneOf([yup.ref('password')], 'Password and re-password do not match'),
    phone: yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, 'We want an Egyptian phone'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: register
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto pt-8">

        {/* Name */}
        <div className="relative z-0 w-full mb-5 px-8 ">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            type="text"
            name="name"
            id="name"
            placeholder=" "
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer"
          />
          <label
            htmlFor="name"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        {formik.errors.name && formik.touched.name && <p className='text-red-400 pb-2 font-sm pl-8'>{formik.errors.name}</p>}

        {/* Email */}
        <div className="relative z-0 w-full mb-5 px-8">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
            placeholder=" "
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer"
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        {formik.errors.email && formik.touched.email && <p className='text-red-400 pb-2 font-sm pl-8'>{formik.errors.email}</p>}

        {/* Password */}
        <div className="relative z-0 w-full mb-5 px-8">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
            placeholder=" "
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer"
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password && <p className='text-red-400 pb-2 font-sm pl-8'>{formik.errors.password}</p>}

        {/* Re-Password */}
        <div className="relative z-0 w-full mb-5 px-8">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            type="password"
            name="rePassword"
            id="rePassword"
            placeholder=" "
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer"
          />
          <label
            htmlFor="rePassword"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Re-Password
          </label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && <p className='text-red-400 pb-2 font-sm pl-8'>{formik.errors.rePassword}</p>}

        {/* Phone */}
        <div className="relative z-0 w-full mb-5 px-8">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            type="text"
            name="phone"
            id="phone"
            placeholder=" "
            required
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

        {/* Submit Button */}
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
            Register
          </button>
        )}
      </form>
    </>
  )
}