"use client"

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import styles from './swiper.module.css'
import prod from '../../../public/prod.jpg'
import prod2 from '../../../public/prod2.jpg'
import prod3 from '../../../public/prod3.jpg'

// import required modules
import { Navigation } from 'swiper/modules';
import Image from 'next/image';

function Sliding() {
  return (
    <Swiper navigation={true} modules={[Navigation]} className={styles.swiper} >
        
        <SwiperSlide  className={styles.swiperSlide} >
          <Image src={prod} className={styles.swiperImg} />
          {/* SwiperSlide */}
        </SwiperSlide>
        
      </Swiper>
  )
}

export default Sliding