"use client"
import {createSlice} from '@reduxjs/toolkit'
import { useEffect } from 'react'

// var getCart
var getCart
if(typeof window !== 'undefined'){
    getCart = JSON.parse(window.localStorage.getItem('cartId'))
}
// useEffect(() => {

// }, [])

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: getCart || null,
        quantity: getCart ? getCart.products.length : 0,
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
            localStorage.setItem('cartId',JSON.stringify(state.cart))
            // state.total = state.total + action.payload.price
        },
        delProduct: (state,action) => {
            console.log('working')
            state.quantity = state.quantity - 1
            state.cart.products.filter(item => item._id !== action.payload)
        },
        setCartTotal: (state,action) => {
            state.total = state.total + action.payload
        },
        setCartTotalMinus: (state,action) => {
            state.total = state.total - action.payload
        }
    }
})


export const {addProduct,delProduct,setCart,setCartTotal,setCartTotalMinus} = cartSlice.actions
export default cartSlice.reducer

