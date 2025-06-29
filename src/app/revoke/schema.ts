import { SHA256Schema } from '@/lib/schema'
import { z } from 'zod'

export const RevokeCertificateSchema = z.object({
    documentHash: SHA256Schema
})

export type RevokeCertificate = z.infer<typeof RevokeCertificateSchema>
