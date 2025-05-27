// AI-Hint Component: [Root Layout] [Base layout wrapper] [Outlet container, global providers]

import { Outlet } from 'react-router-dom'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Outlet />
    </div>
  )
} 