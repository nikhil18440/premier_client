import React from 'react'
import styles from './drops.module.css'
import Image from 'next/image'
import prod from '../../public/prod.jpg'
import Navbar from '../componants/navbar/Navbar'
import Link from 'next/link'

export default function page() {

  let it = [0,1,2,3]

  return (
    <>
    <Navbar/>
    <div className={styles.container}>
        <ul className={styles.list}>
          {/* {
            it.map((item,index) => (
              <li className={styles.listItem} style={{flexDirection:(index+1)%2==0 ? 'row':'row-reverse'}}>
                
                <div className={styles.imgDiv}>
                  <Image src={prod} width={'50vw'} height={'100vh'}/>
                </div>
                
                <div className={styles.d}>

                </div>

              </li>
            ))
          } */}

          {
            it.map((item,i) => (
              <div className={styles.prod}>
                <h1 className={styles.prodTitle}>crop top</h1>
                <Link href='/singledrop'>
                  <Image src={prod} width={600} height={650} objectFit='cover'/>
                </Link>
              </div>
            ))
          }

        </ul>
    </div>
    </>
  )
}
