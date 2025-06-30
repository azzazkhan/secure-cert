import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function wait(duration: number) {
    if (duration < 0) {
        throw new Error('Duration cannot be negative')
    }

    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}
