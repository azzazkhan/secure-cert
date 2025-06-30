import { useWallet } from '@/hooks/use-wallet'
import { useMutation } from '@tanstack/react-query'
import { format, formatISO } from 'date-fns'
import { Certificate, VerificationResult } from './schema'

export function useVerifyCertificate() {
    const { contract } = useWallet()

    return useMutation({
        mutationFn: async (hash: string) => {
            const certificate = (await contract.getCertificate(`0x${hash}`)) as Certificate

            return {
                issuer: {
                    name: String(certificate[1]),
                    address: String(certificate[0])
                },
                student: String(certificate[2]),
                hash: String(certificate[3]),
                issued_at: certificate[4] ? format(formatISO(Number(certificate[4]) * 1000), 'PPP, h:mm a') : null,
                valid: Boolean(certificate[5])
            } satisfies VerificationResult
        },
        meta: {
            errorMessage: 'Could not fetch certificate'
        }
    })
}
