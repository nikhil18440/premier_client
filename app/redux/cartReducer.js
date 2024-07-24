"use client"
import {createSlice} from '@reduxjs/toolkit'

const getCart = JSON.parse(window.sessionStorage.getItem('cartId'))

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: getCart || null,
        quantity: 0,
        total: getCart ? getCart.total : 0
    },
    reducers: {
        setCart: (state,action) => {
            state.cart = action.payload
            state.quantity = action.payload.products.length
            state.total = action.payload.total
        },
        addProduct: (state,action) => {
            state.quantity = state.quantity + 1
            state.cart.products.push(action.payload)
            sessionStorage.setItem('cartId',JSON.stringify(state.cart))
            // state.total = state.total + action.payload.price
        },
        delProduct: (state,action) => {
            state.quantity = state.quantity - 1
            state.cart.products.filter(item => item._id !== action.payload._id)
            state.total = state.total - action.payload.price
        },
        setCartTotal: (state,action) => {
            state.total = action.payload
        }
    }
})


export const {addProduct,delProduct,setCart,setCartTotal} = cartSlice.actions
export default cartSlice.reducer

