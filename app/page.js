import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./componants/navbar/Navbar";
import Footer from "./componants/footer/Footer";
import prod from '../public/prods.jpg'
import axios from "axios";
import ClientComp from "./singledrop/clientComponant";

export default async function Home() {

  async function getData() {
    const res = await axios.get(`${process.env.API_ENDPOINT}/product?new=true`)
    return res.data
  }
  
  const data = await getData()


  return (
    <>
    <Navbar/>
    
    {
      data.map((item,i) => (
        <div className={styles.prodDiv} key={i}>
          <img src={item.images[0]} className={styles.prodImg}/>
          <div className={styles.prodText}>
            <h4>{item.title}</h4>
            <button className={styles.shopbtn}>Shop now</button>
          </div>
        </div>
      ))
    }

    <Footer/>
    </>
  );
}
