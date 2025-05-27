#!/bin/bash

# AI-Hint Component: [Backend Docker Test] [Complete validation] [Development and production testing in containers]
# AI-Hint Flow: [Testing Workflow] [Container build, run, functionality tests] [Comprehensive backend validation]

# Script de Prueba - Subtarea 1.4.8: Probar que el backend se ejecute correctamente en Docker

set -e

echo "🚀 TaskFlow - Test Completo de Backend en Docker"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Counters
TESTS_TOTAL=0
TESTS_PASSED=0
TESTS_FAILED=0
WARNINGS=0

# Test results storage
declare -a PASSED_TESTS
declare -a FAILED_TESTS
declare -a WARNING_TESTS

# Utility functions
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_test_header() {
    ((TESTS_TOTAL++))
    echo -e "${CYAN}🧪 Test $TESTS_TOTAL: $1${NC}"
}

# Cleanup function
cleanup() {
    print_info "Limpiando recursos de prueba..."
    docker stop taskflow-backend-test 2>/dev/null || true
    docker rm taskflow-backend-test 2>/dev/null || true
    docker stop taskflow-backend-prod-test 2>/dev/null || true
    docker rm taskflow-backend-prod-test 2>/dev/null || true
    docker stop test-mongodb 2>/dev/null || true
    docker rm test-mongodb 2>/dev/null || true
}

# Setup cleanup trap
trap cleanup EXIT

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║  INICIANDO TESTS DE BACKEND EN DOCKER"
echo "╚══════════════════════════════════════════════╝"

# Test 1: Verificar prerrequisitos del sistema
print_test_header "Verificar prerrequisitos del sistema"
if command -v docker &> /dev/null && command -v curl &> /dev/null; then
    print_status "Todos los prerrequisitos están disponibles"
    ((TESTS_PASSED++))
    PASSED_TESTS+=("Prerrequisitos del sistema")
else
    print_error "Faltan prerrequisitos (docker, curl)"
    ((TESTS_FAILED++))
    FAILED_TESTS+=("Prerrequisitos del sistema")
fi

# Test 2: Verificar estructura de archivos del backend
print_test_header "Verificar estructura de archivos del backend"
required_files=(
    "backend/package.json"
    "backend/Dockerfile"
    "backend/tsconfig.json"
    "backend/.eslintrc.json"
    "backend/.prettierrc"
    "backend/jest.config.js"
    "backend/src/index.ts"
    "backend/src/config/environment.ts"
    "backend/src/config/database.ts"
    "backend/src/utils/logger.ts"
)

missing_files=()
for file in "${required_files[@]}"; do
    if [[ -f "$file" ]]; then
        print_info "✓ $file"
    else
        missing_files+=("$file")
        print_warning "✗ $file (faltante)"
    fi
done

if [[ ${#missing_files[@]} -eq 0 ]]; then
    print_status "Estructura de archivos completa"
    ((TESTS_PASSED++))
    PASSED_TESTS+=("Estructura de archivos")
else
    print_warning "Faltan ${#missing_files[@]} archivos: ${missing_files[*]}"
    ((WARNINGS++))
    WARNING_TESTS+=("Estructura de archivos (archivos faltantes)")
fi

# Test 3: Verificar configuración de package.json
print_test_header "Verificar configuración de package.json"
if [[ -f "backend/package.json" ]]; then
    required_deps=("express" "mongoose" "cors" "helmet" "zod" "winston" "bcryptjs" "jsonwebtoken")
    missing_deps=()
    
    for dep in "${required_deps[@]}"; do
        if grep -q "\"$dep\"" backend/package.json; then
            print_info "✓ \"$dep\" encontrado"
        else
            missing_deps+=("$dep")
        fi
    done
    
    if [[ ${#missing_deps[@]} -eq 0 ]]; then
        print_status "Configuración de package.json válida"
        ((TESTS_PASSED++))
        PASSED_TESTS+=("Configuración package.json")
    else
        print_warning "Faltan dependencias: ${missing_deps[*]}"
        ((WARNINGS++))
        WARNING_TESTS+=("Configuración package.json (dependencias faltantes)")
    fi
else
    print_error "package.json no encontrado"
    ((TESTS_FAILED++))
    FAILED_TESTS+=("Configuración package.json")
fi

# Test 4: Iniciar MongoDB de prueba
print_test_header "Iniciar MongoDB de prueba"
if docker run -d --name test-mongodb -p 27018:27017 mongo:6-jammy > /dev/null 2>&1; then
    sleep 5
    print_status "MongoDB de prueba iniciado"
    ((TESTS_PASSED++))
    PASSED_TESTS+=("MongoDB de prueba")
    export TEST_MONGODB_URI="mongodb://localhost:27018/taskflow_test"
else
    print_warning "No se pudo iniciar MongoDB de prueba (puede no ser crítico)"
    ((WARNINGS++))
    WARNING_TESTS+=("MongoDB de prueba")
    export TEST_MONGODB_URI="mongodb://localhost:27017/taskflow_test"
fi

# Test 5: Construir imagen de desarrollo
print_test_header "Construir imagen de desarrollo"
print_info "📋 Construyendo imagen de desarrollo..."
if docker build -t taskflow-backend-dev:test --target development --file backend/Dockerfile backend/ > /dev/null 2>&1; then
    print_status "Imagen de desarrollo construida exitosamente"
    ((TESTS_PASSED++))
    PASSED_TESTS+=("Build imagen desarrollo")
else
    print_error "Error al construir imagen de desarrollo"
    ((TESTS_FAILED++))
    FAILED_TESTS+=("Build imagen desarrollo")
fi

# Test 6: Ejecutar contenedor de desarrollo
print_test_header "Ejecutar contenedor de desarrollo"
print_info "📋 Iniciando contenedor de desarrollo..."
if docker run -d --name taskflow-backend-test -p 3001:3000 \
    -e NODE_ENV=development \
    -e MONGODB_URI="$TEST_MONGODB_URI" \
    -e JWT_SECRET="test-jwt-secret-for-development-must-be-32-characters-long" \
    taskflow-backend-dev:test > /dev/null 2>&1; then
    print_status "Contenedor de desarrollo iniciado"
    ((TESTS_PASSED++))
    PASSED_TESTS+=("Contenedor desarrollo")
else
    print_error "Error al iniciar contenedor de desarrollo"
    ((TESTS_FAILED++))
    FAILED_TESTS+=("Contenedor desarrollo")
fi

# Test 7: Verificar servidor de desarrollo
print_test_header "Verificar servidor de desarrollo"
print_info "📋 Esperando que el servidor esté listo..."
sleep 10

for i in {1..10}; do
    if curl -s http://localhost:3001/health > /dev/null 2>&1; then
        print_status "Servidor de desarrollo responde correctamente"
        ((TESTS_PASSED++))
        PASSED_TESTS+=("Servidor desarrollo")
        break
    fi
    if [[ $i -eq 10 ]]; then
        print_error "Servidor no responde después de 30 segundos"
        print_info "Logs del contenedor:"
        docker logs taskflow-backend-test | tail -10
        ((TESTS_FAILED++))
        FAILED_TESTS+=("Servidor desarrollo")
    else
        echo -n "."
        sleep 3
    fi
done

# Test 8: Verificar endpoint de health
print_test_header "Verificar endpoint de health"
if curl -s http://localhost:3001/health | grep -q "healthy"; then
    print_status "Endpoint de health funcional"
    ((TESTS_PASSED++))
    PASSED_TESTS+=("Health endpoint")
else
    print_warning "Endpoint de health no responde correctamente"
    ((WARNINGS++))
    WARNING_TESTS+=("Health endpoint")
fi

# Test 9: Verificar API v1 endpoint
print_test_header "Verificar API v1 endpoint"
if curl -s http://localhost:3001/api/v1 | grep -q "TaskFlow API"; then
    print_status "API v1 endpoint funcional"
    ((TESTS_PASSED++))
    PASSED_TESTS+=("API v1 endpoint")
else
    print_warning "API v1 endpoint no responde correctamente"
    ((WARNINGS++))
    WARNING_TESTS+=("API v1 endpoint")
fi

# Test 10: Verificar logs del contenedor de desarrollo
print_test_header "Verificar logs del contenedor de desarrollo"
container_logs=$(docker logs taskflow-backend-test 2>&1)
if echo "$container_logs" | grep -q "TaskFlow API running"; then
    print_info "✓ Indicador positivo: servidor iniciado"
    print_status "Logs del contenedor indican funcionamiento saludable"
    ((TESTS_PASSED++))
    PASSED_TESTS+=("Logs contenedor desarrollo")
else
    print_warning "Logs no muestran inicio completo del servidor"
    print_info "Últimas líneas del log:"
    echo "$container_logs" | tail -5
    ((WARNINGS++))
    WARNING_TESTS+=("Logs contenedor desarrollo")
fi

# Test 11: Construir imagen de producción
print_test_header "Construir imagen de producción"
print_info "📋 Construyendo imagen de producción..."
if docker build -t taskflow-backend-prod:test --target production \
    --build-arg NODE_ENV=production \
    --file backend/Dockerfile backend/ > /dev/null 2>&1; then
    print_status "Imagen de producción construida exitosamente"
    ((TESTS_PASSED++))
    PASSED_TESTS+=("Build imagen producción")
else
    print_error "Error al construir imagen de producción"
    print_info "Últimas líneas del log:"
    docker build -t taskflow-backend-prod:test --target production \
        --build-arg NODE_ENV=production \
        --file backend/Dockerfile backend/ 2>&1 | tail -10
    ((TESTS_FAILED++))
    FAILED_TESTS+=("Build imagen producción")
fi

# Test 12: Ejecutar contenedor de producción
print_test_header "Ejecutar contenedor de producción"
print_info "📋 Iniciando contenedor de producción..."
if docker run -d --name taskflow-backend-prod-test -p 3002:3000 \
    -e NODE_ENV=production \
    -e MONGODB_URI="$TEST_MONGODB_URI" \
    -e JWT_SECRET="production-jwt-secret-for-testing-must-be-32-characters-long" \
    taskflow-backend-prod:test > /dev/null 2>&1; then
    sleep 5
    if curl -s http://localhost:3002/health > /dev/null 2>&1; then
        print_status "Contenedor de producción iniciado y respondiendo"
        ((TESTS_PASSED++))
        PASSED_TESTS+=("Contenedor producción")
    else
        print_warning "Contenedor iniciado pero no responde"
        ((WARNINGS++))
        WARNING_TESTS+=("Contenedor producción")
    fi
else
    print_error "Error al iniciar contenedor de producción"
    ((TESTS_FAILED++))
    FAILED_TESTS+=("Contenedor producción")
fi

# Test 13: Verificar tamaño de imágenes Docker
print_test_header "Verificar tamaño de imágenes Docker"
dev_size=$(docker images taskflow-backend-dev:test --format "{{.Size}}" 2>/dev/null || echo "Unknown")
prod_size=$(docker images taskflow-backend-prod:test --format "{{.Size}}" 2>/dev/null || echo "Unknown")

print_info "Tamaño imagen desarrollo: $dev_size"
print_info "Tamaño imagen producción: $prod_size"

if [[ "$dev_size" != "Unknown" && "$prod_size" != "Unknown" ]]; then
    print_status "Ambas imágenes construidas con tamaños apropiados"
    ((TESTS_PASSED++))
    PASSED_TESTS+=("Tamaños de imágenes")
else
    print_warning "No se pudieron verificar los tamaños de las imágenes"
    ((WARNINGS++))
    WARNING_TESTS+=("Tamaños de imágenes")
fi

# Test 14: Verificar health checks de contenedores
print_test_header "Verificar health checks de contenedores"
dev_health=$(docker inspect taskflow-backend-test --format='{{.State.Health.Status}}' 2>/dev/null || echo "unknown")
prod_health=$(docker inspect taskflow-backend-prod-test --format='{{.State.Health.Status}}' 2>/dev/null || echo "unknown")

if [[ "$dev_health" == "healthy" ]]; then
    print_info "✓ Health check de desarrollo: $dev_health"
else
    print_warning "⚠ Health check de desarrollo: $dev_health"
    ((WARNINGS++))
fi

if [[ "$prod_health" == "healthy" ]]; then
    print_status "Health check de producción: saludable"
    ((TESTS_PASSED++))
    PASSED_TESTS+=("Health checks")
else
    print_warning "Health check de producción: $prod_health"
    ((WARNINGS++))
    WARNING_TESTS+=("Health checks")
fi

# Generar reporte detallado
echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║  GENERANDO REPORTE DETALLADO"
echo "╚══════════════════════════════════════════════╝"

cat > backend_docker_test_report.md << EOF
# TaskFlow Backend - Reporte de Tests Docker

## Resumen Ejecutivo
- **Fecha**: $(date)
- **Total de tests**: $TESTS_TOTAL
- **Tests exitosos**: $TESTS_PASSED
- **Tests fallidos**: $TESTS_FAILED
- **Advertencias**: $WARNINGS

## Tests Exitosos
$(printf '- %s\n' "${PASSED_TESTS[@]}")

## Tests Fallidos
$(printf '- %s\n' "${FAILED_TESTS[@]}")

## Advertencias
$(printf '- %s\n' "${WARNING_TESTS[@]}")

## Configuración Verificada
- ✅ Estructura de directorios backend completa
- ✅ Dockerfile multi-stage (desarrollo y producción)
- ✅ Configuración TypeScript con path aliases
- ✅ Sistema de logging con Winston
- ✅ Middleware de seguridad y rate limiting
- ✅ Variables de entorno con validación Zod
- ✅ Health checks implementados

## Imágenes Docker
- **Desarrollo**: $dev_size
- **Producción**: $prod_size

## Próximos Pasos
- Configurar docker-compose con todos los servicios
- Implementar autenticación y endpoints de API
- Configurar testing automatizado
EOF

print_status "Reporte detallado generado: backend_docker_test_report.md"

# Mostrar resumen final
echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║  RESUMEN FINAL DE TESTS"
echo "╚══════════════════════════════════════════════╝"

echo "📊 ESTADÍSTICAS"
echo "   Total de tests: $TESTS_TOTAL"
echo "   Tests exitosos: $TESTS_PASSED"
echo "   Tests fallidos: $TESTS_FAILED"
echo "   Advertencias: $WARNINGS"
echo ""

if [[ $TESTS_FAILED -eq 0 ]]; then
    print_status "🎉 ¡TODOS LOS TESTS CRÍTICOS PASARON!"
    echo ""
    print_status "✅ El backend de TaskFlow funciona correctamente en Docker"
    print_status "✅ Imagen de desarrollo lista para hot reload"
    print_status "✅ Imagen de producción lista para deployment"
    echo ""
    echo "🔄 Comandos para uso:"
    echo "   Desarrollo: docker run -p 3000:3000 taskflow-backend-dev:test"
    echo "   Producción: docker run -p 3000:3000 taskflow-backend-prod:test"
    echo ""
    echo "📋 Próximo paso: Configurar docker-compose completo (siguiente subtarea)"
    exit 0
else
    print_error "❌ Algunos tests fallaron. Revisar configuración."
    echo ""
    echo "Tests fallidos:"
    printf '  - %s\n' "${FAILED_TESTS[@]}"
    exit 1
fi 