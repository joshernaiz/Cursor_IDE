# AI-Hint Component: [Backend Dockerfile] [Imagen multi-stage para Node.js] [Optimizada para desarrollo y producción]
# AI-Hint Flow: [Build process] [Development con hot reload, production optimizado] [Seguridad con usuario no-root]

# ========================================
# Development Stage
# ========================================
FROM node:18-alpine AS development

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

# Exponer puerto de desarrollo y debug
EXPOSE 3000 9229

# Health check para desarrollo
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Comando por defecto para desarrollo (con hot reload)
CMD ["npm", "run", "dev"]

# ========================================
# Build Stage
# ========================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY tsconfig.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Instalar dependencias de desarrollo para el build
RUN npm install --only=development

# Copiar código fuente
COPY src/ ./src/

# Construir aplicación TypeScript
RUN npm run build

# ========================================
# Production Stage
# ========================================
FROM node:18-alpine AS production

# Instalar dependencias de sistema mínimas
RUN apk add --no-cache \
    curl \
    dumb-init

# Crear usuario no-root para producción
RUN addgroup -g 1001 -S nodejs && \
    adduser -S taskflow -u 1001 -G nodejs

WORKDIR /app

# Copiar aplicación compilada desde builder
COPY --from=builder --chown=taskflow:nodejs /app/dist ./dist
COPY --from=builder --chown=taskflow:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=taskflow:nodejs /app/package.json ./

# Crear directorio para logs
RUN mkdir -p /app/logs && chown taskflow:nodejs /app/logs

# Cambiar a usuario no-root
USER taskflow

# Exponer puerto de aplicación
EXPOSE 3000

# Health check optimizado para producción
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Usar dumb-init para manejar señales correctamente
ENTRYPOINT ["dumb-init", "--"]

# Comando para producción
CMD ["node", "dist/index.js"] 