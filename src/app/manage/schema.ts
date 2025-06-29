import { AddressSchema } from '@/lib/schema'
import { z } from 'zod'

export const AddIssuerSchema = z.object({
    name: z.string().min(3).max(30),
    address: AddressSchema
})

export const IssuersSchema = z.tuple([z.array(AddressSchema), z.array(z.string().min(3).max(30))])

export type AddIssuer = z.infer<typeof AddIssuerSchema>
export type Issuers = z.infer<typeof IssuersSchema>
