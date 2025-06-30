'use client'

import { Button } from '@/components/ui/button'
import { useWallet } from '@/hooks/use-wallet'

export default function ConnectionButton() {
    const { success, loading, reconnect } = useWallet()

    return (
        <Button
            size="lg"
            className="px-8 py-3 text-lg"
            disabled={loading || success}
            onClick={() => !loading && !success && reconnect()}
        >
            {loading ? 'Connecting to wallet' : success ? 'Connected to your wallet' : 'Retry connection'}
        </Button>
    )
}
