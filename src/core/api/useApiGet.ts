import { useContext, useState, useEffect } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'

import { SecurityContext } from '@/core/security'

interface ApiResponse<T> {
    data: T | null
    error: AxiosError | null
    loading: boolean
}

const useApiGet = <T>(
    url: string,
    hasAuthHeader: boolean = true
): ApiResponse<T> => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<AxiosError | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const { authHeader } = useContext(SecurityContext)
    const headers = hasAuthHeader ? authHeader() : {}

    useEffect(() => {
        let isMounted = true

        const fetchData = async (): Promise<void> => {
            try {
                const response: AxiosResponse<T> = await axios.get(url, {
                    headers,
                })
                if (isMounted) {
                    const responseData = response.data
                    // Infer the type when accessing the property 'hydra:member' on an unknown type
                    const extractedData =
                        (responseData as any)['hydra:member'] || responseData
                    setData(extractedData)
                    setError(null)
                    setLoading(false)
                }
            } catch (error: any) {
                if (isMounted) {
                    setError(error)
                    setLoading(false)
                    throw error
                }
            }
        }

        fetchData().catch((error) => {
            setError(error)
            setLoading(false)
        })

        return () => {
            isMounted = false
        }
    }, [url])

    return { data, error, loading }
}

export default useApiGet
