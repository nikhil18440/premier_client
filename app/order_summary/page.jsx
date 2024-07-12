import React from 'react';
import styles from './orders.module.css';
import prod from '../../public/prods.jpg'
import Image from 'next/image';
import Navbar from '../componants/navbar/Navbar';
import Footer from '../componants/footer/Footer';

export default function OrderPage() {
  const orders = [
    {
      id: 1234,
      status: 'Pending',
      date: '2023-02-20 14:30',
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
    {
      id: 5678,
      status: 'Pending',
      date: '2023-02-22 10:45',
      products: [
        {
          id: 3,
          image: prod,
          color: 'Green',
          size: 'Small',
          quantity: 3,
          name: 'Product 3',
          price: 14.99,
        },
      ],
    },
    {
      id: 9012,
      status: 'Delivered',
      date: '2023-02-15 12:00',
      products: [
        {
          id: 4,
          image: prod,
          color: 'Yellow',
          size: 'Large',
          quantity: 1,
          name: 'Product 4',
          price: 24.99,
        },
        {
          id: 5,
          image: prod,
          color: 'Black',
          size: 'Medium',
          quantity: 2,
          name: 'Product 5',
          price: 19.99,
        },
      ],
    },
  ];

  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <h1 className={styles.header}>Order History</h1>
      <div className={styles.pendingOrdersSection}>
        <h2 className={styles.sectionHeader}>PENDING ORDERS</h2>
        <ul className={styles.orderList}>
          {orders.filter(order => order.status === 'Pending').map(order => (
            <li key={order.id} className={styles.orderItem}>
              <span className={styles.orderId}>Order #{order.id}</span>
              <span className={styles.orderStatus}>{order.status}</span>
              <span className={styles.orderDate}>{order.date}</span>
              {/* <button className={styles.showMoreButton}>Show More</button> */}
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
      <div className={styles.allOrdersSection}>
        <h2 className={styles.sectionHeader}>ALL ORDER HISTORY</h2>
        <ul className={styles.orderList}>
          {orders.map(order => (
            <li key={order.id} className={styles.orderItem}>
              <span className={styles.orderId}>Order #{order.id}</span>
              <span className={styles.orderStatus}>{order.status}</span>
              <span className={styles.orderDate}>{order.date}</span>
              {/* <button className={styles.showMoreButton}>Show More</button> */}
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
    </div>
    <Footer/>
    </>
  )}