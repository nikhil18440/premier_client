// "use client"
// import React, { useEffect, useState } from 'react'
import React from 'react'


import styles from './collection.module.css'
import Image from 'next/image'
import prod from '../../public/prods.jpg'
import Navbar from '../../componants/navbar/Navbar'
import Link from 'next/link'
import Footer from '../../componants/footer/Footer'
import axios from 'axios'
import pageReq from './pageReq'
import Broken from '@/componants/broken/broken'
import ClientComp from './ClientComp.jsx'
// import { useSearchParams } from 'next/navigation'
// import { useRouter } from 'next/navigation'

export default async function page() {

  let it = [0,1,2,3]

  

  // const [productArray, setproductArray] = useState([])

  // fetching data from api
  async function getData() {
    try {
      const res = await axios.get(`${process.env.API_ENDPOINT}/product/`)
      console.log('data: ',res.data)
      return res.data
    } catch (error) {
      console.log('this is an error')
    }
  }
  // console.log(await getData())
  

  const data = await getData()

  // console.log(data)



  // setting the params
  // const params = useSearchParams()
  // const searchId = params.get('new')

  // const router = useRouter()
  // router.query.new = "true"
  // router.push(router)



  return (
    <>

      <div className={styles.container}>
        <div className={styles.list}>
          <div className={styles.listItem}>
          {
                data ? data.map((item,i) => (
                  <div className={styles.prod} key={i}>
                    <Link href={{
                      pathname:`/singledrop`,
                      query: {
                        id: item._id
                      }
                    }}>
                      <img className={styles.prodImg} src={item.images[0]} objectFit='cover'/>
                      {/* <div c></div> */}
                    </Link>
                    <h4 className={styles.prodTitle}>{item.title}</h4>
                    <h4 className={styles.prodPrice}>&#8377; {item.price}</h4>
                  </div>
                )) : <Broken/>
              }
          </div>
        </div>
      </div>

    </>
  )

  
}



// export async function getData() {
//   console.log("api:",process.env.API_ENDPOINT)
       
//   const res = await axios.get(`${process.env.API_ENDPOINT}/product/`)
//   const data = res.json()
  
//   return data
  
// }