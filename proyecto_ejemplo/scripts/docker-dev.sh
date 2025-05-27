#!/bin/bash

# AI-Hint Flow: [Development Script] [Automatiza setup local Docker] [Build, start, logs, cleanup]
# AI-Hint Component: [Docker Development] [Gestión completa de servicios] [Comandos simplificados]

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables
COMPOSE_FILE="docker-compose.yml"
PROJECT_NAME="taskflow"

# Funciones de utilidad
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_blue() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Verificar dependencias
check_dependencies() {
    log_info "Verificando dependencias..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker no está instalado"
        echo "Instala Docker desde: https://docs.docker.com/get-docker/"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose no está instalado"
        echo "Instala Docker Compose desde: https://docs.docker.com/compose/install/"
        exit 1
    fi
    
    # Verificar que Docker esté corriendo
    if ! docker info &> /dev/null; then
        log_error "Docker no está corriendo"
        echo "Inicia Docker y vuelve a ejecutar el script"
        exit 1
    fi
    
    log_info "Dependencias verificadas ✓"
}

# Setup inicial
setup() {
    log_info "Configurando entorno de desarrollo..."
    
    # Crear archivo .env si no existe
    if [ ! -f .env ]; then
        if [ -f env.example ]; then
            cp env.example .env
            log_info "Archivo .env creado desde env.example"
        else
            log_warn "No se encontró env.example, creando .env básico"
            cat > .env << EOF
NODE_ENV=development
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=password123
MONGO_DB=taskflow
REDIS_PASSWORD=redis_password123
JWT_SECRET=dev-secret-key-change-in-production
BACKEND_PORT=3000
FRONTEND_PORT=3001
EOF
        fi
    else
        log_info "Archivo .env ya existe"
    fi
    
    # Crear directorios necesarios
    mkdir -p logs/backend
    mkdir -p logs/nginx
    mkdir -p docker/mongo/backup
    mkdir -p docker/nginx/ssl
    
    log_info "Setup completado ✓"
}

# Construir imágenes
build() {
    log_info "Construyendo imágenes Docker..."
    docker-compose -f $COMPOSE_FILE build --no-cache
    log_info "Imágenes construidas ✓"
}

# Construir solo un servicio
build_service() {
    if [ -z "$1" ]; then
        log_error "Especifica un servicio: backend, frontend, nginx"
        exit 1
    fi
    
    log_info "Construyendo servicio: $1"
    docker-compose -f $COMPOSE_FILE build --no-cache "$1"
    log_info "Servicio $1 construido ✓"
}

# Iniciar servicios
start() {
    log_info "Iniciando servicios de desarrollo..."
    
    # Iniciar servicios básicos
    docker-compose -f $COMPOSE_FILE up -d mongodb redis
    
    log_info "Esperando a que las bases de datos estén listas..."
    sleep 15
    
    # Iniciar backend
    docker-compose -f $COMPOSE_FILE up -d backend
    
    log_info "Esperando a que el backend esté listo..."
    sleep 10
    
    # Iniciar frontend
    docker-compose -f $COMPOSE_FILE up -d frontend
    
    log_info "Esperando a que el frontend esté listo..."
    sleep 10
    
    # Verificar estado de los servicios
    if docker-compose -f $COMPOSE_FILE ps | grep -q "Up"; then
        log_info "Servicios iniciados correctamente ✓"
        echo ""
        log_blue "🚀 Servicios disponibles:"
        log_blue "   Frontend: http://localhost:3001"
        log_blue "   Backend API: http://localhost:3000"
        log_blue "   MongoDB: mongodb://localhost:27017"
        log_blue "   Redis: redis://localhost:6379"
        echo ""
        log_blue "🔧 Comandos útiles:"
        log_blue "   ./scripts/docker-dev.sh logs        - Ver logs"
        log_blue "   ./scripts/docker-dev.sh status      - Ver estado"
        log_blue "   ./scripts/docker-dev.sh restart     - Reiniciar"
        log_blue "   ./scripts/docker-dev.sh stop        - Detener"
    else
        log_error "Error al iniciar algunos servicios"
        docker-compose -f $COMPOSE_FILE logs
        exit 1
    fi
}

# Iniciar con proxy nginx
start_full() {
    log_info "Iniciando servicios completos con nginx..."
    docker-compose -f $COMPOSE_FILE --profile full up -d
    
    log_info "Esperando a que todos los servicios estén listos..."
    sleep 20
    
    if docker-compose -f $COMPOSE_FILE ps | grep -q "Up"; then
        log_info "Servicios completos iniciados ✓"
        echo ""
        log_blue "🚀 Servicios disponibles:"
        log_blue "   Aplicación (Nginx): http://localhost:8080"
        log_blue "   Frontend directo: http://localhost:3001"
        log_blue "   Backend API directo: http://localhost:3000"
        log_blue "   MongoDB: mongodb://localhost:27017"
        log_blue "   Redis: redis://localhost:6379"
    fi
}

# Detener servicios
stop() {
    log_info "Deteniendo servicios..."
    docker-compose -f $COMPOSE_FILE down
    log_info "Servicios detenidos ✓"
}

# Reiniciar servicios
restart() {
    log_info "Reiniciando servicios..."
    stop
    sleep 2
    start
}

# Reiniciar un servicio específico
restart_service() {
    if [ -z "$1" ]; then
        log_error "Especifica un servicio: backend, frontend, mongodb, redis"
        exit 1
    fi
    
    log_info "Reiniciando servicio: $1"
    docker-compose -f $COMPOSE_FILE restart "$1"
    log_info "Servicio $1 reiniciado ✓"
}

# Ver estado de los servicios
status() {
    log_info "Estado de los servicios:"
    docker-compose -f $COMPOSE_FILE ps
}

# Limpiar todo
clean() {
    log_warn "Esto eliminará todos los contenedores, volúmenes e imágenes del proyecto"
    read -p "¿Estás seguro? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "Deteniendo servicios..."
        docker-compose -f $COMPOSE_FILE down -v --rmi all
        
        log_info "Limpiando imágenes huérfanas..."
        docker image prune -f
        
        log_info "Limpiando volúmenes huérfanos..."
        docker volume prune -f
        
        log_info "Limpieza completada ✓"
    else
        log_info "Operación cancelada"
    fi
}

# Ver logs
logs() {
    if [ -z "$1" ]; then
        log_info "Mostrando logs de todos los servicios..."
        docker-compose -f $COMPOSE_FILE logs -f --tail=100
    else
        log_info "Mostrando logs del servicio: $1"
        docker-compose -f $COMPOSE_FILE logs -f --tail=100 "$1"
    fi
}

# Ejecutar comando en un contenedor
exec_service() {
    if [ -z "$1" ]; then
        log_error "Especifica un servicio: backend, frontend"
        exit 1
    fi
    
    service=$1
    shift
    
    if [ $# -eq 0 ]; then
        # Sin comando específico, abrir shell
        docker-compose -f $COMPOSE_FILE exec "$service" sh
    else
        # Ejecutar comando específico
        docker-compose -f $COMPOSE_FILE exec "$service" "$@"
    fi
}

# Ejecutar tests
test() {
    log_info "Ejecutando tests..."
    
    # Test backend
    if docker-compose -f $COMPOSE_FILE ps backend | grep -q "Up"; then
        log_info "Ejecutando tests del backend..."
        docker-compose -f $COMPOSE_FILE exec backend npm test
    fi
    
    # Test frontend
    if docker-compose -f $COMPOSE_FILE ps frontend | grep -q "Up"; then
        log_info "Ejecutando tests del frontend..."
        docker-compose -f $COMPOSE_FILE exec frontend npm test -- --watchAll=false
    fi
}

# Reset base de datos
reset_db() {
    log_warn "Esto eliminará todos los datos de la base de datos"
    read -p "¿Estás seguro? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "Deteniendo MongoDB..."
        docker-compose -f $COMPOSE_FILE stop mongodb
        
        log_info "Eliminando volumen de datos..."
        docker-compose -f $COMPOSE_FILE down -v mongodb
        docker volume rm taskflow_mongodb_data 2>/dev/null || true
        
        log_info "Reiniciando MongoDB..."
        docker-compose -f $COMPOSE_FILE up -d mongodb
        
        log_info "Base de datos reseteada ✓"
    fi
}

# Menú principal
case "$1" in
    "setup")
        check_dependencies
        setup
        ;;
    "build")
        check_dependencies
        if [ -n "$2" ]; then
            build_service "$2"
        else
            build
        fi
        ;;
    "start")
        check_dependencies
        start
        ;;
    "start-full")
        check_dependencies
        start_full
        ;;
    "stop")
        stop
        ;;
    "restart")
        if [ -n "$2" ]; then
            restart_service "$2"
        else
            restart
        fi
        ;;
    "status")
        status
        ;;
    "clean")
        clean
        ;;
    "logs")
        logs "$2"
        ;;
    "exec")
        shift
        exec_service "$@"
        ;;
    "test")
        test
        ;;
    "reset-db")
        reset_db
        ;;
    *)
        echo "Uso: $0 {comando} [opciones]"
        echo ""
        echo "Comandos disponibles:"
        echo "  setup              - Configuración inicial del proyecto"
        echo "  build [servicio]   - Construir imágenes (opcionalmente un servicio específico)"
        echo "  start              - Iniciar servicios de desarrollo"
        echo "  start-full         - Iniciar servicios completos con nginx"
        echo "  stop               - Detener servicios"
        echo "  restart [servicio] - Reiniciar servicios (opcionalmente uno específico)"
        echo "  status             - Ver estado de los servicios"
        echo "  logs [servicio]    - Ver logs (opcionalmente de un servicio específico)"
        echo "  exec servicio [cmd] - Ejecutar comando en un servicio"
        echo "  test               - Ejecutar tests"
        echo "  reset-db           - Resetear base de datos"
        echo "  clean              - Limpiar todo (contenedores, volúmenes, imágenes)"
        echo ""
        echo "Ejemplos:"
        echo "  $0 setup                    # Configuración inicial"
        echo "  $0 start                    # Iniciar desarrollo"
        echo "  $0 logs backend             # Ver logs del backend"
        echo "  $0 exec backend npm install # Instalar dependencias en backend"
        echo "  $0 restart frontend         # Reiniciar solo frontend"
        exit 1
        ;;
esac 