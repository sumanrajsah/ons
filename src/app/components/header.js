"use client"
import Image from 'next/image'
import Link from 'next/link'
//import '../Register/register.css'
import './header.css'
import Ham from './ham'
import Connect from './connect'

export default function Header() {

  return (
    <>
      <header className="headerh">
       <div className="logoc">
        <Image src="/ons1.png" priority={true} className="logo" width={100} height={100} alt="One Mail"/>
       </div>
    </header>
    <div className="navigation">


        <div className='connectbut'>
          <Connect/>
        </div>

       </div>
       <div className='hambar'>
      <Ham/>
      </div>
    </>
  )
}
