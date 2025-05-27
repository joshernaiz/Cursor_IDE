// AI-Hint Component: [Slices Index] [Centralized exports] [Redux slices re-exports]

// UI Slice exports
export {
  uiSlice,
  setTheme,
  setGlobalLoading,
  setAuthLoading,
  setTasksLoading,
  setProjectsLoading,
  addNotification,
  removeNotification,
  clearNotifications,
  openModal,
  closeModal,
  toggleSidebar,
  setSidebarOpen,
  setSidebarMobile,
} from './uiSlice'

export type { Theme, Notification, Modal, UIState } from './uiSlice'

// Auth Slice exports
export {
  authSlice,
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
  selectAuth,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from './authSlice'

export type { User, AuthTokens, AuthState } from './authSlice' 