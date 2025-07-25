import { useContext, useState } from 'react'
import axios, { AxiosError } from 'axios'

import { SecurityContext } from '@/core/security'

interface ApiResponse<T> {
    data: T | null
    error: AxiosError | null
    loading: boolean
}

interface DeleteAPIResponse extends ApiResponse<null> {
    deleteData: () => Promise<void>
}

const useApiDelete = (url: string): DeleteAPIResponse => {
    const [error, setError] = useState<AxiosError | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const { authHeader } = useContext(SecurityContext)
    const headers = authHeader()

    const deleteData = async (): Promise<void> => {
        try {
            setLoading(true)
            await axios.delete(url, { headers })
            setError(null)
            setLoading(false)
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err)
                throw err
            } else {
                const unexpectedError = new Error('An unexpected error occurred')
                setError(unexpectedError as AxiosError)
                throw unexpectedError
            }
        }
    }

    return { error, loading, deleteData, data: null }
}

export default useApiDelete
