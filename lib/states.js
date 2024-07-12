"use client"

import React, { useState } from 'react'

function states() {

    const [qty, setQty] = useState(1);

    const [clr, setClr] = useState('red')
  
    const onSlctClr = (e) => {
      setClr(e.target.value)
    }
  
    const onChange = (e) => {
      setQty(e.target.value);
    };

  return (
    <div>states</div>
  )
}

export default states