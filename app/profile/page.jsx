"use client"
import React, { useState } from 'react';
import styles from './profile.module.css';
import Navbar from '../componants/navbar/Navbar';
import Footer from '../componants/footer/Footer';

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    address: '123 Main St',
    pincode: '12345',
    phoneNumber: '123-456-7890',
    state: 'California'
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <>
    <Navbar/>
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
      {editing ? (
        <button className={styles.btn} onClick={handleSave}>Save Changes</button>
      ) : (
        <button className={styles.btn} onClick={handleEdit}>Edit Profile</button>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default ProfilePage;