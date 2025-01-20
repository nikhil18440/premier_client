// components/Navbar.js
"use client"
import Link from 'next/link';
import styles from './navbar2.module.css';
import {CiUser,CiShoppingCart} from 'react-icons/ci'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NavbarSm from '../navbarSm/navbarSm';
import { names } from '@/app/general_names';

const Navbar2 = () => {

  const userStore = useSelector(state => state.user)
  const cartStore = useSelector(state => state.cart)

  var prods = 0
  var cartSess = null
  if(typeof window !== 'undefined'){
    JSON.parse(localStorage.getItem('cartId'))
  }
  
  if(cartSess){
    prods = cartSess.products.length
  }
  useEffect(() => {
    if(cartSess){
      prods = cartSess.products.length
    }
  }, [cartStore.cart])
  
  var cartNum = null

  if(cartStore.cart){
    cartNum = cartStore.quantity
  }

  const [screenSize, setscreenSize] = useState()
  const [activeLink, setActiveLink] = useState(null)

  useEffect(() => {
    setscreenSize(window.screen.width)
  }, [])

  // const handleOutsideClick = (event) => {
  //   if (!event.target.closest(`.${styles.cats}`) && !event.target.closest(`.${styles.navLink}`)) {
  //     setActiveLink(null)
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('click', handleOutsideClick)
  //   return () => {
  //     document.removeEventListener('click', handleOutsideClick)
  //   }
  // }, [])
  

  // const handleMouseOver = (link) => {
  //   setActiveLink(link)
  // }

  // const handleMouseOut = () => {
  //   setActiveLink(null)
  // }


  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <a href="/" className={styles.logo}>
          <img src="fengLogo_W.png" alt="Company Logo" />
          {/* {names.comp_name} */}
        </a>
      </div>

      {/* large navbar */}
      
      <div className={styles.middle}>
        <ul className={styles.navLinks}>

          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>

          {/* <li className={styles.navItem}>
            <Link href="/review" className={styles.navLink}>
              Review
            </Link>
          </li> */}

          <li className={styles.navItem}>
            <Link href="/collection" className={styles.navLink} >
              Collection
            </Link>
            <div className={styles.category}>kjkhjh</div>
            {/* <div className={styles.cats} id='cat1' style={activeLink === 'collection' ? {display: 'block'} : {display: 'none'}}>hi hi hi</div> */}
          </li>

          {/* {
            userStore.user !== null ? <li className={styles.navItem}>
            <Link href="/order_summary" className={styles.navLink}>
              All orders
            </Link>
          </li> : <></>
          } */}

          <li className={styles.navItem}>
            <Link href="/aboutus" className={styles.navLink}  onMouseOver={() => handleMouseOver('about us')}>
              About Us
            </Link>
            <div className={styles.category}>looo</div>
            {/* <div className={styles.cats} id='cat1' style={activeLink === 'about us' ? {display: 'block'} : {display: 'none'}}>loooo</div> */}
          </li>
          
          <li className={styles.navItem}>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
            <div className={styles.category}>kjkhjh</div>
          </li>

        </ul>
      </div>



      <div className={styles.right}>
        {
         <ul className={styles.icons}>
          <li className={styles.iconItem}>
            <Link href="/cart" className={styles.iconLink}>
              <CiShoppingCart className="fas fa-shopping-cart" size={30}/>
            </Link>
            <span className={styles.cartItemNum} style={cartNum===null || cartNum===0 ? {display:'none'}: {display:'block'}}>{cartStore.cart && cartStore.cart.products ? cartStore.cart.products.length : 0}</span>
          </li>
          <li className={styles.iconItem}>
            <Link href="/profile" className={styles.iconLink}>
              <CiUser className="fas fa-list-alt" size={30}/>
            </Link>
          </li>
          <div className={styles.rightBtns}>
          <Link href='/login' className={styles.loginBtn}>login</Link>
          <Link href='/register' className={styles.registerBtn}>signup</Link>
        </div>
        </ul> 
        }
      </div>
      


        {/* small navbar */}
        <div className={styles.smallbar}>
          <NavbarSm/>
        </div>
      
      
      

    </div>
    
  );
};

export default Navbar2;