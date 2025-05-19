# 3. Cursor Rules: Optimizando la Interacción

## 3.1. Introducción a Cursor Rules

Las Cursor Rules permiten proporcionar instrucciones a nivel de sistema al Agente y al comando Cmd-K. Funcionan como una forma persistente de codificar contexto, preferencias o flujos de trabajo para tus proyectos o para ti mismo.

### Tipos de reglas

Cursor admite tres tipos de reglas:

1. **Project Rules**: Almacenadas en `.cursor/rules`, con control de versiones y ámbito limitado a tu código base.

2. **User Rules**: Globales para tu entorno Cursor. Se definen en la configuración y siempre se aplican.

3. **.cursorrules** (Legacy): Todavía compatible, pero en desuso. Se recomienda usar Project Rules en su lugar.

### Cómo funcionan las reglas

Los modelos de lenguaje grandes no retienen memoria entre completaciones. Las reglas resuelven esto proporcionando un contexto persistente y reutilizable a nivel de prompt.

Cuando se aplica una regla, su contenido se incluye al comienzo del contexto del modelo. Esto proporciona una guía consistente al AI, ya sea generando código, interpretando ediciones o ayudando con un flujo de trabajo.

Las reglas se aplican tanto al Chat como al Cmd-K.

## 3.2. Project Rules

Las Project Rules viven en `.cursor/rules`. Cada regla se almacena como un archivo y tiene control de versiones. Pueden tener ámbito utilizando patrones de ruta, invocarse manualmente o incluirse según su relevancia.

Usa las Project Rules para:
* Codificar conocimiento específico del dominio sobre tu código base
* Automatizar flujos de trabajo o plantillas específicas del proyecto
* Estandarizar decisiones de estilo o arquitectura

### Estructura de reglas

Cada archivo de regla está escrito en **MDC** (`.mdc`), un formato ligero que admite metadatos y contenido en un solo archivo. Las reglas admiten los siguientes tipos:

| Tipo de Regla    | Descripción |
|------------------|-------------|
| Always           | Siempre incluida en el contexto del modelo |
| Auto Attached    | Incluida cuando se hace referencia a archivos que coinciden con un patrón glob |
| Agent Requested  | La regla está disponible para la IA, que decide si incluirla. Debe proporcionar una descripción |
| Manual           | Solo se incluye cuando se menciona explícitamente usando @nombreRegla |

#### Ejemplo de regla MDC

```
---
description: Plantilla de Servicio RPC
globs: 
alwaysApply: false
---

- Utiliza nuestro patrón RPC interno al definir servicios
- Siempre usa snake_case para nombres de servicios.

@service-template.ts
```

Los archivos referenciados como `@service-template.ts` se incluirán como contexto adicional cuando se active la regla.

Puedes usar `Cmd + Shift + P` > "New Cursor Rule" para crear una regla rápidamente desde Cursor.

### Reglas anidadas

Puedes organizar reglas colocándolas en directorios `.cursor/rules` a lo largo de la estructura de tu proyecto. Por ejemplo:

```
proyecto/
  .cursor/rules/        # Reglas para todo el proyecto
  backend/
    server/
      .cursor/rules/    # Reglas específicas del backend
  frontend/
    .cursor/rules/      # Reglas específicas del frontend
```

Las reglas anidadas:
* Se adjuntan automáticamente cuando se hace referencia a archivos en su directorio
* Siguen disponibles en el selector de contexto y en la lista de reglas accesibles para el agente
* Son perfectas para organizar reglas específicas de dominio más cerca de su código relevante

Esto es particularmente útil en monorepos o proyectos con componentes distintos que necesitan su propia guía específica.

### Creación de una regla

Puedes crear una regla usando el comando `New Cursor Rule` o yendo a `Cursor Settings > Rules`. Esto creará un nuevo archivo de regla en el directorio `.cursor/rules`. Desde la configuración también puedes ver una lista de todas las reglas y su estado.

### Generación de reglas

Puedes generar reglas directamente en una conversación usando el comando `/Generate Cursor Rules`.

Esto es muy útil cuando has tenido una conversación donde se tomaron muchas decisiones sobre cómo debería comportarse el agente. Simplemente genera la regla y reutilízala en el futuro.

## 3.3. Mejores prácticas

Las buenas reglas son enfocadas, accionables y con ámbito definido.

* Mantén las reglas concisas. Menos de 500 líneas es un buen objetivo
* Divide conceptos grandes en múltiples reglas componibles
* Proporciona ejemplos concretos o archivos referenciados cuando sea útil
* Evita orientaciones vagas. Escribe reglas como escribirías un documento interno claro
* Reutiliza reglas cuando te encuentres repitiendo prompts en el chat

## 3.4. Ejemplos prácticos

### Guía específica de dominio

Estándares para componentes frontend y validación de API:

**Para componentes frontend:**

```
Cuando trabajes en el directorio de componentes:
* Siempre usa Tailwind para el estilo
* Usa Framer Motion para animaciones
* Sigue nuestras convenciones de nomenclatura de componentes
```

**Para validación de API:**

```
En el directorio de API:
* Usa zod para toda validación
* Define tipos de retorno con esquemas zod
* Exporta tipos generados a partir de esquemas
```

### Plantillas y boilerplate

Plantillas para servicios Express y componentes React:

**Para servicios Express:**

```
Usa esta plantilla al crear un nuevo servicio Express:
* Sigue principios RESTful
* Incluye middleware de manejo de errores
* Configura registro adecuado

@express-service-template.ts
```

**Para componentes React:**

```
Los componentes React deben seguir este diseño:
* Interfaz Props en la parte superior
* Componente como exportación con nombre
* Estilos en la parte inferior

@component-template.tsx
```

### Automatización de flujos de trabajo

Automatizando flujos de trabajo de desarrollo y generación de documentación:

**Para análisis de aplicaciones:**

```
Cuando pida analizar la aplicación:
1. Ejecuta el servidor de desarrollo con `npm run dev`
2. Obtén registros de la consola
3. Sugiere mejoras de rendimiento
```

**Para generación de documentación:**

```
Ayúdame a redactar documentación:
* Extrayendo comentarios de código
* Analizando README.md
* Generando documentación markdown
```

### Ejemplos del código base de Cursor

Estos son ejemplos que usan internamente en Cursor:

**Usando Tailwind en Cursor:**

```
¡Tailwind está soportado en este fork de VS Code!

Ejemplos de uso:
* `text-error-foreground`
* `bg-input-border`
```

**Añadiendo una nueva configuración en Cursor:**

```
Primero crea una propiedad para alternar en `@reactiveStorageTypes.ts`.

Añade un valor predeterminado en `INIT_APPLICATION_USER_PERSISTENT_STORAGE` en `@reactiveStorageService.tsx`.

Si es una característica beta, añade un interruptor en `@settingsBetaTab.tsx`, de lo contrario añádelo en `@settingsGeneralTab.tsx`. Los interruptores se pueden añadir como `<SettingsSubSection>` para casillas de verificación generales. Mira el resto del archivo para ejemplos de otros tipos.

<SettingsSubSection
    label="Nombre de tu característica"
    description="Descripción de tu característica"
    value={
        vsContext.reactiveStorageService.applicationUserPersistentStorage
            .myNewProperty ?? false
    }
    onChange={(newVal) => {
        vsContext.reactiveStorageService.setApplicationUserPersistentStorage(
            'myNewProperty',
            newVal
        );
    }}
/>

Para usarlo en la aplicación, importa el reactiveStorageService y usa la propiedad

const flagIsEnabled = vsContext.reactiveStorageService.applicationUserPersistentStorage.myNewProperty
```

## 3.5. User Rules

Las User Rules se definen en **Cursor Settings > Rules**.

Se aplican a todos los proyectos y siempre se incluyen en tu contexto de modelo.

Úsalas para:
* Establecer idioma o tono de respuesta
* Añadir preferencias de estilo personal

**Ejemplo:**

```
Por favor, responde en un estilo conciso. Evita repeticiones innecesarias o lenguaje de relleno.
```

Las User Rules no admiten MDC, son solo texto sin formato.

## 3.6. Team Rules

Actualmente no hay una forma integrada de compartir reglas entre proyectos.

Cursor planea admitir reglas compartidas con formato MDC que se puedan referenciar en proyectos de equipo. Hasta entonces, puedes:
* Almacenar reglas compartidas en un repositorio dedicado
* Copiarlas o crear enlaces simbólicos en el directorio `.cursor/rules` de cada proyecto

## 3.7. `.cursorrules` (Legacy)

El archivo `.cursorrules` en la raíz de tu proyecto todavía es compatible, pero será obsoleto. Recomendamos migrar al formato Project Rules para mayor control, flexibilidad y visibilidad.

## 3.8. Preguntas frecuentes

**¿Por qué no se aplica mi regla?**  
Comprueba el tipo de regla. Para `Agent Requested`, asegúrate de que se haya definido una descripción. Para `Auto Attached`, asegúrate de que el patrón de archivo coincida con los archivos referenciados.

**¿Pueden las reglas hacer referencia a otras reglas o archivos?**  
Sí. Puedes usar `@filename.ts` para incluir archivos en el contexto de tu regla.

**¿Puedo crear una regla desde el chat?**  
Sí. Pídele a la IA que "convierta esto en una regla" o "cree una regla reutilizable a partir de este prompt".

**¿Las reglas afectan a Cursor Tab u otras funciones de IA?**  
No. Las reglas solo se proporcionan a los modelos de Agent y Cmd-K AI.