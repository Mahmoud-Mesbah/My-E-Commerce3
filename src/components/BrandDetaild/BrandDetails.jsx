import React, { useEffect } from 'react'
import { Oval } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getSpecificBrand } from '../../Features/brandsSlice';

export default function BrandDetails() {
    let { id } = useParams()
    console.log(id);
    let { brand, loading } = useSelector((state) => state.brandsSlice)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSpecificBrand(id))
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
            </div> : <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-5 text-center flex flex-col items-center">

                <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-28 h-28 object-contain mb-4 transition duration-300 hover:scale-110"
                />

                <h2 className="text-lg font-semibold text-gray-800">
                    {brand.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    {brand.slug}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                    {new Date(brand.createdAt).toLocaleDateString()}
                </p>

            </div>}
        </>
    )
}
