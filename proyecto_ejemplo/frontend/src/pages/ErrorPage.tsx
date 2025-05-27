// AI-Hint Component: [Error Page] [Error boundary fallback] [User-friendly error display]

import { Link, useRouteError } from 'react-router-dom'
import { ROUTES } from '@/router'

export function ErrorPage() {
  const error = useRouteError() as any

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl">😵</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            ¡Ups! Algo salió mal
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error?.statusText || error?.message || 'Ha ocurrido un error inesperado'}
          </p>
        </div>
        
        <div className="space-y-3">
          <Link 
            to={ROUTES.HOME} 
            className="btn btn-primary w-full"
          >
            Volver al inicio
          </Link>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-outline w-full"
          >
            Recargar página
          </button>
        </div>

        {process.env.NODE_ENV === 'development' && error && (
          <details className="text-left bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <summary className="text-red-800 dark:text-red-200 font-medium cursor-pointer">
              Detalles del error (desarrollo)
            </summary>
            <pre className="text-red-700 dark:text-red-300 text-sm mt-2 overflow-auto">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
} 