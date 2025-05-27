// AI-Hint Component: [Dashboard Page] [Main overview] [Stats, recent tasks, quick actions]

function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Resumen de tu actividad y tareas
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="text-2xl mb-2">📝</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Tareas Pendientes
          </h3>
          <p className="text-3xl font-bold text-primary-600 mt-2">12</p>
        </div>
        
        <div className="card p-6">
          <div className="text-2xl mb-2">✅</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Completadas Hoy
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">5</p>
        </div>
        
        <div className="card p-6">
          <div className="text-2xl mb-2">📁</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Proyectos Activos
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">3</p>
        </div>
        
        <div className="card p-6">
          <div className="text-2xl mb-2">🎯</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Objetivos del Mes
          </h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">2/4</p>
        </div>
      </div>

      {/* Development Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          🚧 Dashboard en Desarrollo
        </h3>
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          Esta es una vista previa del dashboard principal. Se implementarán widgets 
          interactivos, gráficos de progreso y sugerencias de IA en futuras versiones.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
            ✅ Router Configurado
          </span>
          <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded">
            🔨 Estado Global Próximo
          </span>
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded">
            ⏳ API Backend Pendiente
          </span>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage 