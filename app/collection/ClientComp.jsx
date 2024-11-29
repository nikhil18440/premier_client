'use client'
import Broken from '@/componants/broken/broken'
import React, { useEffect, useState } from 'react'
import styles from './collection.module.css'
import Image from 'next/image'
import prod from '../../public/prods.jpg'
import Navbar from '../../componants/navbar/Navbar'
import Link from 'next/link'
import Footer from '../../componants/footer/Footer'
import pageReq from './pageReq'
import { useSelector } from 'react-redux'



export default function ClientComp(props) {

   const [clientData, setclientData] = useState(props.data) 
  const userState = useSelector(state => state.user)

  useEffect(() => {
    setclientData(props.data)
  }, [props])
  

  return (
    <div className={styles.container}>
       
          {
            clientData ? clientData.map((item,i) => (
              <div className={styles.prod} key={i}>
                <Link href={{
                  pathname: `/singledrop` ,
                  query: {
                    id: item._id
                  }
                }}>
                  <img className={styles.prodImg} src={item.images[0]} width={350} height={450} objectFit='cover'/>
                  {/* <div c></div> */}
                </Link>
                <h4 className={styles.prodTitle}>{item.title}</h4>
                <h4 className={styles.prodPrice}>&#8377; {item.price}</h4>
              </div>
            )) : <Broken/>
          }

        
    </div>
  )
}
