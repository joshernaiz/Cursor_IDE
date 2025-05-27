// AI-Hint Component: [404 Page] [Not found handler] [User-friendly navigation back]

import { Link } from 'react-router-dom'
import { ROUTES } from '@/router'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl">🔍</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Página no encontrada
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            La página que buscas no existe o ha sido movida.
          </p>
        </div>
        
        <div className="space-y-3">
          <Link 
            to={ROUTES.HOME} 
            className="btn btn-primary w-full"
          >
            Ir al inicio
          </Link>
          <Link 
            to={ROUTES.APP.DASHBOARD} 
            className="btn btn-outline w-full"
          >
            Ir al dashboard
          </Link>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>¿Necesitas ayuda? <a href="#" className="text-primary-600 hover:underline">Contacta soporte</a></p>
        </div>
      </div>
    </div>
  )
} 