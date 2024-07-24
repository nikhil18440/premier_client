import React from 'react'
import {CiFacebook, CiInstagram, CiTwitter} from 'react-icons/ci'
import {FaDiscord, FaInstagram} from 'react-icons/fa'
import {FaMeta, FaTwitter} from 'react-icons/fa6'
import styles from './footer.module.css'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className={styles.footer}>

        <div className={styles.footerTop}>
        <section className={styles.sec1}>
            <h4 className={styles.footerHead}>Get touch with us</h4>
            <p className={styles.footerDesc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad culpa quos eius </p>
            <ul>
                <li>
                    <a href='/'><FaMeta/></a>
                </li>
                <li>
                    <a href='/'><FaInstagram/></a>
                </li>
                <li>
                    <a href='/'><FaTwitter/></a>
                </li>
                <li>
                    <a href='/'><FaDiscord/></a>
                </li>
            </ul>
        </section>

        <section className={styles.sec2}>
            <h4 className={styles.footerHead}>Quick Links</h4>
            <ul>
                <li>
                    <Link href='/'>home</Link>
                </li>
                <li>
                    <Link href='/collection'>Collection</Link>
                </li>
                <li>
                    <Link href='/review'>review</Link>
                </li>
            </ul>
        </section>

        <section className={styles.sec3}>
            <h4 className={styles.footerHead}>company</h4>
            <ul>
                <li>
                    <Link href='/aboutus'>About us</Link>
                </li>
                <li>
                    <Link href='/contact'>Contact us</Link>
                </li>
                <li>
                    <Link href='/termsandconditions'>terms and conditions</Link>
                </li>
                <li>
                    <Link href='/returnpolicy'>return policy</Link>
                </li>
            </ul>
        </section>
        </div>

        <div className={styles.footerbottom}>
            louvy
        </div>


    </div>
  )
}
