import axios from "axios"


export default async function submitFunc(props) {


    try {
        const res = await axios.post(`${process.env.API_ENDPOINT}/reviews/`, props)
    } catch (error) {
        console.log(error)
    }
}
