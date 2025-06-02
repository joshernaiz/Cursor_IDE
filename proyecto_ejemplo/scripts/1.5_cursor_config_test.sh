#!/bin/bash

# AI-Hint Testing: [Cursor Configuration Test] [Valida configuración completa de Cursor IDE] [Archivos, estructura, Docker, MCP]

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para logs
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_test() {
    echo -e "${BLUE}[TEST]${NC} $1"
}

# Función para verificar archivos
check_file() {
    if [ -f "$1" ]; then
        log_info "✓ Archivo encontrado: $1"
        return 0
    else
        log_error "✗ Archivo faltante: $1"
        return 1
    fi
}

# Función para verificar directorios
check_directory() {
    if [ -d "$1" ]; then
        log_info "✓ Directorio encontrado: $1"
        return 0
    else
        log_error "✗ Directorio faltante: $1"
        return 1
    fi
}

# Función para verificar JSON válido
check_json() {
    if python3 -c "import json; json.load(open('$1'))" 2>/dev/null; then
        log_info "✓ JSON válido: $1"
        return 0
    else
        log_error "✗ JSON inválido: $1"
        return 1
    fi
}

# Función para extraer valores de JSON
get_json_value() {
    python3 -c "
import json
data = json.load(open('$1'))
try:
    if '$2' == '.project.name':
        print(data['project']['name'])
    elif '$2' == '.development.dockerEnabled':
        print(data['development']['dockerEnabled'])
    elif '$2' == '.context.entryPoints | length':
        print(len(data['context']['entryPoints']))
    elif '$2' == '.servers | length':
        print(len(data['servers']))
    elif '$2' == '.models | length':
        print(len(data['models']))
except:
    print('null')
" 2>/dev/null || echo "null"
}

# Función para verificar si existe una clave en JSON
json_has_key() {
    python3 -c "
import json, sys
try:
    data = json.load(open('$1'))
    if '$2' == '.project.name':
        result = 'project' in data and 'name' in data['project']
    elif '$2' == '.context.entryPoints':
        result = 'context' in data and 'entryPoints' in data['context']
    elif '$2' == '.development.dockerEnabled':
        result = 'development' in data and 'dockerEnabled' in data['development']
    elif '$2' == '.servers':
        result = 'servers' in data
    elif '$2' == '.models':
        result = 'models' in data
    else:
        result = False
    sys.exit(0 if result else 1)
except:
    sys.exit(1)
" 2>/dev/null
}

echo "=================================================="
echo "    PRUEBA DE CONFIGURACIÓN CURSOR IDE - TASKFLOW"
echo "=================================================="
echo ""

# Test 1: Verificar archivo .cursor.json
log_test "1. Verificando archivo principal .cursor.json"
if check_file ".cursor.json"; then
    check_json ".cursor.json"
    
    # Verificar campos obligatorios con Python simple
    PROJECT_NAME=$(python3 -c "import json; data=json.load(open('.cursor.json')); print(data['project']['name'])" 2>/dev/null || echo "N/A")
    if [ "$PROJECT_NAME" != "N/A" ]; then
        log_info "✓ Nombre del proyecto: $PROJECT_NAME"
    else
        log_error "✗ Campo project.name faltante"
    fi
    
    ENTRY_POINTS_COUNT=$(python3 -c "import json; data=json.load(open('.cursor.json')); print(len(data['context']['entryPoints']))" 2>/dev/null || echo "0")
    if [ "$ENTRY_POINTS_COUNT" -gt "0" ]; then
        log_info "✓ Puntos de entrada configurados: $ENTRY_POINTS_COUNT"
    else
        log_error "✗ Campo context.entryPoints faltante"
    fi
    
    DOCKER_ENABLED=$(python3 -c "import json; data=json.load(open('.cursor.json')); print(data['development']['dockerEnabled'])" 2>/dev/null || echo "False")
    if [ "$DOCKER_ENABLED" = "True" ]; then
        log_info "✓ Docker habilitado: $DOCKER_ENABLED"
    else
        log_warn "! Campo development.dockerEnabled no configurado correctamente"
    fi
fi

echo ""

# Test 2: Verificar puntos de entrada
log_test "2. Verificando puntos de entrada del proyecto"
ENTRY_POINTS=(
    "frontend/src/main.tsx"
    "frontend/src/App.tsx"
    "backend/src/index.ts"
    "docker-compose.yml"
    "docker-compose.dev.yml"
)

for entry in "${ENTRY_POINTS[@]}"; do
    check_file "$entry"
done

echo ""

# Test 3: Verificar rutas críticas
log_test "3. Verificando rutas críticas del proyecto"
CRITICAL_PATHS=(
    "frontend/src/components"
    "frontend/src/store" 
    "frontend/src/pages"
    "frontend/src/router"
    "frontend/src/services"
    "backend/src/api"
    "backend/src/services"
    "backend/src/ai"
    "backend/src/models"
    "backend/src/config"
    "docs/plan"
    ".mcp"
)

for path in "${CRITICAL_PATHS[@]}"; do
    check_directory "$path"
done

echo ""

# Test 4: Verificar configuración MCP
log_test "4. Verificando configuración MCP"
if check_file ".mcp/config.json"; then
    check_json ".mcp/config.json"
    
    SERVER_COUNT=$(python3 -c "import json; data=json.load(open('.mcp/config.json')); print(len(data['servers']))" 2>/dev/null || echo "0")
    if [ "$SERVER_COUNT" -gt "0" ]; then
        log_info "✓ Servidores MCP configurados: $SERVER_COUNT"
    fi
    
    MODEL_COUNT=$(python3 -c "import json; data=json.load(open('.mcp/config.json')); print(len(data['models']))" 2>/dev/null || echo "0")
    if [ "$MODEL_COUNT" -gt "0" ]; then
        log_info "✓ Modelos MCP configurados: $MODEL_COUNT"
    fi
fi

check_file ".mcp/README.md"

echo ""

# Test 5: Verificar configuraciones Docker
log_test "5. Verificando configuraciones Docker"
DOCKER_FILES=(
    "docker-compose.yml"
    "docker-compose.dev.yml"
    "docker-compose.prod.yml"
    "frontend/Dockerfile"
    "backend/Dockerfile"
)

for file in "${DOCKER_FILES[@]}"; do
    check_file "$file"
done

echo ""

# Test 6: Verificar archivos de configuración
log_test "6. Verificando archivos de configuración"
CONFIG_FILES=(
    "frontend/package.json"
    "backend/package.json"
    "frontend/tsconfig.json"
    "backend/tsconfig.json"
    "frontend/vite.config.ts"
    "frontend/tailwind.config.js"
    "env.example"
)

for file in "${CONFIG_FILES[@]}"; do
    check_file "$file"
done

echo ""

# Test 7: Verificar documentación
log_test "7. Verificando documentación del proyecto"
DOC_FILES=(
    "README.md"
    "docs/index.md"
    "docs/plan/DESIGN_PLAN.md"
    "docs/plan/IMPLEMENTATION_PLAN.md"
    "TODO.md"
)

for file in "${DOC_FILES[@]}"; do
    check_file "$file"
done

echo ""

# Test 8: Verificar que Docker funciona (si está disponible)
log_test "8. Verificando integración con Docker"
if command -v docker >/dev/null 2>&1; then
    log_info "✓ Docker disponible"
    
    if command -v docker-compose >/dev/null 2>&1; then
        log_info "✓ Docker Compose disponible"
        
        # Verificar que los archivos compose son válidos
        if docker-compose -f docker-compose.dev.yml config >/dev/null 2>&1; then
            log_info "✓ docker-compose.dev.yml es válido"
        else
            log_error "✗ docker-compose.dev.yml tiene errores"
        fi
    else
        log_warn "! Docker Compose no disponible"
    fi
else
    log_warn "! Docker no disponible - skip verificaciones Docker"
fi

echo ""

# Resumen final
echo "=================================================="
echo "           RESUMEN DE CONFIGURACIÓN CURSOR"
echo "=================================================="

if [ -f ".cursor.json" ] && [ -d ".mcp" ] && [ -f "docker-compose.dev.yml" ]; then
    log_info "✅ Configuración básica de Cursor completada"
    log_info "✅ Integración MCP configurada"
    log_info "✅ Integración Docker configurada"
    echo ""
    log_info "🎯 Tarea 1.5 - Configuración de Cursor IDE: COMPLETADA"
    exit 0
else
    log_error "❌ Configuración incompleta"
    exit 1
fi 