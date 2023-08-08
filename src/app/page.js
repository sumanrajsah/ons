"use client"
import "./home.css"
import Image from "next/image"
import Link from "next/link"

export default function Home() {

  return (
    <div className="home">
      <div className="homec">
      <header className="header">
       <div className="logoc">
        <Image src="/logo.png" className="logo" width={500} height={500} alt="ONS"/>
       </div><div className="logon">ONS</div>
       <nav className="nav">
        <Link href='/Check'><button className="button-17">Register</button></Link>
        <Link href='/Whitepaper'><button className="button-17">Whitepaper</button></Link>
       </nav>
    </header>
    <div className='bodyc'>
    <div className='onew'>ONE WALLET, ONE DOMAIN<br/> With<br/> ONE NAME SERVICE</div>
    <div className="homeh2">Register Your web3 Domain Now</div>
    <Link href='/Check'><button className="button-17">Register now</button></Link>
    <div className='boxc'>
            <div className='box'>
              <div className='imag'><Image alt="One Mail" height={100} width={100} src='/checks.png'/></div>
              <div className='bpara'>CHECK AVAILABILITY</div>
            </div>
            
            <div className='arrow'>
              <Image alt="One Mail" height={100} width={100} src='/arrow.png'/>
            </div>
            <div className='box'>
            <div className='imag'><Image alt="One Mail" height={100} width={100} src='/regist.png'/></div>
            <div className='bpara'>REGISTER</div>
            </div>
            <div className='arrow'>
              <Image alt="One Mail" height={100} width={100} src='/arrow.png'/>
            </div>
            <div className='box'>
            <div className='imag'><Image alt="One Mail" height={100} width={100} src='/mail.png'/></div>
            <div className='bpara'>START MAILING</div>
            </div>
          </div>
    </div>
      </div>
    </div>
  )
}
