// AI-Hint Component: [Loading Page] [Loading state] [Spinner, progress indication]

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-4">
        <div className="spinner w-8 h-8 mx-auto border-primary-600"></div>
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Cargando...
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Por favor espera un momento
          </p>
        </div>
      </div>
    </div>
  )
} 