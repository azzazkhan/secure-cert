'use client'

import { ProgressProvider as ProgressBarProvider } from '@bprogress/next/app'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export default function ProgressProvider({ children }: Props) {
    return (
        <ProgressBarProvider height="4px" color="#2563EB" options={{ showSpinner: false }} shallowRouting>
            {children}
        </ProgressBarProvider>
    )
}
