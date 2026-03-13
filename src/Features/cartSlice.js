import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast"

let initialState = {
    cartItems: [],
    loading: false,
    error: null,
}

const token = localStorage.getItem('token')

export let getUserCart = createAsyncThunk('cart/getUserCart', async () => {

    try {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token
            }
        })
        console.log(data.data.products);
        return data.data.products
    } catch (error) {
        console.log(error);
    }
})
export let addProductToCart = createAsyncThunk('cart/addProductToCart', async (productId) => {
    let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
            productId: productId
        },
        {
            headers: { token }
        })
    console.log(data.data);

    return data.data.product
})


export let clearCart = createAsyncThunk('cart/clearCart', async () => {
    let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
            token
        }
    })
    console.log(data);
})

export const deleteProduct = createAsyncThunk(
    "cart/deleteProduct",
    async (productId) => {
       
            let { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    headers: {
                        token,
                    },
                }
            );

            return data.data;
        
    }
);

export let updateProductCount=createAsyncThunk('cart/updateProductCount', async({productId,count})=>{
    let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        count
    },{
        headers:{
            token
        }
    })

    return data.data
})

let cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: [],
    extraReducers: (builder) => {
        builder.addCase(getUserCart.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getUserCart.fulfilled, (state, action) => {
            state.loading = false
            state.cartItems = action.payload
        })

        builder.addCase(getUserCart.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(clearCart.pending, (state) => {
            state.loading = true
        })

        builder.addCase(clearCart.fulfilled, (state, action) => {
            state.loading = false
            state.cartItems = action.payload
        })

        builder.addCase(clearCart.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(addProductToCart.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addProductToCart.fulfilled, (state, action) => {
            state.loading = false
            state.cartItems = action.payload
            toast.success(`the product has been added to cart `)
        })
        builder.addCase(addProductToCart.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false
            state.cartItems = action.payload.products

        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(updateProductCount.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateProductCount.fulfilled, (state, action) => {
            state.loading = false
            state.cartItems = action.payload.products
        })
        builder.addCase(updateProductCount.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })


    },

})

export default cartSlice.reducer