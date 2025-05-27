// AI-Hint Component: [Main Entry] [React application entry point] [Providers setup, error handling, development tools]
// AI-Hint Flow: [App Bootstrap] [DOM mounting, providers wrapping] [Production optimizations, development tools]

// Extend Window interface for React DevTools
declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: any;
  }
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

// Import styles first to ensure proper loading order
import './index.css'

// Import main App component
import App from './App'

// Performance monitoring (development only)
const enablePerformanceMonitoring = () => {
  if (import.meta.env.DEV) {
    // Enable React DevTools profiling
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot = (id: any, root: any, priorityLevel: any) => {
        console.log('React render:', { id, priorityLevel })
      }
    }
  }
}

// Error reporting function
const reportError = (error: Error, errorInfo?: React.ErrorInfo) => {
  console.error('Application Error:', error)
  if (errorInfo) {
    console.error('Error Info:', errorInfo)
  }
  
  // In production, send to error reporting service
  if (import.meta.env.PROD) {
    // TODO: Integrate with error reporting service (Sentry, etc.)
    // sendErrorReport(error, errorInfo)
  }
}

// Global error handler for unhandled promises
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  reportError(new Error(event.reason))
})

// Global error handler for JavaScript errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  reportError(event.error)
})

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    reportError(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full space-y-6 text-center p-6">
            <div className="text-6xl">😔</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Algo salió mal
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Recargar página
              </button>
            </div>
            {import.meta.env.DEV && this.state.error && (
              <details className="text-left bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <summary className="text-red-800 dark:text-red-200 font-medium cursor-pointer">
                  Detalles del error (desarrollo)
                </summary>
                <pre className="text-red-700 dark:text-red-300 text-sm mt-2 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Performance observer for Core Web Vitals
const observeWebVitals = () => {
  if ('web-vital' in window) {
    // This would be implemented with web-vitals library
    // import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'
    console.log('Web Vitals monitoring enabled')
  }
}

// Initialize application
const initializeApp = () => {
  // Enable performance monitoring
  enablePerformanceMonitoring()
  
  // Observe web vitals
  observeWebVitals()
  
  // Get root element
  const rootElement = document.getElementById('root')
  
  if (!rootElement) {
    throw new Error('Root element not found. Please check your HTML file.')
  }

  // Create React root
  const root = ReactDOM.createRoot(rootElement)
  
  // Render application with providers
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ErrorBoundary>
    </React.StrictMode>
  )
  
  // Log initialization
  console.log(
    `🚀 TaskFlow v${import.meta.env.VITE_APP_VERSION || '1.0.0'} initialized in ${
      import.meta.env.MODE
    } mode`
  )
}

// Initialize the application
initializeApp() 