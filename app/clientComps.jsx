"use client"
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from "next/image";
import styles from "./page.module.css";
import prod from '../public/prods.jpg'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { setCart } from '../redux/cartReducer';
import Navbar from '../componants/navbar/Navbar';

export default function ClientComp(props) {

    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

    var data = null
    if(props.data){
      data = JSON.parse(props.data)
    }else{
      data = null
    }

    const router = useRouter()
    function handleClick(id) {
        router.push(`/singledrop?id=${id}`)
    }

    const cartStore = useSelector(state => state.cart)
  const userStore = useSelector(state => state.user)

  var token = null
  

    

  const findcart = async () => {
    if(cartStore.cart === null){
     
        const res = await axios.get(`${process.env.API_ENDPOINT}/cart/find/${userStore.user._id}`,{
          headers: {
            token: token
          }
        })
        if(res.data === null && userStore.user){
          
          const newCart = await axios.post(`${process.env.API_ENDPOINT}/cart/${userStore.user._id}`, {
              userId: userStore.user._id,
              products: [],
              total: 0
          }, {headers: {token:token}})
          
          dispatch(setCart(newCart.data))
          sessionStorage.setItem('cartId', JSON.stringify(newCart.data))
        }else{
          if(res.data){
            sessionStorage.setItem('cartId', JSON.stringify(res.data))
            dispatch(setCart(res.data))

            // res.data.products.map(item => {
            //   removefromDbCart({Cart: res.data, product: item})
            // })
          }
          
        }
    }else{
      console.log("the else loop is executing");
      const localUser = JSON.parse(sessionStorage.getItem('cartId'))
      if(localUser){
        dispatch(setCart(localUser))
      }
    }
}

useEffect(() => {
  if(userStore.user){
    token  = `Bearer ${JSON.parse(window.sessionStorage.getItem('token'))}`
    findcart()
  }
}, [userStore.user])

// const updateCart = useCallback(() => {
//   const localUser = JSON.parse(sessionStorage.getItem('cartId'))
//     if(localUser){
//       dispatch(setCart(localUser))
//     }
// },[cartStore])

// useEffect(() => {
//   updateCart()
// }, [updateCart])

  

  return (
    <>
    <Navbar/>
    {
        data ? data.map((item,i) => (
          <div className={styles.prodDiv} key={i}>
            <img src={item.images[0]} className={styles.prodImg}/>
            <div className={styles.prodText}>
              <h4>{item.title}</h4>
              <button className={styles.shopbtn} onClick={() => handleClick(item._id)}>Shop now</button>
            </div>
          </div>
        )) : <></>
      }
    </>
  )
}
