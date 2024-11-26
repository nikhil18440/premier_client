'use client'
import React from 'react'
import Navbar from '../../componants/navbar/Navbar'
import Footer from '../../componants/footer/Footer'
import styles from './returnpol.module.css'
import { names } from '../general_names'
import { useSelector } from 'react-redux'

export default function page() {

  const orderSelector = useSelector(state => state.order)

  console.log(orderSelector)


  return (
    <div className={styles.mainDiv}>
    <div class={styles.container}>
  <h3>{process.env.COMP}{names.comp_name} Return and Refund Policy</h3>
  <p>Welcome to {names.comp_name}! We strive to ensure our customers have a great shopping experience with us. We understand that a comprehensive return and refund policy is an important aspect of this experience.</p>

  <h4>Current Policy</h4>
  <p>No Returns or Refunds</p>
  <p>As of now, {names.comp_name} does not accept returns or provide refunds for any products purchased. All sales are considered final. We encourage our customers to carefully review product descriptions, specifications, and sizing charts before making a purchase to ensure satisfaction with the chosen items.</p>

  <h4>Forthcoming Policy (Available Soon)</h4>
  <p>We are excited to announce that we are developing a return and refund policy that will soon be available to our valued customers. Below is an outline of the key components of the policy we are planning to implement:</p>

  <ol>
    <li>
      <h5>Eligibility for Returns</h5>
      <p>When our return policy becomes active, the following conditions will apply to determine eligibility for returns:</p>
      <ul>
        <li>Time Frame: Products must be returned within 30 days of the purchase date.</li>
        <li>Condition: Items must be in their original, unused condition with all tags and packaging intact.</li>
        <li>Proof of Purchase: A valid receipt or proof of purchase is required.</li>
      </ul>
    </li>
    <li>
      <h5>Non-Returnable Items</h5>
      <p>Certain items may not be eligible for return, including but not limited to:</p>
      <ul>
        <li>Custom-made or personalized products</li>
        <li>Clearance or sale items</li>
      </ul>
    </li>
    <li>
      <h5>Return Process</h5>
      <p>To initiate a return once the policy is in place, customers will need to follow these steps:</p>
      <ol>
        <li>Contact Customer Service: Reach out to our customer service team at {names.email} or {names.pNumber.map((i) => (<span>{i},</span>))} to request a return authorization.</li>
        <li>Return Authorization: Upon approval, a return authorization number and instructions for returning the item will be provided.</li>
        <li>Packaging: Pack the item securely in its original packaging, including all accessories, manuals, and documentation.</li>
        <li>Shipping: Ship the item to the address provided using a trackable shipping method.</li>
      </ol>
    </li>
    <li>
      <h5>Refunds</h5>
      <p>Once a returned item is received and inspected, the refund process will be as follows:</p>
      <ol>
        <li>Inspection: Our team will inspect the returned item to ensure it meets the return eligibility criteria.</li>
        <li>Approval: If approved, a refund will be processed to the original payment method within 7-10 business days.</li>
        <li>Notification: Customers will be notified via email once the refund has been processed.</li>
      </ol>
    </li>
    <li>
      <h5>Exchanges</h5>
      <p>Exchanges will also be available for eligible items. The process for exchanges will be similar to the return process, with the option to select a different size, color, or product.</p>
    </li>
    <li>
      <h5>Damaged or Defective Items</h5>
      <p>If a product is received in a damaged or defective condition, customers should contact our customer service team immediately. We will provide instructions for returning the item and will offer a replacement or refund as appropriate.</p>
    </li>
  </ol>

  <h4>Contact Us</h4>
  <p>We value our customers and are committed to providing a positive shopping experience. If you have any questions or concerns about our current or forthcoming return policy, please do not hesitate to contact us.</p>
  <p>Email: {names.email}</p>
  <p>Phone: {names.pNumber.map((i) => (<span>{i},</span>))}</p>

  <p>Thank you for choosing {names.comp_name}. We appreciate your business and look forward to serving you better with our upcoming return and refund policy.</p>

  <p>Sincerely,</p>
  <p>The {names.comp_name} Team</p>
  </div>
</div>
  )
}
