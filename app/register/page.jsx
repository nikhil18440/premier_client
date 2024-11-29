"use client"
import React, { useState } from 'react';

import './register.css'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '../../componants/navbar/Navbar';
import Footer from '../../componants/footer/Footer';
import kndl from '../../public/kndl.jpg'
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const RegisterPage = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [Firstpassword, setFirstPassword] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [user, setuser] = useState()

  const [error, seterror] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault

    if(firstName && lastName && email && password && Firstpassword && phoneNumber){
      if(firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0 || phoneNumber.length === 0 || Firstpassword.length === 0){
        seterror(true)
      }else{
        if (password !== Firstpassword) {
          seterror(true)
        }else{
          seterror(false)
        }
      }
    }else{
      seterror(true)
    }

    if(!error){
      try {
        const res = await axios.post(`${process.env.API_ENDPOINT}/auth/register`, {
          email: email,
          password: password,
          phoneNumber: phoneNumber,
          firstName: firstName,
          lastName: lastName,
        })
  
        if(res.status === 201){
          setuser(res.data)
          router.push('/login')
          // redirect('/register')
        }else if(res.status===202){
          alert(res.data.message)
          console.log('exists')
        }else{
          console.log('errrrrr')
        }
      } catch (error) {
        // console.log(error.response.data)
      }
    }else{
      if (password!==Firstpassword) {
        alert('Password not same')
      }else if (phoneNumber.length!==10) {
        alert('phone number must have 10 numbers')
      }
       else {
        alert('Please fill all the fields')
      }
    }

    
  }
  const router = useRouter()

  



  return (
    <>
    <div className='registerPageContainer'>
      <div className='leftSideContainer'>
        <h1 className='registerHeading'>Register</h1>
        <form action={handleSubmit}>
          {/* <div className='names'>
            <span> */}
            <input className='inputField' type="text" id="firstName" placeholder='First Name' name="firstName" onChange={(e) => setFirstName(e.target.value)}/>
            <label className='firstNameLabel' htmlFor="firstName">{firstName && firstName.length === 0 && 'this field must not be empty'}</label>
            {/* </span>
            <span> */}
            <input className='inputField' type="text" id="lastName" name="lastName" placeholder='Last Name'  onChange={(e) => setLastName(e.target.value)}/>
            <label className='lastNameLabel' htmlFor="lastName">{lastName && lastName.length === 0 && 'this field must not be empty'}</label>
            {/* </span>
          </div> */}
          <input className='inputField' type="email" id="email" name="email" placeholder='Email' minLength={6}  onChange={(e) => setEmail(e.target.value)}/>
          <label className='emailLabel' htmlFor="email">{email && email.length === 0 && 'this field must not be empty'}</label>
          
          <div className='passDiv'>
            <input className='passInput' type="password" id="password" placeholder='Password' name="password" minLength={6} onChange={(e) => setFirstPassword(e.target.value)} />
            <label className='passwordLabel' htmlFor="password">{Firstpassword && Firstpassword.length === 0 && 'this field must not be empty'}</label>
            {/* <FaEye className='eyeBox' id='eye' onClick={() => handleShowPwd('show')}/>
            <FaEyeSlash className='eyeBox' id='eyeSlash' onClick={() => handleShowPwd('hide')}/> */}
          </div>

          <input className='inputField' type="password" id="confirmPassword" placeholder='Confirm Password' name="confirmPassword"  onChange={(e) => setPassword(e.target.value)}/>
          <label className='confirmPasswordLabel' htmlFor="confirmPassword">{password && Firstpassword && password!==Firstpassword && 'both fields must be same'}</label>
          
          <input className='inputField' type="number" id="phoneNumber" name="phoneNumber" placeholder='PhoneNumber' minLength='10'  onChange={(e) => setPhoneNumber(e.target.value)}/>
          <label className='phoneNumberLabel' htmlFor="phoneNumber">{phoneNumber && phoneNumber.length === 0 && 'this field must not be empty'}</label>
          
          <button className='submitButton' type="submit">Register</button>
        
        </form>
        <p className='alreadyHaveAccountText'>Already have an account? <Link href='/login' style={{textDecoration: 'underline'}}>Login</Link></p>
      </div>
      {/* <div className='rightSideContainer'>
        <Image className='registerImage' src={kndl} alt="Register Image" />
      </div> */}
    </div>
    </>
  );
};

export default RegisterPage;