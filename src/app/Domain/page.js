'use client'
import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import { useAccount, useContractRead } from 'wagmi';
import ABI from '../components/abi.json';
import './domain.css';
import Connect from '../components/connect';
import { useRouter } from 'next/navigation';

export default function Domain({ searchParams }) {
  const domainName = searchParams.domainName;
  const domainExt = searchParams.domainExt;
  const domainAdd = searchParams.domainAdd;
  const {address,isConnected} = useAccount();
  console.log(address,isConnected)
  const [imageCid, setImageCid] = useState('');
  const [profileD, setProfile] = useState('');
const router =useRouter();


  const { data: imageData } = useContractRead({
    address: '0x371f4fea7a6f13aa4e2e0adf790ff8e8e351bd45',
    abi: ABI,
    functionName: 'getDomainImage',
    args: [domainAdd],
  });
  const { data: profileData } = useContractRead({
    address: '0x371f4fea7a6f13aa4e2e0adf790ff8e8e351bd45',
    abi: ABI,
    functionName: 'getDomainDetailsByDomain',
    args: [domainAdd],
  });

  useEffect(() => {
    if (imageData && profileData) {
      setImageCid(imageData);
      
      setProfile(profileData[0])
      console.log(imageData);
      console.log(profileData);
    }
  }, [imageData,profileData]);
  useEffect(() => {
    if (!isConnected) {
        router.push('/Check');
    }
}, [isConnected, router]);

  return (
    <div className='domain'>
      <div className='domainc'>
        <header className='headerd'>
          <Header />
        </header>

        <div className='dbody'>

          <div className='dimage'>
            {imageCid ? (
              <img src={`https://ipfs.io/ipfs/${imageCid}`} alt={domainName + domainExt + ' : ' + imageCid} width={100} />
            ) : (
              'Loading Image...'
            )}
          </div>
          <div className='dname'>{domainAdd}</div>
          <div className='data'>
            <div>Registration Timestamp: {profileD.registrationTimestamp?.toString()}</div>
            <div>Expiry Timestamp: {profileD.expiryTimestamp?.toString()}</div>
            <div>Grace Period: {profileD.gracePeriod?.toString()}</div>
            <div>Is Registered: {profileD.isRegistered?.toString()}</div>
            <div>For Sale: {profileD.forSale?.toString()}</div>
            <div>Sale Price: {profileD.salePrice?.toString()}</div>
            <div>Wallet Address: {profileD.walletAddress?.toString()}</div>
            <div>Image URL: {profileD.imageUrl}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
