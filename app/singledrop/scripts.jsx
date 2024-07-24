import axios from 'axios'
import React from 'react'

export default async function handleSubmitFunc(userStore,cartStore,Size,qty,data,token) {

    if(userStore.user){
        try {
          console.log(userStore.user._id, cartStore.cart._id)
          let prod = {
            productId: data._id,
            size: Size,
            quantity: qty
          }
          const res = await axios.put(`${process.env.API_ENDPOINT}/cart/${userStore.user._id}`,{
            // userId: userStore.user._id,
            _id: cartStore.cart._id,
            products: [...cartStore.cart.products, prod],
            total: cartStore.total + (data.price * qty)
          },{
            headers: {
              token: `Bearer ${token}`
            }
          })

          return res.data
        //   // if (res.data) {
        //   dispatch(setCartTotal(parseInt(data.price * qty)))
        //   setaddedProd(res)
  
          
        } catch (error) {
          console.log(error)
        }
      }else{
        // setNoUser(true)
      }

}
