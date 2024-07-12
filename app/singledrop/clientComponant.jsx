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
import Navbar from '../componants/navbar/Navbar.jsx';
// import {Swiper} from 'wiper';
import Sliding from '../componants/swiper/Swiper.jsx';
import Footer from '../componants/footer/Footer.jsx';
import { useSelector } from 'react-redux';
import { setCart,addProduct,delProduct } from '../redux/cartReducer.js';
import axios from 'axios';
import { useState } from 'react';
// import 'wiper/swiper-bundle.css'

export default function ClientComp(props) {


  // getting each product from api
  

  const data = JSON.parse(props.data)

  // importing carts and user store
  // const user = useSelector(state => state.user)
  // const cart = useSelector(state => state.cart)




  const [qty, setQty] = useState(1);
  const [hoveredImage, setHoveredImage] = useState(null);

  const [clr, setClr] = useState('red')

  const onSlctClr = (e) => {
    setClr(e.target.value)
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

  return (
    <>
      

      <div className={styles.singleproduct}>
       
        <div className={styles.top}>
          <div className={styles.left}>
            <img className={styles.leftImg} src={data.images[0]} width={700} height={700} objectFit='cover'/>
            <img className={styles.leftImg} src={data.images[1]} width={700} height={700} objectFit='cover'/>
            <img className={styles.leftImg} src={data.images[2]} width={700} height={700} objectFit='cover'/>
            <img className={styles.leftImg} src={data.images[0]} width={700} height={700} objectFit='cover'/>
            <img className={styles.leftImg} src={data.images[0]} width={700} height={700} objectFit='cover'/>
          </div>

          <div className={styles.right}>
            {/* <div className={styles.rightcontainer}> */}
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
              <label><input type="radio" name="options" value="option1"/> xs</label>
              <label><input type="radio" name="options" value="option2"/> s</label>
              <label><input type="radio" name="options" value="option3"/> m</label>
              <label><input type="radio" name="options" value="option1"/> l</label>
              <label><input type="radio" name="options" value="option2"/> xl</label>
              <label><input type="radio" name="options" value="option3"/> xxl</label>
              </div>
            </form>
            <label><input type="number" className={styles.qty} name="myNumber" value={qty}  min={1} max={100} onChange={onChange}/> qty</label>
            <button className={styles.cartBtn}>ADD TO SHOPPING BAG</button>
            {/* </div> */}
          </div>

          {/* <div className={styles.right}>
            <Image className={styles.leftImg} src={tshirt2} width={700} height={700} objectFit='cover'/>
          </div> */}
        </div>

        <div className={styles.bottom}>
          <h1 className={styles.bottomHead}>Product details</h1>
          

          <div className={styles.prodDesc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, aspernatur repellendus, corporis libero quo vitae cum consequuntur facere corrupti illum officiis magnam nemo! Temporibus voluptatem ea enim quos libero accusantium.</div>
            
          
            
        </div>
      </div>
      
    </>
  );
}