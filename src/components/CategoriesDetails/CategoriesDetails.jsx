import React, { useEffect } from 'react'
import { Oval } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSpecificCategory } from '../../Features/categoriesSlice'

export default function CategoriesDetails() {
    let { id } = useParams()
    let { loading, category } = useSelector((state) => state.categoriesSlice)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSpecificCategory(id))

    }, [dispatch])

    return (
        <>
            {loading ? <div className='h-screen flex justify-center items-center'>
                <Oval
                    visible={true}
                    height="60"
                    width="60"
                    color="#fff"
                    ariaLabel="oval-loading"
                />
            </div> : <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer p-5 text-center">




                <h2 className="text-lg font-semibold text-gray-800">{category.name}</h2>

                <p className="text-sm text-gray-500">{category.slug}</p>

                <p className="text-xs text-gray-400 mt-1">
                    Created: {new Date(category.createdAt).toLocaleDateString()}
                </p>

            </div>}
        </>
    )
}
