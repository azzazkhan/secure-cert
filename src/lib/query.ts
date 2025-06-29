import { MutationCache, QueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const queryClient = new QueryClient({
    mutationCache: new MutationCache({
        onSuccess: (_data, _variables, _context, mutation) => {
            if (mutation.meta?.successMessage) {
                toast.success(mutation.meta?.successMessage)
            }
        },
        onError: (_error, _variables, _context, mutation) => {
            if (typeof mutation.meta?.errorMessage === 'string') {
                toast.error(mutation.meta?.errorMessage || _error.message)
            }
        },
        onSettled: (_data, _error, _variables, _context, mutation) => {
            if (mutation.meta?.invalidateQueries) {
                console.log(mutation.meta?.invalidateQueries)

                queryClient.invalidateQueries({
                    queryKey: mutation.meta.invalidateQueries
                })
            }
        }
    })
})
