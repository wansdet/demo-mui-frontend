// src/common/store/auth-slice/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserAuth } from '@/common/models/user'

// 1. State interface
export interface UserState {
    user: IUserAuth | null
    isAuthenticated: boolean
}

// 2. Initial state
const initialState: UserState = {
    user: null,
    isAuthenticated: false,
}

// 3. Slice
const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<IUserAuth>) {
            state.user = action.payload
            state.isAuthenticated = true
        },
        resetAuth(state) {
            state.user = null
            state.isAuthenticated = false
        },
    },
})

// 4. Export actions
export const { setAuth, resetAuth } = authSlice.actions

// 5. Export reducer only
export default authSlice.reducer
