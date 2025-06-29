import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface Props {
    className?: string
}

export default function IssuerPlaceholder({ className }: Props) {
    return (
        <div className={cn('grid w-full max-w-sm items-center gap-2', className)}>
            <Skeleton className="h-4 w-40 rounded" />

            <div className="flex gap-2">
                <Skeleton className="h-9 grow rounded-md" />
                <Skeleton className="size-9 shrink-0 rounded-md" />
                <Skeleton className="size-9 shrink-0 rounded-md" />
            </div>
        </div>
    )
}
