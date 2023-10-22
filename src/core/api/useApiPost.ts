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
    hasAuthHeader: boolean = true
): PostAPIResponse<T> => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<AxiosError | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const { authHeader } = useContext(SecurityContext)
    const headers = hasAuthHeader ? authHeader() : {}

    const postData = async (postData: T): Promise<void> => {
        try {
            setLoading(true)
            const response = await axios.post(url, postData, { headers })
            setData(response.data)
            setError(null)
            setLoading(false)
        } catch (error: any) {
            setError(error)
            // Extract the error message and error code from the error object
            // const { message, code } = error.response.data
            // console.log(`Error data: ${code}: ${message}`)
            setLoading(false)
            throw error
        }
    }

    return { data, error, loading, postData }
}

export default useApiPost
