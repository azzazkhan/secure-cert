'use client'

import AddIssuer from './add-issuer'
import ListIssuers from './list-issuers'

export default function ManageCertificate() {
    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900">Manage Issuers</h1>
                <p className="text-lg text-gray-600">Add or remove authorized certificate issuers</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                <div>
                    <AddIssuer />
                </div>
                <div>
                    <ListIssuers />
                </div>
            </div>
        </div>
    )
}
