// AI-Hint Component: [Vite Dev Config] [Hot reload maximizado] [Configuración específica para desarrollo rápido]
// AI-Hint Flow: [Development Speed] [HMR optimization, fast refresh] [Docker optimized polling]

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Ultra-fast development configuration
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
      // Include React DevTools
      include: "**/*.{jsx,tsx}",
    })
  ],
  
  // Path aliases for cleaner imports
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/pages': resolve(__dirname, './src/pages'),
      '@/services': resolve(__dirname, './src/services'),
      '@/store': resolve(__dirname, './src/store'),
      '@/types': resolve(__dirname, './src/types'),
      '@/utils': resolve(__dirname, './src/utils'),
    },
  },

  // Ultra-optimized development server for hot reload
  server: {
    port: 3001,
    host: '0.0.0.0',
    watch: {
      usePolling: true,
      interval: 50, // Very fast polling for instant feedback
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
    hmr: {
      port: 3001,
      host: 'localhost',
      overlay: true, // Show errors in overlay
    },
    strictPort: true,
    open: false,
    cors: true,
    force: true, // Always invalidate cache
    clearScreen: false, // Keep logs visible in container
  },

  // Optimizations for development
  optimizeDeps: {
    force: true, // Always re-bundle deps
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@reduxjs/toolkit',
      'react-redux',
    ],
  },

  // Build settings optimized for fast development
  build: {
    sourcemap: true,
    minify: false, // Disable minification for faster builds
    target: 'esnext',
    rollupOptions: {
      output: {
        sourcemapExcludeSources: false,
      },
    },
  },

  // Environment variables
  envPrefix: 'VITE_',

  // CSS configuration for development
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },

  // Disable some optimizations for faster startup
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },

  // Define global constants for development
  define: {
    __DEV__: true,
    __PROD__: false,
  },
}) 