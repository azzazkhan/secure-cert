'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const CertificateSchema = z.object({
    student: z.string().min(1),
    document: z.string().min(1)
})

type Certificate = z.infer<typeof CertificateSchema>

export default function IssueCertificate() {
    const form = useForm<Certificate>({
        resolver: zodResolver(CertificateSchema),
        defaultValues: {
            student: '',
            document: ''
        }
    })

    const isLoading = false

    const onSubmit = (data: Certificate) => {
        console.log(data)
    }

    return (
        <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900">Issue Certificate</h1>
                <p className="text-lg text-gray-600">Create a new blockchain-verified certificate</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Certificate Details</CardTitle>
                    <CardDescription>
                        Enter the student&apos;s Ethereum address and document hash to issue a certificate
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="student"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Student Ethereum Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="document"
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

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Issuing Certificate...' : 'Issue Certificate'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
