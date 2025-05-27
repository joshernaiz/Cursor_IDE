// AI-Hint Component: [Home Page] [Landing page] [Navigation, project presentation, CTA]
// AI-Hint Flow: [User Journey] [First impression, navigation to auth] [Feature presentation]

import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ROUTES } from '@/router'

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>TaskFlow - Gestión de Tareas con IA</title>
        <meta 
          name="description" 
          content="Organiza, prioriza y completa tus tareas de manera eficiente con la ayuda de inteligencia artificial. Aumenta tu productividad con TaskFlow." 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Navigation */}
        <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  TaskFlow
                </span>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                  Características
                </a>
                <a href="#about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                  Acerca de
                </a>
                <Link 
                  to={ROUTES.AUTH.LOGIN} 
                  className="btn btn-outline"
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to={ROUTES.AUTH.REGISTER} 
                  className="btn btn-primary"
                >
                  Registrarse
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Gestiona tus tareas con{' '}
              <span className="text-primary-600">inteligencia artificial</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              TaskFlow combina la potencia de la IA con una interfaz intuitiva para 
              ayudarte a organizar, priorizar y completar tus tareas de manera más eficiente.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to={ROUTES.AUTH.REGISTER} 
                className="btn btn-primary text-lg px-8 py-3"
              >
                Comenzar Gratis
              </Link>
              <Link 
                to={ROUTES.APP.DASHBOARD} 
                className="btn btn-outline text-lg px-8 py-3"
              >
                Ver Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Características Principales
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Descubre cómo TaskFlow puede transformar tu productividad
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* AI Features */}
              <div className="card p-8 text-center card-hover">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Inteligencia Artificial
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Sugerencias inteligentes, priorización automática y análisis de carga de trabajo 
                  para optimizar tu productividad.
                </p>
              </div>

              {/* Organization */}
              <div className="card p-8 text-center card-hover">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Organización Flexible
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Gestiona tareas y proyectos con vistas Kanban, lista y calendario. 
                  Adaptable a tu flujo de trabajo.
                </p>
              </div>

              {/* Collaboration */}
              <div className="card p-8 text-center card-hover">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Colaboración en Equipo
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Trabaja en equipo, asigna tareas, comenta y mantente sincronizado 
                  con todos los miembros del proyecto.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Development Status */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                🚧 Proyecto en Desarrollo
              </h3>
              <p className="text-blue-800 dark:text-blue-200 mb-6">
                TaskFlow está actualmente en desarrollo. Esta es una demostración de la 
                interfaz y arquitectura del proyecto. Las funcionalidades se implementarán 
                gradualmente siguiendo el plan de desarrollo.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm">
                  ✅ Frontend Configurado
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-sm">
                  🔨 Backend en Progreso
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full text-sm">
                  ⏳ IA Pendiente
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                  <span className="text-xl font-bold">TaskFlow</span>
                </div>
                <p className="text-gray-400">
                  Gestión de tareas con inteligencia artificial
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Producto</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#features" className="hover:text-white">Características</a></li>
                  <li><a href="#" className="hover:text-white">Precios</a></li>
                  <li><a href="#" className="hover:text-white">Roadmap</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Soporte</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Documentación</a></li>
                  <li><a href="#" className="hover:text-white">Ayuda</a></li>
                  <li><a href="#" className="hover:text-white">Contacto</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Desarrollo</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">GitHub</a></li>
                  <li><a href="#" className="hover:text-white">API</a></li>
                  <li><a href="#" className="hover:text-white">Status</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 TaskFlow. Proyecto en desarrollo.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
} 