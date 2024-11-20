// import {useState} from '../../../lib/states.js';
// import useState from './states.jsx';
"use client"
import styles from './singledrop.module.css';
import Image from 'next/image';
import prods from '../../public/prods.jpg'
import prod from '../../public/prod.jpg';
import prod2 from '../../public/prod2.jpg';
import prod3 from '../../public/prod3.jpg';
import tshirt from '../../public/tshirt.jpg';
import tshirt2 from '../../public/tshirt2.jpg';
import Navbar from '../../componants/navbar/Navbar.jsx';
// import {Swiper} from 'wiper';
import Sliding from '../../componants/swiper/Swiper.jsx';
import Footer from '../../componants/footer/Footer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setCart,addProduct,delProduct, setCartTotal } from '../../redux/cartReducer.js';
import axios from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import handleSubmitFunc from './scripts';
// import 'wiper/swiper-bundle.css'

export default function ClientComp(props) {


  // getting each product from api
  
  var data
  if(props.data!==null){
    data = JSON.parse(props.data)
  }else{
    data = null
  }

  // importing carts and user store
  const userStore = useSelector(state => state.user)
  const cartStore = useSelector(state => state.cart)

  const token = JSON.parse(sessionStorage.getItem('token'))


  const [qty, setQty] = useState(1);
  const [Size, setSize] = useState();
  const [hoveredImage, setHoveredImage] = useState(null);

  const [clr, setClr] = useState('red')

  const onSlctClr = (e) => {
    setClr(e.target.value)
  }

  const onSlctSize = (e) => {
    setSize(e.target.value)
  }

  const onChange = (e) => {
    setQty(e.target.value);
  };

  const handleMouseOver = (index) => {
    setHoveredImage(index);
  };

  const handleMouseOut = () => {
    setHoveredImage(null);
  };

  // const images = [prod, prod2, prod3, tshirt, tshirt2];
  const images = [prods,prods,prods,prods,prods];


  const dispatch = useDispatch()

  const [noUser, setNoUser] = useState(false)
  const makeLogin = useLayoutEffect(() => {
    if(noUser){
      redirect('/login')
    }
  }, [noUser])

  const [addedProd, setaddedProd] = useState(null)

  // useEffect(() => {
  //   if(addedProd){
  //     // dispatch(addProduct(prod))
  //     // console.log("datatttt:", addedProd.data)   
  //     // dispatch(setCart(addedProd.data))
  //     // sessionStorage.setItem('cartId',JSON.stringify(addedProd.data))
  //     // console.log("carttt1:",cartStore.cart)
  //     // console.log("carttt2:",cartStore.cart)
  //   }
  // }, [addedProd])

  // const dispatch = useDispatch()

    const [foundCart,setfoundCart] = useState(false)
    

    // useEffect(() => {
        
    //           setfoundCart(true)
    //     }

    //     if (!foundCart) {
    //       fetchCart()
    //     }

    // }, [cartStore.cart])

    async function fetchCart() {
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
                  sessionStorage.setItem('cartId', JSON.stringify(newCart.data))
                }
                dispatch(setCart(newCart.data))
              }else{
                if(typeof window !== 'undefined'){
                  sessionStorage.setItem('cartId', JSON.stringify(resCart.data))
                }
                dispatch(setCart(resCart.data))
              }

            } catch (error) {
              console.log(error)
            }
          
        }
      }
  


  async function handleSubmit() {

    const saveCart = await handleSubmitFunc(userStore,cartStore,Size,qty,data,token)
    
      let prod = {
        productId: data._id,
        size: Size,
        quantity: qty
      }
      if(saveCart){
        dispatch(addProduct(prod))
        dispatch(setCartTotal(parseInt(data.price)*parseInt(qty)))
        fetchCart()
        console.log("lessgoooo:",saveCart)
      }
    
    // dispatch(setCartTotal(parseInt(data.price * qty)))

    // if(userStore.user){
    //   try {
    //     console.log(userStore.user._id, cartStore.cart._id)
    //     let prod = {
    //       productId: data._id,
    //       size: Size,
    //       quantity: qty
    //     }
    //     const res = await axios.put(`${process.env.API_ENDPOINT}/cart/${userStore.user._id}`,{
    //       // userId: userStore.user._id,
    //       _id: cartStore.cart._id,
    //       products: [...cartStore.cart.products, prod],
    //       total: cartStore.total + (data.price * qty)
    //     },{
    //       headers: {
    //         token: `Bearer ${token}`
    //       }
    //     })
    //     // if (res.data) {
    //     dispatch(setCartTotal(parseInt(data.price * qty)))
    //     setaddedProd(res)

        
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }else{
    //   setNoUser(true)
    // }
    
    
  }


  return (
    <>
      

      <div className={styles.singleproduct}>
       
        <div className={styles.top}>
          {
            data ? 
            <>
            <div className={styles.left}>
           <div className={styles.leftCover}>
           <img className={styles.leftImg} src={data.images[0]} objectFit='cover'/>
            <img className={styles.leftImg} src={data.images[1]} objectFit='cover'/>
            <img className={styles.leftImg} src={data.images[2]} objectFit='cover'/>
            <img className={styles.leftImg} src={data.images[0]} objectFit='cover'/>
            <img className={styles.leftImg} src={data.images[0]} objectFit='cover'/>
           </div>
          </div>

          <div className={styles.right}>
            <div className={styles.rightTop}>
            <h1 className={styles.righthead}>{data.title}</h1>
            <h4 className={styles.rightprice}>&#8377; {data.price}</h4>
            </div>
            <form>
              <h3 className={styles.colourName}>Color: {clr}</h3>
              <div className={styles.buttonsclr}>
              <label><input type="radio" name="colours" value="red" onChange={onSlctClr} style={{accentColor:'red'}}/> red</label>
              <label><input type="radio" name="colours" value="blue" onChange={onSlctClr} style={{accentColor:'red'}}/> blue</label>
              <label><input type="radio" name="colours" value="green" onChange={onSlctClr} style={{accentColor:'red'}}/> green</label>
              </div>
            </form>
            <form>
              <h3 className={styles.sizeName}>Select size</h3>
              <div className={styles.buttonssize}>
              <label><input type="radio" name="options" value="xs" onChange={onSlctSize} /> xs</label>
              <label><input type="radio" name="options" value="s" onChange={onSlctSize} /> s</label>
              <label><input type="radio" name="options" value="m" onChange={onSlctSize}/> m</label>
              <label><input type="radio" name="options" value="l" onChange={onSlctSize}/> l</label>
              <label><input type="radio" name="options" value="xl" onChange={onSlctSize}/> xl</label>
              <label><input type="radio" name="options" value="xxl" onChange={onSlctSize}/> xxl</label>
              </div>
            </form>
            <label><input type="number" className={styles.qty} name="myNumber" value={qty}  min={1} max={100} onChange={onChange}/> qty</label>
            <button className={styles.cartBtn} onClick={handleSubmit}>ADD TO SHOPPING BAG</button>
           
          </div>
          </> : <p>404:couldn't find any products</p>
          }

          
        </div>

        <div className={styles.bottom}>
          <h1 className={styles.bottomHead}>Product details</h1>
          

          <div className={styles.prodDesc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, aspernatur repellendus, corporis libero quo vitae cum consequuntur facere corrupti illum officiis magnam nemo! Temporibus voluptatem ea enim quos libero accusantium.</div>
            
          
            
        </div>
      </div>
      
    </>
  );
}