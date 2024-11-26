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
import Findcart from './scripts';
import Broken from '@/componants/broken/broken';
import model1 from '../public/model1.jpg'

export default function ClientComp(props) {

    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

    var data = null
    if(props.data){
      data = JSON.parse(props.data)
    }else{
      data = null
    }

    var cart = null
    if(props.cart){
      cart = JSON.parse(props.cart)
    }else{
      cart = null
    }

    const router = useRouter()
    function handleClick(id) {
        router.push(`/singledrop?id=${id}`)
    }

    const cartStore = useSelector(state => state.cart)
  const userStore = useSelector(state => state.user)

  var token = null
  

    

// let cart = localStorage.setItem('cartId', JSON.stringify(Findcart(userStore,cartStore,token)))

// if(cart===false){
//   const localUser = JSON.parse(localStorage.getItem('cartId'))
//   if(localUser){
//     dispatch(setCart(localUser))
//   }
// }

// useEffect(() => {
//   if(userStore.user){
//     token  = `Bearer ${JSON.parse(window.localStorage.getItem('token'))}`
//     localStorage.setItem('cartId',JSON.stringify(Findcart(userStore,cartStore,token)))
//   }
// }, [userStore.user])

// const updateCart = useCallback(() => {
//   const localUser = JSON.parse(localStorage.getItem('cartId'))
//     if(localUser){
//       dispatch(setCart(localUser))
//     }
// },[cartStore])

// useEffect(() => {
//   updateCart()
// }, [updateCart])

  

  return (
    <>
    {
        data ? data.map((item,i) => (
          <div className={styles.prodDiv} key={i}>
            <img src={item.images[0]} className={styles.prodImg}/>
            <div className={styles.prodText}>
              <h4>{item.title}</h4>
              <button className={styles.shopbtn} onClick={() => handleClick(item._id)}>Shop now</button>
            </div>
          </div>
        )) : <Broken/>
      }

      {/* <div className={styles.prodDiv}>
        <img src='prod.jpg' className={styles.prodImg}/>
        <img src='prod.jpg' className={styles.prodImg}/>
        <img src='prod.jpg' className={styles.prodImg}/>
        <img src='prod.jpg' className={styles.prodImg}/>
        <img src='model2.jpg' className={styles.prodImg}/>
        <img src='model3.jpg' className={styles.prodImg}/>
        <img src='model4.jpg' className={styles.prodImg}/>
        <img src='model5.jpg' className={styles.prodImg}/>
        <div className={styles.prodText}>
              <h4>{item.title}</h4>
              <button className={styles.shopbtn} onClick={() => handleClick(item._id)}>Shop now</button>
            </div>
      </div> */}
    </>
  )
}
