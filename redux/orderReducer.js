"use client"
import {createSlice} from '@reduxjs/toolkit'
import { useEffect } from 'react'

// var getCart
// var getOrder
// if(typeof window !== 'undefined'){
//     getOrder = JSON.parse(window.localStorage.getItem('cartId'))
// }
// useEffect(() => {

// }, [])

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderList: null,
    },
    reducers: {
        setOrder: (state,action) => {
            state.orderList = action.payload
        }
    }
})


export const {setOrder} = orderSlice.actions
export default orderSlice.reducer

