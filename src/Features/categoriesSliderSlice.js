import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";



let initialState = {
    categoriesSlider: [],
    error: null,
    loading: false
}

export let getAllCategoriesSlider = createAsyncThunk('categorySlider/getAllCategoriesSlider', async () => {
    try {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        console.log(data.data);
        return data.data
    } catch (error) {
        console.log(error);
    }
})

let categoriesSliderSlice = createSlice({
    name:'categorySlider',
    initialState,
    reducers:'',
    extraReducers:(builder)=>{
        builder.addCase(getAllCategoriesSlider.pending , (state)=>{
            state.loading = true 
        })
        builder.addCase(getAllCategoriesSlider.fulfilled , (state , action)=>{
            state.loading = false
            state.categoriesSlider = action.payload
        })
        builder.addCase(getAllCategoriesSlider.rejected , (state , action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export default categoriesSliderSlice.reducer