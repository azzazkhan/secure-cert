'use client'

import ConnectionMessage from '@/components/common/connection-message'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useWallet } from '@/hooks/use-wallet'
import { useIssuers } from './hooks'
import Issuer from './issuer'
import IssuerPlaceholder from './issuer-placeholder'
import { Issuers } from './schema'

export default function ListIssuers() {
    const { success } = useWallet()
    const { data, isLoading, isSuccess } = useIssuers<Issuers>()
    const [addresses = [], names = []] = data || []

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Current Issuers</CardTitle>
                <CardDescription>Manage existing authorized issuers</CardDescription>
            </CardHeader>
            {success ? (
                <CardContent className="flex flex-col gap-3">
                    {isLoading &&
                        Array.from({ length: 4 }).map((_, idx) => {
                            return <IssuerPlaceholder className="mb-1" key={idx} />
                        })}

                    {isSuccess &&
                        addresses.map((address, idx) => {
                            return <Issuer address={address} name={names[idx]!} key={address} />
                        })}
                </CardContent>
            ) : (
                <CardContent>
                    <ConnectionMessage />
                </CardContent>
            )}
        </Card>
    )
}
