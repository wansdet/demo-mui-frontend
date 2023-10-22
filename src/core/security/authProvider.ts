// src/core/security/authProvider.ts
import axios from 'axios'
import { decodeToken } from 'react-jwt'

import { IUserAuth, IUserCredential } from '@/common/models/user'
import { API_BASE_URL } from '@/core/application'

export const authProvider = {
    async login(
        userCredential: IUserCredential,
        callback: (response: IUserAuth | string) => void
    ) {
        const url = `${API_BASE_URL}/api/login_check`
        // console.log('authProvider.login', url, userCredential)

        try {
            const response = await axios.post(url, userCredential)

            const responseData = response.data
            localStorage.setItem('user', JSON.stringify(responseData))
            localStorage.setItem('username', userCredential.username)
            const decodedToken: any = decodeToken(responseData.token)
            localStorage.setItem('role', decodedToken.roles[0])

            const useAuth = {
                username: userCredential.username,
                roles: decodedToken.roles,
            }

            callback(useAuth)
        } catch (error) {
            // this.isAuthenticated = false
            callback('Invalid credentials')
        }
    },
    getStoredUserAuth(): IUserAuth | null {
        const username = localStorage.getItem('username')
        const role = localStorage.getItem('role')
        // TODO: Refactor with API request to check valid user session

        if (!username || !role) {
            return null
        }

        return {
            username: username,
            roles: [role],
        }
    },
    logout(callback: VoidFunction) {
        // console.log('authProvider.logout')
        localStorage.removeItem('user')
        localStorage.removeItem('username')
        localStorage.removeItem('role')

        callback()
    },

    authHeader() {
        const user = JSON.parse(localStorage.getItem('user') || '{}')

        if (user && user.token) {
            return { Authorization: `Bearer ${user.token}` }
        } else {
            return {}
        }
    },
}
