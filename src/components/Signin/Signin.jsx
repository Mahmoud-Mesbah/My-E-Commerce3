import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { setToken, setLoading, setError, setUserName } from '../../Features/userSlice';

export default function Signin() {
  const dispatch = useDispatch();
  const { isLoading, name } = useSelector((state) => state.userSlice);
  useEffect(() => {
    dispatch(setUserName(name))
  }, [dispatch])
  
  const navigate = useNavigate();

  async function signin(values) {
    try {
      dispatch(setLoading(true));

      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      dispatch(setUserName(data.user.name))
      dispatch(setToken(data.token));
      toast.success('Successfully logged in!');
      navigate('/home');

    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch(setError(message));
      

    } finally {
      dispatch(setLoading(false));
    }
  }

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required").matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Invalid password ex: Mahmoud@123'
    ),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: signin
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto pt-8">

        {/* Email */}
        <div className="relative z-0 w-full px-8 mb-5">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
            placeholder=" "
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent px-8 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer"
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        {formik.errors.email && formik.touched.email && <p className='text-red-400 pb-2  pl-8 font-sm'>{formik.errors.email}</p>}

        {/* Password */}
        <div className="relative z-0 w-full px-8 mb-5">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
            placeholder=" "
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent px-8 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer"
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password && <p className='text-red-400 pl-8  pb-2 font-sm'>{formik.errors.password}</p>}

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
            Sign In
          </button>
        )}
      </form>
    </>
  )
}