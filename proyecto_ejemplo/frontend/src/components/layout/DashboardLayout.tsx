// AI-Hint Component: [Dashboard Layout] [App layout wrapper] [Sidebar, header, main content]

import { Outlet, Link, useLocation } from 'react-router-dom'
import { ROUTES } from '@/router'

export function DashboardLayout() {
  const location = useLocation()

  const navigationItems = [
    { name: 'Dashboard', path: ROUTES.APP.DASHBOARD, icon: '📊' },
    { name: 'Tareas', path: ROUTES.APP.TASKS, icon: '✅' },
    { name: 'Proyectos', path: ROUTES.APP.PROJECTS, icon: '📁' },
    { name: 'Configuración', path: ROUTES.APP.SETTINGS, icon: '⚙️' },
  ]

  const isActiveRoute = (path: string) => {
    if (path === ROUTES.APP.DASHBOARD) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to={ROUTES.HOME} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                TaskFlow
              </span>
            </Link>

            {/* Quick Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                🔔
              </button>
              <Link 
                to={ROUTES.APP.PROFILE}
                className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium"
              >
                U
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-4">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActiveRoute(item.path)
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Development Info */}
            <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <p className="text-xs text-blue-800 dark:text-blue-200 font-medium">
                  🚧 En desarrollo
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                  Frontend configurado ✅
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
} 