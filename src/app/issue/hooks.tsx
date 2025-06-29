import { useWallet } from '@/hooks/use-wallet'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Certificate } from './schema'

export default function useIssueCertificate() {
    const { contract, decoder } = useWallet()

    return useMutation({
        mutationFn: async (data: Certificate) => {
            const txn = await contract.issueCertificate(data.studentAddress, `0x${data.documentHash}`)
            await txn.wait()
        },
        onError: async (error) => {
            const { reason } = await decoder.decode(error)

            toast.error(reason || 'Could not issuer certificate')
        },
        meta: {
            successMessage: 'Certificate issued'
        }
    })
}
