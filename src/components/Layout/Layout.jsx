import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { getUserCart } from '../../Features/cartSlice'
import { setUserName } from '../../Features/userSlice'
import Footer from '../Footer/Footer'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'

export default function Layout() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const {  name } = useSelector((state) => state.userSlice);
 
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserCart())
    dispatch(setUserName(name))
  }, [dispatch])
  let navigate = useNavigate

  return (
    <>
      <Navbar />
      <div className="container lg:px-4 mx-auto mt-22">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
