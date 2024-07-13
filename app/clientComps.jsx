"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import Image from "next/image";
import styles from "./page.module.css";
import prod from '../public/prods.jpg'
import { useRouter } from 'next/navigation';

export default function ClientComp(props) {

    const user = useSelector(state => state.user)

    const data = JSON.parse(props.data)

    const router = useRouter()
    function handleClick(id) {
        router.push(`/singledrop?id=${id}`)
    }

  return (
    <>
    {
        data.map((item,i) => (
          <div className={styles.prodDiv} key={i}>
            <img src={item.images[0]} className={styles.prodImg}/>
            <div className={styles.prodText}>
              <h4>{item.title}</h4>
              <button className={styles.shopbtn} onClick={() => handleClick(item._id)}>Shop now</button>
            </div>
          </div>
        ))
      }
    </>
  )
}
