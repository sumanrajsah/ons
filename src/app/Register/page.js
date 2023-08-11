"use client"
import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import './register.css'


export default function Connect() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  

  return (

          <div className='register'>
                          <header className='headerr'>
          <Header />
        </header>
          </div>


  )
}
