'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const VerifyCertificateSchema = z.object({
    documentHash: z.string().min(1)
})

type VerifyCertificate = z.infer<typeof VerifyCertificateSchema>

export default function VerifyCertificate() {
    const form = useForm<VerifyCertificate>({
        resolver: zodResolver(VerifyCertificateSchema),
        defaultValues: {
            documentHash: ''
        }
    })

    const isLoading = false

    const onSubmit = (data: VerifyCertificate) => {
        console.log(data)
    }

    return (
        <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900">Verify Certificate</h1>
                <p className="text-lg text-gray-600">Check the authenticity of any certificate</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Certificate Verification</CardTitle>
                    <CardDescription>Enter the document hash to verify certificate status</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="documentHash"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Document SHA-256 Hash</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Verifying...' : 'Verify Certificate'}
                            </Button>
                        </form>
                    </Form>

                    {/* Verification Result */}
                    {/* {verificationResult && (
                        <div className="mt-8 rounded-lg bg-gray-50 p-6">
                            <h3 className="mb-4 text-lg font-semibold">Verification Result</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Status:</span>
                                    {getStatusBadge(verificationResult.status)}
                                </div>
                                {verificationResult.issuedBy && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Issued By:</span>
                                        <span className="font-mono text-sm text-gray-600">
                                            {verificationResult.issuedBy}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )} */}
                </CardContent>
            </Card>
        </div>
    )
}
