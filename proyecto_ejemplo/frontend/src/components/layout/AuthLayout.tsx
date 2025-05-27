// AI-Hint Component: [Auth Layout] [Authentication pages layout] [Login/register wrapper, branding]

import { Outlet, Link } from 'react-router-dom'
import { ROUTES } from '@/router'

export function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-600 text-white p-12">
        <div className="flex flex-col justify-center max-w-md mx-auto">
          <Link to={ROUTES.HOME} className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary-600 font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold">TaskFlow</span>
          </Link>
          
          <h1 className="text-3xl font-bold mb-4">
            Gestión de tareas con IA
          </h1>
          <p className="text-primary-100 leading-relaxed">
            Organiza, prioriza y completa tus tareas de manera más eficiente 
            con la ayuda de inteligencia artificial. Únete a miles de usuarios 
            que han mejorado su productividad.
          </p>
          
          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
              <span className="text-primary-100">Sugerencias inteligentes de IA</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
              <span className="text-primary-100">Colaboración en tiempo real</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
              <span className="text-primary-100">Sincronización multiplataforma</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <Link to={ROUTES.HOME} className="inline-flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">TaskFlow</span>
            </Link>
          </div>
          
          <Outlet />
        </div>
      </div>
    </div>
  )
} 