"use client"
import React, { useRef, useState } from 'react';
import styles from './review.module.css';
import Navbar from '../../componants/navbar/Navbar';
import Footer from '../../componants/footer/Footer';
import {FaStar, FaRegStar} from 'react-icons/fa'
import submitFunc from './submit';

export default function ClientComp(props) {


    const [hover, setHover] = useState(0);

    const data = JSON.parse(props.data) || null


    function handleRating(stars) {
      let starsArr = []
      let Stars = stars
      for (let i = 1; i <= Stars; i++) {
        starsArr.push(i)
      }
      return starsArr
    }
    function handleUnRating(unstars) {
      let unstarsArr = []
      let unStars = unstars
      for (let i = 1; i <= unStars; i++) {
        unstarsArr.push(i)
      }
      return unstarsArr
    }
    
    // collecting form data and sending it to api
    const [email, setEmail] = useState()
    const [comment, setComment] = useState()
    const [rating, setRating] = useState()
    function submitForm(e) {
      e.preventDefault()
      let form = {
        userEmail: email,
        rating: rating,
        comment: comment
      }
      submitFunc(form)
    }


  return (
    <>
    <div className={styles.container}>
      <div className={styles.reviewContainer}>

        <div className={styles.reviews}>

            {
                data ? data.map((item,i) => (
                    <>
                    {handleRating()}
                    <div className={styles.reviewItem} key={i}>
                        <div className={styles.reviewItemStarsDiv}>
                            {handleRating(item.rating).map((i,key) => (
                                <FaStar key={key} color='gold'/>
                            ))}
                            {handleUnRating(5-item.rating).map((i,key) => (
                                <FaRegStar key={key}/>
                            ))}
                        </div>
                        <div className={styles.reviewItemMail}>{item.userEmail}</div>
                        <div className={styles.reviewItemText}>{item.comment}</div>
                    </div>
                    </>
                )) : (
                    <></>
                )
            }
            
            
        </div>
      </div>
      
      <div className={styles.formContainer}>
        <form onSubmit={submitForm}>
          <label className={styles.label} htmlFor="email">Email:</label>
          <input className={styles.input} type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
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
          <textarea className={styles.textarea} id="review" name="review"  onChange={(e) => setComment(e.target.value)}/>
          <br />
          <button className={styles.button} type="submit">Send</button>
        </form>
      </div>
    </div>
    </>
  );
}