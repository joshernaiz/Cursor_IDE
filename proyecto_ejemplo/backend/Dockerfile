# AI-Hint Component: [Backend Dockerfile] [Multi-stage build para Node.js API] [Desarrollo con hot reload, producción optimizada]
# AI-Hint Flow: [Build Process] [Development stage con tsx watch, production con build optimizado] [Security con non-root user]

# ========================================
# Development Stage - Hot Reload with tsx
# ========================================
FROM node:20-alpine AS development

# Crear usuario no-root para desarrollo
RUN addgroup -g 1001 -S nodejs && \
    adduser -S taskflow -u 1001 -G nodejs

WORKDIR /app

# Instalar dependencias de sistema para desarrollo
RUN apk add --no-cache \
    curl \
    git \
    bash \
    tini

# Copiar package files para mejor caching de dependencias
COPY --chown=taskflow:nodejs package*.json ./

# Instalar dependencias con cache optimizado
RUN npm ci --include=dev && \
    npm cache clean --force

# Crear directorios para volúmenes montados
RUN mkdir -p src logs && \
    chown -R taskflow:nodejs src logs

# Copiar archivos de configuración (pueden ser sobrescritos por volúmenes)
COPY --chown=taskflow:nodejs tsconfig.json ./
COPY --chown=taskflow:nodejs .eslintrc.json ./
COPY --chown=taskflow:nodejs .prettierrc ./
COPY --chown=taskflow:nodejs jest.config.js ./

# Copiar código fuente para desarrollo
COPY --chown=taskflow:nodejs src/ ./src/

# Asegurar permisos correctos
RUN chown -R taskflow:nodejs /app && \
    chmod -R 755 /app

# Cambiar a usuario no-root
USER taskflow

# Exponer puertos para API y debugging
EXPOSE 3000
EXPOSE 9229

# Variables de entorno para desarrollo
ENV NODE_ENV=development
ENV PORT=3000
ENV DEBUG_PORT=9229

# Health check para desarrollo
HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Usar tini como init system para manejo correcto de señales
ENTRYPOINT ["/sbin/tini", "--"]

# Comando para desarrollo con tsx watch
CMD ["npm", "run", "dev:docker"]

# ========================================
# Build Stage - Compilación TypeScript
# ========================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependencias de producción y development para build
RUN npm ci && npm cache clean --force

# Copiar código fuente
COPY src/ ./src/

# Variables de entorno para build
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Compilar TypeScript a JavaScript
RUN npm run build

# Verificar que el build se creó correctamente
RUN ls -la dist/ && \
    test -f dist/index.js

# ========================================
# Production Stage - Runtime optimizado
# ========================================
FROM node:18-alpine AS production

# Instalar dependencias de sistema mínimas
RUN apk add --no-cache \
    curl \
    tini

# Crear usuario no-root para producción
RUN addgroup -g 1001 -S nodejs && \
    adduser -S taskflow -u 1001 -G nodejs

WORKDIR /app

# Copiar package files y instalar solo dependencias de producción
COPY package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force && \
    rm -rf /root/.npm

# Copiar aplicación compilada desde builder
COPY --from=builder --chown=taskflow:nodejs /app/dist ./dist

# Crear directorio para logs
RUN mkdir -p logs && \
    chown -R taskflow:nodejs logs

# Cambiar ownership de archivos
RUN chown -R taskflow:nodejs /app

# Cambiar a usuario no-root
USER taskflow

# Exponer puerto de API
EXPOSE 3000

# Variables de entorno para producción
ENV NODE_ENV=production
ENV PORT=3000

# Health check para producción
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Usar tini como init system
ENTRYPOINT ["/sbin/tini", "--"]

# Comando para producción
CMD ["npm", "run", "start:prod"] 