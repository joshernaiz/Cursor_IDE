#!/bin/bash

# Script para inicializar la estructura base de documentación .cursor
# Uso: ./init_base_doc.sh

set -e

echo "🚀 Inicializando estructura base de documentación .cursor"
echo

# Función para crear directorio si no existe
create_dir_if_not_exists() {
    if [ ! -d "$1" ]; then
        mkdir -p "$1"
        echo "✅ Directorio creado: $1"
    else
        echo "ℹ️  Directorio ya existe: $1"
    fi
}

# Función para crear archivo si no existe
create_file_if_not_exists() {
    if [ ! -f "$1" ]; then
        touch "$1"
        echo "✅ Archivo creado: $1"
        return 0
    else
        echo "ℹ️  Archivo ya existe: $1"
        return 1
    fi
}

# Función para descargar archivo si no existe
download_file_if_not_exists() {
    local url="$1"
    local filepath="$2"
    local description="$3"
    
    if [ ! -f "$filepath" ]; then
        echo "📥 Descargando $description..."
        if command -v curl >/dev/null 2>&1; then
            if curl -s -L "$url" -o "$filepath"; then
                echo "✅ Descargado: $filepath"
                return 0
            else
                echo "❌ Error al descargar con curl: $filepath"
                return 1
            fi
        elif command -v wget >/dev/null 2>&1; then
            if wget -q "$url" -O "$filepath"; then
                echo "✅ Descargado: $filepath"
                return 0
            else
                echo "❌ Error al descargar con wget: $filepath"
                return 1
            fi
        else
            echo "❌ Error: No se encontró curl ni wget para descargar archivos"
            echo "   Por favor instala curl o wget e intenta de nuevo"
            return 1
        fi
    else
        echo "ℹ️  Archivo ya existe: $filepath"
        return 1
    fi
}

# Crear estructura de directorios
echo "📁 Creando estructura de directorios..."
create_dir_if_not_exists ".cursor"
create_dir_if_not_exists ".cursor/rules"
create_dir_if_not_exists ".cursor/memory"
create_dir_if_not_exists ".cursor/memory/long_memory"
create_dir_if_not_exists "docs"
create_dir_if_not_exists "docs/base_prompt"
echo

# Descargar documento base
echo "📥 Descargando documento base..."
BASE_PROMPT_URL="https://raw.githubusercontent.com/joshernaiz/Cursor_IDE/refs/heads/main/prompts/base/templates/base_prompt.md"
BASE_PROMPT_FILE="docs/base_prompt/base_prompt.md"

download_file_if_not_exists "$BASE_PROMPT_URL" "$BASE_PROMPT_FILE" "plantilla base de prompt"
echo

# Crear archivos de reglas
echo "📋 Creando archivos de reglas..."

# base.mdc
if create_file_if_not_exists ".cursor/rules/base.mdc"; then
    cat > ".cursor/rules/base.mdc" << 'EOF'
# Reglas de Uso de Memoria de Contexto

## Objetivo
Optimizar el consumo de tokens proporcionando a la IA el contexto mínimo necesario según el tipo de consulta o tarea.

## Archivos de Memoria Disponibles

### 📋 `.cursor/memory/long_memory/project_brief.md`
**Contenido:** Resumen ejecutivo del proyecto, objetivos, requisitos, stakeholders y criterios de éxito.
**Usar cuando:**
- Se pregunte sobre el propósito general del proyecto
- Se necesite contexto sobre objetivos de negocio
- Se requiera información sobre stakeholders o timeline
- Se consulte sobre métricas de éxito

### 🏗️ `.cursor/memory/long_memory/architecture.md`
**Contenido:** Arquitectura del sistema, componentes, stack tecnológico, flujos de datos.
**Usar cuando:**
- Se pregunte sobre la estructura general del sistema
- Se requiera entender cómo se conectan los componentes
- Se necesite información sobre tecnologías utilizadas
- Se consulte sobre deployment o infraestructura

### 🔧 `.cursor/memory/long_memory/decisions.md`
**Contenido:** Decisiones arquitectónicas y técnicas tomadas, justificaciones.
**Usar cuando:**
- Se pregunte por qué se eligió una tecnología/patrón
- Se cuestione una decisión de diseño existente
- Se considere cambiar algún componente
- Se requiera contexto histórico sobre decisiones

### 👨‍💻 `.cursor/memory/long_memory/patterns.md`
**Contenido:** Patrones de código, convenciones de desarrollo, estándares.
**Usar cuando:**
- Se escriba código nuevo que debe seguir estándares
- Se refactorice código existente
- Se implemente un nuevo componente/módulo
- Se trabaje con testing, logging, configuración

## Reglas de Optimización

### ✅ Cargar Múltiples Archivos Cuando:
- **Proyecto nuevo/onboarding:** `project_brief.md` + `architecture.md`
- **Debugging complejo:** `architecture.md` + `patterns.md`
- **Refactoring mayor:** `decisions.md` + `patterns.md`

### ⚡ Cargar Solo Un Archivo Cuando:
- **Pregunta específica:** Solo el archivo más relevante
- **Implementación de funcionalidad:** Solo `patterns.md`
- **Consulta de negocio:** Solo `project_brief.md`

### ❌ NO Cargar Archivos Cuando:
- La consulta es sobre código específico visible en el contexto actual
- Se trata de debugging de un error específico con stack trace claro
- La información necesaria está en archivos del proyecto ya visibles

---

*Personalizar este archivo según las necesidades específicas del proyecto*
EOF
fi

# task_execution.mdc
if create_file_if_not_exists ".cursor/rules/task_execution.mdc"; then
    cat > ".cursor/rules/task_execution.mdc" << 'EOF'
# Reglas para Ejecución Estructurada de Tareas TODO

## Objetivo
Proporcionar una metodología clara para que la IA pueda ejecutar tareas específicas de los archivos TODO del proyecto de manera estructurada, documentada y trazable.

## Formato de Invocación

### Sintaxis de Comando
```
Ejecutar tarea: {{TASK}} del archivo {{FILEMD}}
```

**Ejemplos:**
- `Ejecutar tarea: 2.3 del archivo TODO_2.md`
- `Ejecutar tarea: 1.2 del archivo TODO_features.md`
- `Ejecutar tarea: 4.1.3 del archivo TODO_backend.md`

### Variables de Contexto
- **{{TASK}}**: Número de tarea específica (ej: 1.5, 2.3.1, 4.2)
- **{{FILEMD}}**: Nombre del archivo TODO (ej: TODO_2.md, TODO_features.md)

## Metodología de Ejecución

### Fase 1: Análisis Inicial
**Pasos obligatorios:**
1. **Leer archivo TODO**: Localizar y leer `docs/{{FILEMD}}`
2. **Identificar tarea**: Extraer requisitos, dependencias y criterios de éxito de {{TASK}}
3. **Consultar documentación**: Revisar archivos relacionados si es necesario
4. **Analizar dependencias**: Verificar que prerequisitos estén completados

### Fase 2: Planificación Estructurada
**Pasos obligatorios:**
1. **Dividir en subtareas**: Crear lista de subtareas numerada y secuencial
2. **Identificar recursos**: Determinar archivos, componentes y servicios involucrados
3. **Estimar complejidad**: Clasificar cada subtarea (Simple/Moderada/Compleja)
4. **Definir criterios**: Establecer métricas de éxito claras para cada subtarea

### Fase 3: Ejecución Paso a Paso
**Para cada subtarea:**

#### A. Preparación
- **Explicar objetivo**: Describir qué se va a hacer y por qué
- **Mostrar contexto**: Relacionar con la tarea principal y el proyecto
- **Listar dependencias**: Verificar que todo lo necesario esté disponible

#### B. Implementación
- **Generar/Modificar código**: Seguir patrones existentes del proyecto
- **Añadir comentarios**: Comentarios para contexto futuro
- **Mantener consistencia**: Usar convenciones de nombres y estructura del proyecto

#### C. Validación
- **Crear pruebas**: Scripts de validación
- **Ejecutar verificación**: Probar la implementación
- **Documentar resultados**: Registrar éxito/fallo y métricas

### Fase 4: Documentación y Actualización
**Pasos obligatorios:**
1. **Crear/Actualizar documentación**: Archivo `.md` en `docs/`
2. **Actualizar TODO**: Marcar subtareas como completadas en `docs/{{FILEMD}}`
3. **Registrar cambios**: Incluir referencias a documentación generada

## Plantilla de Respuesta

### Formato de Inicio
```
## Ejecutando Tarea {{TASK}} - {{FILEMD}}

### 📋 Análisis de Tarea
- **Objetivo**: [Descripción del objetivo principal]
- **Prerequisitos**: [Lista de dependencias]
- **Criterios de éxito**: [Métricas de validación]

### 🔧 Planificación de Subtareas
1. **{{TASK}}.1**: [Descripción subtarea 1]
2. **{{TASK}}.2**: [Descripción subtarea 2]
3. **{{TASK}}.3**: [Descripción subtarea 3]

### 🚀 Ejecución
[Implementación paso a paso]
```

---

*Personalizar este archivo según la metodología específica del proyecto*
EOF
fi

# documentation_access.mdc
if create_file_if_not_exists ".cursor/rules/documentation_access.mdc"; then
    cat > ".cursor/rules/documentation_access.mdc" << 'EOF'
# Reglas de Acceso a Documentación Técnica

## Objetivo
Permitir a la IA acceder de forma inteligente y eficiente a la documentación técnica del proyecto, utilizando el índice como guía y consultando solo los documentos relevantes para cada tipo de consulta.

## Archivo Índice Principal

### 📑 `docs/index.md` (o similar)
**Contenido:** Índice completo y organizado de toda la documentación técnica del proyecto
**Usar SIEMPRE cuando:**
- Se necesite localizar documentación específica sobre un tema
- No se sepa exactamente dónde está la información buscada
- Se requiera una visión general de qué documentación existe
- Se busque la estructura organizacional de la documentación

## Estructura de Documentación por Categorías

### 🏗️ **Arquitectura y Estructura**
**Carpetas sugeridas:** `architecture/`, `setup/`, `infrastructure/`
**Usar cuando se pregunte sobre:**
- Estructura general del proyecto
- Configuración de entorno
- Despliegue y contenedores
- Organización de carpetas y componentes

### 📊 **Datos y Persistencia**
**Carpetas sugeridas:** `database/`, `models/`, `data/`
**Usar cuando se pregunte sobre:**
- Modelos de datos
- Base de datos y migraciones
- Configuraciones persistentes

### 🔌 **Integración y APIs**
**Carpetas sugeridas:** `api/`, `integrations/`, `external/`
**Usar cuando se pregunte sobre:**
- APIs externas
- Integraciones con servicios terceros
- Endpoints y comunicación

### 🧪 **Testing y Calidad**
**Carpetas sugeridas:** `testing/`, `quality/`, `ci-cd/`
**Usar cuando se pregunte sobre:**
- Estrategias de testing
- Calidad de código
- CI/CD y automatización

## Estrategia de Consulta Inteligente

### 🎯 **Paso 1: Consultar Índice PRIMERO**
```
SIEMPRE leer docs/index.md cuando:
- No se sepa exactamente qué documento consultar
- Se busque información sobre un tema específico
- Se necesite entender la estructura de la documentación
```

### 🔍 **Paso 2: Localizar Documentos Específicos**
```
Usar las categorías del índice para localizar:
- Documentos exactos mencionados en el índice
- Carpetas relevantes para el tema de consulta
- Archivos con estado actualizado
```

### 📚 **Paso 3: Consulta Eficiente**
```
Leer SOLO los documentos directamente relevantes:
- Un documento específico si la consulta es muy concreta
- 2-3 documentos relacionados si la consulta es compleja
- Una carpeta completa solo si es absolutamente necesario
```

## Señales de Uso Eficiente

### ✅ **Buenas Prácticas:**
- SIEMPRE consultar el índice primero para localizar información
- Leer solo los documentos directamente relevantes a la consulta
- Priorizar documentos actualizados y validados

### ❌ **Evitar:**
- Leer documentación sin consultar el índice primero
- Cargar carpetas completas sin necesidad específica
- Consultar documentos obsoletos o no relacionados

---

*Personalizar este archivo según la estructura de documentación específica del proyecto*
EOF
fi

echo

# Crear archivos de memoria
echo "🧠 Creando archivos de memoria..."

# project_brief.md
if create_file_if_not_exists ".cursor/memory/long_memory/project_brief.md"; then
    cat > ".cursor/memory/long_memory/project_brief.md" << 'EOF'
# Project Brief

## Overview

[Descripción general del proyecto - qué hace, por qué existe, cuál es su propósito principal]

## Goals

- [Objetivo principal 1]
- [Objetivo principal 2]
- [Objetivo principal 3]
- [Más objetivos según sea necesario]

## Requirements

- **Funcional**: [Requisitos funcionales principales]
- **Técnico**: [Requisitos técnicos y de rendimiento]
- **Negocio**: [Requisitos de negocio y comerciales]
- **Calidad**: [Requisitos de calidad y mantenibilidad]

## Constraints

- **Tecnológico**: [Limitaciones técnicas, stack obligatorio, etc.]
- **Temporal**: [Limitaciones de tiempo, hitos importantes]
- **Recursos**: [Limitaciones de recursos, presupuesto, personal]
- **Regulatorio**: [Cumplimiento, seguridad, privacidad]

## Stakeholders

- **Desarrolladores**: [Equipo de desarrollo]
- **Usuarios**: [Usuarios finales del sistema]
- **Administradores**: [Personal técnico de mantenimiento]
- **Negocio**: [Stakeholders de negocio]

## Timeline

- Start: [Fecha de inicio]
- Milestones:
  - **Fase 1**: [Descripción] - [Estado]
  - **Fase 2**: [Descripción] - [Estado]
  - **Fase 3**: [Descripción] - [Estado]
- Target Completion: [Fecha objetivo de finalización]

## Success Criteria

- **Rendimiento**: [Criterios de rendimiento]
- **Calidad**: [Criterios de calidad]
- **Adopción**: [Criterios de adopción/uso]
- **Negocio**: [Criterios de éxito de negocio]

---

*Actualizar este archivo con información específica del proyecto*
*Last Updated: [Fecha de última actualización]*
EOF
fi

# architecture.md
if create_file_if_not_exists ".cursor/memory/long_memory/architecture.md"; then
    cat > ".cursor/memory/long_memory/architecture.md" << 'EOF'
# System Architecture

## Overview

[Descripción general de la arquitectura del sistema - patrón arquitectónico principal, filosofía de diseño]

## Components

### Core Layer
- **[Componente Principal 1]** (`ruta/`): [Descripción y responsabilidades]
- **[Componente Principal 2]** (`ruta/`): [Descripción y responsabilidades]
- **[Componente Principal 3]** (`ruta/`): [Descripción y responsabilidades]

### Service Layer
- **[Servicio 1]** (`ruta/`): [Descripción y responsabilidades]
- **[Servicio 2]** (`ruta/`): [Descripción y responsabilidades]

### Data Layer
- **[Capa de datos 1]** (`ruta/`): [Descripción]
- **[Capa de datos 2]** (`ruta/`): [Descripción]

### External Systems
- **[Sistema externo 1]**: [Descripción de la integración]
- **[Sistema externo 2]**: [Descripción de la integración]

## Data Flow

### [Flujo Principal 1]
1. **[Paso 1]** → [Descripción]
2. **[Paso 2]** → [Descripción]
3. **[Paso 3]** → [Descripción]

### [Flujo Principal 2]
1. **[Paso 1]** → [Descripción]
2. **[Paso 2]** → [Descripción]
3. **[Paso 3]** → [Descripción]

## Technologies

### Backend Stack
- **[Lenguaje/Framework principal]**: [Versión y propósito]
- **[Framework web]**: [Versión y propósito]
- **[ORM/Database lib]**: [Versión y propósito]
- **[Otras librerías importantes]**: [Versión y propósito]

### Database & Storage
- **[Base de datos principal]**: [Versión y propósito]
- **[Cache/Storage adicional]**: [Versión y propósito]

### Frontend Stack (si aplica)
- **[Framework frontend]**: [Versión y propósito]
- **[Build tool]**: [Versión y propósito]
- **[UI Framework]**: [Versión y propósito]

### Infrastructure
- **[Containerización]**: [Docker, etc.]
- **[Orquestación]**: [Docker Compose, K8s, etc.]
- **[CI/CD]**: [Herramientas de CI/CD]

## Deployment Architecture

### Development Environment
```
[Diagrama ASCII de la arquitectura de desarrollo]
```

### Production Architecture
```
[Diagrama ASCII de la arquitectura de producción]
```

## Security Architecture

### [Aspecto de seguridad 1]
- [Descripción de medidas de seguridad]

### [Aspecto de seguridad 2]
- [Descripción de medidas de seguridad]

## Scalability Considerations

### [Consideración de escalabilidad 1]
- [Descripción]

### [Consideración de escalabilidad 2]
- [Descripción]

---

*Actualizar este archivo con detalles específicos de la arquitectura del proyecto*
*Last Updated: [Fecha de última actualización]*
EOF
fi

# decisions.md
if create_file_if_not_exists ".cursor/memory/long_memory/decisions.md"; then
    cat > ".cursor/memory/long_memory/decisions.md" << 'EOF'
# Architectural and Technical Decisions

## Overview

Este documento registra las decisiones arquitectónicas y técnicas importantes tomadas durante el desarrollo del proyecto, incluyendo el contexto, las alternativas consideradas y las consecuencias.

## Decision Records

### ADR-001: [Título de la decisión]

**Status**: [Accepted/Rejected/Deprecated]  
**Date**: [YYYY-MM-DD]  
**Deciders**: [Lista de personas que tomaron la decisión]

#### Context
[Descripción del contexto y el problema que se necesitaba resolver]

#### Decision
[La decisión que se tomó]

#### Alternatives Considered
- **Alternativa 1**: [Descripción] - [Razón por la que no se eligió]
- **Alternativa 2**: [Descripción] - [Razón por la que no se eligió]

#### Consequences
**Positive:**
- [Consecuencia positiva 1]
- [Consecuencia positiva 2]

**Negative:**
- [Consecuencia negativa 1]
- [Consecuencia negativa 2]

#### Related Decisions
- [Referencias a otras decisiones relacionadas]

---

### ADR-002: [Título de la decisión]

**Status**: [Accepted/Rejected/Deprecated]  
**Date**: [YYYY-MM-DD]  
**Deciders**: [Lista de personas que tomaron la decisión]

#### Context
[Descripción del contexto y el problema]

#### Decision
[La decisión que se tomó]

#### Alternatives Considered
- **Alternativa 1**: [Descripción y razón]
- **Alternativa 2**: [Descripción y razón]

#### Consequences
**Positive:**
- [Consecuencias positivas]

**Negative:**
- [Consecuencias negativas]

---

## Decision Categories

### Technology Stack
- [Lista de decisiones relacionadas con tecnologías]

### Architecture Patterns
- [Lista de decisiones relacionadas con patrones arquitectónicos]

### Data Management
- [Lista de decisiones relacionadas con manejo de datos]

### Security
- [Lista de decisiones relacionadas con seguridad]

### Development Process
- [Lista de decisiones relacionadas con proceso de desarrollo]

## Template for New Decisions

```markdown
### ADR-XXX: [Título de la decisión]

**Status**: [Proposed/Accepted/Rejected/Deprecated]
**Date**: [YYYY-MM-DD]
**Deciders**: [Lista de personas]

#### Context
[Contexto y problema]

#### Decision
[Decisión tomada]

#### Alternatives Considered
- **Alternativa**: [Descripción] - [Razón]

#### Consequences
**Positive:**
- [Positivas]

**Negative:**
- [Negativas]
```

---

*Agregar nuevas decisiones usando el template anterior*
*Last Updated: [Fecha de última actualización]*
EOF
fi

# patterns.md
if create_file_if_not_exists ".cursor/memory/long_memory/patterns.md"; then
    cat > ".cursor/memory/long_memory/patterns.md" << 'EOF'
# Development Patterns and Conventions

## Overview

Este documento define los patrones de código, convenciones de desarrollo y estándares de implementación que deben seguirse en el proyecto.

## Code Organization

### Directory Structure
```
[Estructura de directorios del proyecto]
```

### File Naming Conventions
- **[Tipo de archivo 1]**: [Convención de nombres]
- **[Tipo de archivo 2]**: [Convención de nombres]
- **[Tipo de archivo 3]**: [Convención de nombres]

### Module Organization
- **[Patrón 1]**: [Descripción de cómo organizar módulos]
- **[Patrón 2]**: [Descripción de cómo organizar módulos]

## Coding Patterns

### [Patrón 1 - ej: Repository Pattern]
**Uso**: [Cuándo usar este patrón]
**Estructura**:
```[lenguaje]
[Ejemplo de código del patrón]
```

### [Patrón 2 - ej: Factory Pattern]
**Uso**: [Cuándo usar este patrón]
**Estructura**:
```[lenguaje]
[Ejemplo de código del patrón]
```

## Naming Conventions

### Variables and Functions
- **Variables**: [Convención - ej: snake_case, camelCase]
- **Functions**: [Convención]
- **Constants**: [Convención - ej: UPPER_CASE]
- **Classes**: [Convención - ej: PascalCase]

### API Endpoints
- **REST endpoints**: [Convención - ej: /api/v1/resource]
- **Query parameters**: [Convención]
- **Response format**: [Formato estándar]

## Error Handling

### Exception Handling Pattern
```[lenguaje]
[Ejemplo de manejo de excepciones estándar]
```

### Error Response Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

## Testing Patterns

### Unit Test Structure
```[lenguaje]
[Ejemplo de estructura de test unitario]
```

### Integration Test Pattern
```[lenguaje]
[Ejemplo de test de integración]
```

### Test Data Management
- **[Patrón de datos de prueba]**: [Descripción]

## Configuration Patterns

### Environment Configuration
```[lenguaje]
[Ejemplo de manejo de configuración por ambiente]
```

### Feature Flags
```[lenguaje]
[Ejemplo de uso de feature flags si aplica]
```

## Database Patterns

### Migration Pattern
```[lenguaje]
[Ejemplo de migración de base de datos]
```

### Query Patterns
```[lenguaje]
[Ejemplos de patrones de consulta]
```

## API Design Patterns

### Request/Response Pattern
```[lenguaje]
[Ejemplo de estructura de request/response estándar]
```

### Authentication Pattern
```[lenguaje]
[Ejemplo de manejo de autenticación]
```

## Logging Patterns

### Log Format
```[lenguaje]
[Ejemplo de formato de log estándar]
```

### Log Levels Usage
- **DEBUG**: [Cuándo usar]
- **INFO**: [Cuándo usar]
- **WARNING**: [Cuándo usar]
- **ERROR**: [Cuándo usar]

## Documentation Patterns

### Code Documentation
```[lenguaje]
[Ejemplo de documentación de código]
```

### API Documentation
```[lenguaje]
[Ejemplo de documentación de API]
```

## Performance Patterns

### [Patrón de performance 1]
```[lenguaje]
[Ejemplo]
```

### [Patrón de performance 2]
```[lenguaje]
[Ejemplo]
```

---

*Actualizar este archivo con patrones específicos del proyecto*
*Last Updated: [Fecha de última actualización]*
EOF
fi

echo

# Mostrar resumen
echo "🎉 Inicialización completada!"
echo
echo "📊 Resumen de estructura creada:"
echo "├── .cursor/"
echo "│   ├── rules/"
echo "│   │   ├── base.mdc"
echo "│   │   ├── task_execution.mdc"
echo "│   │   └── documentation_access.mdc"
echo "│   └── memory/"
echo "│       └── long_memory/"
echo "│           ├── project_brief.md"
echo "│           ├── architecture.md"
echo "│           ├── decisions.md"
echo "│           └── patterns.md"
echo "└── docs/"
echo "    └── base_prompt/"
echo "        └── base_prompt.md (descargado desde GitHub)"
echo
echo "📝 Próximos pasos:"
echo "1. Personalizar cada archivo según las necesidades específicas del proyecto"
echo "2. Actualizar las fechas de 'Last Updated' en cada archivo"
echo "3. Completar los templates con información real del proyecto"
echo "4. Ajustar las reglas según el workflow y metodología del equipo"
echo "5. Revisar el documento base descargado en docs/base_prompt/base_prompt.md"
echo
echo "✨ La estructura base está lista para ser personalizada!" 