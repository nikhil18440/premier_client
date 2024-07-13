import axios from 'axios'
// import ClientComp from './clientComp.jsx'
import Navbar from '@/app/componants/navbar/Navbar'
import Footer from '@/app/componants/footer/Footer'
import ClientComp from './clientComp'


export default async function Page(props) {


    async function getData() {
        const res = await axios.get(`${process.env.API_ENDPOINT}/reviews`)
        
        // if(!res.ok){
        //     console.log(res.data)
        // }else{
        //     console.log(res.data)
        // }
        
        return res.data
    }
    

    const data = await getData()
    var dataStr = JSON.stringify(data)

    

  return (
    
    <>
    <Navbar/>
    <ClientComp data={dataStr}/>
    <Footer/>
    </>

  )
}
