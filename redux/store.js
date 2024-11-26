import {configureStore} from '@reduxjs/toolkit'
import cartReducer from "./cartReducer"
import userReducer from './userReducer'
import orderReducer from './orderReducer'


export default configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        order: orderReducer
    }
})