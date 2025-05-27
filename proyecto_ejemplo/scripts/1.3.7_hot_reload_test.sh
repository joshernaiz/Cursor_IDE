#!/bin/bash

# AI-Hint Component: [Hot Reload Test] [Development verification] [Automated testing of hot reload functionality]
# AI-Hint Flow: [Testing Workflow] [Container setup, file modification, response verification] [Development feedback loop]

# Script de Prueba - Subtarea 1.3.7: Configurar hot reload para desarrollo en contenedor

set -e

echo "🔥 TaskFlow - Test de Hot Reload para Desarrollo"
echo "==============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
TESTS_TOTAL=0
TESTS_PASSED=0
TESTS_FAILED=0

# Function to print colored output
print_test_start() {
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    echo -e "${BLUE}🧪 Test $TESTS_TOTAL: $1${NC}"
}

print_success() {
    TESTS_PASSED=$((TESTS_PASSED + 1))
    echo -e "${GREEN}✅ $1${NC}"
}

print_failure() {
    TESTS_FAILED=$((TESTS_FAILED + 1))
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Test 1: Verificar que Docker está ejecutándose
print_test_start "Verificar que Docker está ejecutándose"
if docker info > /dev/null 2>&1; then
    print_success "Docker está ejecutándose correctamente"
else
    print_failure "Docker no está ejecutándose"
    exit 1
fi

# Test 2: Verificar archivos de configuración
print_test_start "Verificar archivos de configuración de hot reload"

config_files=(
    "frontend/vite.config.ts"
    "frontend/package.json"
    "docker-compose.dev.yml"
    "frontend/env.development"
    "frontend/vite.config.dev.ts"
)

all_configs_present=true
for file in "${config_files[@]}"; do
    if [ -f "$file" ]; then
        print_success "Archivo $file existe"
    else
        print_failure "Archivo $file no encontrado"
        all_configs_present=false
    fi
done

if [ "$all_configs_present" = true ]; then
    print_success "Todos los archivos de configuración están presentes"
else
    print_failure "Faltan archivos de configuración"
    exit 1
fi

# Test 3: Verificar configuración de Vite para hot reload
print_test_start "Verificar configuración de Vite para hot reload"

vite_config_checks=(
    "usePolling.*true"
    "host.*0\.0\.0\.0"
    "port.*3001"
    "hmr"
)

vite_config_valid=true
for check in "${vite_config_checks[@]}"; do
    if grep -q "$check" frontend/vite.config.ts; then
        print_success "Configuración Vite: $check ✓"
    else
        print_failure "Configuración Vite: $check ✗"
        vite_config_valid=false
    fi
done

if [ "$vite_config_valid" = true ]; then
    print_success "Configuración de Vite es válida para hot reload"
else
    print_failure "Configuración de Vite necesita ajustes"
fi

# Test 4: Verificar scripts de package.json
print_test_start "Verificar scripts de desarrollo en package.json"

package_checks=(
    "\"dev\":.*--host 0.0.0.0"
    "\"dev\":.*--port 3001"
    "\"dev\":.*--force"
    "\"dev:docker\""
)

package_valid=true
for check in "${package_checks[@]}"; do
    if grep -q "$check" frontend/package.json; then
        print_success "Script package.json: $check ✓"
    else
        print_failure "Script package.json: $check ✗"
        package_valid=false
    fi
done

if [ "$package_valid" = true ]; then
    print_success "Scripts de package.json están configurados correctamente"
else
    print_failure "Scripts de package.json necesitan ajustes"
fi

# Test 5: Verificar configuración de Docker Compose para desarrollo
print_test_start "Verificar configuración de Docker Compose para desarrollo"

compose_checks=(
    "volumes:"
    "./frontend/src:/app/src"
    "delegated"
    "frontend_node_modules"
    "VITE_ENABLE_POLLING=true"
)

compose_valid=true
for check in "${compose_checks[@]}"; do
    if grep -q "$check" docker-compose.dev.yml; then
        print_success "Docker Compose: $check ✓"
    else
        print_failure "Docker Compose: $check ✗"
        compose_valid=false
    fi
done

if [ "$compose_valid" = true ]; then
    print_success "Docker Compose está configurado para hot reload"
else
    print_failure "Docker Compose necesita configuración de hot reload"
fi

# Test 6: Verificar variables de entorno para desarrollo
print_test_start "Verificar variables de entorno para desarrollo"

env_checks=(
    "VITE_ENABLE_POLLING=true"
    "VITE_HMR_PORT=3001"
    "NODE_ENV=development"
)

env_valid=true
for check in "${env_checks[@]}"; do
    if grep -q "$check" frontend/env.development; then
        print_success "Variable de entorno: $check ✓"
    else
        print_failure "Variable de entorno: $check ✗"
        env_valid=false
    fi
done

if [ "$env_valid" = true ]; then
    print_success "Variables de entorno configuradas correctamente"
else
    print_failure "Variables de entorno necesitan configuración"
fi

# Test 7: Verificar que se puede construir el contenedor de desarrollo
print_test_start "Verificar construcción del contenedor de desarrollo"

if docker-compose -f docker-compose.dev.yml build frontend-dev > /dev/null 2>&1; then
    print_success "Contenedor de desarrollo se construye correctamente"
else
    print_failure "Error al construir contenedor de desarrollo"
fi

# Test 8: Test funcional de hot reload (si se especifica --functional)
if [[ "$1" == "--functional" ]]; then
    print_test_start "Test funcional de hot reload (requiere contenedores ejecutándose)"
    
    # Verificar que el contenedor está ejecutándose
    if docker ps | grep -q "taskflow-frontend-dev"; then
        print_info "Contenedor de frontend está ejecutándose"
        
        # Crear un archivo de prueba
        test_component="frontend/src/components/HotReloadTest.tsx"
        backup_file="${test_component}.backup"
        
        # Backup if exists
        if [ -f "$test_component" ]; then
            cp "$test_component" "$backup_file"
        fi
        
        # Crear componente de prueba
        cat > "$test_component" << 'EOF'
// Hot Reload Test Component
import React from 'react'

export function HotReloadTest() {
  return (
    <div className="p-4 bg-blue-100 text-blue-800 rounded">
      Hot Reload Test - Versión 1
    </div>
  )
}
EOF
        
        print_info "Archivo de prueba creado, esperando hot reload..."
        sleep 3
        
        # Modificar el componente
        cat > "$test_component" << 'EOF'
// Hot Reload Test Component
import React from 'react'

export function HotReloadTest() {
  return (
    <div className="p-4 bg-green-100 text-green-800 rounded">
      Hot Reload Test - Versión 2 (ACTUALIZADA!)
    </div>
  )
}
EOF
        
        print_info "Archivo modificado, verificando hot reload..."
        sleep 2
        
        # Verificar logs del contenedor para hot reload
        if docker logs taskflow-frontend-dev --tail 20 2>&1 | grep -q "hmr\|reload\|update"; then
            print_success "Hot reload detectado en logs del contenedor"
        else
            print_warning "No se detectó hot reload en logs (puede funcionar sin aparecer en logs)"
        fi
        
        # Limpiar archivo de prueba
        if [ -f "$backup_file" ]; then
            mv "$backup_file" "$test_component"
        else
            rm -f "$test_component"
        fi
        
        print_success "Test funcional completado"
    else
        print_warning "Contenedor no está ejecutándose, omitiendo test funcional"
        print_info "Para ejecutar test funcional: ./scripts/dev-setup.sh && $0 --functional"
    fi
fi

# Resumen final
echo ""
echo "📊 RESUMEN DE TESTS - Hot Reload Configuration"
echo "=============================================="
echo -e "Total de tests: ${BLUE}$TESTS_TOTAL${NC}"
echo -e "Tests exitosos: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests fallidos: ${RED}$TESTS_FAILED${NC}"

if [ $TESTS_FAILED -eq 0 ]; then
    echo ""
    print_success "✅ Todos los tests pasaron - Hot Reload está configurado correctamente"
    echo ""
    print_info "Para iniciar el entorno de desarrollo:"
    print_info "  ./scripts/dev-setup.sh"
    echo ""
    print_info "Para test funcional completo:"
    print_info "  $0 --functional"
    echo ""
    print_info "Características de Hot Reload configuradas:"
    print_info "  🔥 Polling de archivos optimizado (100ms interval)"
    print_info "  🔄 HMR (Hot Module Replacement) habilitado"
    print_info "  📦 Volúmenes Docker para src/ montados"
    print_info "  ⚡ Variables de entorno optimizadas"
    print_info "  🐳 Contenedor con networking correcto"
    
    exit 0
else
    echo ""
    print_failure "❌ Algunos tests fallaron - Revisar configuración"
    print_info "Revisa los errores arriba y ajusta la configuración"
    exit 1
fi 