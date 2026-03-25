import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


let initialState = {
  
    addresses: [],
    loading: false,
    error: null
  
}

let token = localStorage.getItem('token')
export let addAddress = createAsyncThunk('addresses/addAddress', async (values)=>{
    try {
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/addresses`, values,
    {
        headers:{
            token
        }
    })    
    console.log(data.data);
    return data.data
    } catch (error) {
        return rejectWithValue(error.response?.data)    }
})

let userAddressesSlice =createSlice(
    {
        name:'addresses',
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(addAddress.pending , (state , action)=>{
                state.loading = true
            })
            builder.addCase(addAddress.fulfilled , (state , action)=>{
                state.loading = false
                state.addresses = action.payload
            })
            builder.addCase(addAddress.rejected , (state , action)=>{
                state.loading = false
                state.error = action.payload
            })
        }
    }
)
export default userAddressesSlice.reducer