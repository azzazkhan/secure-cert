'use client'

import { useWallet } from '@/hooks/use-wallet'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'
import { Badge } from '../ui/badge'

export default function ConnectionBadge() {
    const { loading, error, success } = useWallet()

    const label = useMemo(() => {
        switch (true) {
            case loading:
                return 'Connecting'
            case !!error:
                return 'Error connecting'
            case success:
                return 'Connected'
            default:
                return 'Connecting'
        }
    }, [loading, error, success])

    return (
        <Badge
            variant="secondary"
            className={cn({
                'flex items-center gap-2 rounded-full px-2.5 py-1': true,
                'bg-yellow-100 text-yellow-800': loading,
                'bg-green-100 text-green-800': success,
                'bg-red-100 text-red-800': error
            })}
        >
            <span className="relative flex size-3 scale-75 transform">
                <span
                    className={cn({
                        'absolute hidden h-full w-full animate-ping rounded-full opacity-75': true,
                        'bg-yellow-400': loading,
                        'inline-flex bg-green-400': success,
                        'bg-red-400': error
                    })}
                />
                <span
                    className={cn({
                        'relative inline-flex size-3 rounded-full': true,
                        'bg-yellow-500': loading,
                        'bg-green-500': success,
                        'bg-red-500': error
                    })}
                />
            </span>
            {label}
        </Badge>
    )
}
