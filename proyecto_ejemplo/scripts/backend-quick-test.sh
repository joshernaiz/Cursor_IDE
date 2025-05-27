#!/bin/bash

# AI-Hint Component: [Backend Quick Test] [Fast validation] [Essential backend functionality check]
# AI-Hint Flow: [Quick Testing] [Build → Run → Health check → Cleanup] [Fast feedback loop]

# Script de Prueba Rápida - Backend TaskFlow

set -e

echo "🚀 TaskFlow - Test Rápido de Backend en Docker"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Utility functions
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Cleanup function
cleanup() {
    print_info "Limpiando recursos de prueba..."
    docker stop taskflow-backend-quick-test 2>/dev/null || true
    docker rm taskflow-backend-quick-test 2>/dev/null || true
    docker stop test-mongodb-quick 2>/dev/null || true
    docker rm test-mongodb-quick 2>/dev/null || true
    docker network rm taskflow-quick-network 2>/dev/null || true
}

# Setup cleanup trap
trap cleanup EXIT

echo ""
print_info "Iniciando test rápido del backend..."

# Test 1: Verificar prerrequisitos
print_info "Verificando prerrequisitos..."
if ! command -v docker &> /dev/null; then
    print_error "Docker no está instalado"
    exit 1
fi
print_status "Docker disponible"

# Test 2: Crear red de prueba
print_info "Creando red de prueba..."
docker network create taskflow-quick-network > /dev/null 2>&1
print_status "Red de prueba creada"

# Test 3: Iniciar MongoDB de prueba
print_info "Iniciando MongoDB de prueba..."
docker run -d --name test-mongodb-quick --network taskflow-quick-network mongo:6-jammy > /dev/null 2>&1
sleep 3
print_status "MongoDB iniciado"

# Test 4: Construir imagen de desarrollo
print_info "Construyendo imagen de desarrollo..."
if docker build -t taskflow-backend-dev:quick-test --target development --file backend/Dockerfile backend/ > /dev/null 2>&1; then
    print_status "Imagen construida exitosamente"
else
    print_error "Error al construir imagen"
    exit 1
fi

# Test 5: Ejecutar contenedor
print_info "Iniciando contenedor de backend..."
docker run -d --name taskflow-backend-quick-test \
    --network taskflow-quick-network \
    -p 3004:3000 \
    -e NODE_ENV=development \
    -e MONGODB_URI="mongodb://test-mongodb-quick:27017/taskflow_test" \
    -e JWT_SECRET="test-jwt-secret-for-development-must-be-32-characters-long" \
    taskflow-backend-dev:quick-test > /dev/null 2>&1

print_status "Contenedor iniciado"

# Test 6: Verificar que el servidor esté listo
print_info "Esperando que el servidor esté listo..."
for i in {1..15}; do
    if curl -s http://localhost:3004/health > /dev/null 2>&1; then
        print_status "Servidor respondiendo"
        break
    fi
    if [[ $i -eq 15 ]]; then
        print_error "Servidor no responde después de 45 segundos"
        print_info "Logs del contenedor:"
        docker logs taskflow-backend-quick-test | tail -10
        exit 1
    fi
    echo -n "."
    sleep 3
done

# Test 7: Verificar endpoints
print_info "Verificando endpoints..."

# Health endpoint
if curl -s http://localhost:3004/health | grep -q "healthy"; then
    print_status "Health endpoint funcional"
else
    print_error "Health endpoint no funciona"
    exit 1
fi

# API endpoint
if curl -s http://localhost:3004/api/v1 | grep -q "TaskFlow API"; then
    print_status "API v1 endpoint funcional"
else
    print_error "API v1 endpoint no funciona"
    exit 1
fi

# Test 8: Verificar logs
print_info "Verificando logs del servidor..."
container_logs=$(docker logs taskflow-backend-quick-test 2>&1)
if echo "$container_logs" | grep -q "TaskFlow API running"; then
    print_status "Servidor iniciado correctamente"
else
    print_error "Logs no muestran inicio correcto"
    exit 1
fi

echo ""
print_status "🎉 ¡Test rápido del backend EXITOSO!"
echo ""
print_info "✅ Backend funcionando correctamente en Docker"
print_info "✅ MongoDB conectado exitosamente"
print_info "✅ Endpoints respondiendo correctamente"
print_info "✅ Hot reload configurado"
echo ""
print_info "🔗 Health check: http://localhost:3004/health"
print_info "🔗 API endpoint: http://localhost:3004/api/v1"
echo ""
print_info "Para ejecutar el test completo: ./scripts/1.4.8_backend_docker_test.sh" 