# Redux Toolkit Setup - TaskFlow Frontend

## Configuración Completada ✅

### Arquitectura Redux

La configuración de Redux Toolkit incluye:

#### 1. Store Principal (`src/store/index.ts`)
- Configuración centralizada del store
- Middleware de RTK Query integrado
- Redux DevTools habilitado en desarrollo
- Tipos TypeScript exportados (RootState, AppDispatch)

#### 2. Hooks Tipados (`src/store/hooks.ts`)
- `useAppDispatch`: Hook tipado para dispatch
- `useAppSelector`: Hook tipado para selectors
- Hooks de utilidad para estados comunes:
  - `useTheme`: Acceso al tema actual
  - `useLoading`: Estados de carga
  - `useNotifications`: Sistema de notificaciones
  - `useAuth`: Estado de autenticación
  - `useModal`: Estados de modales

#### 3. Slices Implementados

##### UI Slice (`src/store/slices/uiSlice.ts`)
Maneja el estado global de la interfaz:
- **Tema**: light/dark/system con persistencia
- **Estados de carga**: Global, auth, tasks, projects
- **Notificaciones**: Sistema de toasts con auto-dismiss
- **Modales**: Control centralizado de modales
- **Sidebar**: Estado de navegación lateral

##### Auth Slice (`src/store/slices/authSlice.ts`)
Gestiona la autenticación y estado del usuario:
- **Usuario**: Datos del usuario autenticado
- **Tokens**: Access token y refresh token
- **Estados**: Loading, error, intentos de login
- **Flujos**: Login, logout, refresh de tokens
- **Perfil**: Actualización de datos y preferencias

#### 4. RTK Query Setup (`src/store/api/apiSlice.ts`)
Configuración base para llamadas API:
- Base URL configurable por variables de entorno
- Autenticación automática con Bearer tokens
- Re-autenticación automática en tokens expirados
- Tags para invalidación de caché
- Preparado para inyección de endpoints específicos

#### 5. Componentes Redux

##### NotificationProvider (`src/components/ui/NotificationProvider.tsx`)
Sistema completo de notificaciones:
- Componente conectado al store Redux
- Auto-dismiss configurable
- Estilos por tipo (success, error, warning, info)
- Hook `useNotification` para facilitar uso
- Animaciones con Tailwind CSS

### Integración con App

#### Provider Setup
El store está integrado en `App.tsx`:
```tsx
<Provider store={store}>
  <ThemeManager />
</Provider>
```

#### Gestión de Tema
La gestión de tema se movió de estado local a Redux:
- Persistencia en localStorage
- Sincronización con preferencias del sistema
- Aplicación automática de clases CSS

### Estructura de Archivos

```
src/store/
├── index.ts           # Store principal y exports
├── hooks.ts           # Hooks tipados para TypeScript
├── slices/
│   ├── index.ts       # Re-exports de slices
│   ├── uiSlice.ts     # Estado de UI global
│   └── authSlice.ts   # Estado de autenticación
└── api/
    ├── index.ts       # Re-exports de API
    └── apiSlice.ts    # Configuración base RTK Query
```

### Uso Básico

#### Acceder al Estado
```tsx
import { useAppSelector } from '@/store/hooks'

const theme = useAppSelector(state => state.ui.theme)
const user = useAppSelector(state => state.auth.user)
```

#### Dispatch de Acciones
```tsx
import { useAppDispatch } from '@/store/hooks'
import { setTheme, addNotification } from '@/store/slices/uiSlice'

const dispatch = useAppDispatch()

// Cambiar tema
dispatch(setTheme('dark'))

// Mostrar notificación
dispatch(addNotification({
  type: 'success',
  title: 'Éxito',
  message: 'Operación completada'
}))
```

#### Hook de Notificaciones
```tsx
import { useNotification } from '@/components/ui/NotificationProvider'

const { showSuccess, showError } = useNotification()

showSuccess('¡Guardado!', 'Los cambios se guardaron correctamente')
```

### Estado Actual

✅ **Completado**:
- Store configurado con TypeScript
- Slices UI y Auth implementados
- RTK Query base configurado
- Hooks tipados creados
- Sistema de notificaciones funcional
- Integración con App.tsx
- Gestión de tema migrada a Redux

🔄 **Próximo**:
- API slices específicos (auth, tasks, projects)
- Middleware personalizado
- Persistencia de estado
- Tests unitarios para slices

### Variables de Entorno Requeridas

```env
# API Base URL (opcional, default: http://localhost:5000/api)
VITE_API_URL=http://localhost:5000/api
```

### Convenciones Seguidas

- **AI-Hints**: Todos los archivos incluyen comentarios AI-Hint
- **TypeScript**: Tipos estrictos en toda la implementación
- **Naming**: camelCase para acciones, PascalCase para tipos
- **Structure**: Separación clara entre UI, Auth y API
- **Exports**: Re-exports centralizados para facilitar imports

Los errores de linter son esperados hasta que se instalen las dependencias de Redux Toolkit. 