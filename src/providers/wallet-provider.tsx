'use client'

import { WalletContext, WalletContextType } from '@/contexts/wallet.context'
import abi from '@/data/abi.json'
import { wait } from '@/lib/utils'
import { BrowserProvider, Contract } from 'ethers'
import { ErrorDecoder } from 'ethers-decode-error'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type WalletState = Omit<WalletContextType, 'loading' | 'error' | 'success' | 'reconnect'>

export default function WalletProvider({ children }: { children: React.ReactNode }) {
    const [wallet, setWallet] = useState<WalletState | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const connect = async () => {
        if (!window.ethereum) {
            throw new Error('No Ethereum compatible wallet found')
        }

        const provider = new BrowserProvider(window.ethereum)
        await provider.send('eth_requestAccounts', [])

        await wait(2000)

        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, abi, signer)
        const decoder = ErrorDecoder.create([abi])

        return { provider, signer, address, contract, decoder }
    }

    const initiateConnection = useCallback(() => {
        setLoading(true)
        setSuccess(false)
        setError(null)

        toast.promise(connect, {
            loading: 'Connecting to wallet',
            success(wallet) {
                setWallet(wallet)
                setLoading(false)
                setSuccess(true)

                return 'Wallet connected'
            },
            error(error) {
                setError(error.message || 'Unknown error occurred')
                setLoading(false)

                return 'Failed to connect wallet'
            }
        })
    }, [])

    useEffect(() => {
        initiateConnection()
    }, [initiateConnection])

    return (
        <WalletContext.Provider value={{ ...wallet!, loading, error, success, reconnect: initiateConnection }}>
            {children}
        </WalletContext.Provider>
    )
}
