import React, { useEffect } from 'react'
import { Oval } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllBrands } from '../../Features/brandsSlice'

export default function Brands() {
  let { brands, loading } = useSelector((state) => state.brandsSlice)
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllBrands())
  }, [dispatch])

  return (<>
    {loading?<div className='h-screen flex justify-center items-center'>
          <Oval
            visible={true}
            height="60"
            width="60"
            color="#fff"
            ariaLabel="oval-loading"
          />
        </div>:<div className="container mx-auto p-5 grid gap-6
grid-cols-1 
sm:grid-cols-2 
md:grid-cols-3 
lg:grid-cols-4 
xl:grid-cols-5">

      {brands?.map((item) => (
        <Link to={`/brandDetails/${item._id}`} ><div key={item._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col items-center text-center">

        <img
          src={item.image}
          alt={item.name}
          className="w-32 h-32 object-contain mb-4"
        />

        <h3 className="text-lg font-semibold text-gray-800">
          {item.name}
        </h3>

        <p className="text-sm text-gray-500">
          {item.slug}
        </p>

      </div></Link>
      ))}

    </div>}
  </>
  )
}
