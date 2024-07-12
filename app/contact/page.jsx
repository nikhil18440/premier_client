import React from 'react';
import styles from './contact.module.css';
import Navbar from '../componants/navbar/Navbar';
import Footer from '../componants/footer/Footer';

export default function Contact() {
  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h2 className={styles.heading}>Get in Touch</h2>
        <p className={styles.subheading}>Email us with any questions or comments</p>
      </div>
      <div className={styles.formContainer}>
        <form>
          <label className={styles.label} htmlFor="name">Name:</label>
          <input className={styles.input} type="text" id="name" name="name" />
          <br />
          <label className={styles.label} htmlFor="email">Email:</label>
          <input className={styles.input} type="email" id="email" name="email" />
          <br />
          <label className={styles.label} htmlFor="comment">Comment:</label>
          <textarea className={styles.textarea} id="comment" name="comment" />
          <br />
          <button className={styles.button} type="submit">Send</button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}