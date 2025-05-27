// AI-Hint Component: [Redux Store] [State management setup] [Store configuration, middleware, DevTools]
// AI-Hint Flow: [State Management] [Store creation, slice combination] [Middleware integration]

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { uiSlice } from './slices/uiSlice'
import { authSlice } from './slices/authSlice'
import { api } from './api/apiSlice'

// Configure the Redux store
export const store = configureStore({
  reducer: {
    // UI state slice
    ui: uiSlice.reducer,
    
    // Authentication slice
    auth: authSlice.reducer,
    
    // RTK Query API slice
    [api.reducerPath]: api.reducer,
  },
  
  // Add RTK Query middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for RTK Query
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(api.middleware),
  
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== 'production',
})

// Enable refetchOnFocus/refetchOnReconnect behaviors for RTK Query
setupListeners(store.dispatch)

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Re-export hooks and utilities
export * from './hooks'
export * from './slices'
export * from './api'

// Export store
export default store 