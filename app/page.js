import Image from "next/image";
import styles from "./page.module.css";
// import Navbar from "./componants/navbar/Navbar";
import Footer from "../componants/footer/Footer";
import prod from '../public/prods.jpg'
import axios from "axios";
import ClientComp from "./clientComps.jsx";
import { Suspense } from "react";
import Loader from "@/componants/loader/Loader";

export default async function Home() {

  async function getData() {
    try {
      const res = await axios.get(`${process.env.API_ENDPOINT}/product?new=true`)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
  var data = await getData()
  data = JSON.stringify(data)
  console.log(data)
  
  
  

  

  return (
    <> 
    <Suspense fallback={<Loader/>}>
      <ClientComp data={data}/>
    </Suspense>
    </>
  );
}
