"use client"
import Image from 'next/image'
import Link from 'next/link'
import './ham.css'
import '../Register/register.css'

export default function Ham() {

    function menuBar(){
       if( document.getElementById('navc').style.display=='flex'){
        document.getElementById("navc").style.display = "none";
       }
       else{
        document.getElementById("navc").style.display = "flex";
       }
    }
    
  return (
    <div className='ham' >
        <div className='navbarc' id='navc'>
    <div className='navbarb'>
    <Link href='/'><button className="buttonh">Home</button></Link>
        <Link href='/Check'><button className="buttonh">Register</button></Link>
        <Link href='/Search'><button className="buttonh">Search</button></Link>
        <Link href='/Roadmap'><button className="buttonh">RoadMap</button></Link>
        <Link href='/Whitepaper'><button className="buttonh">Whitepaper</button></Link>
    </div>
  </div>
  <div className='hamcont'onClick={menuBar}>
         <div className="icon nav-icon-1">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div></div>

    </div>
  )
}
