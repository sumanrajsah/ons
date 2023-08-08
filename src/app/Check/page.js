"use client"
import { useState,React,useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import './check.css'
import Header from "../components/header"
import ABI from '../components/abi.json'
import { useAccount,useContractRead,useNetwork } from "wagmi"
import { useRouter } from "next/navigation";
import Connect from "../components/connect"
import { useChainModal } from "@rainbow-me/rainbowkit";


export default function Search() {
    const { address,isConnected } = useAccount();
    const [inputValue, setInputValue] = useState(""); // State to manage the input value
    const [selectedOption, setSelectedOption] = useState(".one"); // Default selected option is ".one"
    const {chain} = useNetwork();
    const { openChainModal } = useChainModal();
    //console.log(chain.name);


            // Move useContractRead outside the function body
            const { data } = useContractRead({
                address: '0x371f4fea7a6f13aa4e2e0adf790ff8e8e351bd45',
                abi: ABI,
                functionName: 'isDomainRegisteredByDomain',
                args: [inputValue + selectedOption],
            });
            console.log(data);
            useEffect(() => {
                // Use useEffect to handle the API call when inputValue changes
                if (inputValue.length >= 3) {
                    if (data) {
                        document.getElementById('output').innerHTML = " &#10006; Not Available";
                        document.getElementById('output').style.color = 'red';
                        document.getElementById('inbutton').style.display = 'flex';
                        document.getElementById('rbutton').style.display = 'none';
                    } else {
                        document.getElementById('output').innerHTML = " &#10003; Available";
                        document.getElementById('output').style.color = 'green';
                        document.getElementById('inbutton').style.display = 'none';
                        document.getElementById('rbutton').style.display = 'flex';
                    }
                }
            }, [data, inputValue]);


    const handleInputChange = () => {
        const Value = document.getElementById('input').value
        document.getElementById('output').style.color='black';

        if(Value.length>=3){
            document.getElementById('output').innerHTML='';
            document.getElementById('rbutton').style.display='none';
            setInputValue(Value);

        }
        else{
            document.getElementById('output').innerHTML='Domain contain minimum 3 character';
           document.getElementById('rbutton').style.display='none';
            setInputValue("")
        }

    };
  return (
    <div className="check">
            <div className='headerc'>
        <Header/>
    </div>
    <div className='checkc'>

    <div className='cbody'>
            <div className='checkh1'>
            Your Web3 Domain
            </div>
            <div className='checkh2'>
                Get your Domain and Web3 Username with <span className='omailt'>ONS</span>
            </div>
            <div className="extbc">
            <div class="radio-inputs">
  <label className="radio">
    <input type="radio" name="radio" value='.one'checked={selectedOption === '.one'}  onChange={(e) => setSelectedOption(e.target.value)}/>
    <span className="name">.one</span>
  </label>
  <label className="radio">
    <input type="radio" name="radio" value='.saays' onChange={(e) => setSelectedOption(e.target.value)}/>
    <span className="name">.saays</span>
  </label>
      
  <label className="radio">
    <input type="radio" name="radio" value='.blackhole'  onChange={(e) => setSelectedOption(e.target.value)}/>
    <span className="name">.blackhole</span>
  </label>
  <label className="radio">
    <input type="radio" name="radio" value='.cosmic'  onChange={(e) => setSelectedOption(e.target.value)}/>
    <span className="name">.cosmic</span>
  </label>
</div>
            </div>
            {isConnected && (chain.name === 'Sepolia') ?(
            <div className='field'>
                <input className='caf' placeholder='Check Domain Availability' id="input" onChange={handleInputChange}></input>
                <div className="data" id='output'></div>
                <br/>
                <Link
                href={{
                    pathname:'./Domain',
                    query:{
                        domainName:inputValue,
                        domainExt:selectedOption,
                        domainAdd:(inputValue+selectedOption),
                        walletAdd:address
                    }
                }}
                >
                <button className="cbuttont" id='inbutton'>{inputValue+selectedOption} &rarr; </button></Link>
                <Link
                href={{
                    pathname:'./Register',
                    query:{
                        domainName:inputValue,
                        domainExt:selectedOption,
                        domainAdd:(inputValue+selectedOption),
                        walletAdd:address,
                    }
                }}
                ><button className="cbuttont" id='rbutton' >Register Now &rarr;</button></Link>
            </div>):!isConnected ?(<div className="datac">PLEASE CONNECT YOUR WALLET </div>):(<div className="datac"> CHECK YOU ARE CONNECTION <br/><br/><button onClick={openChainModal} className="wnbutton">Change Network</button></div>)}
        </div>
    </div>
</div>
  )
}
