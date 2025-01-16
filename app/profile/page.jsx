"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './profile.module.css';
import Navbar from '../../componants/navbar/Navbar';
import Footer from '../../componants/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { userFetchFailure, userFetchStart, userFetchSuccess } from '../../redux/userReducer';
import axios from 'axios';
import Broken from '@/componants/broken/broken';
import prod from '../../public/prods.jpg'
import Image from 'next/image';
import OrderTable from '@/componants/orderTable/orderTable';
import { setOrder } from '@/redux/orderReducer';

const ProfilePage = () => {

  const userStore = useSelector(state => state.user)
  const orderStore = useSelector(state => state.order)

  useLayoutEffect(() => {
    if(userStore.user === null){
      // redirect('/')
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

  async function findOrder () {
    if(userStore.user){
      setProfile(userStore.user)

      if (orderStore.orderList === null) {
        try {
      
          const resOrder = await axios.get(`${process.env.API_ENDPOINT}/order/find/${userStore.user._id}`,{
            headers: {
            token:  `Bearer ${userStore.user.accessToken}`
            }
          })
          console.log(resOrder.data)
          dispatch(setOrder(resOrder.data))
          console.log('orderr:', orderStore)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
  
  useEffect(() => {
    findOrder()
    
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
          token: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      if(res.data){
        dispatch(userFetchSuccess(res.data))
        if(typeof window !== 'undefined'){
          localStorage.setItem('user', JSON.stringify(profile))
        }
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
    localStorage.clear()
    window.location.reload()
  }


  // orders
  const orders = [
    {
      orderId: 1234,
      status: 'Pending',
      orderDate: '2023-02-20 14:30',
      deliveryDate: '2023-02-25 14:30',
      total: 1600,
      quantity: 2,
      products: [
        {
          id: 1,
          image: prod,
          color: 'Red',
          size: 'Large',
          quantity: 2,
          name: 'Product 1',
          price: 19.99,
        },
        {
          id: 2,
          image: prod,
          color: 'Blue',
          size: 'Medium',
          quantity: 1,
          name: 'Product 2',
          price: 9.99,
        },
      ],
    },
    // {
    //   id: 5678,
    //   status: 'Pending',
    //   order_date: '2023-02-20 14:30',
    //   delivery_date: '2023-02-25 14:30',
    //   products: [
    //     {
    //       id: 3,
    //       image: prod,
    //       color: 'Green',
    //       size: 'Small',
    //       quantity: 3,
    //       name: 'Product 3',
    //       price: 14.99,
    //     },
    //   ],
    // },
    // {
    //   id: 9012,
    //   status: 'Delivered',
    //   order_date: '2023-02-20 14:30',
    //   delivery_date: '2023-02-25 14:30',
    //   products: [
    //     {
    //       id: 4,
    //       image: prod,
    //       color: 'Yellow',
    //       size: 'Large',
    //       quantity: 1,
    //       name: 'Product 4',
    //       price: 24.99,
    //     },
    //     {
    //       id: 5,
    //       image: prod,
    //       color: 'Black',
    //       size: 'Medium',
    //       quantity: 2,
    //       name: 'Product 5',
    //       price: 19.99,
    //     },
    //   ],
    // },
  ];


  return (
    <>
    {
      profile ? 

      <div>

        {/* order history */}
        <OrderTable orders={orderStore.orderList}/>

        

        {/* <div className={styles.history}>
          <h1 className={styles.header}>Order History</h1>
          <div className={styles.pendingOrdersSection}>
            <h2 className={styles.sectionHeader}>PENDING ORDERS</h2>
            <ul className={styles.orderList}>
              {orders.filter(order => order.status === 'Pending').map(order => (
                <li key={order.id} className={styles.orderItem}>
                  <span className={styles.orderId}>Order #{order.id}</span>
                  <span className={styles.orderStatus}>{order.status}</span>
                  <span className={styles.orderDate}>{order.date}</span>
                  <button className={styles.showMoreButton}>Show More</button>
                  <div className={styles.productList}>
                    {order.products.map(product => (
                      <div key={product.id} className={styles.productItem}>
                        <Image src={product.image} width={200} height={200} alt={product.name} className={styles.productImage} />
                        <div className={styles.productInfo}>
                          <span className={styles.productName}>{product.name}</span>
                          <span className={styles.productColor}>{product.color}</span>
                          <span className={styles.productSize}>{product.size}</span>
                          <span className={styles.productQuantity}>x{product.quantity}</span>
                          <span className={styles.productPrice}>${product.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div> */}

        {/* general info */}
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
      </div>
      
      : <Broken/>
    }
    </>
  );
};

export default ProfilePage;