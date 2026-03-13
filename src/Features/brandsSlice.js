import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


let initialState = {
    brands : [],
    brand:'',
    loading : false,
    error : null
}

export let getAllBrands = createAsyncThunk('brands/getAllBrands',async ()=>{
    try {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        
        console.log(data.data);
        return data.data
    } catch (error) {
        console.log(error);
    }
})

export let getSpecificBrand = createAsyncThunk('brands/getSpecificBrand',async(brandId)=>{
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
    console.log(data.data);
    return data.data
})

let brandsSlice = createSlice({
    name:'brands',
    initialState,
    reducers:'',
    extraReducers:(builder)=>{
        builder.addCase(getAllBrands.pending,(state)=>{
            state.loading= true
        })
        builder.addCase(getAllBrands.fulfilled,(state,action)=>{
            state.loading=false
            state.brands=action.payload
        })
        builder.addCase(getAllBrands.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        builder.addCase(getSpecificBrand.pending,(state)=>{
            state.loading= true
        })
        builder.addCase(getSpecificBrand.fulfilled,(state,action)=>{
            state.loading=false
            state.brand=action.payload
        })
        builder.addCase(getSpecificBrand.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    }
}
)

export default brandsSlice.reducer