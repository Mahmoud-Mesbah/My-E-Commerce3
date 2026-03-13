import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Features/userSlice";
import productSlice from "./Features/productSlice";
import cartSlice from "./Features/cartSlice";
import brandsSlice from "./Features/brandsSlice";
import categoriesSlice from "./Features/categoriesSlice";
import categoriesSliderSlice from "./Features/categoriesSliderSlice"; 
import wishlistSlice from "./Features/wishlistSlice";
export const store = configureStore({
    reducer:{
        userSlice ,
        productSlice,
        cartSlice,
        brandsSlice,
        categoriesSlice,
        categoriesSliderSlice,
        wishlistSlice
    }
})