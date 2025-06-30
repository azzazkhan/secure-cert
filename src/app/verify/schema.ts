import { AddressSchema, SHA256Schema } from '@/lib/schema'
import { z } from 'zod'

export const VerifyCertificateSchema = z.object({
    documentHash: SHA256Schema
})

export const CertificateSchema = z.tuple([
    AddressSchema,
    z.string().min(1).max(30),
    AddressSchema,
    SHA256Schema,
    z.bigint(),
    z.boolean()
])

export const VerificationResultSchema = z.object({
    issuer: z.object({
        name: z.string(),
        address: AddressSchema
    }),
    student: AddressSchema,
    hash: SHA256Schema,
    issued_at: z.string().nullable(),
    valid: z.boolean()
})

export type VerifyCertificate = z.infer<typeof VerifyCertificateSchema>
export type Certificate = z.infer<typeof CertificateSchema>
export type VerificationResult = z.infer<typeof VerificationResultSchema>
