# Prompt para Creación de Plan de Implementación Técnica

Eres un arquitecto de software senior con experiencia en diseño de sistemas, buenas prácticas de ingeniería, estructuración de código y documentación técnica. Quiero que, a partir de los objetivos, requisitos y principios que te proporcionaré, generes un **plan de implementación detallado del proyecto**, en formato Markdown (IMPLEMENTATION_PLAN.md).

Este plan debe permitir que cualquier desarrollador entienda **cómo se implementará el proyecto**, incluso antes de escribir una línea de código.

## Objetivo
Traducir los objetivos funcionales y técnicos en una estrategia clara de desarrollo, que incluya estructura, organización, responsabilidades de módulos, flujos principales y decisiones clave.

## Contenido esperado del archivo Markdown

1. **Resumen del Proyecto**
   - Descripción funcional y propósito del sistema.
   - Público objetivo y casos de uso principales.
   - Criterios de éxito técnicos y de negocio.

2. **Tecnologías y herramientas**
   - Lenguajes de programación, frameworks, librerías con versiones específicas.
   - Herramientas de desarrollo, testing, CI/CD, linters, etc.
   - Justificación breve de cada elección tecnológica.

3. **Principios y convenciones**
   - Principios de diseño adoptados (SOLID, KISS, DRY, etc.).
   - Estilo de codificación y normas de nomenclatura (incluir ejemplos).
   - Convenciones arquitectónicas (formato de AI-Hints, estructura de directorios).
   - Reglas de Cursor IDE específicas para el proyecto (archivo `.cursor.json`).

4. **Estructura de carpetas/proyecto**
   - Mapa general de carpetas con diagrama de árbol ASCII.
   - Propósito detallado de cada directorio principal.
   - Subdivisiones lógicas por responsabilidad (dominio, capa, etc.).
   - Ubicación de pruebas, documentación y recursos.

5. **Componentes y módulos principales**
   - Tabla describiendo cada componente (frontend, backend, servicios, bases de datos).
   - Funciones clave de cada módulo, cómo interactúan, y responsabilidades.
   - Diagramas Mermaid para visualizar las relaciones entre componentes.
   - AI-Hints principales que se utilizarán en cada módulo.

6. **Diseño de flujos y responsabilidades**
   - Diagramas Mermaid de secuencia para 3-5 flujos clave.
   - Descripción detallada de qué módulos intervienen en cada paso.
   - Manejo de errores y casos borde para cada flujo.

7. **Integración con MCP Servers** (si aplica)
   - Configuración y estructura de directorios `.mcp`.
   - Protocolos de comunicación y manejo de recursos externos.
   - Estrategias de caché y optimización.

8. **Plan de fases o sprints**
   - División del trabajo en etapas de desarrollo lógicas.
   - Orden de implementación de módulos con dependencias.
   - Hitos y entregables por fase.

9. **Pruebas y calidad**
   - Estrategia de testing: unitarias, integración, end-to-end.
   - Herramientas y configuración para testing y cobertura.
   - Proceso de revisión de código y estándares de calidad.

10. **Despliegue y entornos**
    - Descripción detallada de entornos (dev, staging, producción).
    - Proceso y herramientas de CI/CD.
    - Estrategias de migración y actualización.

11. **Metadatos para IAs**
    - Formato detallado de los AI-Hints que se usarán en el código.
    - Estructura del archivo `.cursor.json` para el proyecto.
    - Estrategias para mantener el contexto actualizado para las IAs.

## Instrucciones adicionales
- Estructura el documento con encabezados en Markdown.
- Usa tablas, diagramas Mermaid y listas para clarificar.
- No incluyas código fuente real; enfócate en planificación y diseño de alto nivel.
- El resultado debe servir como guía inicial de desarrollo para un equipo técnico.
- Incluye ejemplos concretos para cada convención o estándar propuesto.

## Requisitos del proyecto
**(EDITAR)**
[REEMPLAZAR POR LOS OBJETIVOS, FUNCIONALIDADES Y REQUISITOS TÉCNICOS DEL PROYECTO]