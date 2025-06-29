'use client'

import { navigation } from '@/data'
import { Shield } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export default function Header() {
    const pathname = usePathname()

    return (
        <nav className="sticky top-0 right-0 left-0 flex justify-center border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
            <div className="flex h-16 max-w-7xl grow items-center justify-between gap-10">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Shield className="size-7 text-blue-600 md:size-8" />
                    <span className="text-xl font-bold text-gray-900 md:text-2xl">Secure Cert</span>
                </div>

                {/* Navigation Links */}
                <div className="hidden space-x-2 md:flex">
                    {navigation.map((item) => {
                        const Icon = item.icon
                        return (
                            <Button
                                asChild
                                key={item.path}
                                variant={pathname === item.path ? 'default' : 'ghost'}
                                className="flex items-center space-x-2"
                            >
                                <Link href={item.path}>
                                    <Icon className="size-4.5" />
                                    <span>{item.label}</span>
                                </Link>
                            </Button>
                        )
                    })}
                </div>

                {/* Wallet Connection */}
                <div className="flex items-center space-x-4">
                    <Badge
                        variant="secondary"
                        className="flex items-center gap-2 rounded-full bg-green-100 px-2.5 py-1 text-green-800"
                    >
                        <span className="relative flex size-3 scale-75 transform">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex size-3 rounded-full bg-green-500" />
                        </span>
                        Connected
                    </Badge>
                </div>
                {/* {isWalletConnected ? (
                        ) : (
                            <Button onClick={connectWallet} className="flex items-center space-x-2">
                                <Wallet className="h-4 w-4" />
                                <span>Connect Wallet</span>
                            </Button>
                        )} */}
            </div>
        </nav>
    )
}
