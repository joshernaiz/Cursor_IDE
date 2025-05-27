// AI-Hint Component: [Register Page] [Registration form] [User signup, validation]

import { Link } from 'react-router-dom'
import { ROUTES } from '@/router'

function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Crear Cuenta
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Únete a TaskFlow y mejora tu productividad
        </p>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
          🚧 Página en desarrollo - Próximamente disponible
        </p>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          ¿Ya tienes una cuenta?{' '}
          <Link 
            to={ROUTES.AUTH.LOGIN}
            className="text-primary-600 hover:text-primary-500 font-medium"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage 