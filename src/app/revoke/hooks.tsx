import { useWallet } from '@/hooks/use-wallet'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export default function useRevokeCertificate() {
    const { contract, decoder } = useWallet()

    return useMutation({
        mutationFn: async (hash: string) => {
            const txn = await contract.revokeCertificate(`0x${hash}`)
            await txn.wait()
        },
        onError: async (error) => {
            const { reason } = await decoder.decode(error)

            toast.error(reason || 'Could not revoke certificate')
        },
        meta: {
            successMessage: 'Certificate revoked'
        }
    })
}
