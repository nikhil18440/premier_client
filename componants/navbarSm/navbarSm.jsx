'use client'
import { CiMenuBurger, CiShoppingCart, CiUser } from 'react-icons/ci';
import './navbarSm.css';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { HiMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';

const NavbarSm = () => {
  const [toggle, setToggle] = useState(false)

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

  
  var slideDiv = null


  function toggleFunc(state) {
    setToggle(state)
   
    if(typeof window !== "undefined"){
      // slideDiv = window.document.getElementById('.items').style.animationName = 'toggleOn';
      // slideDiv = window.document.getElementsByClassName('.items')[0].style.backgroundColor = 'red';
    }
      // slideDiv
   
    console.log(slideDiv)
  }

  return (
    <div className='navbarSm'>

      <div className='midWrapper'>

          {
            userStore.user && (
              <ul className='mid'>
            <li className='iconItem' onClick={() => toggleFunc(false)}>
                <Link href="/cart" className='iconLink'>
                  <CiShoppingCart className="fas fa-shopping-cart" size={25}/>
                </Link>
                <span className='cartItemNum' style={cartNum===null || cartNum===0 ? {display:'none'}: {display:'block'}}>{cartStore.cart ? cartStore.cart.products.length : 0}</span>
              </li>
              <li className='iconItem' onClick={() => toggleFunc(false)}>
                <Link href="/profile" className='iconLink'>
                  <CiUser className="fas fa-list-alt" size={25}/>
                </Link>
              </li>
          </ul>
            )
          }

      <div className='right'>
        <HiMenu size={25} fontWeight={800} id='toggleIcon' onClick={() => toggleFunc(true)} className='toggleMenu'/>
        {/* <CiMenuBurger size={23} fontWeight={800} onClick={() => setToggle(!toggle)}/> */}
        
        {
          toggle && (
            <ul className='items'>

              <li className='closeBtn' onClick={() => toggleFunc(false)}>
                <MdClose size={25}/>
              </li>

              <li className='navItem' onClick={() => toggleFunc(false)}>
              <Link href="/" className='navLink'>
                Home
              </Link>
            </li>
            {/* <li className='navItem' onClick={() => toggleFunc(false)}>
              <Link href="/review" className='navLink'>
                Review
              </Link>
            </li> */}
            <li className='navItem' onClick={() => toggleFunc(false)}>
              <Link href="/collection" className='navLink'>
                Collection
              </Link>
            </li>
            {/* {
              userStore.user !== null && <li className='navItem' onClick={() => toggleFunc(false)}>
              <Link href="/order_summary" className='navLink'>
                All orders
              </Link>
            </li>
            } */}
            <li className='navItem'  onClick={() => toggleFunc(false)}>
              <Link href="/aboutus" className='navLink'>
                About Us
              </Link>
            </li>
            <li className='navItem'  onClick={() => toggleFunc(false)}>
              <Link href="/contact" className='navLink'>
                Contact
              </Link>
            </li>
            {
              !userStore.user && <>
              <li className='navItem' onClick={() => toggleFunc(false)}>
                <Link href='/login'>login</Link>
              </li>
              <li className='navItem' onClick={() => toggleFunc(false)}>
                <Link href='/register'>signup</Link>
              </li>
            </>
            }
            </ul>

          )
        }


        
      </div>
      </div>
      </div>


  );
};

export default NavbarSm;