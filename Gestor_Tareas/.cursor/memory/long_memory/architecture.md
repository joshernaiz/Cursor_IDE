# System Architecture

## Overview
TaskManager Pro implementa una arquitectura de 3 capas claramente separada que sigue los principios de Clean Architecture, maximizando la mantenibilidad y escalabilidad del sistema. La arquitectura está diseñada específicamente para demostrar mejores prácticas de desarrollo full-stack moderno, con separación clara de responsabilidades entre presentación (React), lógica de negocio (FastAPI), y persistencia de datos (MariaDB).

El patrón arquitectónico principal se basa en una API RESTful que sirve como única interfaz de comunicación entre el frontend y backend, garantizando desacoplamiento y facilitando futuras integraciones. La filosofía de diseño enfatiza la simplicidad, testabilidad y documentación automática, con cada capa responsable de funciones específicas bien definidas.

Las características clave incluyen autenticación basada en JWT, validación de datos tanto en frontend como backend, containerización completa para desarrollo y producción, y hot reload para desarrollo ágil.

## Components

### Frontend Layer (Presentación)
- **React Components** (`frontend/src/components/`): Componentes reutilizables incluyendo TaskCard, FilterPanel, AuthModule para experiencia de usuario consistente
- **Pages & Routing** (`frontend/src/pages/`): Páginas principales (Dashboard, Tasks, Projects, Auth) con React Router para navegación SPA
- **State Management** (`frontend/src/stores/`): Gestión de estado global con Context API y estado local optimizado para performance
- **API Integration** (`frontend/src/services/`): Servicios para comunicación con API REST usando Axios con interceptors para autenticación

### Backend Layer (Lógica de Negocio)
- **FastAPI Application** (`backend/app/main.py`): Aplicación principal con configuración de CORS, middleware y documentación automática
- **API Routes** (`backend/app/routers/`): Endpoints organizados por dominio (auth, tasks, users, projects) con validación automática
- **Services Layer** (`backend/app/services/`): TaskService, UserService, AuthService con lógica de negocio pura separada de la presentación
- **Data Validation** (`backend/app/schemas/`): Esquemas Pydantic para validación automática de entrada y salida de datos

### Data Layer (Persistencia)
- **SQLAlchemy Models** (`backend/app/models/`): Modelos User, Task, Project, Category, Comment con relaciones definidas y constraints
- **Database Connection** (`backend/app/config/database.py`): Configuración de conexión a MariaDB con pooling y manejo de transacciones
- **Migrations** (`backend/alembic/`): Control de versiones de esquema de base de datos con Alembic para evolución controlada

### External Systems
- **MariaDB Database**: Base de datos relacional principal con integridad referencial y optimizaciones para consultas frecuentes
- **Docker Registry**: Almacenamiento de imágenes containerizadas para despliegue consistente entre ambientes

## Data Flow

### Request Flow (Cliente a Servidor)
1. **Frontend Request** → Usuario interactúa con componente React, dispara acción que llama servicio API
2. **API Gateway** → FastAPI recibe request, valida JWT token si es requerido, aplica middleware de logging
3. **Route Handler** → Router específico procesa request, valida datos de entrada con esquemas Pydantic
4. **Service Layer** → Servicio correspondiente ejecuta lógica de negocio, interactúa con capa de datos si necesario
5. **Response** → Datos procesados se serializan según esquema Pydantic y se envían como JSON al frontend

### Data Processing Flow (Gestión de Tareas)
1. **Task Creation** → Usuario crea tarea en frontend, datos se validan localmente y se envían a API
2. **Business Logic** → TaskService procesa datos, aplica reglas de negocio, valida permisos de usuario
3. **Data Persistence** → Modelo SQLAlchemy guarda tarea en MariaDB con transacción atomica
4. **Response Update** → Frontend actualiza estado local y UI para reflejar cambios inmediatamente

### Authentication Flow (Seguridad)
1. **Login Request** → Usuario envía credenciales, AuthService valida contra base de datos
2. **Token Generation** → JWT token se genera con información de usuario y expiración de 24 horas
3. **Token Storage** → Frontend almacena token seguramente y lo incluye en headers de requests posteriores
4. **Token Validation** → Middleware de FastAPI valida token en cada request protegido automáticamente

## Technologies

### Backend Stack
- **Python 3.11+**: Lenguaje base con type hints para código más mantenible y detección temprana de errores
- **FastAPI 0.100+**: Framework web moderno con documentación automática OpenAPI, validación automática y performance superior
- **SQLAlchemy 2.0+**: ORM moderno con soporte async, relaciones complejas y migraciones automáticas con Alembic
- **Pydantic 2.0+**: Validación de datos con tipos Python nativos, serialización automática y generación de esquemas JSON
- **Uvicorn 0.22+**: Servidor ASGI de alto rendimiento con soporte async nativo y hot reload

### Database & Storage
- **MariaDB 10.11+**: Base de datos relacional optimizada para performance con soporte completo ACID y replicación
- **Redis (Futuro)**: Planeado para cache de sesiones y mejora de performance en versión 2.0

### Frontend Stack
- **React 18.2+**: Biblioteca UI con Concurrent Features, Server Components y optimizaciones de rendering automáticas
- **Vite 4.4+**: Build tool extremadamente rápido con hot reload instantáneo y optimización de bundles automática
- **TypeScript 5.0+**: Tipado estático para prevención de errores, mejor IDE support y refactoring seguro
- **Tailwind CSS 3.3+**: Framework CSS utility-first para diseño rápido, consistente y responsive
- **React Router 6.8+**: Routing declarativo con lazy loading y protección de rutas automática

### Infrastructure
- **Docker 24.0+**: Containerización con multi-stage builds para optimización de imágenes
- **Docker Compose 2.20+**: Orquestación de servicios con networking automático y gestión de volúmenes
- **GitHub Actions**: CI/CD automatizado con testing, linting y deployment (planeado para v1.1)

## Deployment Architecture

### Development Environment
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend       │    │   Database      │
│   React:3000    │◄──►│  FastAPI:8000    │◄──►│  MariaDB:3306   │
│   Vite HMR      │    │  Hot Reload      │    │  Volume Mount   │
│   Volume Mount  │    │  Volume Mount    │    │  Init Scripts   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
                      ┌─────────────────┐
                      │  Docker Network │
                      │  taskmanager    │
                      └─────────────────┘
```

### Production Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Nginx Proxy   │    │    App Server    │    │   Database      │
│   SSL/TLS       │◄──►│  Multi-instance  │◄──►│  Replicated     │
│   Load Balance  │    │  Health Checks   │    │  Backup Auto    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
                      ┌─────────────────┐
                      │  Docker Swarm   │
                      │  Orchestration  │
                      └─────────────────┘
```

## Security Architecture

### Authentication & Authorization
- JWT tokens con expiración configurable (24h por defecto) y refresh token implementation planeada
- Password hashing con bcrypt y salt automático para protección contra rainbow tables
- CORS configurado específicamente para dominios permitidos en producción
- Rate limiting implementado para prevenir ataques de fuerza bruta en endpoints críticos

### Data Protection
- Validación de entrada con Pydantic tanto en API como en frontend para prevenir inyección
- SQL injection prevention automático con SQLAlchemy ORM y prepared statements
- XSS protection con sanitización automática de datos y Content Security Policy headers
- Environment variables para configuración sensible sin hardcoding en código fuente

### Network Security
- HTTPS obligatorio en producción con certificados SSL/TLS automatizados
- Database access restringido a red interna Docker sin exposición pública
- API versioning para backward compatibility y deprecación controlada de endpoints

## Scalability Considerations

### Horizontal Scaling
- Aplicación stateless con JWT tokens permite múltiples instancias sin shared state
- Database connection pooling configurado para manejo eficiente de conexiones concurrentes
- Docker Swarm configuration preparada para escalado automático basado en carga
- API design RESTful permite caching en múltiples niveles (CDN, reverse proxy, application)

### Performance Optimizations
- React code splitting automático con lazy loading de componentes y rutas
- Database indexing en columnas críticas (user_id, status, created_at) para queries rápidas
- FastAPI async/await nativo para handling concurrente sin bloqueo de threads
- Frontend bundle optimization con Vite tree shaking y minification automática

### Monitoring and Operations

### Application Monitoring
- FastAPI middleware para logging automático de requests, responses y timing
- Health check endpoints (/health, /ready) para monitoreo de servicios en producción
- Error tracking con structured logging y correlation IDs para debugging distribuido

### Infrastructure Monitoring
- Docker health checks configurados para restart automático de servicios fallidos
- Volume monitoring para espacio de disco y backup automático de base de datos
- Resource utilization tracking (CPU, memoria, network) para optimización proactiva

Last Updated: 2024-12-19
