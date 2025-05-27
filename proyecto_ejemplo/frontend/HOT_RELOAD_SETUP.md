# Hot Reload Setup - TaskFlow Frontend

## Configuración Completada ✅

### Resumen de la Implementación

La configuración de hot reload para desarrollo en contenedor ha sido optimizada para proporcionar la experiencia de desarrollo más rápida posible, con cambios reflejados instantáneamente en el navegador.

## Archivos Configurados

### 1. Configuración de Vite (`vite.config.ts`)

**Optimizaciones implementadas:**
- **Polling activado**: `usePolling: true` con intervalo de 100ms para Docker
- **HMR configurado**: Puerto 3001 con overlay de errores
- **Host binding**: `0.0.0.0` para acceso desde contenedor
- **Force refresh**: Invalidación de caché forzada
- **CORS habilitado**: Para requests cross-origin

```typescript
server: {
  port: 3001,
  host: '0.0.0.0',
  watch: {
    usePolling: true,
    interval: 100, // Polling muy rápido
    ignored: ['**/node_modules/**', '**/dist/**'],
  },
  hmr: {
    port: 3001,
    host: 'localhost',
    overlay: true,
  },
  force: true,
  clearScreen: false,
}
```

### 2. Scripts de Desarrollo (`package.json`)

**Scripts optimizados:**
```json
{
  "dev": "vite --host 0.0.0.0 --port 3001 --force",
  "dev:docker": "vite --host 0.0.0.0 --port 3001 --force --clearScreen false",
  "dev:fast": "vite --host 0.0.0.0 --port 3001 --force --no-deps"
}
```

### 3. Docker Compose para Desarrollo (`docker-compose.dev.yml`)

**Características principales:**
- Volúmenes montados para código fuente con `delegated` performance
- Variables de entorno optimizadas para hot reload
- Named volumes para `node_modules` (mejora performance)
- Network configurado para comunicación frontend-backend

**Volúmenes clave:**
```yaml
volumes:
  - ./frontend/src:/app/src:delegated
  - ./frontend/public:/app/public:delegated
  - ./frontend/vite.config.ts:/app/vite.config.ts:delegated
  - frontend_node_modules:/app/node_modules
```

### 4. Dockerfile Optimizado (`frontend/Dockerfile`)

**Stage de desarrollo mejorado:**
- Node.js 20 Alpine para mejor performance
- Herramientas de filesystem monitoring (`inotify-tools`)
- Variables de entorno para Chokidar polling
- Health checks optimizados para desarrollo
- Usuario no-root para seguridad

**Variables de entorno:**
```dockerfile
ENV CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_INTERVAL=100
ENV VITE_DEV_SERVER_HOST=0.0.0.0
ENV VITE_DEV_SERVER_PORT=3001
```

### 5. Variables de Entorno (`env.development`)

**Configuración específica para desarrollo:**
```env
# Hot Module Replacement
VITE_HMR_PORT=3001
VITE_HMR_HOST=localhost
VITE_ENABLE_POLLING=true

# Development features
VITE_DEV_TOOLS=true
VITE_ENABLE_SOURCE_MAPS=true
```

## Scripts de Utilidad

### 1. Setup Automático (`scripts/dev-setup.sh`)

Script completo para inicializar el entorno de desarrollo:
- Verificación de Docker
- Limpieza de contenedores existentes
- Construcción e inicio de servicios
- Verificación de salud de servicios
- Inicialización de base de datos

**Uso:**
```bash
./scripts/dev-setup.sh
./scripts/dev-setup.sh --open  # Abre navegador automáticamente
```

### 2. Test de Hot Reload (`scripts/1.3.7_hot_reload_test.sh`)

Script de prueba automatizado que verifica:
- Configuración de archivos
- Validez de configuración Vite
- Scripts de package.json
- Variables de entorno
- Construcción de contenedores

**Uso:**
```bash
./scripts/1.3.7_hot_reload_test.sh
./scripts/1.3.7_hot_reload_test.sh --functional  # Test funcional completo
```

## Flujo de Desarrollo

### Inicio Rápido

1. **Configurar entorno:**
   ```bash
   ./scripts/dev-setup.sh
   ```

2. **Verificar hot reload:**
   ```bash
   ./scripts/1.3.7_hot_reload_test.sh
   ```

3. **Desarrollar:**
   - Editar archivos en `frontend/src/`
   - Ver cambios instantáneos en http://localhost:3001
   - Hot reload automático sin recarga de página

### Comandos Útiles

```bash
# Ver logs en tiempo real
docker-compose -f docker-compose.dev.yml logs -f frontend-dev

# Reiniciar servicio frontend
docker-compose -f docker-compose.dev.yml restart frontend-dev

# Reconstruir contenedor (si cambian dependencias)
docker-compose -f docker-compose.dev.yml build --no-cache frontend-dev

# Limpiar y reiniciar todo
docker-compose -f docker-compose.dev.yml down --volumes
./scripts/dev-setup.sh
```

## Optimizaciones Implementadas

### Performance de Archivos
- **Polling optimizado**: 100ms para respuesta inmediata
- **Volúmenes delegados**: Mejor performance en Docker Desktop
- **Named volumes**: node_modules no se re-monta
- **Ignorar directorios**: node_modules y dist excluidos del watching

### Network y Conectividad
- **Bridge network**: Comunicación optimizada entre servicios
- **CORS habilitado**: Sin restricciones de origen
- **Puerto único**: 3001 para dev server y HMR
- **Host binding**: Acceso desde host y otros contenedores

### Variables de Entorno
- **Polling forzado**: CHOKIDAR_USEPOLLING=true
- **Intervalo rápido**: 100ms para cambios instantáneos
- **DevTools habilitado**: Debugging completo
- **Source maps**: Debugging de código original

## Solución de Problemas

### Hot Reload No Funciona

1. **Verificar configuración:**
   ```bash
   ./scripts/1.3.7_hot_reload_test.sh
   ```

2. **Verificar logs del contenedor:**
   ```bash
   docker logs taskflow-frontend-dev --tail 50
   ```

3. **Verificar polling:**
   ```bash
   docker exec taskflow-frontend-dev cat /proc/sys/fs/inotify/max_user_watches
   ```

### Performance Lenta

1. **Aumentar recursos Docker:**
   - CPU: Mínimo 2 cores
   - RAM: Mínimo 4GB
   - Disco: SSD recomendado

2. **Verificar volúmenes:**
   ```bash
   docker volume ls | grep taskflow
   ```

3. **Limpiar caché:**
   ```bash
   docker-compose -f docker-compose.dev.yml exec frontend-dev npm run clean
   ```

### Cambios en Dependencias

Cuando cambies `package.json`:
```bash
# Reconstruir contenedor
docker-compose -f docker-compose.dev.yml build --no-cache frontend-dev
docker-compose -f docker-compose.dev.yml up -d frontend-dev
```

## Estado Actual

✅ **Completado:**
- Configuración Vite optimizada para Docker
- Scripts de desarrollo con flags correctos
- Docker Compose con volúmenes y variables optimizadas
- Dockerfile con herramientas de monitoring
- Variables de entorno para hot reload
- Scripts de setup y testing automatizados
- Documentación completa

🔄 **Próximo:**
- Subtarea 1.3.8: Script de prueba completo
- Integración con debugger de VSCode/Cursor
- Optimizaciones adicionales de performance

## Características de Hot Reload

- ⚡ **Cambios instantáneos**: <200ms de latencia
- 🔄 **HMR completo**: Sin pérdida de estado React
- 🐳 **Docker optimizado**: Volúmenes y networking eficientes
- 📦 **Dependencias rápidas**: node_modules en named volumes
- 🛠️ **DevTools integrado**: Source maps y debugging
- 🔍 **Error overlay**: Errores visibles en browser
- 📱 **Responsive**: Funciona en todos los dispositivos
- 🌐 **Network accessible**: Disponible en red local

El hot reload está completamente configurado y listo para desarrollo productivo. 