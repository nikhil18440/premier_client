import Footer from '@/componants/footer/Footer';
import Navbar from '@/componants/navbar/Navbar';
import React from 'react';
import styles from './style.module.css'
import { names } from '../general_names';

export default function Page() {
  return (
    <>
    <div className={styles.mainContainer}>
      <h1>{names.comp_name} Cancellation and Refund Policy</h1>

      <p>
        At {names.comp_name}, our primary goal is to provide our customers with exceptional products and services. To ensure transparency and mutual understanding, we have outlined our current policy regarding cancellations and refunds below. Please read this policy thoroughly before making any purchase.
      </p>

      <h2>1. Cancellation Policy</h2>

      <h3>1.1 No Cancellation Policy</h3>

      <p>
        At this time, {names.comp_name} does not offer cancellations for any orders once they have been placed and confirmed through our website or any affiliated platform. Our processing system is designed to handle orders efficiently and promptly, ensuring timely delivery and service. As a result, we are unable to accommodate cancellation requests.
      </p>

      <h3>1.2 Order Confirmation</h3>

      <p>
        Upon placing an order, customers will receive a confirmation email detailing their purchase. We strongly recommend reviewing this email carefully to ensure all information is correct. Should you notice any errors or discrepancies, please contact our customer service team within 24 hours to address any issues.
      </p>

      <h2>2. Refund Policy</h2>

      <h3>2.1 No Refund Policy</h3>

      <p>
        Currently, {names.comp_name} does not offer refunds for any products or services once a purchase has been completed. All sales are considered final. This policy applies universally to all our offerings, including but not limited to physical products, digital goods, and services.
      </p>

      <h3>2.2 Quality Assurance</h3>

      <p>
        {names.comp_name} is committed to delivering high-quality products and services. Each item undergoes rigorous inspection before shipping to ensure it meets our quality standards. If you receive a product that is defective or damaged, please contact our customer service team within 7 days of receipt. We will review your case and provide a suitable resolution, which may include a replacement or store credit, at our discretion.
      </p>

      <h2>3. Future Policy Updates</h2>

      <h3>3.1 Potential Future Changes</h3>

      <p>
        We understand that flexibility and customer satisfaction are important. {names.comp_name} is actively working on developing a comprehensive cancellation and refund policy to better serve our customers in the near future. Updates to our policy will be communicated through our website and other official channels. We encourage you to stay informed about any changes by checking our policy page regularly.
      </p>

      <h3>3.2 Customer Feedback</h3>

      <p>
        Your feedback is valuable to us as we work towards implementing a more flexible policy. If you have any suggestions or concerns regarding our cancellation and refund policy, please reach out to our customer service team. Your input will help us improve our services and meet your expectations.
      </p>

      <h2>4. Customer Support</h2>

      <h3>4.1 Contact Information</h3>

      <p>
        For any inquiries, concerns, or issues regarding your order, please contact our dedicated customer service team. We are here to assist you and ensure a positive experience with {names.comp_name}.
      </p>

      <ul>
        <li>Email: {names.email}</li>
        <li>Phone: {names.pNumber.map((i) => (<span>{i},</span>))}</li>
        <li>Address: {names.address}</li>
      </ul>

      <h3>4.2 Response Time</h3>

      <p>
        We aim to respond to all customer inquiries within 48 hours. Our team is committed to providing timely and effective assistance to address your needs.
      </p>

      <h2>5. Exceptions and Special Circumstances</h2>

      <h3>5.1 Extraordinary Circumstances</h3>

      <p>
        While our current policy does not allow for cancellations or refunds, we recognize that extraordinary circumstances may occur. In such cases, we review each situation on a case-by-case basis. Please contact our customer service team to discuss your specific circumstances, and we will do our best to provide a satisfactory resolution.
      </p>

      <h2>6. Acceptance of Policy</h2>

      <p>
        By making a purchase from {names.comp_name}, you acknowledge that you have read, understood, and agreed to this cancellation and refund policy. We appreciate your understanding and support as we work towards enhancing our policies to better serve you.
      </p>

      <p>
        Thank you for choosing {names.comp_name}. We look forward to providing you with exceptional products and services, and we appreciate your patience and understanding as we continue to improve our policies for your benefit.
      </p>
    </div>
    </>
  )}