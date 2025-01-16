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
import Broken from '@/componants/broken/broken'
import Script from 'next/script'
import Razorpay from 'razorpay'
import { addtoOrder } from '@/redux/orderReducer'
import toast, { Toaster } from 'react-hot-toast'
import { FaCross } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

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
                console.log('oooo:',ProdArr)
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



    // useLayoutEffect(() => {
    //   if(userStore.user === null){
    //     redirect('/')
    //   }
    // }, [])

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
        console.log('uuuuuuuuuu:',item)
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
            
            if(userStore.user){
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
                    // let prodPrice = parseInt(item[0].price)*parseInt(item[2])
                    dispatch(setCart(res.data))
     
                    if(typeof window !== 'undefined'){
                        localStorage.setItem('cartId',JSON.stringify(res.data))
                    }
                }
            }else{
                let productsOffline2 = cartStore.cart.products.map((v) => {console.log(v)})
                let productsOffline = cartStore.cart.products.filter(v => v._id !== item[3])
                console.log('offline:', cartStore.cart.products, productsOffline, item[3])
                let noUserCart = {
                    products: products,
                    total: totalPrice - parseInt(item[0].price)*parseInt(item[2])
                }
                setProdArr([])
                filterArr(item[3])
                // setProdArr([])
                // filterArr(item[3])

                dispatch(setCart(noUserCart))
                
                if(typeof window !== 'undefined'){
                    localStorage.setItem('cartId',JSON.stringify(noUserCart))
                }
            }
        } catch (error) {
            console.log(error)
        }
    }



    // clear the cart
    async function handleClearCart() {
        if(userStore.user){
            try {
                const res = await axios.put(`${process.env.API_ENDPOINT}/cart/${userStore.user._id}`,{
    
                _id: cartStore.cart._id,
                products: [],
                total: 0
                },{
                headers: {
                    token: `Bearer ${userStore.user.accessToken}`
                }
                })
    
                if(res.data){
                    
                    dispatch(setCart(res.data))
                    if(typeof window !== 'undefined'){
                        localStorage.setItem('cartId',JSON.stringify(res.data))
                    }
                    }
            } catch (error) {
                console.log(error)
            }
        }else{
            let noUserCart = {
                products: [],
                total: 0
            }

            dispatch(setCart(noUserCart))
            if(typeof window !== 'undefined'){
                localStorage.setItem('cartId',JSON.stringify(noUserCart))
            }
        }
    }




    // PAYMENT METHODS USING RAZORPAY
    const Amount = 100
    const [isProcessing, SetIsProcessing] = useState(false)
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [paymentError, setPaymentError] = useState(false)

    const [openForm, setOpenForm] = useState(false)

    useEffect(() => {
        
        if(paymentSuccess){

            setOpenForm(true)
            
            // createOrder()
            // handleClearCart()
            // redirect('/profile')
          }
    }, [paymentSuccess])

    async function createOrder() {
        let products = []
        let totalQuantity = 0
        for (let i = 0; i < ProdArr.length; i++) {
            totalQuantity += ProdArr[i][2]
            products.push({
                productId: ProdArr[i][0]._id,
                size: ProdArr[i][1],
                quantity: ProdArr[i][2],
            })
        }
        console.log('everrrrr:',products)
      
        
        try {
            if(userStore.user){
                const newOrder = await axios.post(`${process.env.API_ENDPOINT}/order`, {
                    userId: userStore.user._id,
                    total: cartStore.total,
                    status: 'pending',
                    quantity: totalQuantity,
                    products: products
                }, {headers: {token:`Bearer ${userStore.user.accessToken}`}})
                
                dispatch(addtoOrder(newOrder.data))
                
                console.log(newOrder.data)
            }else{
                const newOrder = await axios.post(`${process.env.API_ENDPOINT}/order`, {
                    // userId: userStore.user._id,
                    total: cartStore.total,
                    status: 'pending',
                    quantity: totalQuantity,
                    products: products,
                    userDetails: {}
                })
                
                dispatch(addtoOrder(newOrder.data))
                
                console.log(newOrder.data)
            }

        } catch (error) {
            console.log(error)
        }
    }
    

    let funnn = false
    const handlePayment = async () => {
        console.log('handling paymnet')
        SetIsProcessing(true)
        setOpenForm(true)

        if(funnn){
            try {
                //create order
                const response = await fetch(`${process.env.API_ENDPOINT}/payment`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'token': `Bearer ${userStore.user.accessToken}`
                        },
                        body: JSON.stringify({
                            total: cartStore.total,
                        })
                })
                const data = await response.json()
    
                // INITIALIZE RAZORPAY
                const options = {
                    "key": 'rzp_test_sM994cU3j8AY7A', // Enter the Key ID generated from
                    "amount": cartStore.total*100, // integer amount
                    "currency": "INR", // 3 letter ISO code of the currency
                    "name": "fengxi", // the name of your website
                    "description": "Test Transaction", // the description of the transaction
                    // "order_id": data.orderId, 
                    "handler": function (response) {
                        setPaymentSuccess(true)
                        setPaymentError(false)
                        console.log('payment success', response)
                    },
                    // "prefill": {
                    //     "name": "Rahul",
                    //     "email": "rahul@example.com",
                    //     "contact": "9999999999",
                    // },
                    "theme":{
                        "color": "#565656"
                    },
            
                }
    
                // const rzp1 = new Razorpay({
                //     key_id: 'rzp_test_sM994cU3j8AY7A',
                //     key_secret: 'PpJukXmg78wH3mmq3MV7SXZR'
                // },options)
                
                const rzp1 = new window.Razorpay(options)
                rzp1.open()
    
    
            } catch (error) {
                setPaymentError(true)
                toast.error('Payment Failed!')
                console.log("payment failed", error)
            }finally{
                SetIsProcessing(false)
            }
        }
    }


    // final form validation
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        state: '',
        address: '',
        pincode: ''
    });

    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        validateForm();
    };

    const validateForm = () => {
        const { firstName, lastName, email, phoneNumber, state, address, pincode } = formData;
        const isValid = 
            firstName && 
            lastName && 
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && 
            /^\d{10}$/.test(phoneNumber) && 
            state && 
            address && 
            /^\d{6}$/.test(pincode);
        setIsFormValid(isValid);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    const handleClose = () => {
        setOpenForm(false)
        SetIsProcessing(false)
        // Logic to close the form (e.g., set a state to hide the form)
    };
    
    

  return (
    <>
    {/* <Navbar/> */}
    <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    <div className={styles.cart}>

        {
            openForm &&
            <div className={styles.finalDetails}>
            <button onClick={handleClose} className={styles.closeButton}>
                <MdClose size={20}/>
            </button>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Checkout Information</h2>
                <div className={styles.formGroup}>
                    {/* <label htmlFor="firstName">First Name:</label> */}
                    <input placeholder='First Name' type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    {/* <label htmlFor="lastName">Last Name:</label> */}
                    <input placeholder='Last Name' type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    {/* <label htmlFor="email">Email:</label> */}
                    <input placeholder='Email' type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    {/* <label htmlFor="phoneNumber">Phone Number:</label> */}
                    <input placeholder='Phone Number' type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    {/* <label htmlFor="state">State:</label> */}
                    <input placeholder='State' type="text" id="state" name="state" value={formData.state} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    {/* <label htmlFor="address">Address:</label> */}
                    <textarea placeholder='Address' type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    {/* <label htmlFor="pincode">Pincode:</label> */}
                    <input placeholder='Pincode' type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} required />
                </div>
                <button type="submit" className={styles.submitButton} disabled={!isFormValid}>Checkout</button>
            </form>

            <div className={styles.summary}>
                <h3>Order Summary</h3>
                <div className={styles.summaryItem}>
                    <span>Subtotal:</span>
                    <span>&#8377; {cartStore.total}</span>
                </div>
                <div className={styles.summaryItem}>
                    <span>Total:</span>
                    <span>&#8377; {cartStore.total}</span>
                </div>
                <div className={styles.freeShipping}>
                    <p>Free shipping all over India</p>
                </div>
                </div>
            </div>
        }

        {/* <Toaster/> */}
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
                <button className={styles.rightCheckout} onClick={() => handlePayment()} disabled={isProcessing}>
                    {isProcessing ? 'Processing...': 'CHECKOUT'}
                </button>
            </div>
            </div>
            </> : (
                error ? 
                // <div className={styles.empty}>404: Something went wrong</div>
                <Broken/>
                :
                <div className={styles.empty}>Your shopping bag is empty</div>
            )
        }
        

    </div>
    {/* <Footer/> */}
    </>
  )
}
