import { useContext, useState } from 'react'
import axios, { AxiosError } from 'axios'

import { SecurityContext } from '@/core/security'

interface ApiResponse<T> {
    data: T | null
    error: AxiosError | null
    loading: boolean
}

interface PatchAPIResponse<T> extends ApiResponse<T> {
    patchData: (patchData: T) => Promise<void>
}

const useApiPatch = <T>(url: string): PatchAPIResponse<T> => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<AxiosError | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const { authHeader } = useContext(SecurityContext)

    const headers = {
        ...authHeader(),
        'Content-Type': 'application/merge-patch+json',
    }

    const patchData = async (payload: Partial<T>): Promise<void> => {
        try {
            setLoading(true)
            const response = await axios.patch(url, payload, { headers })
            setData(response.data)
            setLoading(false)
            setError(null)
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

    return { data, error, loading, patchData }
}

export default useApiPatch
