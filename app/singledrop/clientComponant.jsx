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
import { Dropdown, DropdownItem,Button, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import Link from 'next/link';
import Modal from '@/componants/modal/Modal';
// import 'wiper/swiper-bundle.css'

export default function ClientComp(props) {


  // getting each product from api

  const [cat, setcat] = useState([])
  const [findCat, setFindCat] = useState(false)
  
  var data
  if(props.data!==null){
    data = JSON.parse(props.data)

    async function getCat(categories) {
      try {
        const res = await axios.post(`${process.env.API_ENDPOINT}/product/categories`, {
          categories: categories
        })
        console.log('catss:', res.data)
        setcat(res.data)
        setFindCat(true)
      } catch (error) {
        console.log(error)
        setFindCat(false)
      }
    }
    

    if(!findCat){
      getCat(data.categories)
    }

    
  }else{
    data = null
  }

  setTimeout(() => {
    console.log('issss:', cat)

  }, 5000);

  // importing carts and user store
  const userStore = useSelector(state => state.user)
  const cartStore = useSelector(state => state.cart)

  const token = JSON.parse(localStorage.getItem('token'))


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
  // const makeLogin = useLayoutEffect(() => {
  //   if(!userStore.user){
  //     redirect('/login')
  //   }
  // }, [])

  const [addedProd, setaddedProd] = useState(null)

  // useEffect(() => {
  //   if(addedProd){
  //     // dispatch(addProduct(prod))
  //     // console.log("datatttt:", addedProd.data)   
  //     // dispatch(setCart(addedProd.data))
  //     // localStorage.setItem('cartId',JSON.stringify(addedProd.data))
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

    async function fetchCart(saveCart) {
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
          if(typeof window !== 'undefined'){
            localStorage.setItem('cartId', JSON.stringify(saveCart))
          }

          dispatch(setCart(saveCart))
        }
      }

      const [showDropdown, setShowDropdown] = useState(false);
  

  const [openModal, setOpenModal] = useState(false)
  async function handleSubmit() {

    if (!Size) {
      alert('Select size')
    } else {
      
        const saveCart = await handleSubmitFunc(userStore,cartStore,Size,qty,data,token)
    
      let prod = {
        productId: data._id,
        size: Size,
        quantity: qty
      }
      if(saveCart){
        dispatch(addProduct(prod))
        dispatch(setCartTotal(parseInt(data.price)*parseInt(qty)))
        fetchCart(saveCart)
        setOpenModal(true)
        console.log("lessgoooo:",saveCart)
      }
      
    }
  }

  function handleModal() {
    setOpenModal(false)
    redirect('/cart')
  }


  return (
    <>

      <div className={styles.singleproduct}>
        
      {openModal && 
        <div className={styles.modal_overlay}>
          <div className={styles.modal_content}>
              <h2>Product added to cart</h2>
              <div className={styles.modal_buttons}>
              <button className={styles.modal_button} onClick={() => setOpenModal(false)}>Continue Shopping</button>
              <button className={styles.modal_button} onClick={() => handleModal()}>Checkout</button>
              </div>
          </div>
        </div>
      }

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
            {/* <form>
              <h3 className={styles.colourName}>Color: {clr}</h3>
              <div className={styles.buttonsclr}>
              <label><input type="radio" name="colours" value="red" onChange={onSlctClr} style={{accentColor:'red'}}/> red</label>
              <label><input type="radio" name="colours" value="blue" onChange={onSlctClr} style={{accentColor:'red'}}/> blue</label>
              <label><input type="radio" name="colours" value="green" onChange={onSlctClr} style={{accentColor:'red'}}/> green</label>
              </div>
            </form> */}
            <form>
              <h3 className={styles.sizeName}>Select size</h3>
              <div className={styles.dropdown}>
                <button className={styles.dropDownBtn} type="button" onClick={() => setShowDropdown(!showDropdown)}>
                  {Size ? Size : 'Select Size'}
                </button>
                {showDropdown && (
                  <div className={styles.dropdownContent}>
                    <div className={styles.dropdownItem} onClick={() => { setSize('XS'); setShowDropdown(false); }}>XS</div>
                    <div className={styles.dropdownItem} onClick={() => { setSize('S'); setShowDropdown(false); }}>S</div>
                    <div className={styles.dropdownItem} onClick={() => { setSize('M'); setShowDropdown(false); }}>M</div>
                    <div className={styles.dropdownItem} onClick={() => { setSize('L'); setShowDropdown(false); }}>L</div>
                    <div className={styles.dropdownItem} onClick={() => { setSize('XL'); setShowDropdown(false); }}>XL</div>
                    <div className={styles.dropdownItem} onClick={() => { setSize('XXL'); setShowDropdown(false); }}>XXL</div>
                  </div>
                )}
              </div>
            </form>
            <label className={styles.qtyLabel}><input type="number" className={styles.qty} name="myNumber" value={qty}  min={1} max={100} onChange={onChange}/> qty</label>
            <button className={styles.cartBtn} onClick={handleSubmit}>ADD TO SHOPPING BAG</button>
           
          </div>
          </> : <p>404:couldn't find any products</p>
          }

          
        </div>

        <div className={styles.bottom}>
          <h2 className={styles.bottomHead}>view similar products</h2>
          

          <div className={styles.catList}>
            {cat && cat.map((item) => (
              <Link href={`/singledrop?id=${item._id}`} className={styles.catLink}>
                <img key={item._id} src={item.images[0]} alt="" />
              </Link>
            ))}
          </div>
         
            
          
            
        </div>
      </div>
      
    </>
  );
}