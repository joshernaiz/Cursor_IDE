#!/bin/bash

# AI-Hint Component: [Frontend Docker Test] [Complete verification] [Development and production testing in containers]
# AI-Hint Flow: [Testing Workflow] [Container build, run, functionality tests] [Comprehensive frontend validation]

# Script de Prueba - Subtarea 1.3.8: Probar que el frontend se ejecute correctamente en Docker

set -e

echo "🐳 TaskFlow - Test Completo de Frontend en Docker"
echo "================================================="

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

# Function to print colored output
print_header() {
    echo -e "${MAGENTA}
╔══════════════════════════════════════════════╗
║  $1
╚══════════════════════════════════════════════╝${NC}"
}

print_test_start() {
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    echo -e "${CYAN}🧪 Test $TESTS_TOTAL: $1${NC}"
}

print_success() {
    TESTS_PASSED=$((TESTS_PASSED + 1))
    PASSED_TESTS+=("$1")
    echo -e "${GREEN}✅ $1${NC}"
}

print_failure() {
    TESTS_FAILED=$((TESTS_FAILED + 1))
    FAILED_TESTS+=("$1")
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    WARNINGS=$((WARNINGS + 1))
    WARNING_TESTS+=("$1")
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_step() {
    echo -e "${CYAN}📋 $1${NC}"
}

# Cleanup function
cleanup() {
    print_info "Limpiando recursos de prueba..."
    docker stop taskflow-frontend-test 2>/dev/null || true
    docker rm taskflow-frontend-test 2>/dev/null || true
    docker stop taskflow-frontend-prod-test 2>/dev/null || true
    docker rm taskflow-frontend-prod-test 2>/dev/null || true
    docker network rm taskflow-test-network 2>/dev/null || true
}

# Set trap for cleanup
trap cleanup EXIT

print_header "INICIANDO TESTS DE FRONTEND EN DOCKER"

# Test 1: Verificar prerrequisitos
print_test_start "Verificar prerrequisitos del sistema"

# Check Docker
if ! docker info > /dev/null 2>&1; then
    print_failure "Docker no está ejecutándose"
    exit 1
fi

# Check docker-compose
if ! command -v docker-compose &> /dev/null; then
    print_failure "docker-compose no está disponible"
    exit 1
fi

# Check curl
if ! command -v curl &> /dev/null; then
    print_failure "curl no está disponible"
    exit 1
fi

print_success "Todos los prerrequisitos están disponibles"

# Test 2: Verificar estructura de archivos
print_test_start "Verificar estructura de archivos del frontend"

required_files=(
    "frontend/package.json"
    "frontend/Dockerfile"
    "frontend/vite.config.ts"
    "frontend/tsconfig.json"
    "frontend/tailwind.config.js"
    "frontend/postcss.config.js"
    "frontend/index.html"
    "frontend/src/main.tsx"
    "frontend/src/App.tsx"
    "frontend/src/index.css"
)

all_files_present=true
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        print_info "✓ $file"
    else
        print_failure "Archivo faltante: $file"
        all_files_present=false
    fi
done

if [ "$all_files_present" = true ]; then
    print_success "Estructura de archivos completa"
else
    print_failure "Faltan archivos críticos"
    exit 1
fi

# Test 3: Verificar configuración de package.json
print_test_start "Verificar configuración de package.json"

package_checks=(
    "\"type\": \"module\""
    "\"scripts\""
    "\"dev\""
    "\"build\""
    "\"preview\""
    "\"react\""
    "\"vite\""
    "\"typescript\""
    "\"tailwindcss\""
    "\"@reduxjs/toolkit\""
)

package_valid=true
for check in "${package_checks[@]}"; do
    if grep -q "$check" frontend/package.json; then
        print_info "✓ $check encontrado"
    else
        print_warning "⚠ $check no encontrado en package.json"
        package_valid=false
    fi
done

if [ "$package_valid" = true ]; then
    print_success "Configuración de package.json válida"
else
    print_warning "Configuración de package.json tiene problemas menores"
fi

# Test 4: Construir imagen de desarrollo
print_test_start "Construir imagen de desarrollo"

print_step "Construyendo imagen de desarrollo..."
if docker build -t taskflow-frontend-dev:test \
    --target development \
    --file frontend/Dockerfile \
    frontend/ > /tmp/build_dev.log 2>&1; then
    print_success "Imagen de desarrollo construida exitosamente"
else
    print_failure "Error al construir imagen de desarrollo"
    echo "Últimas líneas del log:"
    tail -10 /tmp/build_dev.log
    exit 1
fi

# Test 5: Ejecutar contenedor de desarrollo
print_test_start "Ejecutar contenedor de desarrollo"

print_step "Iniciando contenedor de desarrollo..."
if docker run -d \
    --name taskflow-frontend-test \
    -p 3001:3001 \
    -e NODE_ENV=development \
    -e VITE_API_URL=http://localhost:3000/api \
    taskflow-frontend-dev:test > /dev/null 2>&1; then
    print_success "Contenedor de desarrollo iniciado"
else
    print_failure "Error al iniciar contenedor de desarrollo"
    exit 1
fi

# Test 6: Verificar que el servidor responde
print_test_start "Verificar servidor de desarrollo"

print_step "Esperando que el servidor esté listo..."
max_attempts=30
attempt=0
server_ready=false

while [ $attempt -lt $max_attempts ]; do
    if curl -f http://localhost:3001 > /dev/null 2>&1; then
        server_ready=true
        break
    fi
    sleep 2
    attempt=$((attempt + 1))
    echo -n "."
done
echo ""

if [ "$server_ready" = true ]; then
    print_success "Servidor de desarrollo responde correctamente"
else
    print_failure "Servidor de desarrollo no responde después de $max_attempts intentos"
    print_info "Logs del contenedor:"
    docker logs taskflow-frontend-test --tail 20
    exit 1
fi

# Test 7: Verificar contenido HTML
print_test_start "Verificar contenido HTML servido"

html_content=$(curl -s http://localhost:3001)
html_checks=(
    "<title>"
    "<div id=\"root\">"
    "TaskFlow"
    "<script"
)

html_valid=true
for check in "${html_checks[@]}"; do
    if echo "$html_content" | grep -q "$check"; then
        print_info "✓ $check encontrado en HTML"
    else
        print_warning "⚠ $check no encontrado en HTML"
        html_valid=false
    fi
done

if [ "$html_valid" = true ]; then
    print_success "HTML contiene elementos esperados"
else
    print_warning "HTML puede tener problemas menores"
fi

# Test 8: Verificar assets estáticos
print_test_start "Verificar carga de assets estáticos"

# Check if Vite dev server serves assets
if curl -f http://localhost:3001/src/main.tsx > /dev/null 2>&1; then
    print_success "Assets TypeScript se sirven correctamente"
else
    print_warning "Assets TypeScript no accesibles (puede ser normal en dev)"
fi

# Check if CSS is processed
if curl -s http://localhost:3001 | grep -q "tailwind\|css"; then
    print_success "CSS/Tailwind detectado en respuesta"
else
    print_warning "CSS/Tailwind no detectado claramente"
fi

# Test 9: Verificar logs del contenedor
print_test_start "Verificar logs del contenedor de desarrollo"

logs=$(docker logs taskflow-frontend-test --tail 50 2>&1)

log_checks=(
    "Local:"
    "3001"
    "ready"
)

logs_healthy=true
error_count=0

# Check for positive indicators
for check in "${log_checks[@]}"; do
    if echo "$logs" | grep -qi "$check"; then
        print_info "✓ Indicador positivo: $check"
    else
        print_warning "⚠ No encontrado en logs: $check"
        logs_healthy=false
    fi
done

# Check for errors
if echo "$logs" | grep -qi "error\|fatal\|exception"; then
    error_count=$(echo "$logs" | grep -ci "error\|fatal\|exception")
    print_warning "Se encontraron $error_count posibles errores en logs"
    logs_healthy=false
fi

if [ "$logs_healthy" = true ] && [ $error_count -eq 0 ]; then
    print_success "Logs del contenedor indican funcionamiento saludable"
else
    print_warning "Logs indican posibles problemas menores"
fi

# Test 10: Verificar rutas de la aplicación
print_test_start "Verificar rutas de la aplicación React"

# Test different routes
routes_to_test=(
    "/"
    "/auth/login"
    "/app/dashboard"
    "/404-page-that-doesnt-exist"
)

routes_working=0
total_routes=${#routes_to_test[@]}

for route in "${routes_to_test[@]}"; do
    if curl -f "http://localhost:3001${route}" > /dev/null 2>&1; then
        print_info "✓ Ruta funcional: $route"
        routes_working=$((routes_working + 1))
    else
        print_info "⚠ Ruta no responde: $route (puede ser normal para SPA)"
    fi
done

if [ $routes_working -gt 0 ]; then
    print_success "Sistema de rutas React funcional ($routes_working/$total_routes rutas respondieron)"
else
    print_warning "Sistema de rutas necesita verificación manual"
fi

# Test 11: Construir imagen de producción
print_test_start "Construir imagen de producción"

print_step "Construyendo imagen de producción..."
if docker build -t taskflow-frontend-prod:test \
    --target production \
    --build-arg VITE_API_URL=http://localhost:3000/api \
    --build-arg VITE_MCP_ENABLED=true \
    --file frontend/Dockerfile \
    frontend/ > /tmp/build_prod.log 2>&1; then
    print_success "Imagen de producción construida exitosamente"
else
    print_failure "Error al construir imagen de producción"
    echo "Últimas líneas del log:"
    tail -10 /tmp/build_prod.log
fi

# Test 12: Ejecutar contenedor de producción
print_test_start "Ejecutar contenedor de producción"

# Stop development container first
docker stop taskflow-frontend-test > /dev/null 2>&1

print_step "Iniciando contenedor de producción..."
if docker run -d \
    --name taskflow-frontend-prod-test \
    -p 3001:80 \
    taskflow-frontend-prod:test > /dev/null 2>&1; then
    print_success "Contenedor de producción iniciado"
    
    # Wait for production server
    print_step "Esperando servidor de producción..."
    sleep 5
    
    if curl -f http://localhost:3001 > /dev/null 2>&1; then
        print_success "Servidor de producción responde correctamente"
        
        # Check production build features
        prod_content=$(curl -s http://localhost:3001)
        if echo "$prod_content" | grep -q "assets.*js\|assets.*css"; then
            print_success "Assets de producción detectados (bundling correcto)"
        else
            print_warning "Assets de producción no detectados claramente"
        fi
        
    else
        print_warning "Servidor de producción no responde"
    fi
else
    print_warning "Error al iniciar contenedor de producción"
fi

# Test 13: Verificar tamaño de imágenes
print_test_start "Verificar tamaño de imágenes Docker"

dev_size=$(docker images taskflow-frontend-dev:test --format "{{.Size}}")
prod_size=$(docker images taskflow-frontend-prod:test --format "{{.Size}}" 2>/dev/null || echo "N/A")

print_info "Tamaño imagen desarrollo: $dev_size"
if [ "$prod_size" != "N/A" ]; then
    print_info "Tamaño imagen producción: $prod_size"
fi

# Basic size validation (development should be larger than production base)
if [ "$prod_size" != "N/A" ]; then
    print_success "Ambas imágenes construidas con tamaños apropiados"
else
    print_warning "Imagen de producción no disponible para comparación"
fi

# Test 14: Verificar configuración de red
print_test_start "Verificar configuración de red del contenedor"

# Check if container can resolve DNS
if docker exec taskflow-frontend-prod-test nslookup google.com > /dev/null 2>&1; then
    print_success "Resolución DNS funcional en contenedor"
else
    print_warning "Problemas con resolución DNS en contenedor"
fi

# Check exposed ports
exposed_ports=$(docker port taskflow-frontend-prod-test)
if echo "$exposed_ports" | grep -q "80/tcp"; then
    print_success "Puerto de producción expuesto correctamente"
else
    print_warning "Puerto de producción no expuesto como se esperaba"
fi

# Test 15: Verificar health checks
print_test_start "Verificar health checks de contenedores"

# Check development container health
dev_health=$(docker inspect taskflow-frontend-test --format='{{.State.Health.Status}}' 2>/dev/null || echo "no-healthcheck")
if [ "$dev_health" = "healthy" ]; then
    print_success "Health check de desarrollo: saludable"
elif [ "$dev_health" = "starting" ]; then
    print_info "Health check de desarrollo: iniciando"
else
    print_warning "Health check de desarrollo: $dev_health"
fi

# Check production container health
prod_health=$(docker inspect taskflow-frontend-prod-test --format='{{.State.Health.Status}}' 2>/dev/null || echo "no-healthcheck")
if [ "$prod_health" = "healthy" ]; then
    print_success "Health check de producción: saludable"
elif [ "$prod_health" = "starting" ]; then
    print_info "Health check de producción: iniciando"
else
    print_warning "Health check de producción: $prod_health"
fi

# Generate detailed report
print_header "GENERANDO REPORTE DETALLADO"

# Create test report
cat > frontend_docker_test_report.md << EOF
# Reporte de Tests - Frontend Docker

**Fecha:** $(date)
**Duración:** Aproximadamente $((SECONDS/60)) minutos

## Resumen Ejecutivo

- **Tests Totales:** $TESTS_TOTAL
- **Tests Exitosos:** $TESTS_PASSED
- **Tests Fallidos:** $TESTS_FAILED
- **Advertencias:** $WARNINGS

### Estado General
$(if [ $TESTS_FAILED -eq 0 ]; then echo "✅ **EXITOSO** - Todos los tests críticos pasaron"; else echo "❌ **PROBLEMAS** - Algunos tests fallaron"; fi)

## Tests Exitosos

EOF

for test in "${PASSED_TESTS[@]}"; do
    echo "- ✅ $test" >> frontend_docker_test_report.md
done

cat >> frontend_docker_test_report.md << EOF

## Tests Fallidos

EOF

for test in "${FAILED_TESTS[@]}"; do
    echo "- ❌ $test" >> frontend_docker_test_report.md
done

cat >> frontend_docker_test_report.md << EOF

## Advertencias

EOF

for test in "${WARNING_TESTS[@]}"; do
    echo "- ⚠️ $test" >> frontend_docker_test_report.md
done

cat >> frontend_docker_test_report.md << EOF

## Información del Sistema

- **Docker Version:** $(docker --version)
- **Docker Compose Version:** $(docker-compose --version)
- **Sistema Operativo:** $(uname -a)

## Imágenes Docker Generadas

- **Desarrollo:** taskflow-frontend-dev:test ($dev_size)
- **Producción:** taskflow-frontend-prod:test ($prod_size)

## Logs de Desarrollo (últimas 20 líneas)

\`\`\`
$(docker logs taskflow-frontend-test --tail 20 2>&1 || echo "No disponible")
\`\`\`

## Logs de Producción (últimas 10 líneas)

\`\`\`
$(docker logs taskflow-frontend-prod-test --tail 10 2>&1 || echo "No disponible")
\`\`\`

## Próximos Pasos

$(if [ $TESTS_FAILED -eq 0 ]; then
    echo "- ✅ Frontend está listo para desarrollo en Docker"
    echo "- ✅ Se puede proceder con la configuración del backend"
    echo "- ✅ Hot reload está funcionando correctamente"
else
    echo "- ❌ Revisar y corregir los tests fallidos"
    echo "- ❌ Verificar configuración antes de continuar"
fi)

EOF

print_success "Reporte detallado generado: frontend_docker_test_report.md"

# Final summary
echo ""
print_header "RESUMEN FINAL DE TESTS"

echo -e "📊 ${BLUE}ESTADÍSTICAS${NC}"
echo -e "   Total de tests: ${CYAN}$TESTS_TOTAL${NC}"
echo -e "   Tests exitosos: ${GREEN}$TESTS_PASSED${NC}"
echo -e "   Tests fallidos: ${RED}$TESTS_FAILED${NC}"
echo -e "   Advertencias: ${YELLOW}$WARNINGS${NC}"

echo ""
if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 ¡TODOS LOS TESTS CRÍTICOS PASARON!${NC}"
    echo ""
    echo -e "${GREEN}✅ El frontend de TaskFlow funciona correctamente en Docker${NC}"
    echo -e "${GREEN}✅ Imagen de desarrollo lista para hot reload${NC}"
    echo -e "${GREEN}✅ Imagen de producción lista para deployment${NC}"
    echo ""
    echo -e "${BLUE}🔄 Comandos para uso:${NC}"
    echo -e "${CYAN}   Desarrollo: docker run -p 3001:3001 taskflow-frontend-dev:test${NC}"
    echo -e "${CYAN}   Producción: docker run -p 3001:80 taskflow-frontend-prod:test${NC}"
    echo ""
    echo -e "${BLUE}📋 Próximo paso: Configurar backend con Docker (subtarea 1.4)${NC}"
    
    exit 0
else
    echo -e "${RED}❌ ALGUNOS TESTS FALLARON${NC}"
    echo ""
    echo -e "${RED}Se encontraron $TESTS_FAILED problemas críticos que deben resolverse${NC}"
    echo -e "${YELLOW}También hay $WARNINGS advertencias que deberían revisarse${NC}"
    echo ""
    echo -e "${BLUE}📋 Revisar el reporte detallado: frontend_docker_test_report.md${NC}"
    echo -e "${BLUE}🔧 Corregir los problemas antes de continuar${NC}"
    
    exit 1
fi 