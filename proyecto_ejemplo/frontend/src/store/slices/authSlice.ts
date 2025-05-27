// AI-Hint Component: [Auth Slice] [Authentication state] [User data, tokens, login status]
// AI-Hint Flow: [Authentication] [State mutations for auth flow] [User session management]

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// Types for authentication
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'admin'
  preferences: {
    theme: 'light' | 'dark' | 'system'
    notifications: boolean
    language: string
  }
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  tokens: AuthTokens | null
  isLoading: boolean
  error: string | null
  loginAttempts: number
  lastLoginAt: string | null
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  tokens: null,
  isLoading: false,
  error: null,
  loginAttempts: 0,
  lastLoginAt: null,
}

// Auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login flow
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    
    loginSuccess: (state, action: PayloadAction<{ user: User; tokens: AuthTokens }>) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.tokens = action.payload.tokens
      state.error = null
      state.loginAttempts = 0
      state.lastLoginAt = new Date().toISOString()
    },
    
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.user = null
      state.tokens = null
      state.error = action.payload
      state.loginAttempts += 1
    },

    // Logout
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.tokens = null
      state.error = null
      state.isLoading = false
    },

    // Token refresh
    refreshTokenStart: (state) => {
      state.isLoading = true
    },
    
    refreshTokenSuccess: (state, action: PayloadAction<AuthTokens>) => {
      state.tokens = action.payload
      state.isLoading = false
      state.error = null
    },
    
    refreshTokenFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false
      state.user = null
      state.tokens = null
      state.error = action.payload
      state.isLoading = false
    },

    // User profile updates
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    
    updateUserPreferences: (state, action: PayloadAction<Partial<User['preferences']>>) => {
      if (state.user) {
        state.user.preferences = { ...state.user.preferences, ...action.payload }
      }
    },

    // Error management
    clearAuthError: (state) => {
      state.error = null
    },
    
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },

    // Session management
    checkAuthStatus: (state) => {
      // This will be used by middleware or thunks to check token validity
      if (state.tokens && state.tokens.expiresAt < Date.now()) {
        // Token expired
        state.isAuthenticated = false
        state.user = null
        state.tokens = null
      }
    },

    // Reset login attempts (after successful login or timeout)
    resetLoginAttempts: (state) => {
      state.loginAttempts = 0
    },
  },
})

// Export actions
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  refreshTokenStart,
  refreshTokenSuccess,
  refreshTokenFailure,
  updateUserProfile,
  updateUserPreferences,
  clearAuthError,
  setAuthError,
  checkAuthStatus,
  resetLoginAttempts,
} = authSlice.actions

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth
export const selectUser = (state: { auth: AuthState }) => state.auth.user
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error

// Export reducer
export default authSlice.reducer 