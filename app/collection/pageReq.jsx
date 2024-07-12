import axios from 'axios'
import React from 'react'

async function pageReq() {

//   const data = null

  const res = await axios.get(`${process.env.API_ENDPOINT}/product/`)
  const data = res.data

  return data
  
}

export default pageReq