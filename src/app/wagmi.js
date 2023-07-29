"use client"
import '@rainbow-me/rainbowkit/styles.css';
require('dotenv').config();

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { polygon, sepolia } from 'wagmi/chains'




const chains = [polygon]
const projectId = process.env.NEXT_PUBLIC_ID

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)
export default function rainbow  ({children})  {



  
    return (
      <>
      <WagmiConfig config={wagmiConfig}>
            {children}


      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </>
    );
  };