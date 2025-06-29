import { useWallet } from '@/hooks/use-wallet'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AddIssuer } from './schema'

export function useIssuers<T = unknown>() {
    const { contract, loading } = useWallet()

    return useQuery<T>({
        queryKey: ['issuers'],
        queryFn: async () => {
            const result = await contract.getAllIssuers()
            return JSON.parse(JSON.stringify(result))
        },
        enabled: !loading
    })
}

export function useAddIssuer() {
    const { contract } = useWallet()

    return useMutation({
        mutationFn: async (data: AddIssuer) => {
            const tx = await contract.addIssuer(data.address, data.name)
            await tx.wait()
        },
        meta: {
            invalidateQueries: ['issuers'],
            successMessage: 'Issuer added',
            errorMessage: 'Could not add new issuer'
        }
    })
}

export function useRemoveIssuer() {
    const { contract } = useWallet()

    return useMutation({
        mutationFn: async (address: string) => {
            const tx = await contract.removeIssuer(address)
            await tx.wait()
        },
        meta: {
            invalidateQueries: ['issuers'],
            successMessage: 'Issuer removed',
            errorMessage: 'Could not remove issuer'
        }
    })
}
