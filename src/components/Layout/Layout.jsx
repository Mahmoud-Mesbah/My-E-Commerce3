import React, { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import { Outlet} from 'react-router-dom'
import { getUserCart } from '../../Features/cartSlice'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export default function Layout() {

  const token = localStorage.getItem('token')

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserCart())

  }, [dispatch])

  return (
    <>
      
      <Navbar />
      <div className="container lg:px-4 mx-auto mt-22">
        <Outlet />
      </div>

      {token && <Footer />}
      

    </>
  )
}