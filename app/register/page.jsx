"use client"
import React, { useState } from 'react';

import './register.css'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '../componants/navbar/Navbar';
import Footer from '../componants/footer/Footer';

const RegisterPage = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [user, setuser] = useState()

  async function handleSubmit(e) {
    e.preventDefault
    try {
      const res = await axios.post(`${process.env.API_ENDPOINT}/auth/register`, {
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        firstName: firstName,
        lastName: lastName,
      })

      if(res){
        setuser(res.data)
        router.push('/login')
        // redirect('/register')
      }else{
        console.log('errrrrr')
      }
    } catch (error) {
      // console.log(error.response.data)
    }

    
  }
  const router = useRouter()

  return (
    <>
    <Navbar/>
    <div className='registerPageContainer'>
      <div className='leftSideContainer'>
        <h1 className='registerHeading'>Register</h1>
        <form action={handleSubmit}>
          <label className='firstNameLabel' htmlFor="firstName">First Name</label>
          <input className='inputField' type="text" id="firstName" name="firstName" onChange={(e) => setFirstName(e.target.value)}/>
          <label className='lastNameLabel' htmlFor="lastName">Last Name</label>
          <input className='inputField' type="text" id="lastName" name="lastName"  onChange={(e) => setLastName(e.target.value)}/>
          <label className='emailLabel' htmlFor="email">Email</label>
          <input className='inputField' type="email" id="email" name="email"  onChange={(e) => setEmail(e.target.value)}/>
          <label className='passwordLabel' htmlFor="password">Password</label>
          <input className='inputField' type="password" id="password" name="password" />
          <label className='confirmPasswordLabel' htmlFor="confirmPassword">Confirm Password</label>
          <input className='inputField' type="password" id="confirmPassword" name="confirmPassword"  onChange={(e) => setPassword(e.target.value)}/>
          <label className='phoneNumberLabel' htmlFor="phoneNumber">Phone Number</label>
          <input className='inputField' type="tel" id="phoneNumber" name="phoneNumber"  onChange={(e) => setPhoneNumber(e.target.value)}/>
          <button className='submitButton' type="submit">Register</button>
        </form>
        <p className='alreadyHaveAccountText'>Already have an account? <Link href='/login'>Login</Link></p>
      </div>
      <div className='rightSideContainer'>
        <img className='registerImage' src="/register-image.jpg" alt="Register Image" />
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default RegisterPage;