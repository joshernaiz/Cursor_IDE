// AI-Hint Component: [Redux Hooks] [TypeScript integration] [Typed hooks for useSelector and useDispatch]
// AI-Hint Flow: [State Access] [Type-safe Redux usage] [Hook abstraction]

import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Utility hook for commonly used UI state
export const useTheme = () => {
  return useAppSelector(state => state.ui.theme)
}

// Utility hook for loading states
export const useLoading = () => {
  return useAppSelector(state => state.ui.loading)
}

// Utility hook for notification state
export const useNotifications = () => {
  return useAppSelector(state => state.ui.notifications)
}

// Utility hook for authentication state
export const useAuth = () => {
  return useAppSelector(state => state.auth)
}

// Utility hook for modal state
export const useModal = () => {
  return useAppSelector(state => state.ui.modal)
} 