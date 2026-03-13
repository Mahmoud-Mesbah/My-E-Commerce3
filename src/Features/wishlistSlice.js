import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast"
import { getUserCart } from "./cartSlice"


let initialState = {
    wishlist: [],
    loading: false,
    error: null
}
const token = localStorage.getItem('token')
export let getUserWishlist = createAsyncThunk('wishlist/getUserWishlist', async () => {
    try {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers: {
                token
            }
        })
        console.log(data.data);
        return data.data
    } catch (error) {
        console.log(error);
    }
})
export let addToWishlist = createAsyncThunk('wishlist/addToWishlist', async (productId) => {
    try {
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            productId
        }, {
            headers: {
                token
            }
        })
        console.log(data.data);
        return data.data
    } catch (error) {
        console.log(error);
    }
})
export let removeFromWishlist = createAsyncThunk('wishlist/removeFromWishlist', async (productId) => {
    try {
        let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers: {
                token
            }
        })
        console.log(data.data);
        return data.data
    } catch (error) {
        console.log(error);
    }
})

let wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: '',
    extraReducers: (buider) => {
        buider.addCase(getUserWishlist.pending, (state) => {
            state.loading = true
        })
        buider.addCase(getUserWishlist.fulfilled, (state, action) => {
            state.loading = false
            state.wishlist = action.payload
          
        })
        buider.addCase(getUserWishlist.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        buider.addCase(addToWishlist.pending, (state) => {
            state.loading = true
        })
        buider.addCase(addToWishlist.fulfilled, (state, action) => {
            state.loading = false
            state.wishlist = action.payload
            
        })
        buider.addCase(addToWishlist.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        buider.addCase(removeFromWishlist.pending, (state) => {
            state.loading = true
        })
        buider.addCase(removeFromWishlist.fulfilled, (state, action) => {
            state.loading = false
            state.wishlist = action.payload
            
        })
        buider.addCase(removeFromWishlist.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default wishlistSlice.reducer