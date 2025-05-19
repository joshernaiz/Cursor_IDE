# Prompt para Actualización de Documentación Eficiente

Analiza este commit y actualiza la documentación del proyecto según la siguiente estructura y convenciones:

---  
**Commit**  
- **Mensaje:** {{COMMIT_MESSAGE}}  
- **Task ID:** {{TASK_ID}}  
- **Cambios (diff):**  
```diff
{{GIT_DIFF}}
```  

**Estructura de docs existente**  
- README.md (en raíz)  
- /docs/index.md  
- /docs/architecture/ARCHITECTURE.md + /docs/architecture/diagrams/*.mmd  
- /docs/api/ (documentación de endpoints)  
- /docs/modules/module-<nombre>.md  
- /docs/GLOSSARY.md  

**Tareas a realizar**  
1. **README.md**  
   - Añadir bajo un encabezado `## Novedades ({{TASK_ID}})` un resumen de los cambios: qué archivos mueven, qué funcionalidades nuevas o modificadas, y enlace a la documentación detallada.  

2. **/docs/index.md**  
   - Incluir enlace al nuevo/actualizado módulo(s) y sección `Novedades`.  

3. **/docs/architecture/ARCHITECTURE.md**  
   - Si ha cambiado algo relevante en la arquitectura (nuevo componente, modificación de flujo), describirlo y justificarlo.  
   - Actualizar texto para reflejar patrones, datos o dependencias nuevos.  

4. **/docs/architecture/diagrams/**  
   - Modificar o generar el/los diagrama(s) Mermaid correspondientes al flujo de procesos afectados (añadir pasos, eliminar ramas).  

5. **/docs/modules/**  
   - Para cada módulo tocado en el diff, abrir `module-<nombre>.md` y:  
     - Ajustar la descripción general.  
     - Listar nuevas clases/métodos (firma + breve descripción + `// AI-Hint:` donde sea necesario).  
     - Marcar métodos refactorizados o removidos.  

6. **/docs/api/**  
   - Si cambian rutas o contratos, regenerar o actualizar la sección del endpoint:  
     - Ruta, método HTTP, parámetros de entrada/salida, ejemplos de petición/respuesta.  

7. **Anotaciones en el código**  
   - Inserta comentarios `// AI-Hint:` en puntos de entrada, lógica compleja o clases nuevas siguiendo el formato:
     ```
     // AI-Hint: [Descripción del propósito] [Dependencias clave] [Reglas de negocio]
     ```

8. **Glosario**  
   - Si introduces términos nuevos, añade al final de `/docs/GLOSSARY.md` el término y su definición.  

9. **Cursor Rules**  
   - Actualiza el archivo `.cursor.json` si es necesario para indicar a Cursor IDE contexto adicional sobre los cambios realizados.

**Formato de salida**  
Devuélveme únicamente los fragmentos de Markdown nuevos o modificados (con sus rutas relativas), más un breve índice de qué archivos cambiar. Omite archivos sin cambios.