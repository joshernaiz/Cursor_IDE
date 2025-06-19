# PROMPT PARA GENERACIÓN DE ESTRUCTURA .cursor

## INSTRUCCIONES GENERALES

Genera una estructura completa de documentación AI-ready en el directorio `.cursor/` que incluya reglas de comportamiento para IA y memoria de contexto permanente. La estructura debe ser profesional, completa y adaptada específicamente para el proyecto descrito al final de este prompt.

## ESTRUCTURA DE DIRECTORIOS A CREAR

```
.cursor/
├── rules/
│   ├── base.mdc
│   ├── task_execution.mdc
│   └── documentation_access.mdc
└── memory/
    └── long_memory/
        ├── project_brief.md
        ├── architecture.md
        ├── decisions.md
        └── patterns.md
```

## ESPECIFICACIONES DETALLADAS POR ARCHIVO

### 1. `.cursor/rules/base.mdc`

**PROPÓSITO**: Definir reglas de optimización de memoria y contexto para la IA.

**ESTRUCTURA REQUERIDA**:
```markdown
# Reglas de Uso de Memoria de Contexto

## Objetivo
[Explicar optimización de tokens y contexto mínimo necesario]

## Archivos de Memoria Disponibles

### 📋 `.cursor/memory/long_memory/project_brief.md`
**Contenido:** [Descripción de qué contiene]
**Usar cuando:**
- [Casos de uso específicos - mínimo 4 puntos]
**NO usar para:** [Casos donde no debe usarse]

### 🏗️ `.cursor/memory/long_memory/architecture.md`
**Contenido:** [Descripción de qué contiene]
**Usar cuando:**
- [Casos de uso específicos - mínimo 4 puntos]
**NO usar para:** [Casos donde no debe usarse]

### 🔧 `.cursor/memory/long_memory/decisions.md`
**Contenido:** [Descripción de qué contiene]
**Usar cuando:**
- [Casos de uso específicos - mínimo 4 puntos]
**NO usar para:** [Casos donde no debe usarse]

### 👨‍💻 `.cursor/memory/long_memory/patterns.md`
**Contenido:** [Descripción de qué contiene]
**Usar cuando:**
- [Casos de uso específicos - mínimo 4 puntos]
**NO usar para:** [Casos donde no debe usarse]

## Reglas de Optimización

### ✅ Cargar Múltiples Archivos Cuando:
- [Mínimo 3 escenarios con combinaciones específicas]

### ⚡ Cargar Solo Un Archivo Cuando:
- [Mínimo 4 escenarios específicos]

### ❌ NO Cargar Archivos Cuando:
- [Mínimo 3 casos donde no se debe cargar contexto]

## Priorización por Tipo de Consulta
[Lista numerada de tipos de consulta y qué archivo usar - mínimo 6 casos]

## Señales de Uso Eficiente
### ✅ Buenas prácticas:
- [Mínimo 3 buenas prácticas]

### ❌ Evitar:
- [Mínimo 3 antipatrones]

[Sección de acceso a documentación técnica si el proyecto tiene docs/]
[Sección de ejecución de tareas TODO si el proyecto usa este sistema]

---
*Última actualización: [Fecha actual]*
*Total archivos de memoria: 4*
```

**INSTRUCCIONES ESPECÍFICAS**:
- Adaptar los casos de uso a las tecnologías y patrones del proyecto
- Incluir referencias específicas a la documentación del proyecto si existe
- Personalizar las reglas según el workflow del equipo
- Mencionar explícitamente el uso obligatorio de AI-Hints en todo código generado
- Incluir ejemplos de AI-Hints apropiados para el stack tecnológico del proyecto

---

### 2. `.cursor/rules/task_execution.mdc`

**PROPÓSITO**: Metodología estructurada para ejecutar tareas TODO del proyecto.

**ESTRUCTURA REQUERIDA**:
```markdown
# Reglas para Ejecución Estructurada de Tareas TODO

## Objetivo
[Explicar metodología clara para ejecutar tareas específicas]

## Formato de Invocación

### Sintaxis de Comando
```
Ejecutar tarea: {{TASK}} del archivo {{FILEMD}}
```

**Ejemplos:**
- [Mínimo 3 ejemplos específicos del proyecto]

### Variables de Contexto
- **{{TASK}}**: [Explicación y ejemplos]
- **{{FILEMD}}**: [Explicación y ejemplos]

## Metodología de Ejecución

### Fase 1: Análisis Inicial
**Pasos obligatorios:**
1. **Leer archivo TODO**: [Instrucciones específicas]
2. **Identificar tarea**: [Qué extraer y cómo]
3. **Consultar documentación**: [Dónde buscar información]
4. **Analizar dependencias**: [Cómo verificar prerequisitos]

### Fase 2: Planificación Estructurada
**Pasos obligatorios:**
1. **Dividir en subtareas**: [Formato de numeración]
2. **Identificar recursos**: [Qué determinar]
3. **Estimar complejidad**: [Clasificación a usar]
4. **Definir criterios**: [Tipo de métricas]

### Fase 3: Ejecución Paso a Paso
**Para cada subtarea:**

#### A. Preparación
- [Instrucciones específicas de preparación]

#### B. Implementación
- **Generar/Modificar código**: Seguir patrones existentes del proyecto
- **Añadir AI-Hints**: Comentarios especiales para contexto futuro (OBLIGATORIO)
  ```[lenguaje]
  # AI-Hint: [Propósito] | [Relaciones] | [Restricciones] | [TODOs]
  ```
- **Mantener consistencia**: Usar convenciones de nombres y estructura del proyecto

#### C. Validación
- [Instrucciones de testing y verificación]

### Fase 4: Documentación y Actualización
**Pasos obligatorios:**
1. **Crear/Actualizar documentación**: Generar archivo `.md` en `docs/info/` con nombre descriptivo
2. **Actualizar índice maestro**: OBLIGATORIO actualizar `docs/info/index.md` con nuevo documento
3. **Actualizar TODO**: Marcar subtareas como completadas en `docs/{{FILEMD}}`
4. **Registrar cambios**: Incluir referencias a documentación generada y subtareas completadas

## Estructura de Documentación del Proyecto

### Directorio Base: `docs/`
```
docs/
├── TODO*.md                    # Archivos de tareas del proyecto
├── info/                       # Documentación técnica generada
│   ├── index.md               # ÍNDICE MAESTRO (CRÍTICO)
│   ├── [categoría-01]/        # Documentación por categorías
│   ├── [categoría-02]/        # Organizadas temáticamente
│   └── [nuevo-documento].md   # Documentos individuales
└── [otros archivos de docs]   # Documentación adicional del proyecto
```

### Archivo Índice Maestro: `docs/info/index.md`

**PROPÓSITO CRÍTICO**: 
- **Índice completo** de toda la documentación técnica
- **Navegación inteligente** para la IA según tipo de consulta
- **Descripciones breves** que permiten selección precisa de documentos
- **Categorización temática** para búsqueda eficiente

**ESTRUCTURA OBLIGATORIA DEL ÍNDICE**:
```markdown
# Índice de Documentación Técnica

## Resumen
[Descripción general de la documentación disponible]

## Categorías de Documentación

### 🏗️ [Categoría 1 - ej: Arquitectura y Estructura]
**Descripción**: [Qué tipo de información contiene esta categoría]
**Usar cuando**: [Casos específicos donde consultar esta categoría]
- **[nombre-documento-1.md]**: [Descripción breve y específica] - [Estado: ✅/🚧/📋]
- **[nombre-documento-2.md]**: [Descripción breve y específica] - [Estado: ✅/🚧/📋]

### 📊 [Categoría 2 - ej: Datos y Persistencia]  
**Descripción**: [Qué tipo de información contiene esta categoría]
**Usar cuando**: [Casos específicos donde consultar esta categoría]
- **[nombre-documento-3.md]**: [Descripción breve y específica] - [Estado: ✅/🚧/📋]
- **[nombre-documento-4.md]**: [Descripción breve y específica] - [Estado: ✅/🚧/📋]

[Continuar con todas las categorías del proyecto]

## Guía de Navegación para IA

### Por Tipo de Consulta:
- **Implementación de código**: Consultar categorías [X, Y, Z]
- **Debugging y errores**: Consultar categorías [A, B, C]  
- **Arquitectura y diseño**: Consultar categorías [D, E, F]
- **Configuración y setup**: Consultar categorías [G, H, I]

### Estados de Documentos:
- **✅ Completado**: Documentación validada y actualizada
- **🚧 En progreso**: Documentación parcial o en desarrollo
- **📋 Planificado**: Documentación pendiente de crear

Last Updated: [Fecha de última actualización]
Total Documentos: [Número total]
```

**REGLAS DE ACTUALIZACIÓN DEL ÍNDICE**:
1. **OBLIGATORIO** actualizar cada vez que se crea nueva documentación
2. **Descripción breve** debe ser específica y útil para selección de IA
3. **Estado del documento** debe reflejar nivel de completitud
4. **Categorización** debe ser consistente y lógica
5. **Guía de navegación** debe actualizarse con nuevos patrones de consulta

## Estructura de Archivos TODO
**Ubicación**: `docs/TODO*.md` (archivos en directorio base de docs)
**Documentación generada**: `docs/info/` (subdirectorio específico para documentación técnica)
**Índice maestro**: `docs/info/index.md` (CRÍTICO - debe actualizarse siempre)

## Reglas de Implementación

### ✅ Buenas Prácticas
[Mínimo 5 buenas prácticas específicas del proyecto]

### ❌ Restricciones
[Mínimo 3 restricciones importantes]

### 🔄 Flujo de Validación
[Flujo específico paso a paso]

## Casos de Uso Específicos

### 💻 Implementación de Código
[Instrucciones específicas para el stack del proyecto]

### 🧪 Pruebas y Validación
[Instrucciones específicas para el framework de testing]

### 📊 Análisis y Métricas
[Si aplica al proyecto]

### 🔧 Configuración y Setup
[Si aplica al proyecto]

## Plantilla de Respuesta

### Formato de Inicio
```
## Ejecutando Tarea {{TASK}} - {{FILEMD}}

### 📋 Análisis de Tarea
- **Objetivo**: [Descripción del objetivo principal]
- **Prerequisitos**: [Lista de dependencias verificadas]
- **Criterios de éxito**: [Métricas de validación específicas]

### 🔧 Planificación de Subtareas
1. **{{TASK}}.1**: [Descripción subtarea 1] - [Complejidad: Simple/Moderada/Compleja]
2. **{{TASK}}.2**: [Descripción subtarea 2] - [Complejidad: Simple/Moderada/Compleja]
3. **{{TASK}}.3**: [Descripción subtarea 3] - [Complejidad: Simple/Moderada/Compleja]
[...]

### 🚀 Ejecución
[Implementación paso a paso de cada subtarea]
```

### Formato de Cierre
```
### ✅ Resumen de Completado
- **Subtareas ejecutadas**: [Lista con estado: ✅ Completado / 🚧 Parcial / ❌ Fallido]
- **Archivos modificados**: [Lista de archivos de código]
- **Documentación generada**: 
  - **Nuevo documento**: `docs/info/[nombre-documento].md`
  - **Índice actualizado**: `docs/info/index.md` - [Descripción de cambios]
- **Comandos de prueba**: [Comandos específicos para validar implementación]

### 📝 Próximos Pasos
- **Tareas desbloqueadas**: [Referencias a otras tareas que ahora pueden ejecutarse]
- **Mejoras sugeridas**: [Optimizaciones o refactoring recomendado]
- **Documentación pendiente**: [Si se requiere documentación adicional]

### 🔗 Referencias de Documentación
- **Consultar**: `docs/info/index.md` para navegación completa
- **Documento generado**: Incluido en categoría [nombre-categoría]
- **Estado**: ✅ Completado / 🚧 En progreso / 📋 Planificado
```

---
*Última actualización: [Fecha actual]*
*Metodología: Análisis → Planificación → Ejecución → Documentación*
```

**INSTRUCCIONES ESPECÍFICAS**:
- Adaptar ejemplos al tipo de tareas específicas del proyecto
- Incluir comandos específicos del stack tecnológico usado
- Referenciar herramientas y patrones específicos del proyecto

---

### 3. `.cursor/rules/documentation_access.mdc`

**PROPÓSITO**: Estrategias inteligentes para acceder a documentación técnica.

**ESTRUCTURA REQUERIDA**:
```markdown
# Reglas de Acceso a Documentación Técnica

## Objetivo
[Explicar acceso inteligente y eficiente a documentación]

## Archivo Índice Principal

### 📑 `docs/info/index.md`
**Contenido:** Índice maestro completo de toda la documentación técnica del proyecto
**Usar SIEMPRE cuando:**
- Se necesite localizar documentación específica sobre un tema
- No se sepa exactamente dónde está la información buscada
- Se requiera una visión general de qué documentación existe
- Se busque la estructura organizacional de la documentación

## Estructura de Documentación por Categorías

[Para cada categoría de documentación del proyecto:]

### 🏗️ **[Nombre Categoría]**
**Carpetas:** [Lista de carpetas]
**Usar cuando se pregunte sobre:**
- [Lista específica de temas - mínimo 4 por categoría]

[Repetir para todas las categorías de documentación]

## Estrategia de Consulta Inteligente

### 🎯 **Paso 1: Consultar Índice PRIMERO**
[Instrucciones específicas]

### 🔍 **Paso 2: Localizar Documentos Específicos**
[Instrucciones específicas]

### 📚 **Paso 3: Consulta Eficiente**
[Instrucciones específicas]

## Reglas de Priorización por Tipo de Consulta

### 💻 **Implementación de Código**
1. `docs/info/index.md` (localizar documentación relevante)
2. Documentos de categorías específicas según el tipo de implementación
3. Patrones y ejemplos de código en documentación técnica

### 🐛 **Debugging y Errores**
1. `docs/info/index.md` (buscar documentación de errores conocidos)
2. Documentos de la categoría específica del componente con problemas
3. Documentación de configuración y setup si es problema de ambiente

### 🏗️ **Arquitectura y Diseño**
1. `docs/info/index.md` (navegación completa)
2. Documentos de arquitectura general del proyecto
3. Documentos específicos de la categoría arquitectónica consultada

### ⚙️ **Configuración y Setup**
1. `docs/info/index.md` (localizar documentación de configuración)
2. Documentos de categorías de configuración y ambiente
3. Documentos específicos según el tipo de configuración requerida

[Agregar más tipos según el proyecto]

## Señales de Uso Eficiente

### ✅ **Buenas Prácticas:**
- [Mínimo 4 buenas prácticas]

### ❌ **Evitar:**
- [Mínimo 3 antipatrones]

### 🔄 **Flujo Recomendado:**
[Flujo paso a paso]

## Casos de Uso Especiales
[Casos específicos del proyecto]

---
*Última actualización: [Fecha actual]*
*Documentos indexados: [Número aproximado] archivos en [número] categorías*
```

**INSTRUCCIONES ESPECÍFICAS**:
- Mapear la estructura real de documentación del proyecto en `docs/info/`
- Usar `docs/info/index.md` como archivo índice principal SIEMPRE
- Adaptar categorías a la organización específica del proyecto
- Incluir rutas reales y nombres de archivos del proyecto
- Especificar que toda documentación técnica se genera en `docs/info/`
- Enfatizar la importancia del índice maestro para navegación inteligente de IA

---

### 4. `.cursor/memory/long_memory/project_brief.md`

**PROPÓSITO**: Resumen ejecutivo completo del proyecto.

**ESTRUCTURA REQUERIDA**:
```markdown
# Project Brief

## Overview
[Descripción completa del proyecto en 2-3 párrafos que incluya:
- Qué hace el sistema
- Por qué existe
- Cuál es su propósito principal
- Audiencia objetivo]

## Goals
- [Objetivo principal 1 - específico y medible]
- [Objetivo principal 2 - específico y medible]
- [Objetivo principal 3 - específico y medible]
- [Más objetivos según corresponda - mínimo 4 total]

## Requirements

- **Funcional**: [Requisitos funcionales principales - mínimo 3]
- **Técnico**: [Requisitos técnicos y de rendimiento - mínimo 3]
- **Negocio**: [Requisitos de negocio y comerciales - si aplica]
- **Calidad**: [Requisitos de calidad y mantenibilidad - mínimo 2]

## Constraints

- **Tecnológico**: [Limitaciones técnicas, stack obligatorio, versiones]
- **Temporal**: [Limitaciones de tiempo, hitos importantes]
- **Recursos**: [Limitaciones de recursos, presupuesto, personal]
- **Regulatorio**: [Cumplimiento, seguridad, privacidad - si aplica]

## Stakeholders

- **Desarrolladores**: [Descripción del equipo y responsabilidades]
- **Usuarios**: [Descripción de usuarios finales]
- **Administradores**: [Personal técnico - si aplica]
- **Negocio**: [Stakeholders de negocio - si aplica]

## Timeline

- Start: [Fecha de inicio o estado actual]
- Milestones:
  - **Fase 1**: [Descripción específica] - [Estado: Completado/En progreso/Pendiente]
  - **Fase 2**: [Descripción específica] - [Estado]
  - **Fase 3**: [Descripción específica] - [Estado]
  - [Más fases según corresponda]
- Target Completion: [Fecha objetivo o estado objetivo]

## Success Criteria

- **Rendimiento**: [Criterios medibles de rendimiento]
- **Calidad**: [Criterios medibles de calidad]
- **Adopción**: [Criterios de adopción/uso - si aplica]
- **Negocio**: [Criterios de éxito de negocio - si aplica]

Last Updated: [Fecha actual]
```

**INSTRUCCIONES ESPECÍFICAS**:
- Usar información específica y real del proyecto
- Incluir métricas cuantificables cuando sea posible
- Adaptar secciones según el tipo de proyecto (web app, API, sistema interno, etc.)

---

### 5. `.cursor/memory/long_memory/architecture.md`

**PROPÓSITO**: Documentación completa de la arquitectura del sistema.

**ESTRUCTURA REQUERIDA**:
```markdown
# System Architecture

## Overview
[Descripción de 2-3 párrafos que incluya:
- Patrón arquitectónico principal usado
- Filosofía de diseño
- Características clave de la arquitectura]

## Components

### [Capa Principal 1 - ej: Core Layer]
- **[Componente 1]** (`ruta/específica/`): [Responsabilidades específicas]
- **[Componente 2]** (`ruta/específica/`): [Responsabilidades específicas]
- **[Componente 3]** (`ruta/específica/`): [Responsabilidades específicas]

### [Capa Principal 2 - ej: Service Layer]
- **[Servicio 1]** (`ruta/específica/`): [Responsabilidades específicas]
- **[Servicio 2]** (`ruta/específica/`): [Responsabilidades específicas]

### [Capa Principal 3 - ej: Data Layer]
- **[Componente de datos 1]** (`ruta/específica/`): [Responsabilidades]
- **[Componente de datos 2]** (`ruta/específica/`): [Responsabilidades]

### External Systems
- **[Sistema externo 1]**: [Descripción de integración y propósito]
- **[Sistema externo 2]**: [Descripción de integración y propósito]

## Data Flow

### [Flujo Principal 1 - ej: Request Flow]
1. **[Paso 1]** → [Descripción detallada del procesamiento]
2. **[Paso 2]** → [Descripción detallada del procesamiento]
3. **[Paso 3]** → [Descripción detallada del procesamiento]
4. **[Paso 4]** → [Descripción detallada del procesamiento]

### [Flujo Principal 2 - ej: Data Processing Flow]
1. **[Paso 1]** → [Descripción detallada]
2. **[Paso 2]** → [Descripción detallada]
3. **[Paso 3]** → [Descripción detallada]

[Agregar más flujos según la complejidad del sistema]

## Technologies

### Backend Stack
- **[Lenguaje principal]**: [Versión] - [Justificación de uso]
- **[Framework web]**: [Versión] - [Justificación de uso]
- **[ORM/Database library]**: [Versión] - [Justificación de uso]
- **[Otras librerías clave]**: [Versión] - [Justificación de uso]

### Database & Storage
- **[Base de datos principal]**: [Versión] - [Uso específico]
- **[Cache/Storage adicional]**: [Versión] - [Uso específico]

### Frontend Stack
- **[Framework frontend]**: [Versión] - [Justificación]
- **[Build tool]**: [Versión] - [Justificación]
- **[UI Framework/Library]**: [Versión] - [Justificación]

### Infrastructure
- **[Containerización]**: [Herramientas específicas]
- **[Orquestación]**: [Herramientas específicas]
- **[CI/CD]**: [Herramientas específicas]

## Deployment Architecture

### Development Environment
```
[Diagrama ASCII mostrando:
- Componentes de desarrollo
- Puertos específicos
- Conexiones entre servicios
- Volúmenes y configuraciones]
```

### Production Architecture
```
[Diagrama ASCII mostrando:
- Arquitectura de producción
- Load balancers
- Escalabilidad
- Conectividad]
```

## Security Architecture

### [Aspecto de seguridad 1 - ej: Authentication]
- [Medidas específicas implementadas]
- [Tecnologías usadas]
- [Flujo de seguridad]

### [Aspecto de seguridad 2 - ej: Data Protection]
- [Medidas específicas implementadas]
- [Tecnologías usadas]

[Más aspectos según el proyecto]

## Scalability Considerations

### [Consideración 1 - ej: Horizontal Scaling]
- [Descripción específica de cómo se maneja]
- [Limitaciones conocidas]
- [Estrategias futuras]

### [Consideración 2 - ej: Performance Optimizations]
- [Optimizaciones implementadas]
- [Métricas objetivo]

## Monitoring and Operations

### [Sistema de monitoreo]
- [Herramientas usadas]
- [Métricas clave monitoreadas]

### [Logging]
- [Sistema de logs usado]
- [Estructura de logs]

Last Updated: [Fecha actual]
```

**INSTRUCCIONES ESPECÍFICAS**:
- Incluir versiones específicas de todas las tecnologías
- Usar rutas reales del proyecto en los componentes
- Adaptar diagramas ASCII a la arquitectura real
- Incluir comandos específicos para start/stop si existen

---

### 6. `.cursor/memory/long_memory/decisions.md`

**PROPÓSITO**: Registro de decisiones arquitectónicas y técnicas importantes.

**ESTRUCTURA REQUERIDA**:
```markdown
# Architectural and Technical Decisions

## Overview
[Párrafo explicando el propósito del documento y cómo se mantiene]

## Decision Records

### ADR-001: [Título específico de la decisión]

**Status**: Accepted  
**Date**: [Fecha específica]  
**Deciders**: [Personas reales o roles]

#### Context
[Descripción detallada del problema o situación que requería una decisión]

#### Decision
[La decisión específica que se tomó]

#### Alternatives Considered
- **[Alternativa A]**: [Descripción] - [Razón específica por la que no se eligió]
- **[Alternativa B]**: [Descripción] - [Razón específica por la que no se eligió]
- **[Alternativa C]**: [Descripción] - [Razón específica por la que no se eligió]

#### Consequences
**Positive:**
- [Consecuencia positiva específica]
- [Consecuencia positiva específica]

**Negative:**
- [Consecuencia negativa o trade-off]
- [Consecuencia negativa o trade-off]

#### Related Decisions
- [Referencias a otras ADRs si aplica]

---

### ADR-002: [Título específico de la decisión]

[Seguir el mismo formato que ADR-001]

---

[Continuar con más ADRs según las decisiones importantes del proyecto]

## Decision Categories

### Technology Stack
- [Lista de ADRs relacionadas con tecnologías - usar números ADR]

### Architecture Patterns
- [Lista de ADRs relacionadas con patrones - usar números ADR]

### Data Management
- [Lista de ADRs relacionadas con datos - usar números ADR]

### Security
- [Lista de ADRs relacionadas con seguridad - usar números ADR]

### Development Process
- [Lista de ADRs relacionadas con proceso - usar números ADR]

## Future Decisions Needed
- [Decisión pendiente 1]: [Descripción del problema]
- [Decisión pendiente 2]: [Descripción del problema]

## Template for New Decisions

```markdown
### ADR-XXX: [Título]

**Status**: [Proposed/Accepted/Rejected/Deprecated]
**Date**: [YYYY-MM-DD]
**Deciders**: [Lista]

#### Context
[Problema y contexto]

#### Decision
[Decisión tomada]

#### Alternatives Considered
- **[Alternativa]**: [Descripción] - [Razón]

#### Consequences
**Positive:**
- [Lista]

**Negative:**
- [Lista]
```

Last Updated: [Fecha actual]
```

**INSTRUCCIONES ESPECÍFICAS**:
- Generar mínimo 3-5 ADRs basados en las decisiones técnicas más importantes del proyecto
- Usar decisiones reales y específicas, no genéricas
- Incluir fechas realistas y personas/roles apropiados
- Categorizar las decisiones según las áreas del proyecto

---

### 7. `.cursor/memory/long_memory/patterns.md`

**PROPÓSITO**: Patrones de código y convenciones de desarrollo específicas del proyecto.

**ESTRUCTURA REQUERIDA**:
```markdown
# Development Patterns and Conventions

## Overview
[Párrafo describiendo la filosofía de desarrollo y estándares del proyecto]

## Code Organization

### Directory Structure
```
[Estructura real de directorios del proyecto - mínimo 2 niveles de profundidad]
```

### File Naming Conventions
- **[Tipo de archivo 1]**: [Convención específica con ejemplos]
- **[Tipo de archivo 2]**: [Convención específica con ejemplos]
- **[Tipo de archivo 3]**: [Convención específica con ejemplos]
- **[Tipo de archivo 4]**: [Convención específica con ejemplos]

### Module Organization
- **[Patrón 1]**: [Descripción específica con ejemplo]
- **[Patrón 2]**: [Descripción específica con ejemplo]

## Coding Patterns

### [Patrón específico del proyecto 1]
**Uso**: [Cuándo y por qué usar este patrón]
**Estructura**:
```[lenguaje]
# AI-Hint: [Descripción del patrón] | [Componentes relacionados] | [Limitaciones] | [Evolución futura]
[Ejemplo de código real usando el stack del proyecto]
```

### [Patrón específico del proyecto 2]
**Uso**: [Cuándo y por qué usar este patrón]
**Estructura**:
```[lenguaje]
# AI-Hint: [Descripción del patrón] | [Componentes relacionados] | [Limitaciones] | [Evolución futura]
[Ejemplo de código real usando el stack del proyecto]
```

### AI-Hints Pattern (OBLIGATORIO EN TODO CÓDIGO)
**Uso**: En toda función, clase, módulo o componente significativo
**Estructura**:
```[lenguaje]
# AI-Hint: [Propósito] | [Dependencias/Relaciones] | [Restricciones/Limitaciones] | [TODOs/Mejoras]
# Ejemplos:
# AI-Hint: Procesa pagos con Stripe | Depende de UserService y PaymentValidator | Solo acepta USD/EUR | TODO: Agregar soporte para criptomonedas
# AI-Hint: Cache Redis para sesiones | Conecta con SessionManager | TTL máximo 24h | TODO: Implementar clustering
# AI-Hint: Componente React para dashboard | Usa ChartJS y TailwindCSS | Requiere datos en tiempo real | TODO: Añadir filtros avanzados
```

[Agregar más patrones según el proyecto - mínimo 3 patrones adicionales]

## Naming Conventions

### Variables and Functions
- **Variables**: [Convención específica] - Ejemplo: `user_profile`, `api_key`
- **Functions**: [Convención específica] - Ejemplo: `get_user_data()`, `validate_input()`
- **Constants**: [Convención específica] - Ejemplo: `MAX_RETRY_ATTEMPTS`, `API_BASE_URL`
- **Classes**: [Convención específica] - Ejemplo: `UserManager`, `DatabaseConnection`

### API Endpoints (si aplica)
- **REST endpoints**: [Convención] - Ejemplo: `/api/v1/users/{id}`
- **Query parameters**: [Convención] - Ejemplo: `?page=1&limit=10`
- **Response format**: [Formato estándar con ejemplo JSON]

## Error Handling

### Exception Handling Pattern
```[lenguaje]
# AI-Hint: Manejo centralizado de excepciones | Integra con sistema de logging y notificaciones | Preserva stack traces en desarrollo | TODO: Añadir métricas de errores
[Ejemplo específico usando el stack del proyecto mostrando:
- Try/catch structure
- Logging practices
- Error propagation
- Cleanup procedures]
```

### Error Response Format
```json
[Formato JSON específico usado en el proyecto]
```

## Testing Patterns

### Unit Test Structure
```[lenguaje]
# AI-Hint: Test unitario con setup/teardown automático | Usa mocks para dependencias externas | Aislado de base de datos | TODO: Añadir property-based testing
[Ejemplo usando el framework de testing del proyecto mostrando:
- Test setup
- Test execution
- Assertions
- Cleanup]
```

### Integration Test Pattern
```[lenguaje]
[Ejemplo específico del proyecto]
```

### Test Data Management
- **[Patrón de datos de prueba 1]**: [Descripción con ejemplo]
- **[Patrón de datos de prueba 2]**: [Descripción con ejemplo]

## Configuration Patterns

### Environment Configuration
```[lenguaje]
# AI-Hint: Configuración por ambiente con validación | Carga desde .env y variables del sistema | Valores por defecto para desarrollo | TODO: Implementar configuración remota
[Ejemplo usando las herramientas específicas del proyecto:
- Variables de entorno
- Archivos de configuración
- Configuración por ambiente]
```

### Feature Flags (si aplica)
```[lenguaje]
[Ejemplo específico del proyecto]
```

## Database Patterns

### Migration Pattern
```[lenguaje]
[Ejemplo usando las herramientas de migración del proyecto]
```

### Query Patterns
```[lenguaje]
[Ejemplos usando el ORM o herramientas de DB del proyecto:
- Select patterns
- Insert patterns
- Update patterns
- Complex queries]
```

## API Design Patterns

### Request/Response Pattern
```[lenguaje]
[Ejemplo específico mostrando:
- Request structure
- Response structure
- Headers handling
- Status codes]
```

### Authentication Pattern
```[lenguaje]
[Ejemplo específico del sistema de auth del proyecto]
```

## Logging Patterns

### Log Format
```[lenguaje]
[Ejemplo usando la librería de logging del proyecto]
```

### Log Levels Usage
- **DEBUG**: [Cuándo usar con ejemplo específico]
- **INFO**: [Cuándo usar con ejemplo específico]
- **WARNING**: [Cuándo usar con ejemplo específico]
- **ERROR**: [Cuándo usar con ejemplo específico]

## Documentation Patterns

### Code Documentation
```[lenguaje]
# AI-Hint: [Función/propósito] | [Integraciones] | [Consideraciones] | [Roadmap]
"""
[Documentación tradicional de la función/clase]
"""
[Ejemplo de función/clase usando el estilo del proyecto]
```

### API Documentation
```[lenguaje]
[Ejemplo usando las herramientas de documentación del proyecto]
```

## Performance Patterns

### [Patrón de performance 1 específico del proyecto]
```[lenguaje]
[Ejemplo con explicación]
```

### [Patrón de performance 2 específico del proyecto]
```[lenguaje]
[Ejemplo con explicación]
```

## Security Patterns

### [Patrón de seguridad 1]
```[lenguaje]
# AI-Hint: [Medida de seguridad] | [Componentes protegidos] | [Nivel de seguridad] | [Actualizaciones pendientes]
[Ejemplo específico del proyecto]
```

### [Patrón de seguridad 2]
```[lenguaje]
# AI-Hint: [Medida de seguridad] | [Componentes protegidos] | [Nivel de seguridad] | [Actualizaciones pendientes]
[Ejemplo específico del proyecto]
```

## AI-Hints Guidelines (CRÍTICO)

### Formato Estándar AI-Hint
```[lenguaje]
# AI-Hint: [PROPÓSITO] | [RELACIONES] | [RESTRICCIONES] | [ROADMAP]
```

### Componentes del AI-Hint

#### 1. PROPÓSITO (Obligatorio)
- **Qué hace**: Descripción concisa de la funcionalidad
- **Por qué existe**: Razón de negocio o técnica
- **Contexto**: Dónde encaja en el sistema

#### 2. RELACIONES (Obligatorio)
- **Dependencias**: Qué componentes/servicios necesita
- **Dependientes**: Qué componentes dependen de este
- **Integraciones**: APIs, bases de datos, servicios externos

#### 3. RESTRICCIONES (Obligatorio)
- **Limitaciones técnicas**: Performance, capacidad, compatibilidad
- **Limitaciones de negocio**: Reglas, políticas, compliance
- **Limitaciones de datos**: Formatos, tamaños, tipos

#### 4. ROADMAP (Obligatorio)
- **TODOs inmediatos**: Mejoras planificadas
- **Refactoring**: Cambios arquitectónicos futuros
- **Optimizaciones**: Mejoras de performance o UX

### Ejemplos por Tipo de Componente

#### Backend Service
```[lenguaje]
# AI-Hint: Servicio de autenticación JWT | Depende de UserRepository y RedisCache | Solo tokens de 24h máximo | TODO: Implementar refresh tokens y MFA
class AuthService:
    def authenticate(self, credentials):
        # Implementación
```

#### Frontend Component
```[lenguaje]
// AI-Hint: Dashboard principal con métricas en tiempo real | Conecta con WebSocket y ChartJS | Requiere datos cada 5s | TODO: Añadir filtros por fecha y exportación PDF
const Dashboard = () => {
    // Implementación React
}
```

#### Database Model
```[lenguaje]
# AI-Hint: Modelo de usuario con roles y permisos | Relacionado con Orders y Sessions | Campos encriptados para PII | TODO: Agregar auditoría de cambios
class User(db.Model):
    # Definición del modelo
```

#### API Endpoint
```[lenguaje]
# AI-Hint: Endpoint para crear órdenes de trading | Valida con RiskManager y ejecuta en ExchangeAdapter | Límite 100 órdenes/min por usuario | TODO: Implementar órdenes batch
@app.post("/api/v1/orders")
async def create_order(order_data):
    # Implementación del endpoint
```

#### Utility Function
```[lenguaje]
# AI-Hint: Validador de datos de mercado | Usado por StrategyEngine y BacktestEngine | Solo acepta OHLCV válidos | TODO: Añadir validación de gaps temporales
def validate_market_data(candles):
    # Implementación de validación
```

### Reglas de AI-Hints

#### ✅ OBLIGATORIO usar AI-Hints en:
- Todas las clases principales
- Funciones públicas de servicios
- Componentes React/Vue principales
- Endpoints de API
- Modelos de base de datos
- Configuraciones complejas
- Algoritmos de negocio

#### ⚡ OPCIONAL pero recomendado en:
- Funciones utilitarias importantes
- Configuraciones de middleware
- Helpers y formatters
- Validadores específicos

#### ❌ NO usar AI-Hints en:
- Getters/setters simples
- Funciones de una línea obvias
- Variables simples
- Imports y exports básicos

### Mantenimiento de AI-Hints

#### Actualización Obligatoria cuando:
- Se cambia la funcionalidad principal
- Se añaden/quitan dependencias importantes
- Se modifican restricciones o limitaciones
- Se completan TODOs mencionados

#### Formato de Actualización:
```[lenguaje]
# AI-Hint: [PROPÓSITO actualizado] | [RELACIONES actualizadas] | [RESTRICCIONES actualizadas] | [ROADMAP actualizado]
# Updated: [YYYY-MM-DD] - [Razón del cambio]
```

Last Updated: [Fecha actual]
```

**INSTRUCCIONES ESPECÍFICAS**:
- Usar ejemplos de código reales en el lenguaje/stack del proyecto
- Incluir patrones específicos que realmente se usen en el proyecto
- Adaptar secciones según el tipo de proyecto (eliminar API patterns si no es aplicable)
- Incluir herramientas específicas (frameworks de testing, ORMs, etc.)

---

## INSTRUCCIONES FINALES PARA EL MODELO

1. **PERSONALIZACIÓN OBLIGATORIA**: Todos los archivos deben ser específicos al proyecto descrito. No generar contenido genérico.

2. **CONSISTENCIA**: Mantener consistencia entre archivos. Si se menciona una tecnología en `architecture.md`, debe aparecer también en `patterns.md`.

3. **COMPLETITUD**: Cada archivo debe estar completamente desarrollado, no usar placeholders como "TODO" o "[Completar más tarde]".

4. **FECHAS**: Usar la fecha actual en todos los "Last Updated".

5. **EJEMPLOS REALES**: En `patterns.md`, usar ejemplos de código real en el lenguaje del proyecto, no pseudocódigo.

6. **RUTAS ESPECÍFICAS**: En todos los archivos, usar rutas reales del proyecto, no genéricas.

7. **DECISIONES REALES**: En `decisions.md`, generar ADRs basados en decisiones técnicas realmente relevantes para el proyecto.

8. **INTEGRACIÓN**: Los archivos deben referenciar entre sí apropiadamente (ej: `base.mdc` debe mencionar la estructura de documentación real del proyecto).

9. **AI-HINTS OBLIGATORIOS**: Todo código generado DEBE incluir comentarios AI-Hints siguiendo el formato:
   ```
   # AI-Hint: [Propósito] | [Relaciones/Dependencias] | [Restricciones] | [TODOs/Mejoras]
   ```
   Estos comentarios proporcionan contexto crucial para futuras sesiones de IA.

## ARCHIVO TODO.md - LISTA DE TAREAS EJECUTABLES

### UBICACIÓN Y PROPÓSITO
- **Archivo**: `docs/TODO.md`
- **Propósito**: Lista estructurada de tareas pequeñas, concretas y precisas para construir el sistema progresivamente
- **Uso**: Guía ejecutable para equipos de desarrollo con progresión lógica y funcional

### ESTRUCTURA OBLIGATORIA DEL TODO.md

```markdown
# TODO - [Nombre del Proyecto]

## Objetivo
Crear una lista clara y completa de **tareas pequeñas, concretas y precisas** que puedan ser ejecutadas por un equipo de desarrollo para construir el sistema de forma progresiva.

## Reglas e Instrucciones

- Divide el trabajo en **bloques iterativos**: *implementar módulo → probar módulo → verificar comportamiento → documentar con AI-Hints → documentar en docs/info/ los cambios realizados*.
- Usa listas de verificación con casillas (`- [ ]`) para marcar el progreso.
- Mantén las tareas **lo más atómicas posible**, por ejemplo:
  - "Crear carpeta `[ruta específica]` y archivo `[nombre específico]`"
  - "Definir [componente específico] con [funcionalidad específica]"
  - "Probar [funcionalidad] manualmente con [herramienta específica]"
  - "Añadir AI-Hint para [componente específico]"
  - "Documentar en docs/info/ los cambios realizados"
  - "Marcar como completado en el TODO.md y añadir subtareas generadas por el modelo asi como informacion adicional útil"
- Incluye tareas de pruebas básicas después de cada implementación.
- Asegúrate de que el orden de las tareas refleje una **progresión lógica y funcional**.
- Agrupa tareas por secciones funcionales según la arquitectura del proyecto.
- Incluye al menos una tarea de configuración inicial y otra de actualización conforme avanza el desarrollo.

## 1. Configuración Inicial

### 1.1 Estructura Base del Proyecto
- [ ] **1.1.1. Crear estructura de directorios principal**:
    - [ ] Crear carpeta `[estructura específica según stack tecnológico]`
    - [ ] Crear archivos de configuración base: `[archivos específicos]`
    - [ ] Inicializar archivos de dependencias: `[package.json/requirements.txt/etc.]`
- [ ] **1.1.2. Configurar herramientas de desarrollo**:
    - [ ] Configurar linter: `[herramienta específica según stack]`
    - [ ] Configurar formatter: `[herramienta específica]`
    - [ ] Configurar git hooks básicos
- [ ] **1.1.3. Inicializar documentación base**:
    - [ ] Crear `README.md` con descripción del proyecto
    - [ ] Crear `docs/info/index.md` como índice maestro
    - [ ] Documentar arquitectura inicial en `docs/info/[categoría]/`
    - [ ] Marcar como completado en el TODO.md y añadir subtareas generadas por el modelo asi como informacion adicional útil

### 1.2 Configuración de Entorno
- [ ] **1.2.1. Variables de entorno**:
    - [ ] Crear archivo `.env.example` con variables necesarias
    - [ ] Configurar carga de variables en aplicación
    - [ ] Documentar variables en `docs/info/configuracion/`
- [ ] **1.2.2. Base de datos** (si aplica):
    - [ ] Configurar conexión a base de datos
    - [ ] Crear migraciones iniciales
    - [ ] Probar conexión y crear tablas básicas
- [ ] **1.2.3. Servicios externos** (si aplica):
    - [ ] Configurar APIs externas necesarias
    - [ ] Implementar autenticación con servicios
    - [ ] Probar conectividad básica
    - [ ] Marcar como completado en el TODO.md y añadir subtareas generadas por el modelo asi como informacion adicional útil

[CONTINUAR CON SECCIONES ESPECÍFICAS SEGÚN EL PROYECTO]

## 2. [Módulo Principal 1 - según arquitectura del proyecto]

### 2.1 [Submódulo específico]
- [ ] **2.1.1. Implementación base**:
    - [ ] Crear archivo `[ruta específica]` con estructura básica
    - [ ] Implementar función/clase `[nombre específico]` con lógica core
    - [ ] Añadir AI-Hint: `# AI-Hint: [propósito] | [dependencias] | [restricciones] | [roadmap]`
    - [ ] Añadir documentación en `docs/info/[categoría]/[nombre].md`
    - [ ] Marcar como completado en el TODO.md y añadir subtareas generadas por el modelo asi como informacion adicional útil
- [ ] **2.1.2. Validación y pruebas**:
    - [ ] Crear test unitario en `[ruta de tests]`
    - [ ] Probar funcionalidad con datos mock
    - [ ] Verificar manejo de errores básicos
    - [ ] Añadir documentación en `docs/info/[categoría]/[nombre].md`
    - [ ] Marcar como completado en el TODO.md y añadir subtareas generadas por el modelo asi como informacion adicional útil
- [ ] **2.1.3. Documentación**:
    - [ ] Documentar API/interfaz en `docs/info/[categoría]/[nombre].md`
    - [ ] Actualizar `docs/info/index.md` con nueva entrada
    - [ ] Añadir ejemplos de uso
    - [ ] Marcar como completado en el TODO.md y añadir subtareas generadas por el modelo asi como informacion adicional útil

### 2.2 [Submódulo específico]
[Seguir mismo patrón: implementación → pruebas → documentación]

## 3. [Módulo Principal 2]
[Continuar con estructura similar]

## 4. Integración y Pruebas

### 4.1 Integración entre Módulos
- [ ] **4.1.1. Conectar [Módulo A] con [Módulo B]**:
    - [ ] Implementar interfaz de comunicación
    - [ ] Probar flujo de datos end-to-end
    - [ ] Añadir AI-Hints para integraciones complejas
    - [ ] Añadir documentación en `docs/info/[categoría]/[nombre].md`
    - [ ] Marcar como completado en el TODO.md y añadir subtareas generadas por el modelo asi como informacion adicional útil
- [ ] **4.1.2. Pruebas de integración**:
    - [ ] Crear suite de pruebas de integración
    - [ ] Probar escenarios de uso principales
    - [ ] Documentar resultados en `docs/info/testing/`
    - [ ] Marcar como completado en el TODO.md y añadir subtareas generadas por el modelo asi como informacion adicional útil

### 4.2 Validación del Sistema
- [ ] **4.2.1. Pruebas funcionales**:
    - [ ] Probar flujos completos de usuario
    - [ ] Validar casos edge y manejo de errores
    - [ ] Verificar performance básica
- [ ] **4.2.2. Documentación de pruebas**:
    - [ ] Crear guía de testing en `docs/info/testing/`
    - [ ] Documentar casos de prueba y resultados esperados
    - [ ] Marcar como completado en el TODO.md y añadir subtareas generadas por el modelo asi como informacion adicional útil

## 5. Documentación Final y AI-Hints

### 5.1 Actualización de Documentación
- [ ] **5.1.1. Completar documentación técnica**:
    - [ ] Revisar y actualizar todas las entradas en `docs/info/`
    - [ ] Verificar que `docs/info/index.md` esté completo
    - [ ] Añadir guía de desarrollo en `docs/info/desarrollo/`
- [ ] **5.1.2. AI-Hints estratégicos**:
    - [ ] Revisar AI-Hints en componentes principales
    - [ ] Añadir AI-Hints para debugging común
    - [ ] Documentar patrones de AI-Hints en `docs/info/ai-hints/`
    - [ ] Marcar como completado en el TODO.md y añadir subtareas generadas por el modelo asi como informacion adicional útil

### 5.2 Preparación para Producción
- [ ] **5.2.1. Configuración de producción**:
    - [ ] Crear configuraciones para entorno de producción
    - [ ] Documentar proceso de deployment
    - [ ] Crear checklist de pre-deployment
- [ ] **5.2.2. Documentación de usuario**:
    - [ ] Crear guía de usuario en `docs/info/usuario/`
    - [ ] Documentar API pública (si aplica)
    - [ ] Crear troubleshooting guide
    - [ ] Marcar como completado en el TODO.md y añadir subtareas generadas por el modelo asi como informacion adicional útil

[AÑADIR MÁS SECCIONES SEGÚN COMPLEJIDAD DEL PROYECTO]

## Notas Importantes

- **Progresión**: Ejecutar tareas secuencialmente por sección
- **Validación**: Cada módulo debe probarse antes de continuar
- **Documentación**: Mantener `docs/info/index.md` actualizado constantemente
- **AI-Hints**: Añadir en puntos estratégicos para contexto futuro
- **Atomicidad**: Cada tarea debe ser completable en 1-2 horas máximo

## Criterios de Éxito

Al completar este TODO, el sistema deberá:
1. Tener todos los módulos principales implementados y probados
2. Contar con documentación completa en `docs/info/`
3. Incluir AI-Hints estratégicos para desarrollo futuro
4. Pasar todas las pruebas unitarias e integración
5. Estar listo para deployment o uso en producción

---

**Estado Actual**: [Actualizar conforme se completen las tareas]
**Última Actualización**: [Fecha de última modificación]
```

### INSTRUCCIONES ESPECÍFICAS PARA GENERACIÓN

#### 1. **Análisis del Proyecto**
- Identificar **stack tecnológico** principal para adaptar estructura de directorios
- Determinar **arquitectura** (monolítica, microservicios, frontend/backend, etc.)
- Mapear **funcionalidades principales** para crear secciones apropiadas
- Evaluar **complejidad** para determinar granularidad de tareas

#### 2. **Adaptación de Secciones**
- **Sección 1**: Siempre configuración inicial adaptada al stack
- **Secciones 2-N**: Una por módulo/funcionalidad principal del proyecto
- **Penúltima sección**: Siempre integración y pruebas
- **Última sección**: Siempre documentación final y AI-Hints

#### 3. **Granularidad de Tareas**
- **Máximo 2 horas** por tarea individual
- **Verbos de acción específicos**: "Crear", "Implementar", "Configurar", "Probar", "Documentar"
- **Rutas y nombres específicos** del proyecto, no genéricos
- **Criterios de éxito claros** para cada tarea

#### 4. **Estructura por Tarea**
```
- [ ] **X.Y.Z. [Título descriptivo]**:
    - [ ] [Subtarea específica 1]
    - [ ] [Subtarea específica 2]
    - [ ] [Subtarea específica 3 - siempre AI-Hint si aplica]
    - [ ] [Subtarea específica 4 - siempre documentar en docs/info/]
```

#### 5. **Patrones Obligatorios**
- **Cada módulo**: implementación → pruebas → AI-Hints → documentación
- **Cada sección**: 2-4 subsecciones máximo
- **Cada subsección**: 3-6 tareas específicas
- **Total tareas**: 50-150 según complejidad del proyecto

#### 6. **Integración con Sistema .cursor**
- **Referencias cruzadas** con archivos de memoria generados
- **Consistencia** con arquitectura documentada
- **AI-Hints estratégicos** en puntos de alta complejidad
- **Documentación incremental** en `docs/info/` con categorización apropiada

## INFORMACIÓN DEL PROYECTO A PROCESAR [REQUISITOS ESPECIFICOS DEL PROYECTO]

[AQUÍ SE AGREGARÍAN LOS REQUISITOS ESPECIFICOS DEL PROYECTO]

---

**RESULTADO ESPERADO**: 8 archivos completamente desarrollados y personalizados para el proyecto específico:
- 7 archivos de estructura .cursor (rules + memory)
- 1 archivo docs/TODO.md con lista ejecutable de tareas

Todos listos para ser usados por IA en desarrollo colaborativo progresivo.