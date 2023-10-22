// src/core/store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from '@/common/store/auth-slice/authSlice'
import counterReducer from '@/common/store/counter-slice/counterSlice'

export const store = configureStore({
    reducer: {
        user: authReducer,
        counter: counterReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
