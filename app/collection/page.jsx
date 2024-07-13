// "use client"
// import React, { useEffect, useState } from 'react'
import React from 'react'


import styles from './collection.module.css'
import Image from 'next/image'
import prod from '../../public/prods.jpg'
import Navbar from '../componants/navbar/Navbar'
import Link from 'next/link'
import Footer from '../componants/footer/Footer'
import axios from 'axios'
import pageReq from './pageReq'
// import { useSearchParams } from 'next/navigation'
// import { useRouter } from 'next/navigation'

export default async function page() {

  let it = [0,1,2,3]

  

  // const [productArray, setproductArray] = useState([])

  // fetching data from api
  async function getData() {
    try {
      const res = await axios.get(`${process.env.API_ENDPOINT}/product/`)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
  

  const data = await getData()
  console.log(data)



  // setting the params
  // const params = useSearchParams()
  // const searchId = params.get('new')

  // const router = useRouter()
  // router.query.new = "true"
  // router.push(router)



  return (
    <>
    <Navbar/>
    <div className={styles.container}>
       
          {
            data ? data.map((item,i) => (
              <div className={styles.prod} key={i}>
                <Link href={{
                  pathname:`/singledrop`,
                  query: {
                    id: item._id
                  }
                }}>
                  <img className={styles.prodImg} src={item.images[0]} width={350} height={450} objectFit='cover'/>
                  {/* <div c></div> */}
                </Link>
                <h4 className={styles.prodTitle}>{item.title}</h4>
                <h4 className={styles.prodPrice}>{item.price}</h4>
              </div>
            )) : <></>
          }

        {/* </div> */}
    </div>

    <Footer/>
    </>
  )

  
}



// export async function getData() {
//   console.log("api:",process.env.API_ENDPOINT)
       
//   const res = await axios.get(`${process.env.API_ENDPOINT}/product/`)
//   const data = res.json()
  
//   return data
  
// }