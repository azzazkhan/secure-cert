'use client'

import { WalletContext, WalletContextType } from '@/contexts/wallet.context'
import { BrowserProvider } from 'ethers'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function WalletProvider({ children }: { children: React.ReactNode }) {
    const [wallet, setWallet] = useState<Omit<WalletContextType, 'loading' | 'error'> | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const connect = async () => {
        if (!window.ethereum) {
            throw new Error('No Ethereum compatible wallet found')
        }

        const provider = new BrowserProvider(window.ethereum)
        console.log({ provider })

        const signer = await provider.getSigner()
        console.log({ signer })

        const address = await signer.getAddress()
        console.log({ address })

        return { provider, signer, address }
    }

    useEffect(() => {
        setLoading(true)

        toast.promise(connect, {
            loading: 'Connecting to wallet',
            success(wallet) {
                setWallet(wallet)
                setLoading(false)
                return 'Wallet connected'
            },
            error(error) {
                setError(error.message)
                setLoading(false)
                return 'Failed to connect wallet'
            }
        })
    }, [])

    return <WalletContext.Provider value={{ ...wallet!, loading, error }}>{children}</WalletContext.Provider>
}
