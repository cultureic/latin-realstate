"use client"

import { useState, useEffect } from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { celo, celoAlfajores } from 'wagmi/chains'
import { defineChain } from 'viem'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { http } from 'wagmi'

// Define Celo Sepolia chain
const celoSepolia = defineChain({
  id: 11142220,
  name: 'Celo Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'CELO',
    symbol: 'CELO',
  },
  rpcUrls: {
    default: {
      http: ['https://forno.celo-sepolia.celo-testnet.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Celo Sepolia Blockscout',
      url: 'https://celo-sepolia.blockscout.com',
    },
  },
  testnet: true,
})

// Create config with proper SSR handling
let config: any = null

function getWagmiConfig() {
  if (!config) {
    config = getDefaultConfig({
      appName: 'latin-realstate',
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
      chains: [celo, celoSepolia],
      transports: {
        [celo.id]: http(),
        [celoSepolia.id]: http()
      },
      ssr: true,
    })
  }
  return config
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})



import { useAccount } from 'wagmi'
import { loginOrRegister } from '@/app/actions/auth'

function AuthListener() {
  const { address, isConnected } = useAccount()

  useEffect(() => {
    if (isConnected && address) {
      loginOrRegister(address).then((result) => {
        if (result.success) {
          console.log('User authenticated:', result.user)
        }
      })
    }
  }, [address, isConnected])

  return null
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={getWagmiConfig()}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AuthListener />
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
