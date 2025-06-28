'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const AddIssuerSchema = z.object({
    issuerAddress: z.string().min(1)
})

type AddIssuer = z.infer<typeof AddIssuerSchema>

export default function ManageCertificate() {
    const form = useForm<AddIssuer>({
        resolver: zodResolver(AddIssuerSchema),
        defaultValues: {
            issuerAddress: ''
        }
    })

    const onSubmit = (data: AddIssuer) => {
        console.log(data)
    }

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900">Manage Issuers</h1>
                <p className="text-lg text-gray-600">Add or remove authorized certificate issuers</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Add Issuer */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Add New Issuer</CardTitle>
                        <CardDescription>Authorize a new address to issue certificates</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="issuerAddress"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ethereum Address</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full">
                                    Add Issuer
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                {/* Current Issuers */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Current Issuers</CardTitle>
                        <CardDescription>Manage existing authorized issuers</CardDescription>
                    </CardHeader>
                    {/* <CardContent>
                        <div className="space-y-3">
                            {issuers.map((issuer, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                                >
                                    <span className="mr-4 flex-1 truncate font-mono text-sm text-gray-600">
                                        {issuer}
                                    </span>
                                    <Button variant="destructive" size="sm" onClick={() => handleRemoveIssuer(issuer)}>
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            {issuers.length === 0 && (
                                <p className="py-4 text-center text-gray-500">No authorized issuers</p>
                            )}
                        </div>
                    </CardContent> */}
                </Card>
            </div>
        </div>
    )
}
