# Patrones de Desarrollo y Convenciones

## Resumen
Guía completa de patrones de desarrollo, convenciones de código y mejores prácticas para TaskManager Pro. Define estándares para el stack React + FastAPI + MariaDB, incluyendo AI-Hints obligatorios, naming conventions y estructura organizacional optimizada para mantenibilidad y colaboración.

## Filosofía de Desarrollo
TaskManager Pro sigue estos principios fundamentales:
1. **Separación clara de responsabilidades** - Cada capa tiene funciones específicas
2. **Tipado estático obligatorio** - TypeScript en frontend, Python type hints en backend
3. **AI-Hints estratégicos** - Documentación para contexto futuro de IA
4. **Documentación automática** - Herramientas que generen docs sin esfuerzo manual
5. **Testing como ciudadano de primera clase** - Tests escritos junto con código

## Convenciones de Nomenclatura

### Frontend (TypeScript/React)
- **Componentes React**: `PascalCase.tsx` (ej: `TaskCard.tsx`, `UserProfile.tsx`)
- **Hooks personalizados**: `camelCase.ts` con prefijo 'use' (ej: `useTasks.ts`, `useAuth.ts`)
- **Servicios y utilidades**: `camelCase.ts` (ej: `apiClient.ts`, `dateHelpers.ts`)
- **Tipos e interfaces**: `PascalCase` con sufijo Type/Interface

### Backend (Python/FastAPI)
- **Archivos Python**: `snake_case.py` (ej: `task_service.py`, `user_model.py`)
- **Clases**: `PascalCase` (ej: `TaskService`, `UserModel`)
- **Funciones y variables**: `snake_case`
- **Constantes**: `UPPER_SNAKE_CASE`

## AI-Hints Obligatorios

### 📝 Formato Estándar

#### Para Backend (Python)
```python
# AI-Hint: [Propósito específico] | [Relaciones con otros servicios] | [Restricciones de FastAPI/SQLAlchemy] | [TODOs específicos]
```

#### Para Frontend (TypeScript)
```typescript
// AI-Hint: [Propósito específico] | [Integraciones con API/hooks] | [Restricciones de React/TypeScript] | [TODOs específicos]
```

### 🎯 Uso Obligatorio de AI-Hints

**SIEMPRE incluir AI-Hints en**:
- Servicios de negocio (`TaskService`, `UserService`, `AuthService`)
- Componentes React principales (`TaskCard`, `TaskForm`, `Dashboard`)
- Custom hooks (`useTasks`, `useAuth`, `useLocalStorage`)
- Endpoints API críticos (CRUD operations)
- Modelos de datos SQLAlchemy
- Configuraciones de Docker y build

## Patrones de Código Principales

### 🔧 Patrón FastAPI Service (Backend)
**Uso**: Para toda lógica de negocio del backend
```python
# AI-Hint: Servicio de gestión de tareas con CRUD completo | Depende de TaskRepository y UserService | Valida permisos de usuario | TODO: Añadir soft delete
class TaskService:
    def __init__(self, db: Session):
        self.db = db
    
    async def create_task(self, task_data: TaskCreate, user_id: int) -> TaskResponse:
        # Implementación con validaciones de negocio
        pass
```

### ⚛️ Patrón React Component (Frontend)
**Uso**: Para componentes React reutilizables
```typescript
// AI-Hint: Componente de tarjeta de tarea reutilizable | Integra con TaskAPI y useAuth hook | Soporte para acciones inline | TODO: Añadir drag-and-drop
interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  className?: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, className = '' }) => {
  // Implementación del componente
};
```

### 🪝 Patrón Custom Hook (Frontend)
**Uso**: Para lógica reutilizable de estado y efectos
```typescript
// AI-Hint: Hook personalizado para gestión de tareas | Integra con React Query | Cache automático | TODO: Añadir optimistic updates
export const useTasks = (filters?: TaskFilters) => {
  // Implementación con React Query
  return { tasks, isLoading, createTask, updateTask, deleteTask };
};
```

## Mejores Prácticas por Tecnología

### React/TypeScript
1. **Componentes funcionales** siempre con TypeScript
2. **Props interfaces** explícitas para todos los componentes
3. **Custom hooks** para lógica reutilizable
4. **Error boundaries** para manejo de errores

### FastAPI/Python
1. **Type hints** obligatorios en funciones públicas
2. **Pydantic schemas** para toda validación de datos
3. **Dependency injection** para servicios y database
4. **Exception handling** consistente con HTTP status codes

### Docker/DevOps
1. **Multi-stage builds** para optimización de imágenes
2. **Health checks** en todos los servicios
3. **Environment variables** para configuración sensible

---

**Creado**: 2024-12-19  
**Estado**: ✅ Completado  
**Fuente**: Memoria de contexto patterns.md

<!-- AI-Hint: Documentación de patrones TaskManager Pro | Guía para desarrollo consistente | AI-Hints obligatorios y convenciones | TODO: Completar con ejemplos detallados de código --> 