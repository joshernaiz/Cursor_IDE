// AI-Hint Component: [API Slice] [RTK Query setup] [Base API configuration, authentication, error handling]
// AI-Hint Flow: [API Management] [Request/response handling] [Centralized API logic]

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../index'

// Base URL from environment variables
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Get token from state
    const token = (getState() as RootState).auth.tokens?.accessToken
    
    // Add auth header if token exists
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    
    // Add content type
    headers.set('content-type', 'application/json')
    
    return headers
  },
})

// Base query with re-auth logic
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions)

  // If we get a 401, try to refresh the token
  if (result.error && result.error.status === 401) {
    // Try to get a new token
    const refreshToken = (api.getState() as RootState).auth.tokens?.refreshToken
    
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      )

      if (refreshResult.data) {
        // Store the new token
        // api.dispatch(refreshTokenSuccess(refreshResult.data))
        
        // Retry the original query
        result = await baseQuery(args, api, extraOptions)
      } else {
        // Refresh failed, logout user
        // api.dispatch(logout())
      }
    }
  }

  return result
}

// Create the API slice
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Task', 'Project', 'AI'],
  endpoints: () => ({}), // Individual API slices will inject endpoints
})

// Export hooks for usage in functional components
export const {
  // Auth endpoints will be injected here
  // Task endpoints will be injected here
  // Project endpoints will be injected here
  // AI endpoints will be injected here
} = api 