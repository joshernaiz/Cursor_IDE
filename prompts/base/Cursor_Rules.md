# Prompt para Configuración de Cursor Rules

Eres un ingeniero de software especializado en la optimización de entornos de desarrollo asistidos por IA. Quiero que generes una configuración óptima de Cursor Rules para este proyecto, que permita a Cursor IDE entender mejor la estructura y contexto del código.

## Objetivo
Crear un archivo `.cursor.json` en la raíz del proyecto que proporcione metadatos, referencias y reglas de contexto para que Cursor IDE y sus modelos de IA puedan comprender el proyecto rápidamente y generar respuestas más precisas.

## Estructura base del archivo `.cursor.json`

```json
{
  "project": {
    "name": "NOMBRE_DEL_PROYECTO",
    "description": "DESCRIPCIÓN_BREVE",
    "version": "VERSIÓN",
    "homepage": "URL_DEL_PROYECTO",
    "repository": "URL_REPOSITORIO"
  },
  "context": {
    "entryPoints": [],
    "criticalPaths": [],
    "documentation": []
  },
  "aiHints": {
    "architecture": {},
    "patterns": [],
    "terminology": {},
    "conventions": {}
  },
  "mcpConfig": {
    "enabled": false,
    "serverUrl": "",
    "resources": []
  },
  "files": {
    "include": [],
    "exclude": []
  },
  "rules": []
}
```

## Elementos a configurar

1. **Información del Proyecto**
   - Nombre y descripción concisa del proyecto
   - Versión actual
   - URLs relevantes (homepage, repositorio, docs)

2. **Puntos de Entrada**
   - Lista de archivos principales que sirven como punto de partida
   - Archivos de configuración principales
   - Módulos centrales del proyecto

3. **Rutas Críticas**
   - Directorios o archivos que contienen lógica de negocio esencial
   - Componentes core que definen la arquitectura
   - Archivos que cualquier desarrollador debería conocer primero

4. **Documentación**
   - Enlaces a archivos de documentación internos clave
   - Readme, guías de arquitectura, documentación de API
   - Ubicación del glosario de términos

5. **AI-Hints Globales**
   - Patrones arquitectónicos empleados en el proyecto
   - Terminología específica del dominio
   - Convenciones de código particulares

6. **Configuración MCP** (si aplica)
   - URL del servidor MCP
   - Recursos disponibles y sus rutas
   - Configuración de acceso

7. **Inclusión/Exclusión de Archivos**
   - Patrones glob para incluir archivos importantes
   - Patrones glob para excluir archivos temporales, builds, etc.

8. **Reglas Personalizadas**
   - Reglas específicas para el manejo de ciertos archivos o patrones
   - Comportamientos personalizados para el IDE

## Instrucciones de análisis

1. **Examina la estructura del proyecto**:
   - Identifica la arquitectura general (monolítica, microservicios, etc.)
   - Determina los patrones de diseño utilizados
   - Localiza los componentes principales

2. **Analiza puntos de entrada**:
   - Encuentra los archivos "main" o de inicialización
   - Identifica archivos de configuración críticos
   - Busca puntos de entrada de API o UI

3. **Investiga la documentación existente**:
   - Revisa READMEs, wikis, o documentación interna
   - Identifica glosarios o definiciones de términos
   - Busca diagramas o explicaciones de arquitectura

4. **Detecta convenciones**:
   - Observa patrones de nombrado
   - Identifica estructuras de carpetas recurrentes
   - Analiza patrones en comentarios y documentación

## Formato de salida

1. Un archivo `.cursor.json` completo y válido.
2. Una explicación breve de cada sección configurada.
3. Recomendaciones adicionales para mejorar el contexto para la IA.

## Recomendaciones adicionales

- Configura la sección `mcpConfig` solo si el proyecto realmente utiliza MCP Servers
- Sé específico pero conciso en las descripciones
- Incluye sólo los archivos realmente importantes en `entryPoints` y `criticalPaths`
- En `files.exclude`, añade patrones para ocultar archivos generados, temporales o de dependencias
- Considera añadir reglas customizadas para comportamientos específicos del proyecto