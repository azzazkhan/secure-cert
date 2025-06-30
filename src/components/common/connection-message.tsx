'use client'

import { useWallet } from '@/hooks/use-wallet'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { ComponentProps, useMemo } from 'react'
import { Button } from '../ui/button'

export default function ConnectionMessage({ className, ...props }: ComponentProps<'button'>) {
    const { loading, error, success, reconnect } = useWallet()

    const label = useMemo(() => {
        switch (true) {
            case loading:
                return 'Connecting'
            case !!error:
                return 'Retry connection'
            case success:
                return 'Connected'
            default:
                return 'Connecting'
        }
    }, [loading, error, success])

    return (
        <div className="flex flex-col items-center gap-y-4">
            <p className="text-muted-foreground text-center">Please connect your wallet to use this feature</p>

            <Button
                className={cn('max-w-max', className)}
                onClick={() => !loading && !!error && reconnect()}
                {...props}
            >
                {loading && <Loader2 className="animate-spin" />} {label}
            </Button>
        </div>
    )
}
