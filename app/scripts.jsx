'use client'
import { setCart } from '@/redux/cartReducer'
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


export async function FetchCart() {

    const dispatch = useDispatch()
    const userStore = useSelector(state => state.user)

        console.log('going')
          if(userStore.user){
              const user = userStore.user
              
                try {
    
                  const resCart = await axios.get(`${process.env.API_ENDPOINT}/cart/find/${user._id}`,{
                    headers: {
                    token:  `Bearer ${user.accessToken}`
                    }
                  })
                  
                  console.log('found an existing cart:', resCart.data)
                  
                  if(resCart.data===null){
                    const newCart = await axios.post(`${process.env.API_ENDPOINT}/cart/${user._id}`, {
                      userId: user._id,
                      products: [],
                      total: 0
                    }, {headers: {token:`Bearer ${user.accessToken}`}})
                    
                    if(typeof window !== 'undefined'){
                      localStorage.setItem('cartId', JSON.stringify(newCart.data))
                    }
                    dispatch(setCart(newCart.data))
                  }else{
                    if(typeof window !== 'undefined'){
                      localStorage.setItem('cartId', JSON.stringify(resCart.data))
                    }
                    dispatch(setCart(resCart.data))
                  }
    
                } catch (error) {
                  console.log(error)
                }
              
        }else{
            
                console.log('hiiiiiii')
                if(typeof window !== 'undefined'){
                    if(!localStorage.getItem('cartId')){
                        var newCart = {
                            products: [],
                            total: 0
                        }
                        localStorage.setItem('cartId', JSON.stringify(newCart))
                    }
                }
              
        }
      

      
    
      }

