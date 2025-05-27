# AI-Hint Component: [Frontend Dockerfile] [Imagen multi-stage para React] [Build optimizado con nginx]
# AI-Hint Flow: [Build process] [Development con Vite HMR, production con nginx] [Optimización de assets estáticos]

# ========================================
# Development Stage
# ========================================
FROM node:24-alpine AS development

# Crear usuario no-root para desarrollo
RUN addgroup -g 1001 -S nodejs && \
    adduser -S taskflow -u 1001 -G nodejs

WORKDIR /app

# Instalar dependencias de sistema para desarrollo
RUN apk add --no-cache \
    curl \
    git \
    bash

# Copiar package files para mejor caching
COPY --chown=taskflow:nodejs package*.json ./

# Instalar dependencias (incluyendo devDependencies)
RUN npm ci && npm cache clean --force

# Copiar código fuente
COPY --chown=taskflow:nodejs . .

# Cambiar a usuario no-root
USER taskflow

# Exponer puerto de Vite
EXPOSE 3001

# Health check para desarrollo
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3001 || exit 1

# Comando para desarrollo con hot reload
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3001"]

# ========================================
# Build Stage
# ========================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm ci && npm cache clean --force

# Copiar código fuente y archivos de configuración
COPY public/ ./public/
COPY src/ ./src/
COPY index.html ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY vite.config.ts ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Variables de entorno para build
ARG VITE_API_URL=http://localhost:3000/api
ARG VITE_MCP_ENABLED=true
ARG VITE_APP_VERSION=1.0.0

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_MCP_ENABLED=$VITE_MCP_ENABLED
ENV VITE_APP_VERSION=$VITE_APP_VERSION

# Construir aplicación para producción
RUN npm run build

# Verificar que el build se creó correctamente
RUN ls -la dist/

# ========================================
# Production Stage con Nginx
# ========================================
FROM nginx:alpine AS production

# Instalar curl para health checks
RUN apk add --no-cache curl

# Crear usuario no-root para nginx
RUN addgroup -g 1001 -S taskflow && \
    adduser -S taskflow -u 1001 -G taskflow

# Copiar configuración de nginx personalizada
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Copiar aplicación construida desde builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Ajustar permisos
RUN chown -R taskflow:taskflow /usr/share/nginx/html && \
    chown -R taskflow:taskflow /var/cache/nginx && \
    chown -R taskflow:taskflow /var/log/nginx && \
    chown -R taskflow:taskflow /etc/nginx/conf.d

# Cambiar ownership de directorios de trabajo de nginx
RUN touch /var/run/nginx.pid && \
    chown taskflow:taskflow /var/run/nginx.pid

# Cambiar a usuario no-root
USER taskflow

# Exponer puerto HTTP
EXPOSE 80

# Health check para producción
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:80 || exit 1

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"] 