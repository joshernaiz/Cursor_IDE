# Prompt para Documentación Integral de Proyectos

Analiza este proyecto y genera una **documentación completa orientada a IAs**. **Formato de salida**: todo en Markdown, en `/docs/info`, con enlaces relativos, tablas de contenido y ejemplos de uso mínimo de 3 líneas de código. Omite archivos irrelevantes (logs, traducciones, corpus de datos).

1. **README.md** (en la raíz)
   - Descripción y propósito.
   - Tecnologías y versiones.
   - Dependencias y configuración del entorno (`.env`, Docker).
   - Estructura de directorios resumida.
   - Instalación, tests (`npm test`) y ejecución.
   - Ejemplos de uso básicos (con al menos 3 líneas de código).
   - Enlace a `/docs/index.md`.

2. **/docs/info/**
   - **index.md**: índice general con enlaces a cada sección.
   - **architecture/**
     - `ARCHITECTURE.md`:  
       - Patrón arquitectónico (MVC, microservicios…).  
       - Componentes y relaciones.  
       - Flujo de datos.  
       - Decisiones técnicas con justificación.
     - `diagrams/`: diagramas en Mermaid (arquitectura, secuencias, modelo de datos).
   - **api/**:
     - Generar con Swagger/OpenAPI (o manual) descripción de todas las rutas públicas con parámetros y esquemas de petición/respuesta.
   - **guides/**
     - Guías de usuario y de desarrollador (setup avanzado, despliegue, CI/CD).
   - **modules/**
     - Para cada módulo principal, un `module-<nombre>.md` con:
       - Propósito.
       - Diagrama de clases y dependencias.
       - Listado de clases y métodos (firma, descripción y "AI-hints").
   - **testing.md**:  
     - Ubicación de tests, cómo ejecutar, métricas de cobertura.
   - **SECURITY.md**:  
     - Buenas prácticas y amenazas mitigadas.
   - **GLOSSARY.md**:  
     - Términos y acrónimos del proyecto.

3. **Anotaciones en el código**  
   - Inserta comentarios `// AI-Hint:` en:
     - Puntos de entrada (servidor, CLI).
     - Lógica complicada.
     - Clases y funciones clave.
     - Utiliza el formato: `// AI-Hint: [Propósito] [Contexto] [Reglas importantes]`

4. **Cursor Rules**
   - Crea reglas (archivos .mdc) en `.cursor/rules/` con configuraciones específicas para el proyecto:
      Ejemplo:
          ---
          description: "Reglas de diseño y desarrollo para la interfaz web del TradeBot"
          globs: 
          alwaysApply: false
          ---

          # Reglas para el Desarrollo de la Interfaz Web

          ## Principios de Diseño

          A. **Claridad y Jerarquía Visual**
            - La información debe presentarse de forma directa y comprensible
            - Los elementos deben organizarse según su importancia
            - Los datos críticos deben ser inmediatamente visibles

          B. **Consistencia**
            - Utilizar controles, colores y patrones uniformes en toda la interfaz
            - Mantener una terminología coherente para las mismas acciones
            - Los componentes similares deben funcionar de manera similar

          C. **Feedback Inmediato**
            - Cada acción del usuario debe tener una respuesta visual
            - Mostrar estados de carga durante operaciones asíncronas
            - Confirmar operaciones exitosas y mostrar errores claramente

          D. **Control del Usuario**
            - Proporcionar mecanismos para detener/pausar operaciones
            - Ofrecer confirmación antes de acciones destructivas
            - Permitir edición de parámetros clave

5. **MCP Configuration** 
   - Crea una carpeta `.mcp` con configuración para servidores MCP si el proyecto lo requiere.
   - Incluye un README.md dentro de esta carpeta explicando cómo está configurado el MCP.

6. **Resultados esperados**  
   - Carpeta `docs/info/` con la jerarquía y archivos listados.
   - Diagramas mermaid embebidos en cada `.md`.
   - Ejemplos de uso y tests mínimos incluidos en la documentación.

**Objetivo**: que cualquier asistente de IA, al analizar estos `.md`, comprenda la arquitectura, flujo, API, módulos, pruebas y configuración del proyecto de forma autónoma.