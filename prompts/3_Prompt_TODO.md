# Prompt para Creación de Lista de Tareas Técnicas

Eres un ingeniero de software con experiencia en gestión técnica de proyectos. Quiero que generes una lista de verificación (`TODO.md`) que contenga una secuencia de tareas técnicas detalladas y organizadas para implementar el proyecto.

Esta lista debe estar basada en dos documentos previos:
- `DESIGN_PLAN.md`: Describe cómo debe ser la interfaz del sistema (ya sea UI, API o SDK).
- `IMPLEMENTATION_PLAN.md`: Detalla la arquitectura, módulos y estructura general del proyecto.

## Objetivo
Crear una lista clara y completa de **tareas pequeñas, concretas y precisas** que puedan ser ejecutadas por un equipo de desarrollo para construir el sistema de forma progresiva.

## Reglas e instrucciones

- Divide el trabajo en **bloques iterativos**: *implementar módulo → probar módulo → verificar comportamiento → documentar con AI-Hints → documentar en la carpeta docs/info los cambios realizados*.
- Usa listas de verificación con casillas (`- [ ]`) para marcar el progreso.
- Mantén las tareas **lo más atómicas posible**, por ejemplo:
  - "Crear carpeta `routes/` y archivo `userRoutes.js`"
  - "Definir endpoint GET `/users` con respuesta estática"
  - "Probar el endpoint manualmente con curl"
  - "Añadir AI-Hint para el endpoint usuario"
  - "Documentar en la carpeta docs/info los cambios realizados"
- Incluye tareas de pruebas básicas después de cada implementación.
- Asegúrate de que el orden de las tareas refleje una **progresión lógica y funcional**.
- Agrupa tareas por secciones funcionales (usuarios, autenticación, productos...).
- Incluye al menos una tarea de configuración inicial de `.cursor.json` y otra de actualización conforme avanza el desarrollo.
- Para proyectos que lo requieran, incluye tareas de configuración de servidores MCP.
- No incluyas tareas de infraestructura pesada o DevOps complejo, solo desarrollo funcional básico y pruebas simples.

## Secciones recomendadas

1. **Configuración inicial**
   - Crear estructura de directorios
   - Inicializar archivo `.cursor.json` con metadatos iniciales
   - Configurar herramientas básicas (linters, formatters)
   - Inicializar documentación básica

2. **Implementación por módulos**
   - Agrupar por funcionalidad o componente
   - Incluir implementación, pruebas y documentación por cada módulo
   - Añadir AI-Hints estratégicos en cada módulo

3. **Integración y pruebas**
   - Conectar módulos
   - Crear pruebas de integración
   - Verificar flujos completos

4. **Documentación y AI-Hints**
   - Actualizar archivo `.cursor.json` con nueva información
   - Crear o actualizar AI-Hints en puntos clave
   - Generar documentación para desarrolladores y usuarios

5. **Configuración MCP** (si aplica)
   - Tareas específicas para configuración de servidores MCP
   - Pruebas de integración con recursos externos

## Formato esperado
Un archivo `TODO.md` en formato Markdown que contenga secciones con títulos claros y listas de tareas bajo cada una. Usa bullets con `- [ ]` e incluye comentarios explicativos donde sea necesario.

## Entradas disponibles
- `DESIGN_PLAN.md` 
- `IMPLEMENTATION_PLAN.md`