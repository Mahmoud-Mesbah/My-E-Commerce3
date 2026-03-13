import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

const initialState = {
    token: null|| localStorage.getItem('token'),
    isLoading: false,
    error: null,
    name: null
  }

const userSlice= createSlice({
    name:'auth' , 
    initialState,
    reducers:{
        setToken:(state, action)=>{
            state.token = action.payload
            localStorage.setItem('token', action.payload)
            
        },
        setLoading: (state,action)=>{
            state.isLoading = action.payload 
        },
        setError:(state , action)=>{
            state.error = action.payload
            toast.error(action.payload)
        },
        setUserName:(state,action)=>{
            state.name=action.payload
            console.log(action.payload);
        }
    }
})

export const {setToken, setError , setLoading,setUserName} = userSlice.actions ;
export default userSlice.reducer