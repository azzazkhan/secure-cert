import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CircleCheck, FileCheck, Search, UserCheck } from 'lucide-react'
import ConnectionButton from './connection-button'

export default function Home() {
    return (
        <div className="space-y-12">
            <div className="space-y-6 text-center">
                <h1 className="text-5xl leading-tight font-bold text-gray-900">
                    Blockchain Certificate
                    <span className="block text-blue-600">Verification Platform</span>
                </h1>
                <p className="mx-auto max-w-3xl text-xl text-gray-600">
                    Secure, transparent, and tamper-proof certificate verification powered by Ethereum blockchain
                    technology.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <Card className="transition-shadow duration-300 hover:shadow-lg">
                    <CardHeader className="text-center">
                        <FileCheck className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                        <CardTitle className="text-2xl">Issue Certificates</CardTitle>
                        <CardDescription className="text-lg">
                            Authorized issuers can create tamper-proof digital certificates
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <CircleCheck className="size-4" />
                                <span>Blockchain-based verification</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CircleCheck className="size-4" />
                                <span>SHA-256 hash authentication</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CircleCheck className="size-4" />
                                <span>Immutable record keeping</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="transition-shadow duration-300 hover:shadow-lg">
                    <CardHeader className="text-center">
                        <UserCheck className="mx-auto mb-4 h-12 w-12 text-green-600" />
                        <CardTitle className="text-2xl">Revoke Certificates</CardTitle>
                        <CardDescription className="text-lg">
                            Authorized issuers can revoke certificates when necessary
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <CircleCheck className="size-4" />
                                <span>Instant revocation</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CircleCheck className="size-4" />
                                <span>Transparent process</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CircleCheck className="size-4" />
                                <span>Audit trail maintained</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="transition-shadow duration-300 hover:shadow-lg">
                    <CardHeader className="text-center">
                        <Search className="mx-auto mb-4 h-12 w-12 text-purple-600" />
                        <CardTitle className="text-2xl">Verify Certificates</CardTitle>
                        <CardDescription className="text-lg">
                            Anyone can verify certificate authenticity instantly
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <CircleCheck className="size-4" />
                                <span>Public verification</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CircleCheck className="size-4" />
                                <span>Real-time status check</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CircleCheck className="size-4" />
                                <span>No registration required</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <h2 className="mb-4 text-3xl font-bold text-gray-900">Ready to Get Started?</h2>
                <p className="mb-6 text-lg text-gray-600">
                    Connect your wallet to begin issuing, revoking, or verifying certificates.
                </p>

                <ConnectionButton />
            </div>
        </div>
    )
}
