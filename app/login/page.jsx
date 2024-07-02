import React from 'react';
import './login.css'
// import model from 'kendall.jpg'

function LoginPage() {
  return (
    <div className="loginPageContainer">
      <div className="formContainer">
        <h2 className="loginTitle">Login</h2>
        <form>
          <label className="label" htmlFor="username">Username:</label>
          <input type="text" id="username" className="inputField" />
          <br />
          <label className="label" htmlFor="password">Password:</label>
          <input type="password" id="password" className="inputField" />
          <br />
          <button className="loginButton">Login</button>
        </form>
      </div>
      <div className="imageContainer">
        <img src='kndl.jpg' alt="Login Image" className="loginImage" />
      </div>
    </div>
  );
}

export default LoginPage;