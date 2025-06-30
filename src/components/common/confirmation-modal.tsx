'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { useEvent } from '@/hooks/use-event'
import {
    CONFIRMATION_MODAL_CANCELLED,
    CONFIRMATION_MODAL_CLOSED,
    CONFIRMATION_MODAL_CONFIRMED,
    CONFIRMATION_MODAL_OPENED,
    OPEN_CONFIRMATION_MODAL,
    OpenConfirmationModalPayload,
    OpenConfirmationModalPayloadType
} from '@/lib/events/modal-events'
import { cn } from '@/lib/utils'
import { Archive, Copy, Loader2, LucideIcon, MessageCircleQuestion, RotateCcw, Trash2 } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'
import { IconType } from 'react-icons'

interface Icon {
    className?: string
    icon: LucideIcon | IconType
}

const icons: Record<OpenConfirmationModalPayloadType['type'], Icon> = {
    confirm: {
        icon: MessageCircleQuestion,
        className: 'text-primary'
    },
    delete: {
        icon: Trash2,
        className: 'bg-red-lighter text-red-dark'
    },
    archive: {
        icon: Archive,
        className: 'bg-orange-lighter text-orange-dark'
    },
    restore: {
        icon: RotateCcw,
        className: 'bg-green-lighter text-green-dark'
    },
    clone: {
        icon: Copy,
        className: 'bg-blue-lighter text-blue-dark'
    }
}

export const getInitialState = (): Omit<OpenConfirmationModalPayload, 'id'> => ({
    type: 'confirm',
    title: 'Are you sure?',
    description: '',
    icon: undefined,
    cancelable: true,
    cancelLabel: 'Cancel',
    confirmLabel: 'Confirm',
    // confirmationText: false,
    closeOnConfirm: true,
    onCancel: async () => {},
    onClose: async () => {},
    onConfirm: async () => {}
})

export default function ConfirmationModal() {
    const { on, emit } = useEvent()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const [state, setState] = useState<OpenConfirmationModalPayload>({
        ...getInitialState(),
        id: 'confirmation-modal'
    })

    // const text = typeof state.confirmationText === 'string' ? state.confirmationText : 'CONFIRM'
    // const [confirmationText, setConfirmationText] = useState('')

    // const confirmationDisabled = useMemo(() => {
    //     return loading || (text ? confirmationText.toLowerCase() !== text.toLowerCase() : false)
    // }, [confirmationText, loading, text])

    useEffect(() => {
        return on<OpenConfirmationModalPayload>(OPEN_CONFIRMATION_MODAL, (payload) => {
            setState((prev) => ({ ...prev, ...payload }))
            setOpen(true)
            emit(CONFIRMATION_MODAL_OPENED, payload.id)
        })
    }, [on, emit])

    const closeModal = (delay = 1000) => {
        setOpen(false)
        emit(CONFIRMATION_MODAL_CLOSED, state.id)

        setTimeout(() => {
            setState((prev) => ({ ...prev, ...getInitialState() }))
            // setConfirmationText('')
        }, delay)
    }

    const handleCancellation = () => {
        if (!state.cancelable || loading) {
            return
        }

        if (state.onCancel) {
            state
                .onCancel?.()
                .then(() => emit(CONFIRMATION_MODAL_CANCELLED, state.id))
                .finally(closeModal)
        } else {
            emit(CONFIRMATION_MODAL_CANCELLED, state.id)
            closeModal()
        }
    }

    const handleConfirmation = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // if (confirmationDisabled) {
        //     return
        // }

        setLoading(true)

        if (state.onConfirm) {
            state
                .onConfirm?.()
                .then(() => {
                    emit(CONFIRMATION_MODAL_CONFIRMED, state.id)

                    if (state.closeOnConfirm) {
                        closeModal()
                    }
                })
                .catch(() => {})
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
            emit(CONFIRMATION_MODAL_CONFIRMED, state.id)

            if (state.closeOnConfirm) {
                closeModal()
            }
        }
    }

    const Icon = icons[state.type || 'confirm'].icon

    return (
        <Dialog key={state.id} open={open} onOpenChange={(open) => !open && handleCancellation()}>
            <DialogContent showCloseButton={false} className="sm:max-w-md">
                <form onSubmit={handleConfirmation}>
                    <DialogHeader className="mb-2">
                        <div
                            className={cn(
                                'bg-primary/10 mx-auto mb-2 flex size-16 items-center justify-center rounded-full p-4',
                                icons[state.type || 'confirm'].className
                            )}
                        >
                            {state.icon || <Icon className="size-10" />}
                        </div>

                        <DialogTitle className="text-center text-lg font-semibold">{state.title}</DialogTitle>
                        {state.description && (
                            <DialogDescription className="text-center">{state.description}</DialogDescription>
                        )}
                    </DialogHeader>

                    {/* {state.confirmationText && (
                        <DialogDescription className="mt-4 mb-6 text-center">
                            <Input
                                type="text"
                                placeholder={`Type "${text}" to confirm`}
                                value={confirmationText}
                                onChange={(e) => setConfirmationText(e.target.value)}
                            />
                        </DialogDescription>
                    )} */}

                    <DialogFooter className={cn('mt-4 grid grid-cols-1 gap-2', state.cancelable && 'grid-cols-2')}>
                        {state.cancelable && (
                            <Button variant="ghost" onClick={handleCancellation} disabled={loading}>
                                {state.cancelLabel}
                            </Button>
                        )}

                        <Button
                            variant="default"
                            type="submit"
                            // disabled={confirmationDisabled}
                            disabled={loading}
                            className={cn(!state.cancelable && 'col-span-2', 'text-white', {
                                'bg-red hover:bg-red-dark dark:hover:bg-red/75': state.type === 'delete',
                                'bg-orange hover:bg-orange-dark dark:hover:bg-orange/75': state.type === 'archive',
                                'bg-green hover:bg-green-dark dark:hover:bg-green/75': state.type === 'restore',
                                'bg-blue hover:bg-blue-dark dark:hover:bg-blue/75': state.type === 'clone'
                            })}
                        >
                            {loading && <Loader2 className="size-4 animate-spin" />}
                            {state.confirmLabel}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
