'use client'

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useVerifyCertificate } from './hooks'
import { VerificationResult, VerifyCertificate as VerifyCertificateForm, VerifyCertificateSchema } from './schema'

export default function VerifyCertificate() {
    const [opened, setOpened] = useState(false)
    const [verification, setVerification] = useState<VerificationResult | null>(null)

    const form = useForm<VerifyCertificateForm>({
        resolver: zodResolver(VerifyCertificateSchema),
        defaultValues: {
            documentHash: ''
        }
    })

    const { mutate, isPending } = useVerifyCertificate()

    const handleClose = () => {
        setOpened(false)
        setVerification(null)
        form.reset()
    }

    const onSubmit = (data: VerifyCertificateForm) => {
        mutate(data.documentHash, {
            onSuccess: (data) => {
                setOpened(true)
                setVerification(data)

                if (data.valid) {
                    setOpened(true)
                    setVerification(data)
                } else {
                    toast.error('The provided certificate is not valid')
                }
            }
        })
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
                                                <Input
                                                    {...field}
                                                    placeholder="Enter the SHA256 hash of the certificate document"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending && <LoaderCircle className="size-4 animate-spin" />}
                                {isPending ? 'Getting details' : 'Verify Certificate'}
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

            <AlertDialog open={opened} onOpenChange={(opened) => (!opened ? handleClose() : null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Verification Result</AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                    </AlertDialogHeader>
                    {verification && (
                        <div className="grid gap-3.5">
                            {/* Issuer Name */}
                            <div className="grid w-full items-center gap-2">
                                <Label>Issuer Name</Label>
                                <Input type="text" className="w-full" value={verification.issuer.name} readOnly />
                            </div>

                            {/* Issuer Address */}
                            <div className="grid w-full items-center gap-2">
                                <Label>Issuer Address</Label>
                                <Input type="text" className="w-full" value={verification.issuer.address} readOnly />
                            </div>

                            {/* Student Address */}
                            <div className="grid w-full items-center gap-2">
                                <Label>Student Address</Label>
                                <Input type="text" className="w-full" value={verification.student} readOnly />
                            </div>

                            {/* Document Hash */}
                            <div className="grid w-full items-center gap-2">
                                <Label>Document Hash</Label>
                                <Input type="text" className="w-full" value={verification.hash} readOnly />
                            </div>

                            {/* Issued At */}
                            <div className="grid w-full items-center gap-2">
                                <Label>Issued At</Label>
                                <Input type="text" className="w-full" value={verification.issued_at!} readOnly />
                            </div>
                        </div>
                    )}
                    <AlertDialogFooter className="flex justify-end">
                        <Button onClick={handleClose}>Close</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
