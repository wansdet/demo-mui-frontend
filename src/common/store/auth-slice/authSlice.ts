// src/common/store/auth-slice/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserAuth } from '@/common/models/user'

interface UserState {
    user: IUserAuth | null
    isAuthenticated: boolean
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Actions
        setAuth: (state, action: PayloadAction<IUserAuth>) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        resetAuth: (state) => {
            state.user = null
            state.isAuthenticated = false
        },
    },
})

export const { setAuth } = authSlice.actions
export const { resetAuth } = authSlice.actions
export default authSlice.reducer
