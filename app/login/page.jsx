"use client"
import React, { useEffect, useState } from 'react';
import './login.css'
import axios from 'axios';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import model from '../../public/kndl.jpg'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { userFetchFailure, userFetchStart, userFetchSuccess } from '../../redux/userReducer';
import Navbar from '../../componants/navbar/Navbar';
import Footer from '../../componants/footer/Footer';
import { setCart } from '@/redux/cartReducer';

function LoginPage() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [user, setuser] = useState()

  const userStore = useSelector(state => state.user)
  const dispatch = useDispatch()

  async function handleSubmit(e) {
    e.preventDefault
    try {
      const res = await axios.post(`${process.env.API_ENDPOINT}/auth/login`, {
        email: email,
        password: password
      })

      dispatch(userFetchStart())


      if(res){
        setuser(res.data)
        dispatch(userFetchSuccess(res.data))
        if(typeof window !== 'undefined'){
          localStorage.setItem('user', JSON.stringify(res.data))
          localStorage.setItem('token', JSON.stringify(res.data.accessToken))       
        }
        // find or set cart


        var cart = null
        if(res.data){
          const user = res.data
          
            try {

              const resCart = await axios.get(`${process.env.API_ENDPOINT}/cart/find/${user._id}`,{
                headers: {
                token:  `Bearer ${user.accessToken}`
                }
              })
              dispatch(setCart(resCart.data))
              console.log('found an existing cart:', resCart.data)
              if(typeof window !== 'undefined'){
                localStorage.setItem('cartId', JSON.stringify(resCart.data))
              }
              

            } catch (error) {
              try {
                const newCart = await axios.post(`${process.env.API_ENDPOINT}/cart/${user._id}`, {
                  userId: user._id,
                  products: [],
                  total: 0
                }, {headers: {token:`Bearer ${user.accessToken}`}})
                
                console.log('ress:',newCart.data)
                if(typeof window !== 'undefined'){
                  localStorage.setItem('cartId', JSON.stringify(newCart.data))
                }
                dispatch(setCart(newCart.data))
              } catch (error) {
                console.log(error)
              }
              console.log(error)
            }
          
        }
  



        router.push('/')
        // redirect('/register')
      }else{
        console.log('errrrrr')
      }
    } catch (error) {
      dispatch(userFetchFailure())
      // console.log(error.response.data)
    }

    
  }
  const router = useRouter()

  // useEffect(() => {
  //   console.log("user:",user)
    
  //   router.push('/register')
  //   redirect('/register')
  
  // }, [user])
  


  return (
    <>
    <div className="loginPageContainer">
      <div className="formContainer">
        <h2 className="loginTitle">Login</h2>
        <form action={handleSubmit}>
          {/* <label className="label" htmlFor="username">Username:</label> */}
          <input type="text" id="username" className="inputField" onChange={(e) => setEmail(e.target.value)} placeholder='email'/>
          <br />
          {/* <label className="label" htmlFor="password">Password:</label> */}
          <input type="password" id="password" className="inputField"  onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
          <br />
          {userStore.error && <p className="errorMsg">Wrong email or password</p>}
          <button className="loginButton" type='submit'>Login</button>
        </form>
        <p>don't have an account? <Link href="/register">Register</Link></p>

      </div>
      {/* <div className="imageContainer">
        <Image src={model} alt="Login Image" className="loginImage" />
      </div> */}
    </div>
    </>
  );
}

export default LoginPage;