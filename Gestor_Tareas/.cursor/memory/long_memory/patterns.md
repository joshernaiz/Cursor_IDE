# Development Patterns and Conventions

## Overview
TaskManager Pro sigue patrones de desarrollo modernos que facilitan la mantenibilidad, testing y colaboración del código. La filosofía de desarrollo enfatiza separación clara de responsabilidades, tipado estático, AI-Hints obligatorios para contexto futuro, y documentación automática. Todos los patrones están optimizados para el stack React + FastAPI + MariaDB con containerización Docker.

## Code Organization

### Directory Structure
```
taskmanager-pro/
├── docker-compose.yml                 # Orquestación principal
├── docker-compose.dev.yml            # Override para desarrollo
├── .env.example                       # Variables de entorno ejemplo
├── README.md                          # Documentación principal
├── frontend/                          # Aplicación React
│   ├── Dockerfile                     # Imagen de frontend
│   ├── package.json                   # Dependencias Node
│   ├── vite.config.ts                # Configuración Vite
│   ├── tailwind.config.js            # Configuración Tailwind
│   ├── src/
│   │   ├── components/               # Componentes reutilizables
│   │   │   ├── common/              # Componentes comunes (Button, Modal, etc.)
│   │   │   ├── forms/               # Componentes de formularios
│   │   │   ├── layouts/             # Layouts de página
│   │   │   └── tasks/               # Componentes específicos de tareas
│   │   ├── pages/                   # Páginas/rutas principales
│   │   ├── hooks/                   # Custom hooks
│   │   ├── services/                # Servicios de API
│   │   ├── stores/                  # Estado global (Context/Zustand)
│   │   ├── types/                   # Definiciones TypeScript
│   │   ├── utils/                   # Utilidades y helpers
│   │   └── styles/                  # Estilos globales
│   └── public/                      # Archivos estáticos
├── backend/                         # API FastAPI
│   ├── Dockerfile                   # Imagen de backend
│   ├── requirements.txt             # Dependencias Python
│   ├── app/
│   │   ├── main.py                  # Punto de entrada
│   │   ├── config/                  # Configuración
│   │   ├── models/                  # Modelos SQLAlchemy
│   │   ├── schemas/                 # Esquemas Pydantic
│   │   ├── routers/                 # Endpoints API
│   │   ├── services/                # Lógica de negocio
│   │   ├── dependencies/            # Dependencias FastAPI
│   │   ├── utils/                   # Utilidades
│   │   └── tests/                   # Tests
│   └── alembic/                     # Migraciones de BD
└── database/                        # Configuración MariaDB
    ├── init-scripts/                # Scripts de inicialización
    └── data/                        # Volumen de datos (gitignored)
```

### File Naming Conventions
- **Componentes React**: PascalCase.tsx (ej: `TaskCard.tsx`, `UserProfile.tsx`)
- **Hooks personalizados**: camelCase.ts con prefijo 'use' (ej: `useTasks.ts`, `useAuth.ts`)
- **Servicios y utilidades TypeScript**: camelCase.ts (ej: `apiClient.ts`, `dateHelpers.ts`)
- **Archivos Python**: snake_case.py (ej: `task_service.py`, `user_model.py`)
- **Esquemas Pydantic**: PascalCase con sufijo 'Schema' (ej: `TaskSchema.py`, `UserCreateSchema.py`)

### Module Organization
- **Barrel exports**: Usar archivos `index.ts` para exportaciones centralizadas en cada directorio principal
- **Separación por dominio**: Agrupar archivos relacionados por funcionalidad (tasks, users, auth, etc.)
- **Layers pattern**: Mantener separación clara entre presentation, business logic, y data access

## Coding Patterns

### FastAPI Service Pattern (Backend)
**Uso**: Para toda lógica de negocio del backend, separada de endpoints
**Estructura**:
```python
# AI-Hint: Servicio de gestión de tareas con CRUD completo | Depende de TaskRepository y UserService | Valida permisos de usuario y reglas de negocio | TODO: Añadir soft delete y audit trail
from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.task_model import Task
from app.schemas.task_schemas import TaskCreate, TaskUpdate, TaskResponse
from app.services.user_service import UserService

class TaskService:
    def __init__(self, db: Session):
        self.db = db
        self.user_service = UserService(db)
    
    async def create_task(self, task_data: TaskCreate, user_id: int) -> TaskResponse:
        # AI-Hint: Creación de tarea con validación de usuario | Aplica reglas de negocio | Genera timestamps automáticamente | TODO: Validar límites por usuario
        user = await self.user_service.get_user(user_id)
        if not user:
            raise ValueError("Usuario no encontrado")
        
        task = Task(
            title=task_data.title,
            description=task_data.description,
            created_by=user_id,
            priority=task_data.priority or "medium"
        )
        
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        
        return TaskResponse.from_orm(task)
```

### React Component Pattern (Frontend)
**Uso**: Para todos los componentes React, especialmente los reutilizables
**Estructura**:
```typescript
// AI-Hint: Componente de tarjeta de tarea reutilizable | Integra con TaskAPI y useAuth hook | Soporte para drag-and-drop | TODO: Añadir edición inline
import React from 'react';
import { Task } from '../types/task.types';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: number) => void;
  className?: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  className = '' 
}) => {
  // AI-Hint: Custom hook para operaciones de tareas | Cache automático con React Query | Optimistic updates | TODO: Añadir offline support
  const { updateTask, deleteTask } = useTasks();
  const { user } = useAuth();
  
  const handleStatusChange = async (newStatus: Task['status']) => {
    await updateTask.mutate({
      id: task.id,
      status: newStatus
    });
  };
  
  const canEdit = user?.id === task.created_by || user?.is_admin;
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${getPriorityColor(task.priority)} ${className}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </div>
      
      {task.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
      )}
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Creada: {formatDate(task.created_at)}
        </span>
        
        {canEdit && (
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit?.(task)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Editar
            </button>
            <button 
              onClick={() => onDelete?.(task.id)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// AI-Hint: Utilidades de UI para TaskCard | Mapeo de estados a colores | Funciones puras | TODO: Mover a utils compartidas
const getPriorityColor = (priority: string): string => {
  const colors = {
    low: 'border-green-400',
    medium: 'border-yellow-400', 
    high: 'border-orange-400',
    critical: 'border-red-400'
  };
  return colors[priority as keyof typeof colors] || colors.medium;
};
```

### Custom Hook Pattern (Frontend)
**Uso**: Para lógica reutilizable de estado y efectos, especialmente integraciones con API
**Estructura**:
```typescript
// AI-Hint: Hook personalizado para gestión de tareas | Integra con React Query y TaskAPI | Maneja cache automático | TODO: Añadir optimistic updates
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '../services/taskApi';
import { Task, TaskCreate, TaskUpdate } from '../types/task.types';

export const useTasks = () => {
  const queryClient = useQueryClient();
  
  // AI-Hint: Query para obtener tareas con filtros | Cache automático 5min | Refetch en focus | TODO: Añadir paginación infinita
  const {
    data: tasks = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => taskApi.getTasks(),
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: true
  });
  
  // AI-Hint: Mutación para crear tarea | Optimistic update | Rollback en error | TODO: Añadir validación local
  const createTask = useMutation({
    mutationFn: (taskData: TaskCreate) => taskApi.createTask(taskData),
    onMutate: async (newTask) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      
      // Snapshot previous value
      const previousTasks = queryClient.getQueryData(['tasks']);
      
      // Optimistically update to new value
      queryClient.setQueryData(['tasks'], (old: Task[] = []) => [
        ...old,
        { ...newTask, id: Date.now(), created_at: new Date().toISOString() } as Task
      ]);
      
      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });
  
  return {
    tasks,
    isLoading,
    error,
    refetch,
    createTask,
    // ... más mutaciones
  };
};
```

### AI-Hints Pattern (OBLIGATORIO EN TODO CÓDIGO)
**Uso**: En toda función, clase, módulo o componente significativo
**Estructura**:
```python
# AI-Hint: [PROPÓSITO] | [RELACIONES] | [RESTRICCIONES] | [ROADMAP]
```

```typescript
// AI-Hint: [PROPÓSITO] | [RELACIONES] | [RESTRICCIONES] | [ROADMAP]
```

## Naming Conventions

### Variables and Functions
- **Variables TypeScript**: camelCase - Ejemplo: `userProfile`, `taskList`, `isLoading`
- **Variables Python**: snake_case - Ejemplo: `user_profile`, `task_list`, `is_active`
- **Functions TypeScript**: camelCase - Ejemplo: `getUserData()`, `validateInput()`, `handleSubmit()`
- **Functions Python**: snake_case - Ejemplo: `get_user_data()`, `validate_input()`, `create_task()`
- **Constants**: UPPER_SNAKE_CASE en ambos - Ejemplo: `MAX_RETRY_ATTEMPTS`, `API_BASE_URL`
- **Classes**: PascalCase en ambos - Ejemplo: `TaskService`, `UserManager`, `DatabaseConfig`

### API Endpoints
- **REST endpoints**: kebab-case con versioning - Ejemplo: `/api/v1/tasks`, `/api/v1/user-profile`
- **Query parameters**: snake_case - Ejemplo: `?page=1&page_size=10&status=pending`
- **Response format**: camelCase para frontend, snake_case internamente

## Error Handling

### Exception Handling Pattern (Backend)
```python
# AI-Hint: Manejo centralizado de excepciones TaskManager Pro | Integra con sistema de logging FastAPI | Preserva stack traces en desarrollo | TODO: Añadir métricas de errores
from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
import logging

logger = logging.getLogger(__name__)

class TaskServiceError(Exception):
    """Excepción base para errores del servicio de tareas"""
    pass

class TaskNotFoundError(TaskServiceError):
    """Tarea no encontrada"""
    pass

class TaskPermissionError(TaskServiceError):
    """Sin permisos para la operación"""
    pass

async def handle_task_operation(operation_func, *args, **kwargs):
    """
    Wrapper para manejo consistente de errores en operaciones de tareas
    """
    try:
        result = await operation_func(*args, **kwargs)
        return result
    except TaskNotFoundError as e:
        logger.warning(f"Tarea no encontrada: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tarea no encontrada"
        )
    except TaskPermissionError as e:
        logger.warning(f"Sin permisos: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Sin permisos para esta operación"
        )
    except SQLAlchemyError as e:
        logger.error(f"Error de base de datos: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error interno del servidor"
        )
    except Exception as e:
        logger.error(f"Error inesperado: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error interno del servidor"
        )
```

### Error Response Format
```json
{
  "error": {
    "code": "TASK_NOT_FOUND",
    "message": "La tarea solicitada no existe",
    "details": {
      "task_id": 123,
      "user_id": 456
    },
    "timestamp": "2024-12-19T10:30:00Z"
  }
}
```

## Testing Patterns

### Unit Test Structure (Backend)
```python
# AI-Hint: Test unitario TaskService con setup/teardown automático | Usa mocks para DB y UserService | Aislado de dependencias externas | TODO: Añadir property-based testing
import pytest
from unittest.mock import Mock, AsyncMock
from app.services.task_service import TaskService
from app.schemas.task_schemas import TaskCreate
from app.models.task_model import Task

class TestTaskService:
    @pytest.fixture
    def mock_db(self):
        """Mock de sesión de base de datos"""
        db = Mock()
        db.add = Mock()
        db.commit = Mock()
        db.refresh = Mock()
        return db
    
    @pytest.fixture
    def mock_user_service(self):
        """Mock del servicio de usuarios"""
        user_service = Mock()
        user_service.get_user = AsyncMock(return_value={'id': 1, 'name': 'Test User'})
        return user_service
    
    @pytest.fixture
    def task_service(self, mock_db, mock_user_service):
        """Instancia del servicio con mocks"""
        service = TaskService(mock_db)
        service.user_service = mock_user_service
        return service
    
    @pytest.mark.asyncio
    async def test_create_task_success(self, task_service, mock_db):
        """Test creación exitosa de tarea"""
        # Arrange
        task_data = TaskCreate(
            title="Test Task",
            description="Test Description",
            priority="high"
        )
        user_id = 1
        
        # Act
        result = await task_service.create_task(task_data, user_id)
        
        # Assert
        assert result.title == "Test Task"
        assert result.priority == "high"
        mock_db.add.assert_called_once()
        mock_db.commit.assert_called_once()
    
    @pytest.mark.asyncio
    async def test_create_task_user_not_found(self, task_service):
        """Test creación falla con usuario inexistente"""
        # Arrange
        task_service.user_service.get_user.return_value = None
        task_data = TaskCreate(title="Test Task")
        
        # Act & Assert
        with pytest.raises(ValueError, match="Usuario no encontrado"):
            await task_service.create_task(task_data, 999)
```

### Integration Test Pattern (Frontend)
```typescript
// AI-Hint: Test de integración para TaskCard | Usa MSW para mock de API | Testing Library para interacciones | TODO: Añadir tests de accesibilidad
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { TaskCard } from '../components/TaskCard';
import { Task } from '../types/task.types';

// Mock server setup
const server = setupServer(
  rest.put('/api/v1/tasks/:id', (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  }),
  rest.delete('/api/v1/tasks/:id', (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const mockTask: Task = {
  id: 1,
  title: 'Test Task',
  description: 'Test Description',
  status: 'pending',
  priority: 'medium',
  created_by: 1,
  created_at: '2024-12-19T10:00:00Z'
};

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });
  
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('TaskCard Integration', () => {
  test('displays task information correctly', () => {
    renderWithProviders(<TaskCard task={mockTask} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
  });
  
  test('handles edit action', async () => {
    const onEdit = jest.fn();
    renderWithProviders(<TaskCard task={mockTask} onEdit={onEdit} />);
    
    fireEvent.click(screen.getByText('Editar'));
    
    await waitFor(() => {
      expect(onEdit).toHaveBeenCalledWith(mockTask);
    });
  });
});
```

## Configuration Patterns

### Environment Configuration (Backend)
```python
# AI-Hint: Configuración por ambiente con validación automática | Carga desde .env y variables del sistema | Valores por defecto para desarrollo | TODO: Implementar configuración remota
from pydantic import BaseSettings, validator
from typing import Optional
import os

class Settings(BaseSettings):
    # Database
    database_url: str = "mysql+pymysql://taskmanager:taskmanager123@localhost:3306/taskmanager_db"
    
    # Security
    secret_key: str = "dev-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440  # 24 hours
    
    # CORS
    cors_origins: list[str] = ["http://localhost:3000"]
    
    # Environment
    environment: str = "development"
    debug: bool = True
    
    @validator('cors_origins', pre=True)
    def assemble_cors_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",")]
        return v
    
    @validator('secret_key')
    def validate_secret_key(cls, v):
        if v == "dev-secret-key-change-in-production" and os.getenv("ENVIRONMENT") == "production":
            raise ValueError("Must set SECRET_KEY in production")
        return v
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
```

### Frontend Configuration
```typescript
// AI-Hint: Configuración de ambiente frontend | Validación de variables requeridas | Type-safe access | TODO: Añadir configuración dinámica
interface AppConfig {
  apiUrl: string;
  appName: string;
  version: string;
  environment: 'development' | 'production' | 'test';
  features: {
    enableAnalytics: boolean;
    enableOfflineMode: boolean;
  };
}

const validateConfig = (): AppConfig => {
  const requiredVars = {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME || 'TaskManager Pro',
    VITE_APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0'
  };
  
  // Validate required variables
  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
  
  return {
    apiUrl: requiredVars.VITE_API_URL,
    appName: requiredVars.VITE_APP_NAME,
    version: requiredVars.VITE_APP_VERSION,
    environment: (import.meta.env.MODE as AppConfig['environment']) || 'development',
    features: {
      enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
      enableOfflineMode: import.meta.env.VITE_ENABLE_OFFLINE === 'true'
    }
  };
};

export const config: AppConfig = validateConfig();
```

## Database Patterns

### SQLAlchemy Model Pattern
```python
# AI-Hint: Modelo base para tareas con relaciones y validaciones | Hereda de Base SQLAlchemy | Incluye timestamps automáticos | TODO: Añadir soft delete y audit fields
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base
import enum

class TaskStatus(str, enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class TaskPriority(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    status = Column(Enum(TaskStatus), default=TaskStatus.PENDING, nullable=False)
    priority = Column(Enum(TaskPriority), default=TaskPriority.MEDIUM, nullable=False)
    
    # Relationships
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    assigned_to = Column(Integer, ForeignKey("users.id"), nullable=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    due_date = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    creator = relationship("User", foreign_keys=[created_by], back_populates="created_tasks")
    assignee = relationship("User", foreign_keys=[assigned_to], back_populates="assigned_tasks")
    project = relationship("Project", back_populates="tasks")
    category = relationship("Category", back_populates="tasks")
    comments = relationship("Comment", back_populates="task", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Task(id={self.id}, title='{self.title}', status='{self.status}')>"
```

### Query Optimization Patterns
```python
# AI-Hint: Repository para operaciones optimizadas de tareas | Incluye eager loading y filtros | Queries optimizadas para performance | TODO: Añadir caching con Redis
from sqlalchemy.orm import Session, joinedload, selectinload
from sqlalchemy import and_, or_, desc
from typing import List, Optional
from app.models.task_model import Task, TaskStatus, TaskPriority

class TaskRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_tasks_with_relations(
        self, 
        user_id: int, 
        status: Optional[TaskStatus] = None,
        priority: Optional[TaskPriority] = None,
        limit: int = 100,
        offset: int = 0
    ) -> List[Task]:
        """
        Obtiene tareas con relaciones cargadas eficientemente
        """
        query = self.db.query(Task).options(
            joinedload(Task.creator),
            joinedload(Task.assignee),
            joinedload(Task.project),
            joinedload(Task.category),
            selectinload(Task.comments)
        ).filter(
            or_(Task.created_by == user_id, Task.assigned_to == user_id)
        )
        
        if status:
            query = query.filter(Task.status == status)
        if priority:
            query = query.filter(Task.priority == priority)
            
        return query.order_by(desc(Task.created_at)).offset(offset).limit(limit).all()
```

## AI-Hints Guidelines (CRÍTICO)

### Formato Estándar AI-Hint
```python
# AI-Hint: [PROPÓSITO] | [RELACIONES] | [RESTRICCIONES] | [ROADMAP]
```

### Componentes del AI-Hint

#### 1. PROPÓSITO (Obligatorio)
- **Qué hace**: Descripción concisa de la funcionalidad específica
- **Por qué existe**: Razón de negocio o técnica dentro del contexto TaskManager Pro
- **Contexto**: Dónde encaja en el sistema de gestión de tareas

#### 2. RELACIONES (Obligatorio)
- **Dependencias**: Qué servicios, APIs o componentes necesita (TaskService, UserService, etc.)
- **Dependientes**: Qué otros componentes dependen de este
- **Integraciones**: APIs REST, base de datos MariaDB, servicios externos

#### 3. RESTRICCIONES (Obligatorio)
- **Limitaciones técnicas**: Performance, capacidad, compatibilidad con React/FastAPI/MariaDB
- **Limitaciones de negocio**: Reglas específicas de TaskManager Pro, permisos de usuario
- **Limitaciones de datos**: Formatos, tamaños, tipos específicos del dominio de tareas

#### 4. ROADMAP (Obligatorio)
- **TODOs inmediatos**: Mejoras planificadas en próximas iteraciones
- **Refactoring**: Cambios arquitectónicos futuros
- **Optimizaciones**: Mejoras de performance, UX, o funcionalidad

### Ejemplos por Tipo de Componente

#### Backend Service
```python
# AI-Hint: Servicio de autenticación JWT para TaskManager Pro | Depende de UserRepository y PasswordHasher | Solo tokens de 24h máximo | TODO: Implementar refresh tokens y MFA
class AuthService:
    def authenticate_user(self, email: str, password: str) -> Optional[User]:
        # Implementación
```

#### Frontend Component
```typescript
// AI-Hint: Dashboard principal con métricas de tareas en tiempo real | Conecta con TaskAPI y WebSocket | Requiere autenticación válida | TODO: Añadir filtros por fecha y exportación PDF
const Dashboard: React.FC = () => {
    // Implementación React
}
```

#### Database Model
```python
# AI-Hint: Modelo de tarea con estados y prioridades | Relacionado con User, Project y Category | Campos con validación Enum | TODO: Agregar soft delete y historial de cambios
class Task(Base):
    # Definición del modelo
```

#### API Endpoint
```python
# AI-Hint: Endpoint para crear tareas con validación completa | Valida con Pydantic y verifica permisos | Límite 100 tareas/día por usuario | TODO: Implementar creación batch
@router.post("/tasks", response_model=TaskResponse)
async def create_task(task_data: TaskCreate, current_user: User = Depends(get_current_user)):
    # Implementación del endpoint
```

#### Utility Function
```typescript
// AI-Hint: Validador de fechas para tareas | Usado por TaskForm y TaskCard | Solo acepta fechas futuras para due_date | TODO: Añadir validación de días laborables
export const validateTaskDate = (date: string): boolean => {
    // Implementación de validación
}
```

### Reglas de AI-Hints

#### ✅ OBLIGATORIO usar AI-Hints en:
- Todos los servicios FastAPI (TaskService, UserService, AuthService)
- Componentes React principales (TaskCard, Dashboard, TaskForm)
- Endpoints de API críticos (CRUD de tareas, autenticación)
- Modelos SQLAlchemy (Task, User, Project, Category)
- Hooks personalizados complejos (useTasks, useAuth)
- Configuraciones Docker y base de datos

#### ⚡ OPCIONAL pero recomendado en:
- Funciones utilitarias específicas del dominio (validadores, formatters)
- Middleware de FastAPI personalizado
- Componentes UI simples pero reutilizables
- Queries complejas de base de datos

#### ❌ NO usar AI-Hints en:
- Getters/setters simples o propiedades básicas
- Funciones de una línea obvias (return, simple assignments)
- Variables de configuración simples
- Imports y exports básicos

### Mantenimiento de AI-Hints

#### Actualización Obligatoria cuando:
- Se cambia la funcionalidad principal del componente
- Se añaden/quitan dependencias importantes (nuevas APIs, servicios)
- Se modifican restricciones o limitaciones del negocio
- Se completan TODOs mencionados en roadmap

#### Formato de Actualización:
```python
# AI-Hint: [PROPÓSITO actualizado] | [RELACIONES actualizadas] | [RESTRICCIONES actualizadas] | [ROADMAP actualizado]
# Updated: 2024-12-19 - Añadido soporte para soft delete y audit trail
```

Last Updated: 2024-12-19
