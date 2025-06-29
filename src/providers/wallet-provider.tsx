'use client'

import { WalletContext, WalletContextType } from '@/contexts/wallet.context'
import abi from '@/data/abi.json'
import { BrowserProvider, Contract } from 'ethers'
import { ErrorDecoder } from 'ethers-decode-error'
import { useEffect, useState } from 'react'
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
        await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, abi, signer)
        const decoder = ErrorDecoder.create([abi])

        return { provider, signer, address, contract, decoder }
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
