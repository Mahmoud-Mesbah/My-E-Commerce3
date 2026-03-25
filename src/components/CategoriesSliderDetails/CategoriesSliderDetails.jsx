import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function CategoriesSliderDetails() {
    const [category, setCategory] = useState('')
    let { id } = useParams()

    let getSpecificCategory = async () => {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
            console.log(data.data);
            setCategory(data.data)
        } catch (error) {
            console.log(response.data.message);
        }
    }

    useEffect(() => {
        getSpecificCategory()
    }, [])


    console.log(id);
    return (
        <>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group">

                {/* Image */}
                <div className="overflow-hidden">
                    <img
                        src={category.image}
                        alt={category.name}
                        className="w-full md:h-100 object-center group-hover:scale-110 transition duration-300"
                    />
                </div>

                {/* Content */}
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        {category.name}
                    </h2>

                    <p className="text-sm text-gray-500 mb-1">
                        Slug: {category.slug}
                    </p>

                    <p className="text-xs text-gray-400">
                        Created: {new Date(category.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </>
    )
}
