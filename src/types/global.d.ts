import { QueryKey } from '@tanstack/react-query'
import type { Eip1193Provider } from 'ethers'

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_CONTRACT_ADDRESS: string
            [key: string]: string | undefined
        }
    }

    interface Window {
        ethereum: Eip1193Provider
    }
}

declare module '@tanstack/react-query' {
    interface Register {
        mutationMeta: {
            invalidateQueries?: QueryKey
            successMessage?: string | ((data: unknown) => string)
            errorMessage?: string | ((error: Error) => string)
        }
    }
}
