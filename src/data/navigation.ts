import { FileCheck, Search, Settings, Shield, UserCheck } from 'lucide-react'

export const navigation = [
    { path: '/', label: 'Home', icon: Shield },
    { path: '/issue', label: 'Issue Certificate', icon: FileCheck },
    { path: '/revoke', label: 'Revoke Certificate', icon: UserCheck },
    { path: '/verify', label: 'Verify Certificate', icon: Search },
    { path: '/manage', label: 'Manage Issuers', icon: Settings }
]
