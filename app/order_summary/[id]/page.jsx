'use client'
import React, { useEffect, useState } from 'react';
import styles from './orders.module.css';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setOrder } from '@/redux/orderReducer';
import { useRouter, useSearchParams } from 'next/navigation';

export default function OrderPage() {
  
  const orderState = useSelector(state => state.order)
  const userStore = useSelector(state => state.user)

  const router = useRouter()
  const searchParams = useSearchParams()
  const orderIdQuery = searchParams.get('orderIdQuery')
  console.log('query:',orderIdQuery)
  
  const dispatch = useDispatch()
  
  const [order, setSingleOrder] = useState()
  const [products, setProducts] = useState([])
  
  console.log('jhjhhjh:', order)
  console.log('first')

  async function findOrder() {
    if(userStore.user){

      if (orderState.orderList === null) {
        try {
      
          const resOrder = await axios.get(`${process.env.API_ENDPOINT}/order/find/${userStore.user._id}`,{
            headers: {
            token:  `Bearer ${userStore.user.accessToken}`
            }
          })
          console.log(resOrder.data)
          dispatch(setOrder(resOrder.data))
          let finalOrder = filterOrder(resOrder.data)
          setSingleOrder(finalOrder)

          findProducts(finalOrder.products)
          


        } catch (error) {
          console.log(error)
        }
      }else{
        let finalOrder = filterOrder(orderState.orderList)
        setSingleOrder(finalOrder)
        findProducts(finalOrder.products)
      }
    }
  }

  useEffect(() => {
    console.log('this isss:',order)
    findOrder()
    
  }, [])

  // filtering order to find single order
  function filterOrder(orderList) {
    if(orderList){
      
      for (let i = 0; i < orderList.length; i++) {
        if(orderList[i]._id === orderIdQuery){
          return orderList[i]
        }
      }
    }
  }

  // finding all products in the order
  async function findProducts(prods) {
    console.log('rock',prods)
    let prodArr = []
    
      for (let i = 0; i < prods.length; i++) {
        
        const res = await axios.get(`${process.env.API_ENDPOINT}/product/${prods[i].productId}`)
        .then((res) => {
          console.log(i)
          if(res.data){
            prodArr.push(res.data)
          }
          console.log('prodss:',products)
        })
        
        

      }
      setProducts(prodArr)
    
  }





  // const order = {
  //   orderId: '12345',
  //   orderDate: '2023-10-01',
  //   deliveryDate: '2023-10-05',
  //   status: 'Shipped',
  //   total: 150.00,
  //   quantity: 3,
  //   products: [
  //     {
  //       id: 1,
  //       title: 'Product 1',
  //       size: 'M',
  //       quantity: 1,
  //       price: 50.00,
  //       imageUrl: 'https://via.placeholder.com/100'
  //     },
  //     {
  //       id: 2,
  //       title: 'Product 2',
  //       size: 'L',
  //       quantity: 2,
  //       price: 25.00,
  //       imageUrl: 'https://via.placeholder.com/100'
  //     }
  //   ]
  // };
  

  return (
    <>
    {
      order ? <div className={styles.container}>
      <div className={styles.orderDetails}>
      <h1 className={styles.title}>Order Details</h1>
      <div className={styles.summary}>
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
        <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> ${order.total}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
      </div>
      <h2 className={styles.productsTitle}>Products</h2>
      <div className={styles.products}>
        {products && products.map((product,index) => (
          <div key={index} className={styles.product}>
            <img src={product.images[0]} alt={product.title} className={styles.image} />
            <div className={styles.productDetails}>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <p><strong>Size:</strong> {order.products[index] ? order.products[index].size : 's'}</p>
              <p><strong>Quantity:</strong> {order.products[index] ? order.products[index].quantity: 2}</p>
              <p><strong>Price:</strong> ${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  


    </div> : 'hiiiiiiiii'
    }
    </>
  )}