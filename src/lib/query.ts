import { MutationCache, QueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const queryClient = new QueryClient({
    mutationCache: new MutationCache({
        onSuccess: (_data, _variables, _context, mutation) => {
            if (mutation.meta?.successMessage) {
                const message =
                    mutation.meta.successMessage instanceof Function
                        ? mutation.meta.successMessage(_data)
                        : mutation.meta.successMessage

                toast.success(message)
            }
        },
        onError: (_error, _variables, _context, mutation) => {
            if (mutation.meta?.errorMessage) {
                const message =
                    mutation.meta.errorMessage instanceof Function
                        ? mutation.meta.errorMessage(_error)
                        : mutation.meta.errorMessage

                toast.error(message || _error.message)
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
