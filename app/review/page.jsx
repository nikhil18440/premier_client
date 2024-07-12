"use client"
import React, { useState } from 'react';
import styles from './review.module.css';
import Navbar from '../componants/navbar/Navbar';
import Footer from '../componants/footer/Footer';
import {FaStar, FaRegStar} from 'react-icons/fa'

export default function Contact() {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const stars = 2

    const starsArr = []
    for (let i = 1; i <= stars; i++) {
        starsArr.push(i)
    }

    let unstarred = 5-stars
    const unstarsArr = []
    for (let i = 1; i <= unstarred; i++) {
        unstarsArr.push(i)
    }

  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <div className={styles.reviewContainer}>

        <div className={styles.reviews}>

            <div className={styles.reviewItem}>
                <div className={styles.reviewItemStarsDiv}>
                    {starsArr.map((i,key) => (
                        <FaStar key={i} color='gold'/>
                    ))}
                    {unstarsArr.map((i,key) => (
                        <FaRegStar key={i}/>
                    ))}
                </div>
                <div className={styles.reviewItemMail}>nikhil@gmail.com</div>
                <div className={styles.reviewItemText}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error doloribus odit aut nulla quisquam officia animi! Debitis placeat laboriosam laudantium tempora deleniti, officia labore repellat quae quaerat quam, ex tempore.</div>
            </div>
            <div className={styles.reviewItem}>
                <div className={styles.reviewItemStarsDiv}>
                    {starsArr.map((i,key) => (
                        <FaStar key={i} color='gold'/>
                    ))}
                    {unstarsArr.map((i,key) => (
                        <FaRegStar key={i}/>
                    ))}
                </div>
                <div className={styles.reviewItemMail}>nikhil@gmail.com</div>
                <div className={styles.reviewItemText}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error doloribus odit aut nulla quisquam officia animi! Debitis placeat laboriosam laudantium tempora deleniti, officia labore repellat quae quaerat quam, ex tempore.</div>
            </div>
            <div className={styles.reviewItem}>
                <div className={styles.reviewItemStarsDiv}>
                    {starsArr.map((i,key) => (
                        <FaStar key={i} color='gold'/>
                    ))}
                    {unstarsArr.map((i,key) => (
                        <FaRegStar key={i}/>
                    ))}
                </div>
                <div className={styles.reviewItemMail}>nikhil@gmail.com</div>
                <div className={styles.reviewItemText}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error doloribus odit aut nulla quisquam officia animi! Debitis placeat laboriosam laudantium tempora deleniti, officia labore repellat quae quaerat quam, ex tempore.</div>
            </div>
            <div className={styles.reviewItem}>
                <div className={styles.reviewItemStarsDiv}>
                    {starsArr.map((i,key) => (
                        <FaStar key={i} color='gold'/>
                    ))}
                    {unstarsArr.map((i,key) => (
                        <FaRegStar key={i}/>
                    ))}
                </div>
                <div className={styles.reviewItemMail}>nikhil@gmail.com</div>
                <div className={styles.reviewItemText}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error doloribus odit aut nulla quisquam officia animi! Debitis placeat laboriosam laudantium tempora deleniti, officia labore repellat quae quaerat quam, ex tempore.</div>
            </div>
            <div className={styles.reviewItem}>
                <div className={styles.reviewItemStarsDiv}>
                    {starsArr.map((i,key) => (
                        <FaStar key={i} color='gold'/>
                    ))}
                    {unstarsArr.map((i,key) => (
                        <FaRegStar key={i}/>
                    ))}
                </div>
                <div className={styles.reviewItemMail}>nikhil@gmail.com</div>
                <div className={styles.reviewItemText}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error doloribus odit aut nulla quisquam officia animi! Debitis placeat laboriosam laudantium tempora deleniti, officia labore repellat quae quaerat quam, ex tempore.</div>
            </div>
            
        </div>
      </div>
      
      <div className={styles.formContainer}>
        <form>
          <label className={styles.label} htmlFor="email">Email:</label>
          <input className={styles.input} type="email" id="email" name="email" />
          <br />
          <label className={styles.label} htmlFor="name">Name:</label>
          <div className={styles.starReview}>
          {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <span key={index} onClick={() => setRating(index)} onMouseOver={() => setHover(index)} onMouseLeave={() => setHover(rating)}>
                    {index <= (hover || rating)? <FaStar color='gold' size={30} style={{marginRight: 15}}/> : <FaRegStar size={30} style={{marginRight: 15}}/>}
                  </span>
                );
              })}
          </div>
          <br />
          <label className={styles.label} htmlFor="review">Review:</label>
          <textarea className={styles.textarea} id="review" name="review" />
          <br />
          <button className={styles.button} type="submit">Send</button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}