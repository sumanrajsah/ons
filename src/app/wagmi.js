"use client"
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,connectorsForWallets
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  phantomWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
  sepolia,
  polygonMumbai,
} from 'wagmi/chains';

import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { ThirdwebProvider } from '@thirdweb-dev/react';




const { chains, publicClient } = configureChains(
  [sepolia],
  [
    publicProvider()
  ]
);
const projectId = process.env.NEXT_PUBLIC_ID;
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      argentWallet({projectId,chains}),
      metaMaskWallet({projectId,chains}),
      coinbaseWallet({projectId,chains}),
      braveWallet({projectId,chains}),
      ledgerWallet({projectId,chains}),
      phantomWallet({projectId,chains}),
      trustWallet({projectId,chains})
    ],
  },
]);
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient
})

export default function rainbow  ({children})  {



  
    return (
      <>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} modalSize="compact">
      <ThirdwebProvider clientId='aaa3991aa7457b41856c2b336a3ad746'>
        {children}
        </ThirdwebProvider>
      </RainbowKitProvider>
    </WagmiConfig>
      </>
    );
  };