"use client"
import Image from 'next/image'

import { Web3Button } from '@web3modal/react'
import {  useAccount } from 'wagmi'

import Header from '../components/header'
import Link from 'next/link'
import './register.css'
import { sepolia,polygon } from 'wagmi/chains'

import { Web3NetworkSwitch } from '@web3modal/react'
import { useWeb3Modal } from '@web3modal/react'
import { useWeb3ModalTheme } from '@web3modal/react'

export default function Registeration() {
  const { open} = useWeb3Modal()
  
const { theme, setTheme } = useWeb3ModalTheme()



setTheme({
  themeMode: 'dark',
  themeVariables: {
    '--w3m-font-family': 'Roboto, sans-serif',
    '--w3m-accent-color': '#B800F8',
    '--w3m-button-border-radius': '20px',
    // ...
  }
})

  return (
    <div className='Register'>
      <div className='Registerc'>
      <header className="header">
        <Header/>
    </header>
    <buttonc className='buttonc'>
    <Web3NetworkSwitch themeVariables={theme} />
    <Web3Button themeVariables={theme}/>
    
    
    </buttonc>

      </div>

       
    </div>
  )
}
