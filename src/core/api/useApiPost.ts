/* src/core/api/useApiPost.ts */
import { useContext, useState } from 'react'
import axios, { AxiosError } from 'axios'

import { SecurityContext } from '@/core/security'

interface ApiResponse<T> {
    data: T | null
    error: AxiosError | null
    loading: boolean
}

interface PostAPIResponse<T> extends ApiResponse<T> {
    postData: (postData: T) => Promise<void>
}

const useApiPost = <T>(
    url: string,
    hasAuthHeader = true
): PostAPIResponse<T> => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<AxiosError | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const { authHeader } = useContext(SecurityContext)
    const headers = hasAuthHeader ? authHeader() : {}

    const postData = async (payload: T): Promise<void> => {
        try {
            setLoading(true)
            const response = await axios.post(url, payload, { headers })
            setData(response.data)
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

    return { data, error, loading, postData }
}

export default useApiPost
