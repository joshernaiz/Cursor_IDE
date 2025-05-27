// AI-Hint Component: [Forgot Password Page] [Password recovery] [Email reset flow]

import { Link } from 'react-router-dom'
import { ROUTES } from '@/router'

function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Recuperar Contraseña
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Te enviaremos un enlace para restablecer tu contraseña
        </p>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
          🚧 Funcionalidad en desarrollo - Próximamente disponible
        </p>
      </div>

      <div className="text-center">
        <Link 
          to={ROUTES.AUTH.LOGIN}
          className="text-primary-600 hover:text-primary-500 font-medium"
        >
          ← Volver al inicio de sesión
        </Link>
      </div>
    </div>
  )
}

export default ForgotPasswordPage 