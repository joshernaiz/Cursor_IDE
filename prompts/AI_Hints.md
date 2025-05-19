# Prompt para Creación y Gestión de AI-Hints

Eres un especialista en ingeniería de software y optimización de comunicación con IA generativas. Revisa este proyecto y genera **AI-Hints estratégicos** para maximizar la eficiencia de los modelos de lenguaje al interactuar con este código.

## Objetivo
Añadir comentarios `AI-Hint` en puntos estratégicos del código para proporcionar contexto esencial a las IAs, permitiéndoles entender rápidamente la arquitectura, patrones y lógica de negocio sin necesidad de analizar todo el proyecto.

## Tipos de AI-Hints a implementar

1. **AI-Hints de Arquitectura** (en archivos principales)
   ```
   // AI-Hint Architecture: [Patrón arquitectónico] [Dependencias principales] [Flujo general de datos]
   ```

2. **AI-Hints de Componente** (en clases/módulos clave)
   ```
   // AI-Hint Component: [Propósito] [Responsabilidades] [Interacciones con otros componentes]
   ```

3. **AI-Hints de Lógica de Negocio** (en funciones críticas)
   ```
   // AI-Hint Business: [Reglas de negocio] [Restricciones] [Casos especiales]
   ```

4. **AI-Hints de Datos** (en modelos/esquemas)
   ```
   // AI-Hint Data: [Estructura] [Validaciones] [Relaciones]
   ```

5. **AI-Hints de Flujo** (en puntos de entrada/salida)
   ```
   // AI-Hint Flow: [Origen] → [Proceso] → [Destino] [Condiciones]
   ```

6. **AI-Hints de Seguridad** (en código sensible)
   ```
   // AI-Hint Security: [Medidas implementadas] [Amenazas mitigadas] [Precauciones]
   ```

## Ubicaciones prioritarias para colocar AI-Hints

1. **Archivos de entrada principal**:
   - Punto de inicio de la aplicación (main.js, index.js, App.tsx, etc.)
   - Configuración principal (config.js, settings.py, etc.)
   - Registros de rutas o servicios (routes.js, services.ts, etc.)

2. **Definiciones de clases/componentes clave**:
   - Controladores/Services en backend
   - Componentes de orden superior en frontend
   - Middleware y decoradores

3. **Funciones complejas**:
   - Algoritmos no triviales
   - Transformaciones de datos
   - Manejo de casos borde

4. **Puntos de integración**:
   - Llamadas a APIs externas
   - Conexiones a bases de datos
   - Integraciones con servicios

## Formato de entrega

1. **Análisis del proyecto**
   - Lista de archivos clave identificados
   - Estructura y patrones detectados

2. **AI-Hints generados**
   - Listado de todos los AI-Hints por archivo
   - Razón de cada AI-Hint (qué contexto proporciona)

3. **Archivo `.cursor.json`**
   - Configuración recomendada para Cursor IDE
   - Metadatos del proyecto y referencias a documentación

4. **Guía de mantenimiento**
   - Instrucciones para mantener AI-Hints actualizados
   - Cuándo y cómo añadir nuevos AI-Hints

## Consideraciones importantes

- Sé conciso pero completo en cada AI-Hint (máximo 1-2 líneas)
- Prioriza información que no sea obvia a partir del código
- Incluye conocimiento de dominio específico relevante
- Proporciona contexto sobre patrones arquitectónicos utilizados
- Menciona interdependencias no evidentes entre componentes

## Configuración de `.cursor.json`

Crea o actualiza un archivo `.cursor.json` en la raíz del proyecto con esta estructura:

```json
{
  "project": {
    "name": "NOMBRE_PROYECTO",
    "description": "DESCRIPCIÓN_BREVE",
    "version": "X.Y.Z"
  },
  "aiHints": {
    "architecture": {
      "pattern": "Patrón arquitectónico principal",
      "documentation": "/docs/architecture.md"
    },
    "components": {
      "critical": ["ruta/a/componente1", "ruta/a/componente2"],
      "documentation": "/docs/components/"
    },
    "businessRules": {
      "documentation": "/docs/business-rules.md"
    }
  },
  "codeContext": {
    "entryPoints": ["ruta/a/punto/entrada1", "ruta/a/punto/entrada2"],
    "testExamples": ["tests/componente1_test.js", "tests/componente2_test.js"],
    "apiDocs": "/docs/api/"
  }
}
```