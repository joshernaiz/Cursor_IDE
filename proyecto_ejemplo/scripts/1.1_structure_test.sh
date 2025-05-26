#!/bin/bash

# AI-Hint: Script de prueba para validar la estructura del proyecto TaskFlow
# Verifica que todos los directorios y archivos esenciales estén creados según IMPLEMENTATION_PLAN.md
# Se ejecuta como parte de la validación de la tarea 1.1

echo "🔍 Iniciando validación de estructura del proyecto TaskFlow..."
echo "=================================================="

# Contador de errores
errors=0

# Función para verificar directorio
check_directory() {
    if [ -d "$1" ]; then
        echo "✅ Directorio existe: $1"
    else
        echo "❌ Directorio faltante: $1"
        ((errors++))
    fi
}

# Función para verificar archivo
check_file() {
    if [ -f "$1" ]; then
        echo "✅ Archivo existe: $1"
    else
        echo "❌ Archivo faltante: $1"
        ((errors++))
    fi
}

echo ""
echo "📁 Verificando estructura de directorios principales..."
echo "---"

# Directorios raíz
check_directory "docs"
check_directory "frontend"
check_directory "backend"
check_directory "scripts"
check_directory ".mcp"
check_directory ".cursor"

echo ""
echo "📚 Verificando estructura de documentación..."
echo "---"

# Documentación
check_directory "docs/plan"
check_directory "docs/api"
check_directory "docs/architecture"
check_directory "docs/guides"
check_directory "docs/info"

# Archivos de documentación clave
check_file "docs/index.md"
check_file "docs/plan/DESIGN_PLAN.md"
check_file "docs/plan/IMPLEMENTATION_PLAN.md"
check_file "docs/info/project-structure.md"

echo ""
echo "⚛️ Verificando estructura del frontend..."
echo "---"

# Frontend - src
check_directory "frontend/src"
check_directory "frontend/src/components"
check_directory "frontend/src/components/common"
check_directory "frontend/src/components/layout"
check_directory "frontend/src/components/tasks"
check_directory "frontend/src/components/projects"
check_directory "frontend/src/components/auth"
check_directory "frontend/src/components/ai"
check_directory "frontend/src/hooks"
check_directory "frontend/src/pages"
check_directory "frontend/src/services"
check_directory "frontend/src/store"
check_directory "frontend/src/types"
check_directory "frontend/src/utils"

# Frontend - otros directorios
check_directory "frontend/public"
check_directory "frontend/tests"

echo ""
echo "🚀 Verificando estructura del backend..."
echo "---"

# Backend - src
check_directory "backend/src"
check_directory "backend/src/api"
check_directory "backend/src/api/routes"
check_directory "backend/src/api/controllers"
check_directory "backend/src/api/middleware"
check_directory "backend/src/api/validators"
check_directory "backend/src/config"
check_directory "backend/src/db"
check_directory "backend/src/db/models"
check_directory "backend/src/services"
check_directory "backend/src/ai"
check_directory "backend/src/types"
check_directory "backend/src/utils"

# Backend - otros directorios
check_directory "backend/tests"

echo ""
echo "📄 Verificando archivos de configuración..."
echo "---"

# Archivos de configuración
check_file ".gitignore"
check_file "README.md"
check_file "TODO.md"
check_file ".cursor.json"

echo ""
echo "=================================================="

if [ $errors -eq 0 ]; then
    echo "✅ ¡ÉXITO! Estructura del proyecto validada correctamente"
    echo "📊 Directorios verificados: $(find . -type d -not -path './node_modules*' | wc -l)"
    echo "📋 Archivos de configuración: ✅"
    echo "📚 Documentación: ✅"
    echo "⚛️ Frontend: ✅"
    echo "🚀 Backend: ✅"
    echo ""
    echo "🎯 Tarea 1.1 - Estructura del proyecto: COMPLETADA"
    exit 0
else
    echo "❌ ERRORES ENCONTRADOS: $errors elementos faltantes"
    echo "🔧 Revisar la creación de directorios y archivos"
    echo ""
    echo "🎯 Tarea 1.1 - Estructura del proyecto: INCOMPLETA"
    exit 1
fi 