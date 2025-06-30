import { ReactNode } from 'react'

export const OPEN_CONFIRMATION_MODAL = 'open-confirmation-modal'

export const CONFIRMATION_MODAL_OPENED = 'confirmation-modal-opened'
export const CONFIRMATION_MODAL_CLOSED = 'confirmation-modal-closed'
export const CONFIRMATION_MODAL_CONFIRMED = 'confirmation-modal-confirmed'
export const CONFIRMATION_MODAL_CANCELLED = 'confirmation-modal-cancelled'

export interface OpenConfirmationModalPayloadType {
    type: 'confirm' | 'delete' | 'archive' | 'restore' | 'clone'
    title?: ReactNode
    description?: ReactNode
    icon?: ReactNode
    cancelable?: boolean
    // confirmationText?: string | boolean
    cancelLabel?: ReactNode
    confirmLabel?: ReactNode
    closeOnConfirm?: boolean
    onCancel?: () => Promise<void>
    onClose?: () => Promise<void>
    onConfirm?: () => Promise<void>
}

export interface OpenConfirmationModalPayload extends Partial<OpenConfirmationModalPayloadType> {
    id: string
}
