import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategoriesSlider } from '../../Features/categoriesSliderSlice'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from 'react-router-dom'

export default function CategoriesSlider() {

    const { categoriesSlider } = useSelector((state) => state.categoriesSliderSlice)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategoriesSlider())
    }, [dispatch])

    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        rtl: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 4 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 2 }
            }
        ]
    }

    return (
        <div className="container mx-auto py-8">

            <Slider  {...settings}>

                



                    {categoriesSlider?.map((cat) => (
                        <Link to={`/CategoriesSliderDetails/${cat._id}`}>
                        <div key={cat._id} >

                            <div className="bg-white shadow-md px-2 rounded-lg text-center hover:shadow-lg transition duration-300">

                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-32 object-cover rounded"
                                />

                                <h3 className="mt-3 text-black  by-4 hover:text-purple-500 font-semibold transition duration-300">
                                    {cat.name?.split(' ' , 1 ).join(' ')}..
                                </h3>

                            </div>

                        </div>
                        </Link>
                    ))}
                

            </Slider>

        </div>
    )
}