'use client'
import React, { useState } from 'react';
import styles from './contact.module.css';
import Navbar from '../componants/navbar/Navbar';
import Footer from '../componants/footer/Footer';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast'; // Import ToastContainer

export default function Contact() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");
  const [succes, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError(true);
      return;
    }
    if (!message) {
      setError(true);
      return;
    }
    const TemplatePrams = {
      from_name: email,
      to_name: "louvy",
      message: message,
    };

    emailjs.send(
      process.env.EMAILJS_SERV_ID,
      process.env.EMAILJS_TEMP_ID,
      TemplatePrams,
      process.env.EMAILJS_PUB_KEY,
    ).then((res) => {
      setSuccess(true);
      setError(false);
      toast.success('email sent')
      console.log(res);
    }).catch((err) => {
      setError(true);
      setSuccess(false);
      toast.error('email not sent')
      console.log(err);
    });
  };

  return (
    // <Toaster> {/* Wrap your app with ToastContainer */}
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.headingContainer}>
          <h2 className={styles.heading}>Get in Touch</h2>
          <p className={styles.subheading}>Email us with any questions or comments</p>
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}> {/* Use onSubmit instead of action */}
            <label className={styles.label} htmlFor="name">Name:</label>
            <input className={styles.input} type="text" id="name" name="name" onChange={(e) => setname(e.target.value)} />
            <br />
            <label className={styles.label} htmlFor="email">Email:</label>
            <input className={styles.input} type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label className={styles.label} htmlFor="comment">Comment:</label>
            <textarea className={styles.textarea} id="comment" name="comment" onChange={(e) => setmessage(e.target.value)} />
            <br />
            <button className={styles.button} type="submit">Send</button>
          </form>
        </div>

        {/* {succes && toast.success('Message sent successfully!')}
        {error && toast.error('Error sending message. Please try again.')}
        {
          succes && <Toaster richColors/>
        }
        {
          error && <Toaster richColors/>
        } */}
      </div>
      <Footer />
      </>
    // </Toaster>
  );
}