import React from 'react';

import './register.css'
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <div className='registerPageContainer'>
      <div className='leftSideContainer'>
        <h1 className='registerHeading'>Register</h1>
        <form>
          <label className='firstNameLabel' htmlFor="firstName">First Name</label>
          <input className='inputField' type="text" id="firstName" name="firstName" />
          <label className='lastNameLabel' htmlFor="lastName">Last Name</label>
          <input className='inputField' type="text" id="lastName" name="lastName" />
          <label className='emailLabel' htmlFor="email">Email</label>
          <input className='inputField' type="email" id="email" name="email" />
          <label className='passwordLabel' htmlFor="password">Password</label>
          <input className='inputField' type="password" id="password" name="password" />
          <label className='confirmPasswordLabel' htmlFor="confirmPassword">Confirm Password</label>
          <input className='inputField' type="password" id="confirmPassword" name="confirmPassword" />
          <label className='phoneNumberLabel' htmlFor="phoneNumber">Phone Number</label>
          <input className='inputField' type="tel" id="phoneNumber" name="phoneNumber" />
          <button className='submitButton' type="submit">Register</button>
        </form>
        <p className='alreadyHaveAccountText'>Already have an account? <Link href='/login'>Login</Link></p>
      </div>
      <div className='rightSideContainer'>
        <img className='registerImage' src="/register-image.jpg" alt="Register Image" />
      </div>
    </div>
  );
};

export default RegisterPage;