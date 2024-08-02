"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './profile.module.css';
import Navbar from '../../componants/navbar/Navbar';
import Footer from '../../componants/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { userFetchFailure, userFetchStart, userFetchSuccess } from '../../redux/userReducer';
import axios from 'axios';

const ProfilePage = () => {

  const userStore = useSelector(state => state.user)

  useLayoutEffect(() => {
    if(userStore.user === null){
      redirect('/')
    }
  }, [])

  
  
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: null,
    lastName: null,
    email: null,
    address: null,
    pincode: null,
    phoneNumber: null,
    state: null
  });
  
  useEffect(() => {
    if(userStore.user){
      setProfile(userStore.user)
    }
  }, [userStore.user])
  


  const handleEdit = () => {
    setEditing(true);
  };

  const dispatch = useDispatch()

  

  const handleSave = async () => {
    setEditing(false);
    try {
      dispatch(userFetchStart())
      const res = await axios.put(`${process.env.API_ENDPOINT}/user/${userStore.user._id}`, profile,{
        headers: {
          token: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
        }
      })
      if(res.data){
        dispatch(userFetchSuccess(res.data))
        sessionStorage.setItem('user', JSON.stringify(profile))
      }
    } catch (error) {
      dispatch(userFetchFailure())
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  

  function handleLogout() {
    sessionStorage.clear()
    window.location.reload()
  }

  return (
    <>
    <div className={styles.container}>
      <h1>Profile Page</h1>
      <div className={styles.profileInfo}>
        <label>First Name:</label>
        {editing ? (
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleInputChange}
          />
        ) : (
          <span>{profile.firstName}</span>
        )}
        <br />
        <label>Last Name:</label>
        {editing ? (
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleInputChange}
          />
        ) : (
          <span>{profile.lastName}</span>
        )}
        <br />
        <label>Email:</label>
        {editing ? (
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
          />
        ) : (
          <span>{profile.email}</span>
        )}
        <br />
        <label>Address:</label>
        {editing ? (
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleInputChange}
          />
        ) : (
          <span>{profile.address}</span>
        )}
        <br />
        <label>Pincode:</label>
        {editing ? (
          <input
            type="text"
            name="pincode"
            value={profile.pincode}
            onChange={handleInputChange}
          />
        ) : (
          <span>{profile.pincode}</span>
        )}
        <br />
        <label>Phone Number:</label>
        {editing ? (
          <input
            type="tel"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleInputChange}
          />
        ) : (
          <span>{profile.phoneNumber}</span>
        )}
        <br />
        <label>State:</label>
        {editing ? (
          <input
            type="text"
            name="state"
            value={profile.state}
            onChange={handleInputChange}
          />
        ) : (
          <span>{profile.state}</span>
        )}
      </div>
      <div className={styles.btnDiv}>
      {editing ? (
        <button className={styles.btn} onClick={handleSave}>Save Changes</button>
      ) : (
        <button className={styles.btn} onClick={handleEdit}>Edit Profile</button>
      )}

      {
        userStore.user !== null ? <button className={styles.logout} onClick={handleLogout}>Logout</button> : <></>
      }
      </div>
    </div>
    </>
  );
};

export default ProfilePage;