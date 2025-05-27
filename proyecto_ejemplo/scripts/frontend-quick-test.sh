#!/bin/bash

# AI-Hint Component: [Frontend Quick Test] [Rapid verification] [Basic functionality check for frontend Docker]
# AI-Hint Flow: [Quick Testing] [Fast build and run validation] [Essential checks only]

# Script de Prueba Rápida - Frontend Docker

set -e

echo "⚡ TaskFlow - Test Rápido de Frontend"
echo "==================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Cleanup function
cleanup() {
    docker stop taskflow-frontend-quick-test 2>/dev/null || true
    docker rm taskflow-frontend-quick-test 2>/dev/null || true
}

trap cleanup EXIT

# Test 1: Check Docker
print_info "Verificando Docker..."
if ! docker info > /dev/null 2>&1; then
    print_error "Docker no está ejecutándose"
    exit 1
fi
print_status "Docker disponible"

# Test 2: Check files
print_info "Verificando archivos esenciales..."
essential_files=("frontend/package.json" "frontend/Dockerfile" "frontend/src/main.tsx")
for file in "${essential_files[@]}"; do
    if [ ! -f "$file" ]; then
        print_error "Archivo faltante: $file"
        exit 1
    fi
done
print_status "Archivos esenciales presentes"

# Test 3: Build development image
print_info "Construyendo imagen de desarrollo..."
if docker build -t taskflow-frontend-dev:quick-test \
    --target development \
    --file frontend/Dockerfile \
    frontend/ > /dev/null 2>&1; then
    print_status "Imagen construida exitosamente"
else
    print_error "Error al construir imagen"
    exit 1
fi

# Test 4: Run container
print_info "Ejecutando contenedor..."
if docker run -d \
    --name taskflow-frontend-quick-test \
    -p 3001:3001 \
    taskflow-frontend-dev:quick-test > /dev/null 2>&1; then
    print_status "Contenedor iniciado"
else
    print_error "Error al iniciar contenedor"
    exit 1
fi

# Test 5: Check server response
print_info "Verificando servidor..."
max_attempts=15
attempt=0

while [ $attempt -lt $max_attempts ]; do
    if curl -f http://localhost:3001 > /dev/null 2>&1; then
        print_status "Servidor respondiendo correctamente"
        break
    fi
    sleep 2
    attempt=$((attempt + 1))
    if [ $attempt -eq $max_attempts ]; then
        print_error "Servidor no responde después de 30 segundos"
        print_info "Logs del contenedor:"
        docker logs taskflow-frontend-quick-test --tail 10
        exit 1
    fi
done

# Test 6: Basic HTML check
print_info "Verificando contenido HTML..."
if curl -s http://localhost:3001 | grep -q "TaskFlow\|root"; then
    print_status "HTML contiene elementos básicos"
else
    print_warning "HTML puede tener problemas"
fi

# Success summary
echo ""
print_status "🎉 ¡Test rápido completado exitosamente!"
echo ""
print_info "Frontend funcionando en: http://localhost:3001"
print_info "Para test completo ejecutar: ./scripts/1.3.8_frontend_docker_test.sh"
print_info "Para parar contenedor: docker stop taskflow-frontend-quick-test"

exit 0 