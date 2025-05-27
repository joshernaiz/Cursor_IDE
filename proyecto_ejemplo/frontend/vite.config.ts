// AI-Hint Component: [Vite Config] [Configuración del bundler] [React plugin, alias de paths, optimizaciones dev/prod]
// AI-Hint Flow: [Build Process] [Development server con HMR, build optimizado] [Port 3001 para Docker]

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
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

  // Development server configuration - Optimized for Docker hot reload
  server: {
    port: 3001,
    host: '0.0.0.0', // Required for Docker container access
    watch: {
      usePolling: true, // Required for Docker file watching
      interval: 100, // Polling interval in ms
    },
    hmr: {
      port: 3001, // Hot Module Replacement port
      host: 'localhost', // HMR host
    },
    strictPort: true,
    open: false, // Don't auto-open browser in container
    cors: true, // Enable CORS for cross-origin requests
  },

  // Preview server (production build testing)
  preview: {
    port: 3001,
    host: '0.0.0.0',
  },

  // Build optimizations
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@headlessui/react', '@heroicons/react', 'framer-motion'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          state: ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },

  // Environment variables prefix
  envPrefix: 'VITE_',

  // CSS configuration
  css: {
    devSourcemap: true,
  },
}) 