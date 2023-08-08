
import './globals.css'
import { Inter } from 'next/font/google'
import Wagmi from '@/app/wagmi'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'One Name Service',
  description: 'Provide Cheapest Web3 domains - One Name Service',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Wagmi>
        {children}
        </Wagmi></body>
    </html>
  )
}
