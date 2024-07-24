"use client"
import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

var getUSer
useEffect(() => {
    getUSer = JSON.parse(window.sessionStorage.getItem('user'))

}, [])

const userSlice = createSlice({
    name: "user",
    initialState: {
        // JSON.parse(sessionStorage.getItem('user')) ||
        user: getUSer || null ,
        isFetching: false,
        error: false
    },
    reducers: {

        userFetchStart: (state) => {
            state.user = null
            state.isFetching = true
            state.error = false
        },
        userFetchSuccess: (state,action) => {
            state.user = action.payload
            state.isFetching = false
            state.error = false
        },
        userFetchFailure: (state) => {
            state.user = null
            state.isFetching = false
            state.error = true
        }

    }
})

export const {userFetchStart,userFetchSuccess,userFetchFailure} = userSlice.actions
export default userSlice.reducer