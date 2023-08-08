"use client"
import { useState,React,useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import './name.css'
import Header from "../components/header"
import ABI from '../components/abi.json'
import { useAccount,useContractRead,useNetwork } from "wagmi"
import { useRouter } from "next/navigation";
import Connect from "../components/connect"
import { useChainModal,useConnectModal } from "@rainbow-me/rainbowkit";



export default function Names() {
    const { address,isConnected } = useAccount();
    const {chain} = useNetwork();
    const { openChainModal } = useChainModal();
    const { openConnectModal } = useConnectModal();

    const { data } = useContractRead({
        address: '0x371f4fea7a6f13aa4e2e0adf790ff8e8e351bd45',
        abi: ABI,
        functionName: 'getDomain',
        args: [address],
    });
    


  return (
    <div className="names">
                   <div className="headern">
                <Header />
            </div>
            {isConnected && (chain.name === 'Sepolia') ?(<div className="namesc">
            <div className="domaint">All domain Registerd to your Wallet Address</div>
            <div className="data">Click to Manage your domains</div>
        <div className="namescb">
                    {data && data.map((item, index) => (
                        <div>
                       <Link
                       href={{
                           pathname:'./Domain',
                           query:{
                               domainAdd:(item)
                           }
                       }}
                       > <button className="domainname" key={index}>{item} &rarr;</button></Link></div>
                    ))}
                </div>
                </div>):!isConnected ?(<div className="dataname">PLEASE CONNECT YOUR WALLET <br/><br/><button onClick={openConnectModal} className="buttonconnect">Connect Wallet</button> </div>):(<div className="dataname"> CHECK YOU ARE CONNECTION <br/><br/><button onClick={openChainModal} className="buttonconnect">Change Network</button></div>)}
       
</div>
  )
}
