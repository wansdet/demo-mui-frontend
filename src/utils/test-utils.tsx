// src/utils/test-utils.tsx
import React, { PropsWithChildren } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { AppPreloadedState, makeStore } from '@/core/store'
import type { AppStore } from '@/core/store'

// Optional: import your router wrapper if needed for component testing
// import { MemoryRouter } from 'react-router-dom'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: AppPreloadedState
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = makeStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    const Wrapper: React.FC<PropsWithChildren> = ({ children }) => (
        <Provider store={store}>{children}</Provider>
    )

    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    }
}
