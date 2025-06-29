import { z } from 'zod'

export const AddressSchema = z
    .string()
    .refine((val) => /(\b0x[A-Fa-f0-9]{40}\b)/g.test(val), { message: 'The field should be a valid ETH address' })

export const SHA256Schema = z
    .string()
    .refine((val) => /\b[A-Fa-f0-9]{64}\b/g.test(val), { message: 'The field should be a valid SHA-256 hash' })
