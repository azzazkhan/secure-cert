import Header from '@/components/layout/header'
// import { ThemeProvider } from '@/providers/theme-provider'
import ConfirmationModal from '@/components/common/confirmation-modal'
import EventProvider from '@/providers/event-provider'
import ProgressProvider from '@/providers/progress-provider'
import QueryProvider from '@/providers/query-provider'
import WalletProvider from '@/providers/wallet-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: 'Secure Cert',
    description: 'Issue and verify certificates using Ethereum smart contracts'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`min-h-dvh bg-gradient-to-br from-blue-50 to-indigo-100 font-sans antialiased ${inter.variable}`}
            >
                <ProgressProvider>
                    <QueryProvider>
                        <EventProvider>
                            <WalletProvider>
                                {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
                                <Header />
                                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
                                <Toaster />
                                <ConfirmationModal />
                                {/* </ThemeProvider> */}
                            </WalletProvider>
                        </EventProvider>
                    </QueryProvider>
                </ProgressProvider>
            </body>
        </html>
    )
}
