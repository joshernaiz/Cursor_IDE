// AI-Hint Component: [UI Slice] [Global UI state] [Theme, modals, notifications, loading states]
// AI-Hint Flow: [UI Management] [State mutations for UI elements] [Centralized UI control]

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// Types for UI state
export type Theme = 'light' | 'dark' | 'system'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

export interface Modal {
  isOpen: boolean
  type: string | null
  data?: any
}

export interface UIState {
  theme: Theme
  loading: {
    global: boolean
    auth: boolean
    tasks: boolean
    projects: boolean
  }
  notifications: Notification[]
  modal: Modal
  sidebar: {
    isOpen: boolean
    isMobile: boolean
  }
}

// Initial state
const initialState: UIState = {
  theme: 'system',
  loading: {
    global: false,
    auth: false,
    tasks: false,
    projects: false,
  },
  notifications: [],
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },
  sidebar: {
    isOpen: true,
    isMobile: false,
  },
}

// UI slice
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Theme management
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
    },

    // Loading states
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload
    },
    
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.auth = action.payload
    },
    
    setTasksLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.tasks = action.payload
    },
    
    setProjectsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.projects = action.payload
    },

    // Notifications
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      }
      state.notifications.push(notification)
    },
    
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      )
    },
    
    clearNotifications: (state) => {
      state.notifications = []
    },

    // Modal management
    openModal: (state, action: PayloadAction<{ type: string; data?: any }>) => {
      state.modal = {
        isOpen: true,
        type: action.payload.type,
        data: action.payload.data,
      }
    },
    
    closeModal: (state) => {
      state.modal = {
        isOpen: false,
        type: null,
        data: null,
      }
    },

    // Sidebar management
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen
    },
    
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebar.isOpen = action.payload
    },
    
    setSidebarMobile: (state, action: PayloadAction<boolean>) => {
      state.sidebar.isMobile = action.payload
    },
  },
})

// Export actions
export const {
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
} = uiSlice.actions

// Export reducer
export default uiSlice.reducer 