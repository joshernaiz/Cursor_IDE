// AI-Hint Component: [Login Page] [Authentication form] [Email/password, remember me, navigation]

import { Link } from 'react-router-dom'
import { ROUTES } from '@/router'

function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Iniciar Sesión
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Accede a tu cuenta de TaskFlow
        </p>
      </div>

      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input w-full"
            placeholder="tu@email.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input w-full"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Recordarme</span>
          </label>
          <Link 
            to={ROUTES.AUTH.FORGOT_PASSWORD}
            className="text-sm text-primary-600 hover:text-primary-500"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Iniciar Sesión
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          ¿No tienes una cuenta?{' '}
          <Link 
            to={ROUTES.AUTH.REGISTER}
            className="text-primary-600 hover:text-primary-500 font-medium"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>

      {/* Development Notice */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-xs text-blue-800 dark:text-blue-200 text-center">
          🚧 Formulario en desarrollo - No funcional aún
        </p>
      </div>
    </div>
  )
}

export default LoginPage 