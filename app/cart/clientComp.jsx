"use client"
import React, { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import styles from './cart.module.css'
import Image from 'next/image'
// import prod from '../../public/prod.jpg'
import prod from '../../public/bag.jpeg'
import Navbar from '../../componants/navbar/Navbar'
import Footer from '../../componants/footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { redirect } from 'next/navigation'
import { delProduct, setCart, setCartTotal, setCartTotalMinus } from '@/redux/cartReducer'
import axios from 'axios'
import Loader from '@/componants/loader/Loader'

export default function ClientComp({prodArr}) {

    const cartStore = useSelector(state => state.cart)
    const userStore = useSelector(state => state.user)

    const [ProdArr, setProdArr] = useState([])
    
    const [rendered, setRendered] = useState(true)

    
    // const [foundProd, setFoundProd] = useState(false)
    if(rendered){
        if(cartStore.cart){
            findProd()
        setRendered(false)
        }
    }

    const [success, setSuccess] = useState(false)
    const [error, seterror] = useState(false)
    

    async function findProd() {
        let cart = cartStore.cart
        console.log('hi')
        for (let i = 0; i < cart.products.length; i++) {
            const prodId = cart.products[i].productId
            try {
                const res = await axios.get(`${process.env.API_ENDPOINT}/product/${prodId}`)
                setProdArr(state=>[...state,[res.data, cart.products[i].size, cart.products[i].quantity, cart.products[i]._id]])
                console.log(ProdArr)
                setSuccess(true)
                seterror(false)
            } catch (error) {
                setSuccess(false)
                seterror(true)
                console.log(error)
            }
        }
        // setFoundProd(true)
    }



    useLayoutEffect(() => {
      if(userStore.user === null){
        redirect('/')
      }
    }, [])

    // let ProdArr = prodArr.reverse()
    // const [ProdArr,setProdArr] = useState([])
    // useEffect(() => {
    //   setProdArr([...prodArr])
    // }, [prodArr])
    


    function filterArr(id) {
        console.log('v3:',ProdArr[0][3],id)
        let newArr = ProdArr.filter(v => v[3] !== id)
        setProdArr(newArr)
    }

    const dispatch = useDispatch()

    // remove an item
    async function handleRemove(item) {
        try {
            let totalPrice = 0
            if(cartStore.total === 0){
                totalPrice = 0
            }else{
                totalPrice = cartStore.cart.total
            }
            let products = cartStore.cart.products.filter(v => v._id !== item[3])
            console.log('prr:',products)
            console.log(cartStore.cart.products[0].productId, item[0]._id)
            const res = await axios.put(`${process.env.API_ENDPOINT}/cart/${userStore.user._id}`,{
            // userId: userStore.user._id,
            _id: cartStore.cart._id,
            products: products,
            total: totalPrice - parseInt(item[0].price)*parseInt(item[2])
            },{
            headers: {
                token: `Bearer ${userStore.user.accessToken}`
            }
            })

            if(res.data){
                console.log('yes',cartStore.cart.products, item[3])
                setProdArr([])
                filterArr(item[3])
                let prodPrice = parseInt(item[0].price)*parseInt(item[2])
                dispatch(setCart(res.data))
                // dispatch(delProduct(item[3]))
                console.log('mycart:',cartStore)
                // dispatch(setCartTotalMinus(prodPrice))
                sessionStorage.setItem('cartId',JSON.stringify(res.data))
            }
        } catch (error) {
            console.log(error)
        }
    }



    console.log("cart: ", cartStore)

  return (
    <>
    {/* <Navbar/> */}
    <div className={styles.cart}>

        
        {
            ProdArr.length !== 0 && success ? <>
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
                            <button className={styles.prodDetailsbottom} onClick={() => handleRemove(item)}>
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
            </> : (
                error ? 
                <div className={styles.empty}>404: Something went wrong</div>
                :
                <div className={styles.empty}>Your shopping bag is empty</div>
            )
        }
        

    </div>
    {/* <Footer/> */}
    </>
  )
}
