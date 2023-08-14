'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import Wagmi from '@/app/wagmi'
import { ThirdwebProvider } from '@thirdweb-dev/react'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'One Name Service',
  description: 'Provide Cheapest Web3 domains - One Name Service',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider clientId='aaa3991aa7457b41856c2b336a3ad746'>
        <Wagmi>
        {children}
        </Wagmi>
        </ThirdwebProvider>
        </body>
        
    </html>
  )
}
