/**
 * src/core/security/SecurityProvider.tsx
 * Provide the security context to the app
 */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/core/store'
import { resetAuth, setAuth } from '@/common/store/auth-slice/authSlice'
import use401Interceptor from '@/common/hooks/api/use401Interceptor'
import { PATH_SIGN_IN } from '@/core/application'
import { IUserAuth, IUserCredential } from '@/common/models/user'
import { authProvider } from './authProvider'
import { SecurityContext } from './SecurityContext'

export const SecurityProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [user, setUser] = useState<IUserAuth | null>(null)
    const [error, setError] = useState<string | null>(null)

    const dispatch = useDispatch()
    const isAuthenticated = useSelector(
        (state: RootState) => state.user.isAuthenticated
    )

    const navigate = useNavigate()
    use401Interceptor(() => {
        // Handle 401 error, e.g., redirect to sign-in page
        setUser(null)
        setError('Unauthorized')
        dispatch(resetAuth())
        navigate(PATH_SIGN_IN)
    })

    useEffect(() => {
        const storedUserAuth = authProvider.getStoredUserAuth()

        if (storedUserAuth?.username && storedUserAuth?.roles) {
            const userAuth = {
                username: storedUserAuth.username,
                roles: storedUserAuth.roles,
            }
            setUser(userAuth)
            dispatch(setAuth(userAuth))
        }
    }, [])

    const login = (
        userCredential: IUserCredential,
        callback: (response: IUserAuth | string) => void
    ) => {
        authProvider.login(userCredential, (response: IUserAuth | string) => {
            // console.log('SecurityProvider.login() response')
            if (typeof response === 'string') {
                setUser(null)
                setError(response)
                dispatch(resetAuth())
            } else {
                // console.log('User logged in successfully')
                // console.log(response)
                setUser(response)
                setError(null)
                dispatch(setAuth(response))
            }
            callback(response)
        })
    }

    const logout = (callback: VoidFunction) => {
        // console.log('SecurityProvider.logout()')
        authProvider.logout(() => {
            setUser(null)
            dispatch(resetAuth())
            callback()
        })
    }

    const authHeader = () => {
        return authProvider.authHeader()
    }

    const hasRole = (role: string) => {
        return user?.roles.includes(role) || false
    }

    const value = {
        user,
        error,
        isAuthenticated,
        hasRole,
        login,
        logout,
        authHeader,
    }

    return (
        <SecurityContext.Provider value={value}>
            {children}
        </SecurityContext.Provider>
    )
}
