# Guía del Curso: Desarrollo Eficiente con Cursor IDE

## Introducción

Este curso está diseñado para enseñarte cómo aprovechar al máximo las capacidades de IA de Cursor para desarrollar software de forma más rápida, organizada y eficiente.

El objetivo principal de este curso es que aprendas a estructurar tu trabajo de tal manera que la IA comprenda tu proyecto con el mínimo esfuerzo posible, permitiéndote generar código de alta calidad con un uso eficiente de tokens. Esto se logra mediante técnicas específicas de documentación, estructuración y comunicación con la IA.

## Objetivos del Curso

- Aprender a estructurar proyectos para facilitar el trabajo con IA
- Dominar el uso de AI-Hints para proporcionar contexto crítico
- Configurar y utilizar Cursor Rules para optimizar la interacción con la IA
- Integrar servidores MCP para extender las capacidades de Cursor
- Implementar un flujo de trabajo eficiente y escalable
- Generar documentación orientada a IAs
- Aplicar técnicas de prompt engineering en el desarrollo

## Estructura del Curso

### 1. [Fundamentos de Desarrollo con IA](./contenidos/01_fundamentos.md)

1.1. **Introducción a Cursor IDE**
   - Características principales
   - Diferencias con otros IDEs tradicionales
   - Instalación y configuración inicial

1.2. **El Modelo Mental del Desarrollo con IA**
   - De qué manera cambia el flujo de trabajo
   - Cómo piensa la IA y cómo aprovechar sus capacidades
   - Limitaciones y consideraciones

1.3. **Primeros Pasos con Cursor**
   - Interfaz y comandos básicos
   - Teclas de acceso rápido
   - Configuración de preferencias

### 2. [AI-Hints: Proporcionando Contexto Eficiente](./contenidos/02_ai_hints.md)

2.1. **¿Qué son los AI-Hints?**
   - Definición y propósito
   - Beneficios para el desarrollo
   - Cuándo y dónde utilizarlos

2.2. **Tipos de AI-Hints**
   - AI-Hints de Arquitectura
   - AI-Hints de Componente
   - AI-Hints de Lógica de Negocio
   - AI-Hints de Datos
   - AI-Hints de Flujo
   - AI-Hints de Seguridad

2.3. **Implementación Práctica**
   - Formato y estructura recomendada
   - Ubicaciones estratégicas en el código
   - Ejemplos de diferentes contextos

### 3. [Cursor Rules: Optimizando la Interacción](./contenidos/03_cursor_rules.md)

3.1. **Introducción a Cursor Rules**
   - Tipos de reglas (Project, User, Legacy)
   - Cómo funcionan las reglas
   - Ámbito de aplicación

3.2. **Project Rules**
   - Estructura y ubicación en `.cursor/rules`
   - Formato MDC y tipos de reglas
   - Reglas anidadas y organización
   - Creación y generación de reglas

3.3. **Mejores prácticas**
   - Reglas enfocadas y accionables
   - Organización y reutilización
   - Optimización de contenido

3.4. **Ejemplos prácticos**
   - Guías específicas de dominio
   - Plantillas y boilerplate (Estructuras repetitivas. secciones de código que se repiten en múltiples partes de un programa con muy poca o ninguna modificación)
   - Automatización de flujos de trabajo
   - Ejemplos del código base de Cursor

3.5. **User Rules**
   - Configuración y alcance
   - Casos de uso recomendados
   - Diferencias con Project Rules

3.6. **Team Rules**
   - Estrategias para compartir reglas
   - Soluciones temporales hasta integración oficial

3.7. **`.cursorrules` (Legacy)**
   - Compatibilidad y migración
   - Limitaciones frente al nuevo formato

3.8. **Preguntas frecuentes**
   - Solución de problemas comunes
   - Referencias a archivos
   - Integración con otras funciones

### 4. [MCP Servers: Extendiendo Capacidades](./contenidos/04_mcp_servers.md)

4.1. **Introducción a MCP (Model Control Protocol)**
   - Qué es MCP y para qué sirve
   - Beneficios de usar servidores MCP
   - Casos de uso comunes

4.2. **Configuración de Servidores MCP**
   - Estructura del directorio .mcp
   - Archivo de configuración principal
   - Autenticación y seguridad

4.3. **Recursos y Modelos Específicos**
   - Tipos de recursos disponibles
   - Configuración de modelos personalizados
   - Optimización de rendimiento

### 5. [Flujo de Trabajo Completo](./contenidos/05_flujo_trabajo.md)

5.1. **Planificación de Proyectos**
   - Uso del prompt Plan_Diseño
   - Creación de DESIGN_PLAN.md
   - Estructuración inicial

5.2. **Implementación Técnica**
   - Uso del prompt Plan_Implantación
   - Creación de IMPLEMENTATION_PLAN.md
   - Decisiones arquitectónicas

5.3. **Lista de Tareas Concretas**
   - Uso del prompt TODO
   - Creación de TODO.md
   - Seguimiento del progreso

5.4. **Ejecución del Desarrollo**
   - Uso del prompt Ejecución_desarrollo
   - Implementación paso a paso
   - Pruebas y validación

### 6. [Documentación para IAs](./contenidos/06_documentacion_ias.md)

6.1. **Documentación desde Cero**
   - Uso del prompt Documentar_proyectos_desde_0
   - Estructura de documentación ideal
   - Ejemplos prácticos

6.2. **Actualización de Documentación**
   - Uso del prompt Actualizar_Doc_Proyectos
   - Integración con control de versiones
   - Mantenimiento continuo

6.3. **Equilibrio entre Documentación Humana y para IAs**
   - Diferencias clave
   - Estrategias de coexistencia
   - Automatización de actualizaciones

### 7. [Proyecto Práctico](./contenidos/07_proyecto_practico.md)

7.1. **Definición del Proyecto**
   - Requisitos y objetivos
   - Planificación inicial
   - Configuración del entorno

7.2. **Implementación Guiada**
   - Aplicación de todos los conceptos aprendidos
   - Resolución de problemas comunes
   - Optimizaciones progresivas

7.3. **Revisión y Mejoras**
   - Análisis del código generado
   - Refinamiento de AI-Hints y configuraciones
   - Medición de eficiencia

### 8. [Símbolos @ en Cursor: Expandiendo el Contexto](./contenidos/08_simbolos_arroba.md)

8.1. **Introducción a los Símbolos @**
   - Qué son y para qué sirven
   - Beneficios principales
   - Cuándo utilizarlos

8.2. **@Docs: Integrando Documentación Externa**
   - Sintaxis y ejemplos
   - Mejores prácticas
   - Casos de uso comunes

8.3. **@Folders: Añadiendo Carpetas al Contexto**
   - Cómo referenciar estructuras de directorios
   - Patrones glob y filtrado
   - Estrategias de inclusión eficiente

8.4. **@Web: Búsqueda de Información en Internet**
   - Consultas efectivas
   - Integración con el desarrollo
   - Optimización de búsquedas

8.5. **Combinando Símbolos @ para Máxima Eficiencia**
   - Estrategias de combinación
   - Escenarios de uso avanzado
   - Gestión de contexto complejo

## Recursos Adicionales

- **Prompts**: Carpeta `prompts/` con todos los prompts listos para usar
- **Ejemplos**: Código de muestra para cada técnica
- **Plantillas**: Archivos base para configuraciones comunes
- **Referencias**: Enlaces a documentación oficial y recursos complementarios

## Cómo Usar Esta Guía

1. Sigue las secciones en orden secuencial para una comprensión completa
2. Consulta los prompts optimizados para implementar cada fase
3. Aplica lo aprendido en el proyecto práctico
4. Adapta las técnicas a tus proyectos personales o profesionales

## Próximos Pasos

Una vez completado el curso, podrás:
- Crear tus propios prompts optimizados para casos específicos
- Desarrollar configuraciones avanzadas para distintos tipos de proyectos
- Entrenar a tu equipo en estas técnicas
- Contribuir con mejoras a la comunidad de Cursor IDE