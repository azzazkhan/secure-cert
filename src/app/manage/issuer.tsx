'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useClipboard } from '@mantine/hooks'
import { Ban, Copy, Loader2 } from 'lucide-react'
import { useRemoveIssuer } from './hooks'

interface Props {
    name: string
    address: string
}

export default function Issuer({ address, name }: Props) {
    const clipboard = useClipboard({ timeout: 500 })
    const { mutate, isPending } = useRemoveIssuer()

    return (
        <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="email">{name}</Label>

            <div className="flex gap-2">
                <Input type="text" className="grow" value={address} readOnly disabled />

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="shrink-0"
                            onClick={() => clipboard.copy(address)}
                        >
                            <Copy />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{clipboard.copied ? 'Copied to clipboard' : 'Copy address'}</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="destructive"
                            size="icon"
                            className="shrink-0"
                            disabled={isPending}
                            onClick={() => mutate(address)}
                        >
                            {isPending ? <Loader2 className="animate-spin" /> : <Ban />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Remove issuer</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    )
}
