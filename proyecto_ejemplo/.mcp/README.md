# Configuración MCP - TaskFlow

Este directorio contiene la configuración de Model Control Protocol (MCP) para el proyecto TaskFlow. MCP permite a Cursor IDE conectarse con servicios de IA especializados para mejorar la capacidad de análisis y generación de tareas.

## Introducción a MCP Servers

Los MCP Servers (Model Control Protocol) proporcionan una capa de abstracción para conectarse con modelos de IA especializados en diferentes dominios. En TaskFlow, utilizamos MCP para acceder a modelos optimizados para análisis de tareas, planificación y categorización.

Los beneficios principales incluyen:
- Acceso a modelos especializados para nuestro dominio específico
- Mejora en eficiencia computacional al no depender solo del modelo general
- Capacidad para aplicar reglas de negocio específicas en las respuestas de IA

## Configuración inicial

### Requisitos de acceso
Para utilizar los servidores MCP, necesitarás:

1. Token de acceso a la API (solicitar al administrador)
2. Variables de entorno configuradas:
   ```
   MCP_AI_TOKEN=tu_token_aquí
   MCP_SERVER_URL=https://mcp.example.com/ai
   ```

### Proceso de autenticación
La autenticación se maneja automáticamente usando el token definido en la variable de entorno. No es necesario autenticarse manualmente en el código.

## Uso desde Cursor IDE

### Referenciar recursos MCP en el código

```typescript
// Ejemplo de uso en un servicio de IA

// AI-Hint: [AIService] [Utiliza MCP task-analyzer para analizar tareas] [Requiere modelo específico]
import { mcpClient } from '../config/mcp';

async function analyzeTask(task) {
  try {
    const result = await mcpClient.invokeModel('task-analyzer', {
      task,
      context: 'Análisis para priorización'
    });
    return result.suggestions;
  } catch (error) {
    console.error('Error analyzing task with MCP:', error);
    return fallbackAnalysis(task); // Análisis local como respaldo
  }
}
```

### Comandos de Cursor para acceder a MCP

Desde Cursor IDE, puedes utilizar los siguientes comandos para interactuar con MCP:

- `cursor mcp status` - Verificar estado de conexión con servidores MCP
- `cursor mcp models` - Listar modelos disponibles
- `cursor mcp invoke <model-name> -i <input-file>` - Invocar modelo con entrada desde archivo

## Recursos disponibles

### task-analyzer
- **Descripción**: Modelo especializado en análisis de tareas
- **Caso de uso**: Analizar tareas para sugerir prioridad, esfuerzo y plazos
- **Ejemplo de entrada**:
  ```json
  {
    "task": {
      "title": "Implementar login con OAuth",
      "description": "Añadir soporte para login con Google y GitHub",
      "dueDate": "2023-06-15"
    },
    "existingTasks": [
      { "title": "Diseñar UI de login", "status": "completed" },
      { "title": "Configurar rutas de autenticación", "status": "in_progress" }
    ]
  }
  ```
- **Ejemplo de salida**:
  ```json
  {
    "analysis": {
      "estimatedEffort": "medium",
      "suggestedPriority": "high",
      "dependsOn": ["Configurar rutas de autenticación"],
      "skills": ["OAuth", "API integration", "Frontend"],
      "risk": "low"
    },
    "recommendations": {
      "deadline": "2023-06-10",
      "splitTasks": [
        "Configurar OAuth en backend",
        "Integrar UI con proveedores OAuth"
      ]
    }
  }
  ```

### workload-optimizer
- **Descripción**: Modelo para distribución óptima de carga de trabajo
- **Caso de uso**: Planificar tareas en un período de tiempo considerando prioridades y fechas límite
- **Limitaciones**: Máximo 200 tareas por solicitud, período máximo de 7 días

### task-categorizer
- **Descripción**: Modelo para categorización automática de tareas
- **Caso de uso**: Asignar categorías y etiquetas a tareas basadas en su título y descripción
- **Configuración**: Admite categorías personalizadas definidas por el usuario

## Modelos de IA

### task-analyzer
- **Proveedor**: Anthropic (Claude)
- **Especialización**: Análisis de tareas y sugerencias
- **Escenarios recomendados**: Planificación de sprints, estimación de esfuerzo, detección de dependencias
- **Ejemplo de prompt optimizado**:
  ```
  Analiza esta tarea: {task_description}
  
  Contexto del proyecto: {project_context}
  
  Proporciona:
  1. Estimación de esfuerzo (bajo/medio/alto)
  2. Prioridad sugerida (1-5)
  3. Posibles dependencias
  4. Riesgos potenciales
  5. Sugerencia de fecha límite
  ```

### workload-optimizer
- **Proveedor**: OpenAI (GPT-4)
- **Especialización**: Distribución óptima de tareas en el tiempo
- **Escenarios recomendados**: Planificación semanal, balanceo de carga entre equipo

## Troubleshooting

### Problemas comunes y soluciones

1. **Error de autenticación**
   - Verificar variable de entorno MCP_AI_TOKEN
   - Comprobar que el token sigue siendo válido

2. **Timeout en respuestas**
   - Reducir el tamaño de la solicitud
   - Verificar la conectividad de red
   - Incrementar el valor de requestTimeout en config.json

3. **Respuestas incorrectas**
   - Verificar el formato de la solicitud
   - Comprobar que el modelo seleccionado es el adecuado
   - Revisar los ejemplos proporcionados

### Contacto de soporte
Para problemas persistentes, contactar a:
- Administrador MCP: mcp-admin@example.com
- Equipo de soporte: support@example.com