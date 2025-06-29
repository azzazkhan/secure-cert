'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import useIssueCertificate from './hooks'
import { Certificate, CertificateSchema } from './schema'

export default function IssueCertificate() {
    const { mutate, isPending } = useIssueCertificate()

    const form = useForm<Certificate>({
        resolver: zodResolver(CertificateSchema),
        defaultValues: {
            studentAddress: '',
            documentHash: ''
        }
    })

    const onSubmit = (data: Certificate) => {
        mutate(data, {
            onSuccess: () => {
                form.reset()
            }
        })
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
                                name="studentAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Student Ethereum Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Enter Ethereum address of the student"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="documentHash"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Document SHA-256 Hash</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Enter the SHA256 hash of the certificate document"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending && <LoaderCircle className="size-4 animate-spin" />}
                                {isPending ? 'Issuing Certificate' : 'Issue Certificate'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
