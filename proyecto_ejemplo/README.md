# TaskFlow - Gestión de Tareas con IA

Este es un proyecto de ejemplo para el curso "Desarrollo Eficiente con Cursor IDE". TaskFlow es una aplicación web de gestión de tareas que incluye capacidades de IA para priorización, categorización y sugerencias.

## Descripción del Proyecto

TaskFlow es una aplicación moderna de gestión de tareas con las siguientes características:

- Interfaz de usuario intuitiva y responsive
- Backend API RESTful
- Capacidades de IA para análisis y optimización de tareas
- Sincronización en tiempo real
- Organización por proyectos, etiquetas y prioridades
- Notificaciones y recordatorios

Este proyecto está diseñado específicamente para demostrar las mejores prácticas de desarrollo con Cursor IDE, incluyendo el uso de AI-Hints, Cursor Rules y configuración MCP.

## Objetivos del Proyecto Ejemplo

1. Implementar una aplicación completa pero manejable en tamaño
2. Mostrar la aplicación de todos los conceptos del curso en un entorno realista
3. Proporcionar una estructura que los estudiantes puedan extender
4. Demostrar un flujo de trabajo eficiente con IA

## Tecnologías Utilizadas

- **Frontend**: React con TypeScript, Tailwind CSS
- **Backend**: Node.js con Express, TypeScript
- **Base de datos**: MongoDB con Mongoose
- **Autenticación**: JWT
- **Testing**: Jest, Supertest
- **Despliegue**: Docker, opcional CI/CD con GitHub Actions

## Estructura del Proyecto

El proyecto sigue una arquitectura de microservicios ligera con las siguientes partes:

```
taskflow/
├── .cursor.json           # Configuración de Cursor IDE
├── .mcp/                  # Configuración de MCP Servers
├── docs/                  # Documentación completa
├── frontend/              # Aplicación React
├── backend/               # API y servicios
│   ├── src/
│   │   ├── api/           # Controladores y rutas
│   │   ├── models/        # Modelos de datos
│   │   ├── services/      # Lógica de negocio
│   │   ├── utils/         # Utilidades
│   │   └── ai/            # Servicios de IA
│   ├── tests/             # Pruebas
│   └── package.json
├── docker-compose.yml     # Configuración Docker
└── README.md              # Este archivo
```

## Fases de Desarrollo

El desarrollo del proyecto se dividirá en las siguientes fases:

1. **Planificación y Diseño**
   - Creación de DESIGN_PLAN.md
   - Creación de IMPLEMENTATION_PLAN.md
   - Generación de TODO.md

2. **Configuración Inicial**
   - Configuración del entorno
   - Estructura base del proyecto
   - Configuración de AI-Hints, Cursor Rules y MCP

3. **Desarrollo Backend**
   - Modelos de datos
   - API RESTful
   - Servicios de IA

4. **Desarrollo Frontend**
   - Componentes UI
   - Integración con API
   - Flujos de usuario

5. **Testing e Integración**
   - Pruebas unitarias
   - Pruebas de integración
   - Optimización

## Cómo Usar Este Proyecto

1. Clona el repositorio
2. Sigue el desarrollo paso a paso según la guía del curso
3. Utiliza los prompts optimizados para cada fase
4. Experimenta con extensiones y mejoras

## Contribuciones

Este proyecto es de código abierto y se anima a los estudiantes a contribuir con mejoras, características adicionales o correcciones de errores.

## Licencia

MIT

---

Este proyecto forma parte del curso "Desarrollo Eficiente con Cursor IDE" y está diseñado con fines educativos.