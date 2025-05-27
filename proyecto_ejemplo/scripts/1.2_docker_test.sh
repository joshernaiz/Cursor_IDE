#!/bin/bash

# AI-Hint: Script de prueba para validar la configuración Docker de TaskFlow
# Verifica que todos los archivos Docker estén creados y sean válidos
# Se ejecuta como parte de la validación de la tarea 1.2

echo "🐳 Iniciando validación de configuración Docker para TaskFlow..."
echo "================================================================"

# Contador de errores
errors=0

# Función para verificar archivo
check_file() {
    if [ -f "$1" ]; then
        echo "✅ Archivo existe: $1"
    else
        echo "❌ Archivo faltante: $1"
        ((errors++))
    fi
}

# Función para verificar directorio
check_directory() {
    if [ -d "$1" ]; then
        echo "✅ Directorio existe: $1"
    else
        echo "❌ Directorio faltante: $1"
        ((errors++))
    fi
}

# Función para verificar sintaxis de docker-compose
check_compose_syntax() {
    if [ -f "$1" ]; then
        if docker-compose -f "$1" config > /dev/null 2>&1; then
            echo "✅ Sintaxis válida: $1"
        else
            echo "❌ Sintaxis inválida: $1"
            ((errors++))
        fi
    fi
}

echo ""
echo "📁 Verificando archivos Docker principales..."
echo "---"

# Archivos Docker principales
check_file "docker-compose.yml"
check_file "docker-compose.prod.yml"
check_file "env.example"

echo ""
echo "🚀 Verificando configuración del backend..."
echo "---"

# Backend Docker files
check_file "backend/Dockerfile"
check_file "backend/.dockerignore"

echo ""
echo "⚛️ Verificando configuración del frontend..."
echo "---"

# Frontend Docker files
check_file "frontend/Dockerfile"
check_file "frontend/.dockerignore"

echo ""
echo "🌐 Verificando configuración de nginx..."
echo "---"

# Nginx configuration
check_directory "docker/nginx"
check_file "docker/nginx/dev.conf"
check_file "docker/nginx/default.conf"

echo ""
echo "🗄️ Verificando configuración de MongoDB..."
echo "---"

# MongoDB configuration
check_directory "docker/mongo"
check_directory "docker/mongo/init-scripts"
check_file "docker/mongo/init-scripts/01-init-user.js"

echo ""
echo "📜 Verificando scripts de utilidad..."
echo "---"

# Scripts
check_file "scripts/docker-dev.sh"

# Verificar permisos de ejecución
if [ -x "scripts/docker-dev.sh" ]; then
    echo "✅ Script ejecutable: scripts/docker-dev.sh"
else
    echo "❌ Script sin permisos de ejecución: scripts/docker-dev.sh"
    ((errors++))
fi

echo ""
echo "🔍 Verificando sintaxis de docker-compose..."
echo "---"

# Verificar sintaxis de docker-compose files
check_compose_syntax "docker-compose.yml"
check_compose_syntax "docker-compose.prod.yml"

echo ""
echo "🔧 Verificando dependencias del sistema..."
echo "---"

# Verificar Docker
if command -v docker &> /dev/null; then
    echo "✅ Docker instalado: $(docker --version)"
else
    echo "❌ Docker no instalado"
    ((errors++))
fi

# Verificar Docker Compose
if command -v docker-compose &> /dev/null; then
    echo "✅ Docker Compose instalado: $(docker-compose --version)"
else
    echo "❌ Docker Compose no instalado"
    ((errors++))
fi

# Verificar que Docker esté corriendo
if docker info &> /dev/null 2>&1; then
    echo "✅ Docker daemon corriendo"
else
    echo "⚠️  Docker daemon no está corriendo (opcional para validación)"
fi

echo ""
echo "📋 Verificando estructura de directorios Docker..."
echo "---"

# Directorios necesarios para Docker
expected_dirs=(
    "docker"
    "docker/nginx"
    "docker/mongo"
    "docker/mongo/init-scripts"
    "logs"
)

for dir in "${expected_dirs[@]}"; do
    check_directory "$dir"
done

echo ""
echo "🧪 Verificando contenido de archivos clave..."
echo "---"

# Verificar contenido de docker-compose.yml
if [ -f "docker-compose.yml" ]; then
    if grep -q "version:" docker-compose.yml && \
       grep -q "services:" docker-compose.yml && \
       grep -q "mongodb:" docker-compose.yml && \
       grep -q "backend:" docker-compose.yml && \
       grep -q "frontend:" docker-compose.yml; then
        echo "✅ docker-compose.yml contiene servicios esperados"
    else
        echo "❌ docker-compose.yml no contiene todos los servicios esperados"
        ((errors++))
    fi
fi

# Verificar contenido de Dockerfile backend
if [ -f "backend/Dockerfile" ]; then
    if grep -q "FROM node:" backend/Dockerfile && \
       grep -q "development" backend/Dockerfile && \
       grep -q "production" backend/Dockerfile; then
        echo "✅ backend/Dockerfile contiene stages multi-stage"
    else
        echo "❌ backend/Dockerfile no contiene configuración multi-stage"
        ((errors++))
    fi
fi

# Verificar contenido de Dockerfile frontend
if [ -f "frontend/Dockerfile" ]; then
    if grep -q "FROM node:" frontend/Dockerfile && \
       grep -q "nginx" frontend/Dockerfile; then
        echo "✅ frontend/Dockerfile contiene configuración con nginx"
    else
        echo "❌ frontend/Dockerfile no contiene configuración con nginx"
        ((errors++))
    fi
fi

echo ""
echo "================================================================"

if [ $errors -eq 0 ]; then
    echo "✅ ¡ÉXITO! Configuración Docker validada correctamente"
    echo "📊 Archivos verificados:"
    echo "   📄 Docker Compose: ✅"
    echo "   🚀 Backend Docker: ✅"
    echo "   ⚛️ Frontend Docker: ✅"
    echo "   🌐 Nginx Config: ✅"
    echo "   🗄️ MongoDB Config: ✅"
    echo "   📜 Scripts: ✅"
    echo "   🔧 Dependencias: ✅"
    echo ""
    echo "🎯 Tarea 1.2 - Configuración Docker: COMPLETADA"
    echo ""
    echo "🚀 Próximos pasos:"
    echo "   1. Ejecutar: ./scripts/docker-dev.sh setup"
    echo "   2. Ejecutar: ./scripts/docker-dev.sh start"
    echo "   3. Verificar servicios en http://localhost:3001"
    exit 0
else
    echo "❌ ERRORES ENCONTRADOS: $errors elementos con problemas"
    echo "🔧 Revisar la configuración Docker antes de continuar"
    echo ""
    echo "🎯 Tarea 1.2 - Configuración Docker: INCOMPLETA"
    exit 1
fi 