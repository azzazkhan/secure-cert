'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import useRevokeCertificate from './hooks'
import { RevokeCertificate as RevokeCertificateForm, RevokeCertificateSchema } from './schema'

export default function RevokeCertificate() {
    const { mutate, isPending } = useRevokeCertificate()
    const form = useForm<RevokeCertificateForm>({
        resolver: zodResolver(RevokeCertificateSchema),
        defaultValues: {
            documentHash: ''
        }
    })

    const onSubmit = (data: RevokeCertificateForm) => {
        mutate(data.documentHash, {
            onSuccess: () => {
                form.reset()
            }
        })
    }

    return (
        <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900">Revoke Certificate</h1>
                <p className="text-lg text-gray-600">Revoke a previously issued certificate</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Revocation Details</CardTitle>
                    <CardDescription>Enter the document hash of the certificate you want to revoke</CardDescription>
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

                            <Button type="submit" variant="destructive" className="w-full" disabled={isPending}>
                                {isPending && <LoaderCircle className="size-4 animate-spin" />}
                                {isPending ? 'Revoking Certificate' : 'Revoke Certificate'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Confirmation Modal */}
            {/* {showConfirmation && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <Card className="mx-4 max-w-md">
                      <CardHeader>
                          <CardTitle className="text-xl text-red-600">Confirm Revocation</CardTitle>
                          <CardDescription>
                              Are you sure you want to revoke this certificate? This action cannot be undone.
                          </CardDescription>
                      </CardHeader>
                      <CardContent className="flex space-x-4">
                          <Button variant="outline" onClick={() => setShowConfirmation(false)} className="flex-1">
                              Cancel
                          </Button>
                          <Button variant="destructive" onClick={confirmRevoke} className="flex-1">
                              Confirm Revoke
                          </Button>
                      </CardContent>
                  </Card>
              </div>
          )} */}
        </div>
    )
}
