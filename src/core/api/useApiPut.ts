import { useContext, useState } from 'react'
import axios, { AxiosError } from 'axios'

import { SecurityContext } from '@/core/security'

interface ApiResponse<T> {
    data: T | null
    error: AxiosError | null
    loading: boolean
}

interface PutAPIResponse<T> extends ApiResponse<T> {
    putData: (putData: T) => Promise<void>
}

const useApiPut = <T>(url: string): PutAPIResponse<T> => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<AxiosError | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const { authHeader } = useContext(SecurityContext)
    const headers = authHeader()

    const putData = async (putData: Partial<T>): Promise<void> => {
        try {
            setLoading(true)
            const response = await axios.put(url, putData, { headers })
            setData(response.data)
            setError(null)
            setLoading(false)
        } catch (error: any) {
            setError(error)
            setLoading(false)
            throw error
        }
    }

    return { data, error, loading, putData }
}

export default useApiPut
