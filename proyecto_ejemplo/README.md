# TaskFlow - Gestión de Tareas con IA

TaskFlow es una aplicación web moderna de gestión de tareas que integra capacidades de IA para mejorar la productividad. Diseñada para usuarios individuales y equipos, ofrece una experiencia intuitiva con funciones inteligentes de priorización, categorización y sugerencias.

## Descripción del Proyecto

TaskFlow es una aplicación completa de gestión de tareas con las siguientes características:

### Funcionalidades Principales
- ✅ **Gestión de Tareas**: CRUD completo con estados, prioridades y fechas límite
- 📊 **Gestión de Proyectos**: Organización por proyectos con miembros y permisos
- 🤖 **IA Integrada**: Análisis automático, priorización y sugerencias inteligentes
- 🎨 **Interfaz Moderna**: UI responsive con tema claro/oscuro
- 🔒 **Autenticación Segura**: Sistema completo con JWT y refresh tokens
- 🔍 **Búsqueda y Filtros**: Sistema avanzado de filtrado y búsqueda
- 📱 **Responsive Design**: Optimizado para desktop, tablet y móvil
- 🚀 **Performance**: Optimizaciones de carga y caching inteligente

### Capacidades de IA
- **Priorización Automática**: Análisis de urgencia e importancia
- **Categorización Inteligente**: Clasificación automática de tareas
- **Planificación Semanal**: Distribución óptima de carga de trabajo
- **Detección de Conflictos**: Identificación de sobrecargas y dependencias
- **Sugerencias Contextuales**: Recomendaciones basadas en patrones de uso

Este proyecto demuestra las mejores prácticas de desarrollo con arquitectura limpia, principios SOLID y desarrollo dirigido por IA.

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

El proyecto sigue una arquitectura limpia con separación clara de responsabilidades:

```
taskflow/
├── .cursor.json              # Configuración de Cursor IDE
├── .mcp/                     # Configuración de MCP Servers
├── docs/                     # Documentación completa
│   ├── plan/                 # Planes de diseño e implementación
│   ├── api/                  # Documentación de API
│   ├── architecture/         # Diagramas y arquitectura
│   ├── guides/               # Guías de desarrollo
│   └── info/                 # Información del proyecto
├── frontend/                 # Aplicación React SPA
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   │   ├── common/       # Componentes reutilizables
│   │   │   ├── layout/       # Componentes de layout
│   │   │   ├── tasks/        # Componentes de tareas
│   │   │   ├── projects/     # Componentes de proyectos
│   │   │   ├── auth/         # Componentes de autenticación
│   │   │   └── ai/           # Componentes de IA
│   │   ├── hooks/            # Hooks personalizados
│   │   ├── pages/            # Páginas principales
│   │   ├── services/         # Servicios de API
│   │   ├── store/            # Estado global (Redux)
│   │   ├── types/            # Tipos TypeScript
│   │   └── utils/            # Utilidades
│   ├── public/               # Archivos estáticos
│   └── tests/                # Pruebas frontend
├── backend/                  # API RESTful
│   ├── src/
│   │   ├── api/              # Capa de API
│   │   │   ├── routes/       # Definición de rutas
│   │   │   ├── controllers/  # Controladores
│   │   │   ├── middleware/   # Middleware personalizado
│   │   │   └── validators/   # Validaciones Zod
│   │   ├── config/           # Configuración de la app
│   │   ├── db/               # Base de datos
│   │   │   └── models/       # Modelos Mongoose
│   │   ├── services/         # Lógica de negocio
│   │   ├── ai/               # Servicios de IA
│   │   ├── types/            # Tipos TypeScript
│   │   └── utils/            # Utilidades
│   └── tests/                # Pruebas backend
├── scripts/                  # Scripts de prueba y utilidades
├── docker-compose.yml        # Configuración Docker
├── .gitignore               # Exclusiones de Git
└── README.md                # Este archivo
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

## Inicio Rápido

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- MongoDB (local o MongoDB Atlas)
- Git

### Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd taskflow
   ```

2. **Configurar Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configurar variables de entorno
   npm run dev           # Servidor en http://localhost:3001
   ```

3. **Configurar Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev           # Cliente en http://localhost:5173
   ```

4. **Con Docker (Opcional)**
   ```bash
   docker-compose up -d  # Levanta toda la aplicación
   ```

### Scripts Disponibles

- `npm run dev` - Modo desarrollo
- `npm run build` - Construir para producción
- `npm run test` - Ejecutar pruebas
- `npm run lint` - Verificar código
- `npm run format` - Formatear código

### Configuración de Variables de Entorno

**Backend (.env)**
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:3001/api
```

## Contribuciones

Este proyecto es de código abierto y se anima a los estudiantes a contribuir con mejoras, características adicionales o correcciones de errores.

## Licencia

MIT

---

Este proyecto forma parte del curso "Desarrollo Eficiente con Cursor IDE" y está diseñado con fines educativos.