import { useContext, useState, useEffect, useMemo } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'

import { SecurityContext } from '@/core/security'

interface ApiResponse<T> {
    data: T | null
    error: AxiosError | null
    loading: boolean
}

const useApiGet = <T>(
    url: string,
    hasAuthHeader = true
): ApiResponse<T> => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<AxiosError | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const { authHeader } = useContext(SecurityContext)
    const headers = useMemo(() => (hasAuthHeader ? authHeader() : {}), [hasAuthHeader, authHeader])

    useEffect(() => {
        let isMounted = true

        const fetchData = async (): Promise<void> => {
            try {
                const response: AxiosResponse<T> = await axios.get(url, {
                    headers,
                })
                if (isMounted) {
                    const responseData = response.data
                    // Infer the type when accessing the property 'member' on an unknown type
                    const extractedData =
                        (responseData as any).member || responseData
                    setData(extractedData)
                    setError(null)
                    setLoading(false)
                }
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

        fetchData().catch((err) => {
            setError(err)
            setLoading(false)
        })

        return () => {
            isMounted = false
        }
    }, [headers, url])

    return { data, error, loading }
}

export default useApiGet
