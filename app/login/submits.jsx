import React from 'react'

export default async function submits(props) {

    try {
        const res = await axios.post(`${process.env.API_ENDPOINT}/auth/login`, props)
    } catch (error) {
        console.log(error)
    }

  return
}
