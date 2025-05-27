#!/bin/bash

# AI-Hint Component: [Dev Setup Script] [Development environment] [Hot reload optimization and Docker setup]
# AI-Hint Flow: [Development Workflow] [Environment preparation, container setup] [Quick start for developers]

set -e

echo "🚀 TaskFlow - Configuración de Desarrollo con Hot Reload"
echo "========================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker no está ejecutándose. Por favor, inicia Docker Desktop."
    exit 1
fi

print_status "Docker está ejecutándose"

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    print_error "docker-compose no está instalado. Por favor, instálalo primero."
    exit 1
fi

print_status "docker-compose está disponible"

# Create directories if they don't exist
print_info "Creando estructura de directorios necesaria..."
mkdir -p frontend/src/{components,hooks,pages,services,store,types,utils}
mkdir -p backend/src/{api,services,db,middleware,types,utils}
mkdir -p scripts/mongodb

print_status "Estructura de directorios creada"

# Clean up existing containers and volumes if needed
print_info "Limpiando contenedores existentes..."
docker-compose -f docker-compose.dev.yml down --volumes --remove-orphans 2>/dev/null || true

# Clean up development containers specifically
docker stop taskflow-frontend-dev taskflow-backend-dev taskflow-mongodb-dev taskflow-redis-dev 2>/dev/null || true
docker rm taskflow-frontend-dev taskflow-backend-dev taskflow-mongodb-dev taskflow-redis-dev 2>/dev/null || true

print_status "Contenedores limpiados"

# Create MongoDB initialization script
print_info "Creando script de inicialización de MongoDB..."
cat > scripts/mongodb/init-dev.js << 'EOF'
// MongoDB Development Database Initialization
// AI-Hint Component: [MongoDB Init] [Development database setup] [Initial collections and data]

// Switch to the development database
db = db.getSiblingDB('taskflow_dev');

// Create collections with initial data
db.users.createIndex({ "email": 1 }, { unique: true });
db.tasks.createIndex({ "userId": 1 });
db.projects.createIndex({ "userId": 1 });

// Insert sample data for development
db.users.insertOne({
  _id: ObjectId(),
  email: "dev@taskflow.com",
  name: "Developer User",
  role: "admin",
  createdAt: new Date(),
  preferences: {
    theme: "system",
    notifications: true,
    language: "es"
  }
});

print("Development database initialized successfully!");
EOF

print_status "Script de MongoDB creado"

# Set environment variables for development
print_info "Configurando variables de entorno..."
export NODE_ENV=development
export COMPOSE_PROJECT_NAME=taskflow-dev

print_status "Variables de entorno configuradas"

# Build and start development containers
print_info "Construyendo y iniciando contenedores de desarrollo..."
print_info "Esto puede tomar varios minutos la primera vez..."

# Build containers first
docker-compose -f docker-compose.dev.yml build --no-cache

print_status "Contenedores construidos"

# Start containers in background
docker-compose -f docker-compose.dev.yml up -d

print_status "Contenedores iniciados"

# Wait for services to be ready
print_info "Esperando a que los servicios estén listos..."

# Wait for MongoDB
echo -n "Esperando MongoDB"
until docker exec taskflow-mongodb-dev mongosh --eval "print('ready')" > /dev/null 2>&1; do
    echo -n "."
    sleep 2
done
echo ""
print_status "MongoDB está listo"

# Wait for Redis
echo -n "Esperando Redis"
until docker exec taskflow-redis-dev redis-cli ping > /dev/null 2>&1; do
    echo -n "."
    sleep 1
done
echo ""
print_status "Redis está listo"

# Wait for backend
echo -n "Esperando Backend"
until curl -f http://localhost:3000/health > /dev/null 2>&1; do
    echo -n "."
    sleep 2
done
echo ""
print_status "Backend está listo"

# Wait for frontend
echo -n "Esperando Frontend"
until curl -f http://localhost:3001 > /dev/null 2>&1; do
    echo -n "."
    sleep 2
done
echo ""
print_status "Frontend está listo"

# Show container status
print_info "Estado de los contenedores:"
docker-compose -f docker-compose.dev.yml ps

echo ""
print_status "¡Configuración de desarrollo completada!"
echo ""
print_info "Servicios disponibles:"
print_info "🌐 Frontend: http://localhost:3001 (con Hot Reload)"
print_info "🔧 Backend API: http://localhost:3000"
print_info "🗄️  MongoDB: mongodb://localhost:27017/taskflow_dev"
print_info "🔴 Redis: redis://localhost:6379"
echo ""
print_info "Comandos útiles:"
print_info "📋 Ver logs: docker-compose -f docker-compose.dev.yml logs -f [service]"
print_info "🔄 Reiniciar: docker-compose -f docker-compose.dev.yml restart [service]"
print_info "🛑 Parar: docker-compose -f docker-compose.dev.yml down"
print_info "🧹 Limpiar: docker-compose -f docker-compose.dev.yml down --volumes"
echo ""
print_warning "Hot Reload está habilitado - los cambios en código se reflejarán automáticamente"

# Open development tools if requested
if [[ "$1" == "--open" ]]; then
    print_info "Abriendo herramientas de desarrollo..."
    
    # Try to open browser (works on macOS and some Linux)
    if command -v open &> /dev/null; then
        open http://localhost:3001
    elif command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:3001
    else
        print_warning "No se pudo abrir el navegador automáticamente"
    fi
fi 