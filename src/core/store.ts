// src/core/store.ts
import { configureStore, combineReducers, type ThunkAction, type Action } from '@reduxjs/toolkit'
import authReducer from '@/common/store/auth-slice/authSlice'

// STEP 1: Define root reducer directly
// Combine the reducers into a single reducer function
const rootReducer = combineReducers({
    user: authReducer,
})

// STEP 2: Export RootState from the reducer type
// Type of RootState comes from rootReducer
export type RootState = ReturnType<typeof rootReducer>
export type AppPreloadedState = Partial<RootState>

// STEP 3: Factory function for creating store
// Use combined rootReducer in store creation
export const makeStore = (preloadedState?: Partial<RootState>) =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
    })

// STEP 4: Export a singleton for app use
export const store = makeStore()

// STEP 5: Export common types
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>