import { BrowserProvider, JsonRpcSigner } from 'ethers'
import { createContext } from 'react'

export interface WalletContextType {
    provider: BrowserProvider
    signer: JsonRpcSigner
    address: string
    loading: boolean
    error: string | null
}

export const WalletContext = createContext<WalletContextType | null>(null)
