import { WalletContext } from '@/contexts/wallet.context'
import { useContext } from 'react'

export function useWallet() {
    const wallet = useContext(WalletContext)

    if (!wallet) {
        throw new Error('useWallet must be used within a WalletProvider')
    }

    return wallet
}
