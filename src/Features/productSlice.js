import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    products: [],
    loading: false,
    error: null,
    product:''
}

export let getAllProducts = createAsyncThunk("products/getAllProducts", async () => {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    console.log(data.data);
    return data.data
})
export let getSpecificProduct = createAsyncThunk("products/getSpecificProduct", async (productId) => {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
    console.log(data.data);
    return data.data

})
let productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: '',
    extraReducers: (builder) => {

        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(getSpecificProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getSpecificProduct.fulfilled, (state, action) => {
            state.loading = false
            state.product = action.payload
        })
        builder.addCase(getSpecificProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })



    }
})

export default productSlice.reducer