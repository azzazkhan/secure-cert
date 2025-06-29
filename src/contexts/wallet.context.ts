import { BrowserProvider, Contract, JsonRpcSigner } from 'ethers'
import { ErrorDecoder } from 'ethers-decode-error'
import { createContext } from 'react'

export interface WalletContextType {
    provider: BrowserProvider
    signer: JsonRpcSigner
    contract: Contract
    address: string
    loading: boolean
    decoder: ErrorDecoder
    error: string | null
}

export const WalletContext = createContext<WalletContextType | null>(null)
