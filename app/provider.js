"use client"

import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function Providers({children}) {
  return (
    <>
        <Toaster/>
        {children}
    </>
  )
}
