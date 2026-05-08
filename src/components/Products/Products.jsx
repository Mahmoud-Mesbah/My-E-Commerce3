import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../Features/productSlice';
import ProductCard from '../ProductCard/ProductCard';
import { Oval } from 'react-loader-spinner';

export default function Products() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { products, loading } = useSelector((state) => state.productSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const categories = [...new Set(products.map(p => p.category?.name || p.category))];

  const productsFilter = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchInput.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      product.category?.name === selectedCategory ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Filters Container */}
      <div className="mx-auto max-w-5xl px-4 mb-6 flex flex-col sm:flex-row gap-4 sm:items-center">

        {/* Search */}
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search Product by title"
          className="w-full sm:flex-1 p-3 border-b-2 text-purple-900 outline-none"
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-60 p-3 border-b-2 text-purple-900 outline-none bg-white"
        >
          <option value="all">All Categories</option>

          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

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
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsFilter.length > 0 ? (
            productsFilter.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
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