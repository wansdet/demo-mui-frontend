/**
 * src/core/security/ProtectedRoutes.tsx
 * Guard the routes that require authentication
 */
import * as React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { SecurityContext } from './SecurityContext'
import { PATH_SIGN_IN } from '@/core/application'

export const ProtectedRoutes = () => {
    const auth = React.useContext(SecurityContext)
    const location = useLocation()

    return auth.isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to={PATH_SIGN_IN} state={{ from: location }} replace />
    )
}
