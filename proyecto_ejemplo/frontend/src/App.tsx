// AI-Hint Component: [App Root] [Router Provider] [Theme management, router setup, Redux integration]
// AI-Hint Flow: [App Bootstrap] [Router mounting, theme persistence, store provider] [Global providers]

import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { router } from '@/router'
import { store } from '@/store'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setTheme } from '@/store/slices/uiSlice'
import { NotificationProvider } from '@/components/ui/NotificationProvider'
import type { Theme } from '@/store/slices/uiSlice'

// Theme Manager Component (inside Redux Provider)
function ThemeManager() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.ui.theme)

  // Initialize theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('taskflow-theme') as Theme
    if (stored && stored !== theme) {
      dispatch(setTheme(stored))
    }
  }, [dispatch, theme])

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const applySystemTheme = () => {
        root.classList.toggle('dark', mediaQuery.matches)
      }
      
      applySystemTheme()
      mediaQuery.addEventListener('change', applySystemTheme)
      
      return () => mediaQuery.removeEventListener('change', applySystemTheme)
    } else {
      root.classList.toggle('dark', theme === 'dark')
    }
  }, [theme])

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('taskflow-theme', theme)
  }, [theme])

  return (
    <>
      {/* Global head management */}
      <Helmet>
        <meta name="theme-color" content={theme === 'dark' ? '#1f2937' : '#3b82f6'} />
      </Helmet>

      {/* Router Provider */}
      <RouterProvider router={router} />
      
      {/* Global Notification Provider */}
      <NotificationProvider />
    </>
  )
}

// Main App Component
function App() {
  return (
    <Provider store={store}>
      <ThemeManager />
    </Provider>
  )
}

export default App 