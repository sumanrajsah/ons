"use client"
import Image from 'next/image'
import Link from 'next/link'
import '../Register/register.css'

export default function Header() {

  return (
    <div className='Register'>
      <div className='Registerc'>
      <header className="header">
       <div className="logoc">
        <Image src="/logo.png" priority={true} className="logo" width={100} height={100} alt="One Mail"/>
       </div>
       <nav className="nav">
        <div className='navbar'>
        <Link href='/'><button className="buttonh">Home</button></Link>
        <Link href='/Check'><button className="buttonh">Check</button></Link>
        <Link href='/Register'><button className="buttonh">Register</button></Link>
        <Link href='/Roadmap'><button className="buttonh">RoadMap</button></Link>
        </div>
        <Link href='/App'><button className="buttont">Mail App</button></Link>

       </nav>
    </header>
      </div>

       
    </div>
  )
}
