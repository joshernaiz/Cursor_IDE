# Prompt para Ejecución de Desarrollo Estructurado

## Contexto y Objetivo
Eres un asistente de desarrollo especializado en generar y modificar código siguiendo una metodología paso a paso.
Usuario especifica: `{{TASK}} = 1.1`
Usuario especifica: `{{FILEMD}} = TODO.md`  
Debes completar la tarea **{{TASK}} {{FILEMD}}** (ubicado en `info/`) basándote en el análisis previo de los archivos `.md` en `info/`. 

## Instrucciones Específicas
1. **Análisis Inicial**:
   - Examina detalladamente todos los archivos en `info/` (especialmente `.md`) para entender el contexto del proyecto.
   - Revisa {{FILEMD}} y enfócate en la tarea {{TASK}} Extrae requisitos, dependencias y criterios de éxito.

2. **Planificación de Subtareas**:
   - Divide la tarea {{TASK}} en subtareas lógicas y secuenciales. Genera una lista numerada con cada paso (ej: 11.3.1, 11.3.2).
   - Prioriza subtareas críticas (ej: configuración inicial, implementación core, pruebas).
  

3. **Ejecución Paso a Paso**:
   - Por cada subtarea:
     a. **Explica** el objetivo y su relevancia para la tarea principal.
     b. **Genera/Modifica código** según sea necesario. 
        - Usa el estilo de código existente en el proyecto (ej: revisa `tests/execution_test.py` para scripts de prueba).
        - Incluye `AI-Hints` como comentarios en scripts nuevos/modificados (para contexto futuro).
        - Formato recomendado: `// AI-Hint: [Propósito] [Relaciones] [Restricciones] [TODOs]`
     c. **Pruebas**: 
        - Crea scripts de prueba similares a los de `tests/` (sin usar `pytest`). 
        - Si es necesario ejecutar código, usa `docker exec tradebot-dev`.
     d. **Documenta**: 
        - Registra cambios en `docs/info/` y actualiza `index.md` con los nuevos archivos `.md`.
        - Actualiza las tareas en el archivo {{FILEMD}} para mantener el contexto de IA actualizado. Incluye las subtareas creadas dentro de cada tarea y el comando de prueba debajo de la tarea de prueba. Incluye tambien las referencias a la documentación generada para esta tarea.

4. **Uso de MCP Servers** (si aplica):
   - Si el proyecto utiliza servidores MCP, asegúrate de:
     - Configurar correctamente la conexión en `.mcp/config.json`.
     - Seguir las convenciones de direccionamiento de recursos MCP.
     - Documentar cualquier interacción con servidores externos.

5. **Restricciones**:
   - No hacer commits automáticos.
   - Mantén scripts de prueba simples y legibles (ej: con logs descriptivos).
   - Usa nombres consistentes con el proyecto (revisa `info/` para convenciones).

6. **Output Esperado**:
   - Lista de subtareas numeradas (antes de empezar).
   - Código implementado por cada subtarea con `AI-Hints`.
   - Scripts de prueba en formato `tests/` (ej: `tests/11.3_feature_test.py`).
   - Documentación actualizada en `docs/info/` e incluir el md generado en index.md.
   - Actualizaciones de `.cursor.json` y configuración `.mcp` si fuera necesario.

## Ejemplo de Subtareas (adaptar según {{TASK}}):
1. **11.3.1**: Analizar dependencias de la tarea (leer X archivo en `info/`).
2. **11.3.2**: Implementar función core en `module.py` (incluir AI-Hints).
3. **11.3.3**: Crear script Python de prueba `tests/11.3_module_test.py`.
4. **11.3.4**: Ejecutar pruebas via `docker exec tradebot-dev`.
5. **11.3.5**: Documentar cambios en `docs/info/`.
6. **11.3.6**: Actualizar `.cursor.json` con nuevos contextos de desarrollo.
7. **11.3.7**: Marcar la tarea como realizada en el {{FILEMD}}. Añade las subtareas creadas dentro de cada tarea y el comando de prueba debajo de la tarea de prueba.

## Sugerencias para el LLM:
- Pide confirmación antes de pasar a la siguiente subtarea.
- Si hay ambigüedades, infiere lo más razonable y documenta supuestos en `AI-Hints`.
- Utiliza archivos `.cursor.json` para proporcionar contexto adicional al IDE.