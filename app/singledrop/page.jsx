import axios from 'axios'
import ClientComp from './clientComponant'
import Navbar from '@/app/componants/navbar/Navbar'
import Footer from '@/app/componants/footer/Footer'


export default async function ServerComp(props) {

    const prodId = props.searchParams.id

    async function getData() {
        const res = await axios.get(`${process.env.API_ENDPOINT}/product/${prodId}`)
        
        if(!res.ok){
            console.log(res.data)
        }else{
            console.log(res.data)
        }
        
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
