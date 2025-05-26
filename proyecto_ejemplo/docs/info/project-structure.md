# Estructura del Proyecto TaskFlow

<!-- AI-Hint: Documentación completa de la estructura de directorios y archivos del proyecto TaskFlow
     Incluye propósito de cada carpeta, convenciones de naming y organización del código -->

## Visión General

TaskFlow sigue una arquitectura limpia con separación clara de responsabilidades entre frontend, backend y documentación. La estructura está diseñada para escalabilidad, mantenibilidad y desarrollo eficiente con IA.

## Estructura Completa de Directorios

```
taskflow/
├── .cursor.json                    # Configuración de Cursor IDE
├── .mcp/                           # Configuración de MCP Servers
│   ├── config.json                 # Configuración principal MCP
│   ├── resources/                  # Esquemas de recursos
│   └── README.md                   # Instrucciones MCP
├── docs/                           # Documentación completa
│   ├── plan/                       # Planes de diseño e implementación
│   │   ├── DESIGN_PLAN.md          # Plan de diseño de interfaz
│   │   └── IMPLEMENTATION_PLAN.md  # Plan técnico de implementación
│   ├── api/                        # Documentación de API
│   ├── architecture/               # Diagramas y arquitectura
│   ├── guides/                     # Guías de desarrollo
│   ├── info/                       # Información del proyecto
│   └── index.md                    # Índice de documentación
├── frontend/                       # Aplicación React SPA
│   ├── src/
│   │   ├── components/             # Componentes React
│   │   │   ├── common/             # Componentes reutilizables
│   │   │   │   ├── Button.tsx      # Botón base
│   │   │   │   ├── Input.tsx       # Input base
│   │   │   │   ├── Modal.tsx       # Modal reutilizable
│   │   │   │   └── index.ts        # Exportaciones
│   │   │   ├── layout/             # Componentes de layout
│   │   │   │   ├── Header.tsx      # Barra superior
│   │   │   │   ├── Sidebar.tsx     # Barra lateral
│   │   │   │   ├── Footer.tsx      # Pie de página
│   │   │   │   └── Layout.tsx      # Layout principal
│   │   │   ├── tasks/              # Componentes de tareas
│   │   │   │   ├── TaskCard.tsx    # Tarjeta de tarea
│   │   │   │   ├── TaskList.tsx    # Lista de tareas
│   │   │   │   ├── TaskForm.tsx    # Formulario de tarea
│   │   │   │   └── TaskFilters.tsx # Filtros de tareas
│   │   │   ├── projects/           # Componentes de proyectos
│   │   │   ├── auth/               # Componentes de autenticación
│   │   │   └── ai/                 # Componentes de IA
│   │   ├── hooks/                  # Hooks personalizados
│   │   │   ├── useAuth.ts          # Hook de autenticación
│   │   │   ├── useTasks.ts         # Hook de tareas
│   │   │   └── useApi.ts           # Hook de API
│   │   ├── pages/                  # Páginas principales
│   │   │   ├── Dashboard.tsx       # Dashboard principal
│   │   │   ├── Login.tsx           # Página de login
│   │   │   ├── TasksPage.tsx       # Página de tareas
│   │   │   └── ProjectsPage.tsx    # Página de proyectos
│   │   ├── services/               # Servicios de API
│   │   │   ├── api.ts              # Cliente API base
│   │   │   ├── auth.ts             # Servicios de auth
│   │   │   ├── tasks.ts            # Servicios de tareas
│   │   │   └── projects.ts         # Servicios de proyectos
│   │   ├── store/                  # Estado global (Redux)
│   │   │   ├── index.ts            # Configuración store
│   │   │   ├── authSlice.ts        # Slice de autenticación
│   │   │   ├── tasksSlice.ts       # Slice de tareas
│   │   │   └── projectsSlice.ts    # Slice de proyectos
│   │   ├── types/                  # Tipos TypeScript
│   │   │   ├── auth.ts             # Tipos de autenticación
│   │   │   ├── tasks.ts            # Tipos de tareas
│   │   │   ├── projects.ts         # Tipos de proyectos
│   │   │   └── api.ts              # Tipos de API
│   │   ├── utils/                  # Utilidades
│   │   │   ├── constants.ts        # Constantes globales
│   │   │   ├── helpers.ts          # Funciones auxiliares
│   │   │   └── validators.ts       # Validaciones frontend
│   │   ├── App.tsx                 # Componente principal
│   │   └── main.tsx                # Punto de entrada
│   ├── public/                     # Archivos estáticos
│   │   ├── index.html              # HTML base
│   │   ├── favicon.ico             # Favicon
│   │   └── assets/                 # Imágenes y recursos
│   ├── tests/                      # Pruebas frontend
│   ├── .eslintrc.js                # Configuración ESLint
│   ├── package.json                # Dependencias frontend
│   ├── tsconfig.json               # Configuración TypeScript
│   ├── tailwind.config.js          # Configuración Tailwind
│   └── vite.config.ts              # Configuración Vite
├── backend/                        # API RESTful
│   ├── src/
│   │   ├── api/                    # Capa de API
│   │   │   ├── routes/             # Definición de rutas
│   │   │   │   ├── auth.ts         # Rutas de autenticación
│   │   │   │   ├── tasks.ts        # Rutas de tareas
│   │   │   │   ├── projects.ts     # Rutas de proyectos
│   │   │   │   └── ai.ts           # Rutas de IA
│   │   │   ├── controllers/        # Controladores
│   │   │   │   ├── authController.ts     # Controlador auth
│   │   │   │   ├── tasksController.ts    # Controlador tareas
│   │   │   │   ├── projectsController.ts # Controlador proyectos
│   │   │   │   └── aiController.ts       # Controlador IA
│   │   │   ├── middleware/         # Middleware personalizado
│   │   │   │   ├── auth.ts         # Middleware autenticación
│   │   │   │   ├── validation.ts   # Middleware validación
│   │   │   │   └── errorHandler.ts # Manejo de errores
│   │   │   └── validators/         # Validaciones Zod
│   │   │       ├── authSchemas.ts  # Esquemas auth
│   │   │       ├── taskSchemas.ts  # Esquemas tareas
│   │   │       └── projectSchemas.ts # Esquemas proyectos
│   │   ├── config/                 # Configuración de la app
│   │   │   ├── database.ts         # Configuración MongoDB
│   │   │   ├── environment.ts      # Variables de entorno
│   │   │   └── jwt.ts              # Configuración JWT
│   │   ├── db/                     # Base de datos
│   │   │   ├── models/             # Modelos Mongoose
│   │   │   │   ├── User.ts         # Modelo Usuario
│   │   │   │   ├── Task.ts         # Modelo Tarea
│   │   │   │   └── Project.ts      # Modelo Proyecto
│   │   │   └── index.ts            # Configuración conexión
│   │   ├── services/               # Lógica de negocio
│   │   │   ├── authService.ts      # Servicio autenticación
│   │   │   ├── taskService.ts      # Servicio tareas
│   │   │   ├── projectService.ts   # Servicio proyectos
│   │   │   └── userService.ts      # Servicio usuarios
│   │   ├── ai/                     # Servicios de IA
│   │   │   ├── analysisService.ts  # Análisis de tareas
│   │   │   ├── priorityService.ts  # Priorización
│   │   │   ├── suggestionService.ts # Sugerencias
│   │   │   └── mcpClient.ts        # Cliente MCP
│   │   ├── types/                  # Tipos TypeScript
│   │   │   ├── auth.ts             # Tipos auth
│   │   │   ├── models.ts           # Tipos de modelos
│   │   │   └── api.ts              # Tipos API
│   │   ├── utils/                  # Utilidades
│   │   │   ├── logger.ts           # Logger
│   │   │   ├── helpers.ts          # Funciones auxiliares
│   │   │   └── constants.ts        # Constantes
│   │   └── server.ts               # Punto de entrada
│   ├── tests/                      # Pruebas backend
│   │   ├── unit/                   # Pruebas unitarias
│   │   ├── integration/            # Pruebas integración
│   │   └── fixtures/               # Datos de prueba
│   ├── .eslintrc.js                # Configuración ESLint
│   ├── package.json                # Dependencias backend
│   └── tsconfig.json               # Configuración TypeScript
├── scripts/                        # Scripts de prueba y utilidades
│   ├── 1.1_structure_test.sh       # Script de prueba estructura
│   └── setup/                      # Scripts de configuración
├── docker-compose.yml              # Configuración Docker
├── .gitignore                      # Exclusiones de Git
├── .env.example                    # Ejemplo variables entorno
├── README.md                       # Documentación principal
└── TODO.md                         # Lista de tareas
```

## Convenciones de Naming

### Archivos y Carpetas
- **Componentes React**: PascalCase (`TaskCard.tsx`, `UserProfile.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useAuth.ts`, `useTasks.ts`)
- **Servicios**: camelCase con sufijo `Service` (`taskService.ts`)
- **Tipos**: camelCase (`auth.ts`, `models.ts`)
- **Utilidades**: camelCase (`helpers.ts`, `validators.ts`)
- **Carpetas**: kebab-case (`common/`, `task-filters/`)

### Código
- **Variables y funciones**: camelCase
- **Constantes**: UPPER_SNAKE_CASE
- **Interfaces y tipos**: PascalCase
- **Enums**: PascalCase

## Principios de Organización

### Separación por Características
Cada módulo principal (tasks, projects, auth) tiene su propia estructura completa:
- Componentes específicos
- Servicios dedicados
- Tipos relacionados
- Pruebas correspondientes

### Reutilización
Los componentes comunes se centralizan en `components/common/` para máxima reutilización.

### Escalabilidad
La estructura permite añadir nuevas características sin modificar código existente.

### AI-Friendly
Todos los archivos incluyen AI-Hints para facilitar el desarrollo asistido por IA.

---

Esta estructura será completada progresivamente siguiendo el TODO.md y se mantendrá actualizada conforme avance el desarrollo. 