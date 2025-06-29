'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useAddIssuer } from './hooks'
import { AddIssuer as AddIssuerForm, AddIssuerSchema } from './schema'

export default function AddIssuer() {
    const { mutate, isPending } = useAddIssuer()
    const form = useForm<AddIssuerForm>({
        resolver: zodResolver(AddIssuerSchema),
        defaultValues: {
            name: '',
            address: ''
        }
    })

    const onSubmit = async (data: AddIssuerForm) => {
        mutate(data, {
            onSuccess() {
                form.reset()
            }
        })
    }

    return (
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} placeholder="Enter name of the issuer" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ethereum Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Enter Ethereum address of the issuer"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending && <LoaderCircle className="size-4 animate-spin" />}
                            Add Issuer
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
