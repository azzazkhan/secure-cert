import { AddressSchema, SHA256Schema } from '@/lib/schema'
import { z } from 'zod'

export const CertificateSchema = z.object({
    studentAddress: AddressSchema,
    documentHash: SHA256Schema
})

export type Certificate = z.infer<typeof CertificateSchema>
