import React, { useEffect } from 'react'
import { Oval } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllCategories } from '../../Features/categoriesSlice'

export default function Categories() {
  let { loading, categories } = useSelector((state) => state.categoriesSlice)
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCategories())
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
        </div>:<div
        className="container mx-auto px-4 py-6
grid gap-6
grid-cols-1
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5"
      >

        {categories?.map((item) => (
          <Link to={`/categoriesDetails/${item._id}`}>
            <div className="bg-white text-5xl font-mono font-black rounded-xl h-40 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer p-5 text-center">

          <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
    
          <p className="text-sm text-gray-500">{item.slug}</p>
    
          <p className="text-xs text-gray-400 mt-1">
            Created: {new Date(item.createdAt).toLocaleDateString()}
          </p>
    
        </div></Link>
        ))}

      </div>}
    </>
  )
}
