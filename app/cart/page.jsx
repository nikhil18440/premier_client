import React from 'react'
import styles from './cart.module.css'
import Image from 'next/image'
// import prod from '../../public/prod.jpg'
import prod from '../../public/bag.jpeg'
import Navbar from '../componants/navbar/Navbar'
import Footer from '../componants/footer/Footer'

export default function page() {
  return (
    <>
    <Navbar/>
    <div className={styles.cart}>

        <div className={styles.left}>

            <div className={styles.leftprod}>
                <Image className={styles.leftprodImg} src={prod} width={200} height={300} objectFit='cover'/>
                <div className={styles.prodDetails}>
                    <div className={styles.prodDetailstop}>
                        <div className={styles.prodDetailstopleft}>
                            <h3>Product Name</h3>
                            <p>Color: red</p>
                            <p>Size: s</p>
                            <p>Quantity: 1</p>
                        </div>
                        <div className={styles.prodDetailstopright}>
                            <p>Product Price</p>
                        </div>
                    </div>
                    <button className={styles.prodDetailsbottom}>
                        remove
                    </button>
                </div>
            </div>
            
        </div>

        <div className={styles.right}>
            <div className={styles.checkout}>
            <div className={styles.total}>
                <h4>SUBTOTAL</h4>
                <h4>&#8377; 900</h4>
            </div>
            <button className={styles.rightCheckout}>CHECKOUT</button>
            </div>
        </div>

    </div>
    <Footer/>
    </>
  )
}
