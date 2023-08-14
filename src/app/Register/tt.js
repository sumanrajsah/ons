"use client"
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic'
//import { useRouter } from "next/router";
import './register.css';
import Header from "../components/header";
import ABI from '../components/abi.json';
import { useContractRead } from "wagmi";
import Connect from "../components/connect";
import Image from "next/image";
import Link from "next/link";
import { document } from "postcss";
import { useAccount,useContractWrite,usePrepareContractWrite,useWaitForTransaction,useNetwork } from "wagmi";
import { parseEther } from "viem";
import { useRouter } from 'next/navigation';
import { useChainModal,useConnectModal } from "@rainbow-me/rainbowkit";
import { Blocks } from  'react-loader-spinner';
import { createHelia } from 'helia';
import { strings } from '@helia/strings';
import { unixfs } from "@helia/unixfs";
import {create} from 'kubo-rpc-client';




export default function Register({ searchParams }) {
  const domainName = searchParams.domainName;
  const domainExt = searchParams.domainExt;
  //console.log(domainName + domainExt);
  const {isConnected,address} = useAccount();
  const router = useRouter();
  const { openChainModal } = useChainModal();
  const { openConnectModal } = useConnectModal();
  const {chain} = useNetwork();

  const [isClient, setIsClient] = useState(false)
 



  const [years, setYears] = useState(1);
  const [fcid, setCid] = useState('');
  const { data } = useContractRead({
    address: '0x371f4fea7a6f13aa4e2e0adf790ff8e8e351bd45',
    abi: ABI,
    functionName: 'getRegistrationPrice',
    args: [years],
  });
  const Price = Number(data)/(10**18);
  


  function increment() {
    setYears((prevYears) => prevYears + 1);
  }

  function decrement() {
    if (years > 1) {
      setYears((prevYears) => prevYears - 1);
    }
  }
  const [selectedImage, setSelectedImage] = useState(null);
  const [pImage, setImage] = useState(1);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    handleImage(file);
    //document.getElementById('uploadb').style.display = 'flex';
    setSelectedImage(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    handleImage(file);
  };

  const handleImage = (file) => {
    const reader = new FileReader();

    reader.onloadend = (e) => {
      const base64Data = e.target.result;
      setSelectedImage(base64Data);
      console.log('base64: ',base64Data)
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const storeImageOnIPFS = async (selectedImage) => {
    
    // IPFS configuration code...
    const bufferData = Buffer.from(selectedImage.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    console.log(bufferData);
    const projectId = "2SLeAOxpbcMhUjr0PAyUsmGVJKb";
    const projectSecret = "fdc0aedf83e590ca14590ed72e9c3968";
    const auth =
      "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
    
    const client = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });
    try {
      const cid = await client.add(bufferData);

      const finalCid = cid.path;
      //console.log('Image stored on IPFS with CID:', cid.toString();
      console.log(finalCid);
      setCid(finalCid);
      //document.getElementById('previewb').style.display = 'flex';
      //document.getElementById('registerb').style.display = 'flex';
    } catch (error) {
      console.error('Error storing image on IPFS:', error);
    }
  };
  const handleFormSubmit = async (e) => {
    //e.preventDefault();
    //const file = e.target.files[0];

    try {
      await storeImageOnIPFS(selectedImage);
    } catch (error) {
      console.error('Error storing Image on IPFS:', error);
    }
  };
  const { config } = usePrepareContractWrite({
    address: '0x371f4fea7a6f13aa4e2e0adf790ff8e8e351bd45',
    abi: ABI,
    functionName: 'registerDomain',
    args: [domainName,domainExt,fcid,years],
    value: data,
  })
  const {data:txhash, write,isSuccess,isLoading } = useContractWrite(config)

  const {isSuccess:tx} = useWaitForTransaction({
    hash: txhash?.hash,
  })
  console.log(txhash?.hash)

  const [remainingTime, setRemainingTime] = useState(10); // Initial value is 10 seconds

  // useEffect to listen for changes in the isSuccess variable
  useEffect(() => {
    if (tx) {
      // Redirect to the desired page after 10 seconds
      const timer = setTimeout(() => {
        router.push('/Check'); // Replace 'success-page' with your desired page's URL
      }, 10000); // 10 seconds in milliseconds

      // Clear the timer when the component is unmounted to avoid memory leaks
      return () => clearTimeout(timer);
    }
  }, [tx,router]);

  // useEffect to update the countdown timer every second
  useEffect(() => {
    if (remainingTime > 0 && tx) {
      const countdownTimer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
  }, [remainingTime, tx]);

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null; // Return nothing during prerendering
  }

  return (
    <div className='Register'>
              <header className='headerr'>
          <Header />
        </header>
      <div className='Registerc'>
      {isConnected && (chain.name === 'Sepolia') ?(<div className='rbody'>
        <div className="buttonc">
            {!isConnected && <div className="data">Connect Your Wallet</div>}
          </div>
          <div className="dname">{domainName + domainExt}</div>

           {isConnected && !isSuccess && !isLoading && (chain.name === 'Sepolia')  ? (
           <div className="mintf">
          
           <div className="yearc">
            <div className="yhead">Choose Duration In YEAR</div>
            <div className="yinc">
              <div className="button-18" onClick={decrement}>-</div>
              <input className="yin" id="yearinput" type="number" min={1} max={30} value={years} readOnly/>
              <div className="button-18" onClick={increment}>+</div>
            </div>
            <div className="data">Price:  {Price} MATIC + Gas Fees</div>
            </div>
              <div className="imgc">
                <div className="data">Upload Your Profile Image or Your Favourite Image</div>
              <label htmlFor="fileInput" onDrop={handleDrop} onDragOver={handleDragOver}  className="dropimgc">
                  {selectedImage ? (
                    <div>
                      <Image src={selectedImage} alt="Preview" width={150} height={150} />
                    </div>
                  ) : (
                    <div className="dropimg">
                      <Image src="/cloud.png" priority={true} width={150} height={150} alt="Upload Img" />
                      <p>Click or drag and drop an image here to upload.</p>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
             {selectedImage && <button onClick={handleFormSubmit} className="button-18" id='uploadb'>Upload Image On IPFS</button>}
              {selectedImage && fcid && <Link target="_blank" href={`https://ipfs.io/ipfs/${fcid}`}><button className="button-18" id='previewb'>Preview Image</button></Link>}
              {selectedImage && fcid && <button className="buttont" id="registerb" disabled={!write} onClick={() => write?.()}>Register</button>}
            </div>):tx && (<div className="dname">Redirect to your domain page in {remainingTime} seconds</div>)}
            <br/>
            {isLoading || isSuccess ? (
  <div className="mintf">
    {tx ? (
      <Link target="_blank" href={`https://sepolia.etherscan.io/tx/${txhash?.hash}`}>
        <button className="button-17">View your Transaction</button>
      </Link>
    ) : (
      <div className="data">
        <Blocks
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  color="red"
/>Transaction Initializing...<br/> <div className="dname">Please Confirm your Transaction</div></div>
    )}
  </div>
) : null}
        </div>):!isConnected ?(<div className="datareg">PLEASE CONNECT YOUR WALLET <br/><br/><button onClick={openConnectModal} className="buttonconnect">Connect Wallet</button> </div>):(<div className="datareg"> You Are Connected To wronk Network <br/><br/><button onClick={openChainModal} className="buttonconnect">Change Network</button></div>)}
      </div>
    </div>
  );
}
