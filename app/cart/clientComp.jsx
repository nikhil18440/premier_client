"use client"
import React, { useLayoutEffect } from 'react'
import styles from './cart.module.css'
import Image from 'next/image'
// import prod from '../../public/prod.jpg'
import prod from '../../public/bag.jpeg'
import Navbar from '../componants/navbar/Navbar'
import Footer from '../componants/footer/Footer'
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation'

export default function ClientComp({prodArr}) {

    const cartStore = useSelector(state => state.cart)
    const userStore = useSelector(state => state.user)

    useLayoutEffect(() => {
      if(userStore.user === null){
        redirect('/')
      }
    }, [])

    let ProdArr = prodArr.reverse()

    // function (params) {
        
    // }

    console.log("cart: ", cartStore)

  return (
    <>
    {/* <Navbar/> */}
    <div className={styles.cart}>

        <div className={styles.left}>

            {
                ProdArr.map((item, index) => (
                    <div className={styles.leftprod} key={index}>
                        <img className={styles.leftprodImg} src={item[0].images[0]} width={200} height={300} objectFit='cover'/>
                        <div className={styles.prodDetails}>
                            <div className={styles.prodDetailstop}>
                                <div className={styles.prodDetailstopleft}>
                                    <h3>{item[0].title}</h3>
                                    <p>Size: {item[1]}</p>
                                    <p>Quantity: {item[2]}</p>
                                </div>
                                <div className={styles.prodDetailstopright}>
                                    <p>&#8377;{item[0].price}</p>
                                </div>
                            </div>
                            <button className={styles.prodDetailsbottom}>
                                remove
                            </button>
                        </div>
                    </div>
                ))
            }
            
        </div>

        <div className={styles.right}>
            <div className={styles.checkout}>
            <div className={styles.total}>
                <h4>SUBTOTAL</h4>
                <h4>&#8377; {cartStore.total}</h4>
            </div>
            <button className={styles.rightCheckout}>CHECKOUT</button>
            </div>
        </div>

    </div>
    {/* <Footer/> */}
    </>
  )
}
