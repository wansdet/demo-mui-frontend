import { useEffect } from 'react'
import axios from 'axios'

function use401Interceptor(onUnauthorized: () => void) {
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    onUnauthorized()
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axios.interceptors.response.eject(interceptor)
        }
    }, [onUnauthorized])
}

export default use401Interceptor
