// AI-Hint Component: [Notification Provider] [Redux notification system] [Toast notifications with Redux state]
// AI-Hint Flow: [Notification Display] [Redux state subscription] [Auto-dismiss, user interaction]

import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { removeNotification, addNotification } from '@/store/slices/uiSlice'
import type { Notification } from '@/store/slices/uiSlice'

// Individual notification component
function NotificationItem({ notification }: { notification: Notification }) {
  const dispatch = useAppDispatch()

  // Auto-dismiss after duration
  useEffect(() => {
    if (notification.duration) {
      const timer = setTimeout(() => {
        dispatch(removeNotification(notification.id))
      }, notification.duration)

      return () => clearTimeout(timer)
    }
  }, [notification.id, notification.duration, dispatch])

  const handleDismiss = () => {
    dispatch(removeNotification(notification.id))
  }

  const getNotificationStyles = (type: Notification['type']) => {
    const baseStyles = "relative p-4 rounded-lg shadow-lg border max-w-sm"
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200`
      case 'error':
        return `${baseStyles} bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200`
      case 'warning':
        return `${baseStyles} bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200`
      case 'info':
      default:
        return `${baseStyles} bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200`
    }
  }

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return '✅'
      case 'error': return '❌'
      case 'warning': return '⚠️'
      case 'info': return 'ℹ️'
      default: return 'ℹ️'
    }
  }

  return (
    <div className={getNotificationStyles(notification.type)}>
      <div className="flex items-start">
        <span className="text-lg mr-3">{getIcon(notification.type)}</span>
        <div className="flex-1">
          <h4 className="font-medium">{notification.title}</h4>
          {notification.message && (
            <p className="text-sm mt-1 opacity-90">{notification.message}</p>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="ml-4 text-lg opacity-70 hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      </div>
    </div>
  )
}

// Main notification provider component
export function NotificationProvider() {
  const notifications = useAppSelector(state => state.ui.notifications)

  if (notifications.length === 0) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className="animate-slide-in"
        >
          <NotificationItem notification={notification} />
        </div>
      ))}
    </div>
  )
}

// Utility hook for easy notification creation
export function useNotification() {
  const dispatch = useAppDispatch()

  const showNotification = (notification: Omit<Notification, 'id'>) => {
    dispatch(
      addNotification({
        ...notification,
        duration: notification.duration || 5000, // Default 5 seconds
      })
    )
  }

  const showSuccess = (title: string, message?: string) => {
    showNotification({ type: 'success', title, message })
  }

  const showError = (title: string, message?: string) => {
    showNotification({ type: 'error', title, message })
  }

  const showWarning = (title: string, message?: string) => {
    showNotification({ type: 'warning', title, message })
  }

  const showInfo = (title: string, message?: string) => {
    showNotification({ type: 'info', title, message })
  }

  return {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }
} 