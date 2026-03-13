import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
let initialState ={
    categories:[],
    loading : false ,
    error: null,
    category :''
}

export let getAllCategories = createAsyncThunk('categories/getAllCategories',async()=>{
    try {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)

        console.log(data.data);

        return data.data
    } catch (error) {
        console.log(error);
    }
})

export let getSpecificCategory=createAsyncThunk('categories/getSpecificCategory',async(catId)=>{
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${catId}`)
    console.log(data.data);
    return data.data
})
let categoriesSlice = createSlice({
    name:'categories',
    initialState,
    reducers:'',
    extraReducers:(builder)=>{
        builder.addCase(getAllCategories.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(getAllCategories.fulfilled,(state,action)=>{
            state.loading= false
            state.categories = action.payload
        })
        builder.addCase(getAllCategories.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(getSpecificCategory.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(getSpecificCategory.fulfilled,(state,action)=>{
            state.loading= false
            state.category = action.payload
        })
        builder.addCase(getSpecificCategory.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export default categoriesSlice.reducer