import axios from 'axios'
import React from 'react'

export default async function handleSubmitFunc(userStore,cartStore,Size,qty,data,token,total) {

    if(userStore.user){
        try {
          console.log(userStore.user._id, cartStore.cart._id)
          let prod = {
            productId: data._id,
            size: Size,
            quantity: qty
          }
          let totalPrice = 0
          if(cartStore.total === 0){
            totalPrice = 0
          }else{
            totalPrice = cartStore.cart.total
          }
          console.log("grand total: ",parseInt(data.price)*parseInt(qty))
          const res = await axios.put(`${process.env.API_ENDPOINT}/cart/${userStore.user._id}`,{
            // userId: userStore.user._id,
            _id: cartStore.cart._id,
            products: [...cartStore.cart.products, prod],
            total: totalPrice + parseInt(data.price)*parseInt(qty)
          },{
            headers: {
              token: `Bearer ${userStore.user.accessToken}`
            }
          })
          console.log('all good',data.price, qty, totalPrice)

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
