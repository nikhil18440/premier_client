'use client'
import React from 'react'
import Navbar from '../../componants/navbar/Navbar'
import Footer from '../../componants/footer/Footer'
import styles from './returnpol.module.css'
import { useSelector } from 'react-redux'

export default function Page() {
  const orderSelector = useSelector(state => state.order)

  console.log(orderSelector)

  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.title}>Fengxi Return and Exchange Policy</h1>

      <p className={styles.intro}>
        At Fengxi, customer satisfaction is our priority. To ensure a smooth experience, we’ve outlined our return and exchange policy below:
      </p>

      <h2 className={styles.subTitle}>Eligibility for Returns and Exchanges</h2>
      <ul className={styles.list}>
        <li><strong>Returns</strong>: Products can only be returned if they arrive with damage.</li>
        <li><strong>Exchanges</strong>: Products can be exchanged if there are size-related issues.</li>
        <li><strong>Exchange Preference</strong>: If you prefer an exchange instead of a return for a damaged product, we’ll accommodate your request.</li>
      </ul>

      <h2 className={styles.subTitle}>Return Process</h2>
      <p className={styles.secP}>If you receive a damaged product, follow these steps to request a return:</p>
      <ol className={styles.steps}>
        <li><strong>Document the Issue</strong>: Take clear pictures and a video of the damaged product.</li>
        <li><strong>Contact Support</strong>: Send the photos and video to our support team via [Support Number/Email].</li>
        <li><strong>Verification</strong>: Our officials will review the submitted evidence to verify the damage.</li>
        <li><strong>Return Label</strong>: Once the damage is confirmed, a return label will be emailed to you.</li>
        <li><strong>Prepare the Package</strong>: Securely pack the damaged product in a package and attach the return label on top.</li>
        <li><strong>Send the Product</strong>: Use the courier service specified by our support team to send the package back.</li>
        <li><strong>Verification & Resolution</strong>: Upon receiving and verifying the returned product, we will:
          <ul>
            <li>Send a replacement product for exchange or</li>
            <li>Process a refund based on your preference.</li>
          </ul>
        </li>
      </ol>

      <h2 className={styles.subTitle}>Exchange Process</h2>
      <p className={styles.thirdP}>If you encounter size-related issues:</p>
      <ol className={styles.steps}>
        <li>Contact our support team within <strong>5 days</strong> of receiving your order.</li>
        <li>Provide the required details about the issue.</li>
        <li>Once verified, we will ship the replacement product within <strong>5-7 business days</strong>.</li>
      </ol>

      <h2 className={styles.subTitle}>Important Timelines</h2>
      <ul className={styles.list}>
        <li><strong>Submission Window</strong>: Requests for returns or exchanges must be initiated within <strong>5 days</strong> of receiving the package.</li>
        <li><strong>Processing Time</strong>: Replacement products or refunds will be processed within <strong>5-7 business days</strong> after verification.</li>
      </ul>

      <h2 className={styles.subTitle}>Support</h2>
      <p className={styles.supportText1}>For any questions or assistance, reach out to our customer support team at [Support Contact Details].</p>

      <p className={styles.supportText2}>Thank you for choosing Fengxi. We value your trust and strive to provide you with the best service!</p>
    </div>
  )
}