'use client'

import { queryClient } from '@/lib/query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

interface Props {
    children?: ReactNode
}

export default function QueryProvider({ children }: Props) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
