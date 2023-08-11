"use client"
import React, { useState, useEffect } from 'react'
import { Web3Button } from '@web3modal/react'
import { Chain } from 'viem'
import './connect.css'
import { useAccount,useNetwork } from 'wagmi'
import { useAccountModal,account } from "@rainbow-me/rainbowkit";
import { useDisconnect } from 'wagmi'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link'
import Image from 'next/image'


export default function Connect() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  const{address,isConnected} = useAccount();
  const {chain} = useNetwork();
  const {openAccountModal} = useAccountModal();
  const { disconnect } = useDisconnect()

  function extractFirstAndLastThreeLetters(bigString) {
    if (bigString && bigString.length > 0) {
      const firstThreeLetters = bigString.substring(0, 3);
      const lastThreeLetters = bigString.substring(bigString.length - 3);
      return firstThreeLetters + '...' + lastThreeLetters;
    } else {
      return 'No Address';
    }
  }

  const result = extractFirstAndLastThreeLetters(address);
  

  function dropBar(){
    if( document.getElementById('dropdown').style.display=='flex'){
     document.getElementById("dropdown").style.display = "none";
    }
    else{
     document.getElementById("dropdown").style.display = "flex";
    }
 }

  return (

          <div className='buttoncont'>
            {isConnected && (chain.name === 'Sepolia') && <div className='profilecont'>
              <div className='userbutton'>
                <button  onClick={dropBar} className='conbutton'>
                  <Image src='/user.png' className='usericon' height={100} width={100} alt='user'/><div>{result}</div>
                  
                  </button>
                  <ul className='dropdownlist' id='dropdown'>
                    <Link                 href={{
                    pathname:'./Names',
                    query:{
                        user:address,
                    }
                }} ><button className='dbutton'>My Names</button></Link>
                    <Link                 href={{
                    pathname:'./Profile',
                    query:{
                      user:address,
                    }
                }} ><button className='dbutton'>Profile</button></Link>
                    <button className='dbutton' onClick={() => disconnect()} style={{color:'red',fontWeight:'900',fontSize:'24px'}}><Image src='/logout.png' className='logicon' height={100} width={100} alt='user'/><div>Disconnect</div></button>
                  </ul>
                  </div>
              </div>}
   {!isConnected && <ConnectButton.Custom 
    accountStatus={{
      smallScreen: 'avatar',
      largeScreen: 'full',
    }}
    >
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        
        const connected =
          account &&
          chain;

        return (
          <div
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className='buttonconnect'>
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className='wnbutton'>
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
           

                  <button onClick={openAccountModal} type="button" className='button-17'>
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>}
          </div>


  )
}
