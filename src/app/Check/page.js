"use client"
import { useState,React,useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import './check.css'
import Header from "../components/header"
import ABI from '../components/abi.json'
import { useAccount,useContractRead } from "wagmi"



export default function Check() {
    const { address } = useAccount();
    const [inputValue, setInputValue] = useState(""); // State to manage the input value


    // Move useContractRead outside the function body
        const { data } = useContractRead({
            address: '0x25F820cA35fd0f258C40693953513C6EFcA8f493',
            abi: ABI,
            functionName: 'isEmailRegisteredByEmail',
            args: [inputValue + ".one"],
        });


 function checkAvailability(){
        if (!data){
            document.getElementById('output').innerHTML="Email Is Available";
        }
        else{
            document.getElementById('output').innerHTML="Email Is Not Available";
        }

    
 }



    const handleInputChange = () => {
        const Value = document.getElementById('input').value
        
        if(Value.length>=3){
            document.getElementById('output').innerHTML=''
            setInputValue(Value);

        }
        else{
            document.getElementById('output').innerHTML='Email contain minimum 3 character'
            setInputValue(null)
        }

    };
  return (
    <div className="check">
    <div className='checkc'>
    <div className='headerc'>
        <Header/>
    </div>
    <div className='cbody'>
            <div className='checkh'>
                ONE WALLET, ONE EMAIL<br/> With <br/> <span className='omailh'>ONE MAIL</span>
            </div>
            <div className='checkh1'>
            Your Web3 Email Address
            </div>
            <div className='checkh2'>
                Get your Email Now and Start Decentralized Mailing with <span className='omailt'>ONE MAIL</span>
            </div>
            <div className='field'>
                <input className='caf' placeholder='Check Email Availability' id="input" onChange={handleInputChange}></input>
                <div className="data" id='output'></div>
                <br/>
                <button className='cbuttont' onClick={checkAvailability} id='checkbutton' disabled={inputValue<=3} >Check Availability</button>
                
            </div>
        </div>
    </div>
</div>
  )
}
