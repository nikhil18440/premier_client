"use client"
import React, { useState } from 'react';
import styles from './singledrop.module.css';
import Image from 'next/image';
import prod from '../../public/prod.jpg';
import prod2 from '../../public/prod2.jpg';
import prod3 from '../../public/prod3.jpg';

import tshirt from '../../public/tshirt.jpg';
import tshirt2 from '../../public/tshirt2.jpg';

import Navbar from '../componants/navbar/Navbar';
// import {Swiper} from 'swiper';
import Sliding from '../componants/swiper/Swiper';
// import 'swiper/swiper-bundle.css';

export default function page() {

    const [qty,setQty] = useState(1)

    const onChange = (e) => {
        setQty(e.target.value)
    }

  return (
    <>
      <Navbar />

      <div className={styles.singleproduct}>
        <div className={styles.left}>
          <Image className={styles.leftImg} src={tshirt} width={700} height={700} objectFit='cover'/>
        </div>

        <div className={styles.mid}>
            <h1 className={styles.righthead}>Crop top</h1>
                <p className={styles.rightdesc}>this is a beautiful crop top</p>
                <form>
                    <label><input type="radio" name="options" value="option1"/> s</label>
                    <label><input type="radio" name="options" value="option2"/> m</label>
                    <label><input type="radio" name="options" value="option3"/> l</label>
                </form>
                <label><input type="number" name="myNumber" value={qty}  min={1} max={100} onChange={onChange}/> qty</label>
            </div>

        <div className={styles.right}>
            <Image className={styles.leftImg} src={tshirt2} width={700} height={700} objectFit='cover'/>
        </div>
      </div>
    </>
  );
}