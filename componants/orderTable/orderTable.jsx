// src/OrderTable.js
import React from 'react';
import styles from './style.module.css'; // Import CSS module
import { redirect } from 'next/navigation';
import Link from 'next/link';

const OrderTable = ({ orders }) => {
    

  return (
    <div className={styles.tableResponsive}>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Delivery Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order._id}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{new Date(order.deliveryDate).toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td>{order.total}</td>
              <td>{order.quantity}</td>
              <td>
                <Link className={styles.viewOrderButton} href={{
                  pathname: `/order_summary/${order._id}`,
                  query: {orderIdQuery:`${order._id}`}
                }}>View Order</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;