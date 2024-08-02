import React from 'react'
import Navbar from '../../componants/navbar/Navbar'
import Footer from '../../componants/footer/Footer'
import styles from './terms.module.css'
import { names } from '../general_names'

export default function page() {
  return (
    <>
  
    <div className={styles.terms}>
        <p>Welcome to {names.comp_name}! These terms and conditions outline the rules and regulations for the use of {names.comp_name}'s website, located at www.louvy.com.
        </p>

        <h4>Company Details</h4>
        <p>
          Company Name: {names.comp_name}<br/>
          Address: {names.address}<br/>
          Email: {names.email}<br/>
          Phone Number: {names.pNumber.map((num,key) => (<span key={key}>{num},</span>))}
        </p>

        <h4>1. Introduction</h4>
        <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use {names.comp_name} if you do not agree to take all of the terms and conditions stated on this page.</p>

        <h4>2. Intellectual Property Rights</h4>
        <p>
        Unless otherwise stated, {names.comp_name} and/or its licensors own the intellectual property rights for all material on {names.comp_name}. All intellectual property rights are reserved. You may access this from {names.comp_name} for your own personal use subjected to restrictions set in these terms and conditions.

        You must not:

        Republish material from {names.comp_name}
        Sell, rent, or sub-license material from {names.comp_name}
        Reproduce, duplicate, or copy material from {names.comp_name}
        Redistribute content from {names.comp_name}
        </p>

        <h4>3. User Accounts</h4>
        <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
        You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
        </p>

        <h4>4. Orders and Payments</h4>
        <p>By placing an order with {names.comp_name}, you are offering to purchase a product on and subject to the following terms and conditions. All orders are subject to availability and confirmation of the order price.
        We accept various payment methods including credit/debit cards and PayPal. Payment is due at the time of order.
        </p>

        <h4>5. Shipping and Delivery</h4>
        <p>We ship to various locations in India. Shipping charges and delivery times will be calculated and displayed at checkout. Please note that delivery times are estimates and are not guaranteed. {names.comp_name} is not responsible for delays caused by shipping carriers or customs clearance.</p>

        <h4>6. Returns and Refunds</h4>
        <p>There are currently no refunds and returns available. For further information please view our return policy</p>

        <h4>7. Limitation of Liability</h4>
        <p>{names.comp_name} will not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, or any other damages of any kind, arising out of or related to your use of the site or the products purchased.
        </p>
        
        <h4>8. Changes to Terms</h4>
        <p>{names.comp_name} reserves the right, at its sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </p>

        <h4>9. Governing Law</h4>
        <p>These Terms shall be governed and construed in accordance with the laws of [Indian Jurisdiction], without regard to its conflict of law provisions.
        </p>

        <h4>10. Contact Us</h4>
        <p>If you have any questions about these Terms, please contact us at {names.email} or {names.pNumber.map((i) => (<span>{i},</span>))}</p>

    </div>

    </>
  )
}
