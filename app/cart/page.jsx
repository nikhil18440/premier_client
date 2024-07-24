"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../../componants/navbar/Navbar'
import ClientComp from './clientComp'
import Footer from '../../componants/footer/Footer'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function page() {

    // async function getData() {
    //     const res = await axios.get(`${process.env.API_ENDPOINT}/cart`)  
    //     return res.data
    // }
    

    // const data = await getData()
    // var dataStr = JSON.stringify(data)

    // var cart = JSON.parse(sessionStorage.getItem('cartID'))
    const cartStore = useSelector(state => state.cart)
    const cart = cartStore.cart

    const [prodArr, setprodArr] = useState([])
    
    const [rendered, setRendered] = useState(true)

    
    if(rendered){
        if(cart){
            findProd()
        setRendered(false)
        }
    }
    
    

    async function findProd() {
        console.log('hi')
        for (let i = 0; i < cart.products.length; i++) {
            const prodId = cart.products[i].productId
            try {
                const res = await axios.get(`${process.env.API_ENDPOINT}/product/${prodId}`)
                setprodArr(state=>[...state,[res.data, cart.products[i].size, cart.products[i].quantity]])
                console.log(prodArr)
            } catch (error) {
                console.log(error)
            }
        }
    }
    

  return (
    <>
    <Navbar/>
    <ClientComp prodArr={prodArr}/>
    <Footer/>
    </>
  )
}
