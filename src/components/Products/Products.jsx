import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../Features/productSlice';
import ProductCard from '../ProductCard/ProductCard';
import { Oval } from 'react-loader-spinner';

export default function Products() {
  const [searchInput, setSearchInput] = useState(''); 

  const { products, loading } = useSelector((state) => state.productSlice)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
  }, []);

  const productsFilter = products.filter((product) =>
    product.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      {/* Search Input */}
      <div className="relative z-0 w-full mb-5 group mx-auto max-w-5xl">
        <input
          type="text"
          name="search"
          id="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="block text-purple-900 py-2.5 px-0 w-full text-lg text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
          placeholder="Search Product by title"
        />
        <label
          htmlFor="search"
          className="absolute text-sm text-purple-700 text-xl text-body duration-300 transform -translate-y-2 scale-50 top-4 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-80 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
        
        </label>
      </div>

      {/* Loader */}
      {loading ? (
        <div className='h-screen flex justify-center items-center'>
          <Oval
            visible={true}
            height="60"
            width="60"
            color="#fff"
            ariaLabel="oval-loading"
          />
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsFilter.length > 0 ? (
            productsFilter.map((product) => (
              <ProductCard
                key={product._id}
                id = {product._id}
                price={product.price}
                rate={product.ratingsAverage}
                image={product.imageCover}
                title={product.title}
                description={product.description}
              />
            ))
          ) : (
            <h2 className="col-span-full text-center text-gray-500">
              No products found
            </h2>
          )}
        </div>
      )}
    </>
  );
}