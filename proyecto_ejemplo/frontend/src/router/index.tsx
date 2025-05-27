// AI-Hint Component: [Router Config] [React Router setup] [Routes definition, lazy loading, guards]
// AI-Hint Flow: [Navigation] [Route matching, component loading] [Auth guards, redirects]

import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Import layout components
import { RootLayout } from '@/components/layout/RootLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { DashboardLayout } from '@/components/layout/DashboardLayout'

// Import immediate components (not lazy loaded)
import { HomePage } from '@/pages/HomePage'
import { LoadingPage } from '@/pages/LoadingPage'
import { ErrorPage } from '@/pages/ErrorPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

// Lazy loaded pages for code splitting
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'))

const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const TasksPage = lazy(() => import('@/pages/tasks/TasksPage'))
const TaskDetailPage = lazy(() => import('@/pages/tasks/TaskDetailPage'))
const ProjectsPage = lazy(() => import('@/pages/projects/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('@/pages/projects/ProjectDetailPage'))

const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'))
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'))

// Wrapper component for lazy loaded components
const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingPage />}>
    {children}
  </Suspense>
)

// Route definitions
const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: (
              <LazyWrapper>
                <LoginPage />
              </LazyWrapper>
            ),
          },
          {
            path: 'register',
            element: (
              <LazyWrapper>
                <RegisterPage />
              </LazyWrapper>
            ),
          },
          {
            path: 'forgot-password',
            element: (
              <LazyWrapper>
                <ForgotPasswordPage />
              </LazyWrapper>
            ),
          },
        ],
      },
      {
        path: 'app',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: (
              <LazyWrapper>
                <DashboardPage />
              </LazyWrapper>
            ),
          },
          {
            path: 'tasks',
            children: [
              {
                index: true,
                element: (
                  <LazyWrapper>
                    <TasksPage />
                  </LazyWrapper>
                ),
              },
              {
                path: ':taskId',
                element: (
                  <LazyWrapper>
                    <TaskDetailPage />
                  </LazyWrapper>
                ),
              },
            ],
          },
          {
            path: 'projects',
            children: [
              {
                index: true,
                element: (
                  <LazyWrapper>
                    <ProjectsPage />
                  </LazyWrapper>
                ),
              },
              {
                path: ':projectId',
                element: (
                  <LazyWrapper>
                    <ProjectDetailPage />
                  </LazyWrapper>
                ),
              },
            ],
          },
          {
            path: 'settings',
            element: (
              <LazyWrapper>
                <SettingsPage />
              </LazyWrapper>
            ),
          },
          {
            path: 'profile',
            element: (
              <LazyWrapper>
                <ProfilePage />
              </LazyWrapper>
            ),
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]

// Create and export router
export const router = createBrowserRouter(routes)

// Export route paths as constants for type safety
export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
  APP: {
    DASHBOARD: '/app',
    TASKS: '/app/tasks',
    TASK_DETAIL: (taskId: string) => `/app/tasks/${taskId}`,
    PROJECTS: '/app/projects',
    PROJECT_DETAIL: (projectId: string) => `/app/projects/${projectId}`,
    SETTINGS: '/app/settings',
    PROFILE: '/app/profile',
  },
} as const

// Type for route paths
export type RoutePath = typeof ROUTES[keyof typeof ROUTES] 