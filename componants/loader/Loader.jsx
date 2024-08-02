import React from 'react'
import styles from './style.module.css'

export default function Loader() {
  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
        <div className={styles.half}></div>
        <div className={styles.half}></div>
        </div>
    </div>
  )
}

