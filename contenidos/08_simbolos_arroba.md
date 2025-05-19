# 8. Símbolos @ en Cursor: Expandiendo el Contexto

## 8.1. Introducción a los Símbolos @

Cursor IDE ofrece una poderosa funcionalidad conocida como "símbolos @" que permite expandir el contexto disponible para la IA de forma rápida y eficiente. Estos símbolos funcionan como comandos especiales que puedes incluir en tus prompts para proporcionar información adicional sin tener que copiar y pegar grandes cantidades de texto.

Los símbolos @ son particularmente útiles cuando:
- Necesitas referenciar documentación externa
- Quieres añadir el contenido de carpetas específicas
- Necesitas buscar información en internet
- Quieres interactuar con sistemas de control de versiones

### Beneficios principales

1. **Eficiencia de tokens**: Permite incluir información relevante sin consumir tokens en la conversación principal.
2. **Contexto específico**: Proporciona exactamente la información que la IA necesita para resolver un problema.
3. **Flujo de trabajo más natural**: Evita cambiar entre ventanas para copiar/pegar documentación.
4. **Flexibilidad**: Permite a la IA acceder a información que está fuera del proyecto actual.

## 8.2. @Docs: Integrando Documentación Externa

El símbolo `@Docs` permite incluir documentación externa directamente en el contexto de la conversación con la IA. Esto es especialmente útil cuando necesitas que la IA comprenda APIs, bibliotecas o frameworks específicos.

### Sintaxis básica

```
@Docs(url_o_ruta_de_archivo)
```

### Ejemplos de uso

1. **Documentación web**:
   ```
   @Docs(https://reactjs.org/docs/hooks-reference.html)
   
   ¿Puedes explicarme cómo implementar un custom hook que combine useEffect y useState para manejar datos en tiempo real?
   ```

2. **Documentación local**:
   ```
   @Docs(./docs/api-reference.md)
   
   Basándote en nuestra API, ¿cómo debo implementar la autenticación en el nuevo endpoint?
   ```

3. **Documentación de paquetes específicos**:
   ```
   @Docs(npm:redux-toolkit)
   
   ¿Cómo debo configurar un store con múltiples reducers y middleware personalizado?
   ```

### Agregar documentos personalizados

Cursor te permite rastrear e indexar documentos personalizados que deseas tener disponibles como contexto. Para ello:

1. Utiliza el comando `@Docs> Add new doc` en la ventana de chat
2. Aparecerá una ventana modal donde puedes pegar la URL del documento que deseas indexar
3. Cursor indexará y memorizará el documento, permitiéndote usarlo como contexto igual que cualquier otro documento

**Tip importante**: Si añades una barra diagonal final (`/`) a la URL, Cursor indexará todas las subpáginas y subdirectorios, lo que resulta muy útil para documentación completa.

Una ventaja adicional es que Cursor mantiene los documentos indexados actualizados automáticamente, reindexándolos periódicamente para reflejar las ediciones o modificaciones que se realicen en ellos.

### Mejores prácticas

1. **Especificidad**: Incluye solo la documentación relevante para la tarea actual.
2. **Concisión**: Si la documentación es extensa, indica secciones específicas.
3. **Formato**: Preferiblemente, usa documentación en formato Markdown o texto plano.
4. **Complementa con contexto**: Añade una breve explicación de por qué esa documentación es relevante.

```
@Docs(https://tailwindcss.com/docs/configuration)

Estoy intentando personalizar los breakpoints de Tailwind para nuestro proyecto. Necesito añadir un breakpoint específico para tablets en orientación vertical (768px x 1024px).
```

## 8.3. @Folders: Añadiendo Carpetas al Contexto

El símbolo `@Folders` permite incluir el contenido de carpetas específicas en el contexto de la conversación. Esto es especialmente útil cuando estás trabajando en una parte del proyecto que depende de múltiples archivos dispersos en diferentes ubicaciones.

### Sintaxis básica

```
@Folders(ruta/a/la/carpeta)
```

### Ejemplos de uso

1. **Componentes relacionados**:
   ```
   @Folders(src/components/forms)
   
   Necesito crear un nuevo componente FormWrapper que sirva como contenedor común para todos nuestros formularios, manteniendo el mismo estilo y comportamiento de validación.
   ```

2. **Múltiples carpetas**:
   ```
   @Folders(src/api, src/services)
   
   Quiero refactorizar cómo manejamos las llamadas a la API. ¿Puedes analizar nuestro código actual y sugerir una estructura más consistente?
   ```

3. **Análisis de patrones**:
   ```
   @Folders(src/utils)
   
   ¿Puedes identificar funciones duplicadas o similares en nuestros utilities que podríamos consolidar?
   ```

### Mejores prácticas

1. **Especificidad**: Incluye solo las carpetas directamente relevantes.
2. **Profundidad**: Considera las subcarpetas y cuántos archivos se incluirán.
3. **Combinación**: Puedes combinar `@Folders` con otras instrucciones específicas.
4. **Control de tamaño**: Evita incluir carpetas demasiado grandes que puedan sobrecargar el contexto.

```
@Folders(src/components/dashboard)

Estoy notando inconsistencias en cómo implementamos el responsive design en los componentes del dashboard. ¿Puedes analizar nuestro enfoque actual y sugerir mejoras para unificar la experiencia?
```

## 8.4. @Web: Búsqueda de Información en Internet

El símbolo `@Web` permite a Cursor buscar información en internet y utilizar los resultados como parte del contexto. Esto es particularmente útil cuando necesitas información actualizada o específica que no está disponible en el proyecto.

### Sintaxis básica

```
@Web(consulta_de_búsqueda)
```

### Ejemplos de uso

1. **Información técnica actualizada**:
   ```
   @Web(latest React 18 concurrent features)
   
   ¿Cómo podemos implementar las nuevas características de concurrencia de React 18 en nuestro proyecto actual?
   ```

2. **Soluciones a problemas específicos**:
   ```
   @Web(fix nextjs api routes CORS issues)
   
   Estoy teniendo problemas con CORS en mis rutas de API de Next.js. ¿Puedes ayudarme a configurar correctamente los headers?
   ```

3. **Mejores prácticas actuales**:
   ```
   @Web(best practices for React performance optimization 2023)
   
   ¿Puedes analizar nuestro componente FeedList y sugerir optimizaciones de rendimiento según las mejores prácticas actuales?
   ```

### Mejores prácticas

1. **Consultas específicas**: Sé preciso en lo que estás buscando.
2. **Términos clave**: Incluye palabras clave técnicas relevantes.
3. **Información actualizada**: Especifica cuando necesites información reciente añadiendo el año o términos como "latest".
4. **Contexto adicional**: Complementa la búsqueda con detalles específicos de tu proyecto.

```
@Web(typescript generics with react props patterns)

Estoy implementando un componente Table genérico que debe manejar diferentes tipos de datos. Necesito entender los mejores patrones para usar genéricos con props en React y TypeScript.
```

## 8.5. Combinando Símbolos @ para Máxima Eficiencia

Para resolver problemas complejos, puedes combinar múltiples símbolos @ en una misma conversación, proporcionando un contexto rico y multifacético para la IA.

### Escenarios de uso combinado

1. **Implementación basada en documentación y código existente**:
   ```
   @Docs(https://redux-toolkit.js.org/rtk-query/overview)
   @Folders(src/api, src/store)
   
   Quiero modernizar nuestra capa de API utilizando RTK Query. ¿Puedes mostrarme cómo migrar nuestros endpoints actuales a este nuevo enfoque?
   ```

2. **Debugging con documentación y patrones actuales**:
   ```
   @Docs(https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
   @Web(react performance issues with intersection observer)
   @Folders(src/components/LazyLoad)
   
   Nuestro componente de carga perezosa está causando re-renders innecesarios. ¿Puedes identificar el problema y sugerir una solución?
   ```

3. **Actualizaciones basadas en nueva documentación**:
   ```
   @Docs(npm:next-auth@latest)
   @Folders(src/pages/api/auth)
   @Web(next-auth v4 migration guide)
   
   Necesitamos actualizar nuestra implementación de NextAuth de v3 a v4. ¿Puedes guiarme a través de los cambios necesarios?
   ```

### Estrategias para combinar símbolos @

1. **Ordenar por relevancia**: Coloca primero los contextos más importantes.
2. **Proporcionar contexto incremental**: Empieza con información general y luego añade detalles específicos.
3. **Limitar la cantidad**: Aunque puedes combinar varios símbolos, intenta no sobrecargar el contexto.
4. **Equilibrar fuentes**: Combina documentación oficial con código existente y mejores prácticas actuales.

## 8.6. Consejos Avanzados y Optimizaciones

Para aprovechar al máximo los símbolos @ en Cursor, considera estas técnicas avanzadas y optimizaciones:

### 1. Uso estratégico de patrones glob

Con `@Folders` puedes utilizar patrones glob para seleccionar archivos específicos:

```
@Folders(src/components/**/*.test.tsx)

Analiza nuestros tests actuales y sugiere cómo podemos mejorar la cobertura y calidad.
```

### 2. Filtrado por extensión

Especifica tipos de archivos particulares cuando sea relevante:

```
@Folders(src/**/*.scss)

Identifica inconsistencias en nuestros estilos y sugiere cómo podemos consolidar variables y mixins comunes.
```

### 3. Control de profundidad

Limita la profundidad de búsqueda para carpetas grandes:

```
@Folders(src/*/)

Dame un resumen de la estructura de nuestro proyecto, analizando solo las carpetas de primer nivel.
```

### 4. Combinación con buscar y reemplazar

Usa los símbolos @ para identificar patrones antes de hacer cambios masivos:

```
@Folders(src/components)

Identifica todos los lugares donde usamos el componente Button directamente y sugiere cómo podríamos migrar a nuestro nuevo ButtonV2.
```

### 5. Generar documentación mejorada

Utiliza la capacidad de Cursor para combinar fuentes y generar documentación:

```
@Folders(src/api)
@Docs(./docs/api-guidelines.md)

Genera documentación actualizada para nuestros endpoints siguiendo las guías de nuestro proyecto.
```

## 8.7. Casos de Uso Específicos

### Para Desarrollo Frontend

1. **Análisis de accesibilidad**:
   ```
   @Web(WCAG 2.1 AA requirements)
   @Folders(src/components/ui)
   
   Revisa nuestros componentes UI para identificar problemas de accesibilidad y sugiere correcciones.
   ```

2. **Optimización de rendimiento**:
   ```
   @Docs(https://reactjs.org/docs/optimizing-performance.html)
   @Folders(src/pages/feed)
   
   Nuestra página de feed tiene problemas de rendimiento. Identifica los componentes que causan re-renders innecesarios.
   ```

### Para Desarrollo Backend

1. **Mejora de seguridad**:
   ```
   @Web(node.js express security best practices 2023)
   @Folders(src/api/routes)
   
   Audita nuestras rutas de API para identificar posibles vulnerabilidades de seguridad.
   ```

2. **Optimización de bases de datos**:
   ```
   @Docs(https://docs.mongodb.com/manual/indexes/)
   @Folders(src/models)
   
   Revisa nuestros modelos de MongoDB y sugiere índices para mejorar el rendimiento de las consultas.
   ```

### Para DevOps y CI/CD

1. **Mejora de pipeline**:
   ```
   @Docs(https://docs.github.com/en/actions/reference)
   @Folders(.github/workflows)
   
   Optimiza nuestros workflows de GitHub Actions para reducir el tiempo de ejecución.
   ```

2. **Configuración de Docker**:
   ```
   @Web(docker multi-stage build for node.js applications)
   @Folders(./docker)
   
   Sugiere mejoras para nuestros Dockerfiles para reducir el tamaño de las imágenes y mejorar la seguridad.
   ```

## 8.8. Ejercicios Prácticos

Para familiarizarte con el uso de símbolos @ en Cursor, prueba estos ejercicios prácticos:

1. **Análisis de código con documentación**:
   - Selecciona una biblioteca que uses en tu proyecto (como React, Vue, Express, etc.)
   - Usa `@Docs` para incluir su documentación oficial
   - Pide a Cursor que analice una parte específica de tu código y sugiera mejoras basadas en las mejores prácticas de la documentación

2. **Refactorización con patrones de carpeta**:
   - Identifica una carpeta en tu proyecto que contenga código relacionado
   - Usa `@Folders` para incluirla en el contexto
   - Pide a Cursor que identifique patrones repetitivos y sugiera una refactorización

3. **Modernización con investigación web**:
   - Elige un aspecto de tu proyecto que podría beneficiarse de técnicas modernas
   - Usa `@Web` para buscar las mejores prácticas actuales
   - Combínalo con `@Folders` para que Cursor pueda sugerir actualizaciones específicas

4. **Creación de documentación inteligente**:
   - Usa `@Folders` para incluir un módulo específico
   - Pide a Cursor que genere documentación detallada, incluyendo ejemplos de uso
   - Refina la documentación con preguntas adicionales