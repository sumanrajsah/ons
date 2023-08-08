"use client"
import { useState,React,useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import './profile.css'
import Header from "../components/header"
import ABI from '../components/abi.json'
import { useAccount,useContractRead,useNetwork } from "wagmi"
import { useRouter } from "next/navigation";
import Connect from "../components/connect"
import { useChainModal,useConnectModal } from "@rainbow-me/rainbowkit";



export default function Profile() {
    const { address,isConnected } = useAccount();
    


  return (
    <div className="profile">
               
</div>
  )
}
