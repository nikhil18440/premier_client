"use client"
import React, { Suspense, useEffect, useState } from 'react'
import Navbar from '../../componants/navbar/Navbar'
import ClientComp from './clientComp'
import Footer from '../../componants/footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setCart } from '@/redux/cartReducer'
import Loader from '@/componants/loader/Loader'
import FetchCart from '../scripts'

export default function page() {

    // async function getData() {
    //     const res = await axios.get(`${process.env.API_ENDPOINT}/cart`)  
    //     return res.data
    // }
    

    // const data = await getData()
    // var dataStr = JSON.stringify(data)

    // var cart = JSON.parse(localStorage.getItem('cartID'))
    const cartStore = useSelector(state => state.cart)
    const userStore = useSelector(state => state.user)
    const cart = cartStore.cart

    const [prodArr, setprodArr] = useState([])
    
    // const [rendered, setRendered] = useState(true)

    
    // // const [foundProd, setFoundProd] = useState(false)
    // if(rendered){
    //     if(cart){
    //         findProd()
    //     setRendered(false)
    //     }
    // }
    

    // async function findProd() {
    //     console.log('hi')
    //     for (let i = 0; i < cart.products.length; i++) {
    //         const prodId = cart.products[i].productId
    //         try {
    //             const res = await axios.get(`${process.env.API_ENDPOINT}/product/${prodId}`)
    //             setprodArr(state=>[...state,[res.data, cart.products[i].size, cart.products[i].quantity,prodId]])
    //             console.log(prodArr)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     // setFoundProd(true)
    // }

    

    const dispatch = useDispatch()

    const [foundCart,setfoundCart] = useState(false)
    

    useEffect(() => {
        async function fetchCart() {
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
                  if(!localStorage.getItem('cartId')){
                    localStorage.setItem('cartId',JSON.stringify(
                      {
                        products: [],
                        total: 0
                      }
                    ))
                    dispatch(setCart(
                      {
                        products: [],
                        total: 0
                      }
                    ))
                  }
                }
                setfoundCart(true)
        }

        if (!foundCart) {
          fetchCart()
        }

    }, [cartStore.cart])
    
    

  return (
    <>

    {/* <Suspense fallback={<Loader/>}> */}
      <ClientComp prodArr={prodArr}/>
    {/* </Suspense> */}

    </>
  )
}
