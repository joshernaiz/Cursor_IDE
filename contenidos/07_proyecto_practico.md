# 7. Proyecto Práctico

## 7.1. Definición del Proyecto

Para poner en práctica todos los conceptos aprendidos en el curso, desarrollaremos un proyecto real que nos permitirá aplicar las diferentes técnicas y herramientas para trabajar eficientemente con Cursor IDE y modelos de IA.

### TaskFlow: Sistema de gestión de tareas con IA

TaskFlow es una aplicación web moderna para la gestión de tareas que incluye capacidades de IA para priorización, categorización y análisis de carga de trabajo. Este proyecto ha sido diseñado específicamente para demostrar las mejores prácticas de desarrollo con IA asistida.

#### Características principales:

1. **Gestión completa de tareas**:
   - Creación, edición y eliminación de tareas
   - Asignación a usuarios
   - Establecimiento de fechas límite y prioridades
   - Categorización mediante etiquetas
   - Estados (pendiente, en progreso, completada)

2. **Organización por proyectos**:
   - Agrupación de tareas en proyectos
   - Colaboración entre múltiples usuarios
   - Roles y permisos por proyecto
   - Seguimiento de progreso

3. **Interfaz de usuario intuitiva**:
   - Vistas de lista, kanban y calendario
   - Filtros y búsqueda avanzada
   - Responsive para móvil y escritorio
   - Temas claro y oscuro

4. **Capacidades de IA**:
   - Sugerencias automáticas de prioridad
   - Categorización inteligente de tareas
   - Análisis de carga de trabajo
   - Planificación optimizada de tareas
   - Detección de posibles conflictos

5. **API RESTful completa**:
   - Endpoints para todas las operaciones
   - Autenticación mediante JWT
   - Documentación OpenAPI
   - Soporte para integración con otros sistemas

#### Tecnologías a utilizar:

**Frontend**:
- React con TypeScript
- Redux Toolkit para gestión de estado
- Tailwind CSS para estilos
- React Router para navegación

**Backend**:
- Node.js con Express
- MongoDB con Mongoose
- Autenticación con JWT
- TypeScript para desarrollo tipado

**Infraestructura**:
- Docker para contenerización
- MongoDB Atlas para base de datos
- GitHub Actions para CI/CD (opcional)

### Requisitos y objetivos

Los objetivos de este proyecto práctico son:

1. **Aplicar técnicas de desarrollo asistido por IA**:
   - Utilizar AI-Hints estratégicamente
   - Configurar Cursor Rules adecuadamente
   - Implementar servicios MCP para funcionalidades avanzadas
   - Seguir el flujo de trabajo optimizado para IA

2. **Crear documentación orientada a IAs**:
   - Desarrollar documentación estructurada
   - Implementar diagramas con Mermaid
   - Mantener un glosario de términos
   - Documentar patrones y decisiones arquitectónicas

3. **Desarrollar un producto completo y funcional**:
   - Implementar todas las características clave
   - Crear una interfaz intuitiva y atractiva
   - Asegurar calidad mediante pruebas
   - Permitir despliegue y ejecución sencilla

### Planificación inicial

Para desarrollar este proyecto, seguiremos el enfoque aprendido en el curso:

1. **Fase 1: Diseño de Interfaz**
   - Crear DESIGN_PLAN.md utilizando el prompt Plan_Diseño
   - Definir estructura de pantallas, componentes y flujos
   - Diseñar la API y formatos de datos

2. **Fase 2: Planificación Técnica**
   - Crear IMPLEMENTATION_PLAN.md con el prompt Plan_Implantación
   - Definir arquitectura, patrones y estructura
   - Establecer tecnologías y convenciones

3. **Fase 3: Lista de Tareas**
   - Generar TODO.md detallado con el prompt TODO
   - Organizar tareas por componentes y prioridad
   - Establecer dependencias y secuencia

4. **Fase 4: Implementación Guiada**
   - Seguir las tareas definidas en TODO.md
   - Utilizar el prompt Ejecución_desarrollo para cada tarea
   - Documentar con AI-Hints cada componente

5. **Fase 5: Documentación**
   - Generar documentación completa con Documentar_proyectos_desde_0
   - Actualizar según avanza el desarrollo
   - Mantener coherencia entre código y documentación

## 7.2. Implementación Guiada

En esta sección, guiaremos la implementación paso a paso de nuestro proyecto TaskFlow, aplicando todos los conceptos aprendidos en el curso.

### Fase 1: Configuración inicial

#### Paso 1: Estructura del proyecto

Comenzamos creando la estructura básica del proyecto:

```bash
# Crear directorios principales
mkdir -p taskflow/{frontend,backend,docs}
cd taskflow

# Inicializar Git
git init

# Crear .gitignore
cat > .gitignore << EOL
# Dependencies
node_modules/
.pnp/
.pnp.js

# Build
/dist/
/build/
/out/

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Testing
/coverage/

# Production
/frontend/build/
/backend/dist/
EOL

# Crear README.md inicial
cat > README.md << EOL
# TaskFlow

Aplicación de gestión de tareas con capacidades de IA para priorización y análisis.

## En desarrollo

Este proyecto está actualmente en desarrollo.
EOL
```

#### Paso 2: Configuración de Cursor IDE

Creamos el archivo `.cursor.json` para optimizar la interacción con Cursor IDE:

```json
{
  "project": {
    "name": "TaskFlow",
    "description": "Aplicación de gestión de tareas con capacidades de IA",
    "version": "0.1.0"
  },
  "context": {
    "entryPoints": [
      "frontend/src/index.tsx",
      "backend/src/server.ts"
    ],
    "criticalPaths": [
      "frontend/src/components",
      "frontend/src/store",
      "backend/src/api",
      "backend/src/services"
    ],
    "documentation": [
      "docs/index.md",
      "docs/architecture/architecture.md"
    ]
  },
  "aiHints": {
    "architecture": {
      "frontend": "React SPA with Redux",
      "backend": "Express API with MongoDB",
      "communication": "REST API with JWT auth"
    },
    "patterns": [
      "Feature-based organization for frontend",
      "Clean Architecture for backend",
      "Repository pattern for data access"
    ]
  },
  "files": {
    "include": ["**/*.{ts,tsx,js,jsx,json,md}"],
    "exclude": ["**/node_modules/**", "**/dist/**", "**/build/**"]
  }
}
```

#### Paso 3: Configuración de MCP

Configuramos la integración con MCP para habilitar capacidades avanzadas de IA:

```bash
# Crear estructura de directorios MCP
mkdir -p .mcp/{schemas,resources}

# Crear archivo de configuración MCP
cat > .mcp/config.json << EOL
{
  "version": "1.0",
  "project": {
    "id": "taskflow",
    "description": "Aplicación de gestión de tareas con IA"
  },
  "servers": [
    {
      "id": "ai-service",
      "url": "https://mcp.example.com/api",
      "auth": {
        "type": "token",
        "envVar": "MCP_AI_TOKEN"
      },
      "resources": [
        {
          "name": "task-analyzer",
          "path": "/models/task-analyzer",
          "description": "Modelo para análisis y priorización de tareas"
        },
        {
          "name": "workload-optimizer",
          "path": "/models/workload-optimizer",
          "description": "Modelo para optimización de carga de trabajo"
        }
      ]
    }
  ],
  "settings": {
    "cacheEnabled": true,
    "cacheTTL": 3600,
    "requestTimeout": 5000,
    "maxRetries": 2
  }
}
EOL

# Crear README para MCP
cat > .mcp/README.md << EOL
# Configuración MCP - TaskFlow

Este directorio contiene la configuración para la integración con Model Control Protocol (MCP).

## Recursos disponibles

- **task-analyzer**: Modelo para análisis y priorización automática de tareas
- **workload-optimizer**: Modelo para optimización de distribución de carga de trabajo

## Configuración

Para utilizar estos recursos, se requiere configurar la variable de entorno \`MCP_AI_TOKEN\`.
EOL
```

#### Paso 4: Configuración del frontend

Inicializamos el proyecto React para el frontend:

```bash
# Navegar al directorio frontend
cd frontend

# Inicializar proyecto con create-react-app y TypeScript
npx create-react-app . --template typescript

# Instalar dependencias adicionales
npm install @reduxjs/toolkit react-redux react-router-dom axios tailwindcss postcss autoprefixer date-fns

# Configurar Tailwind CSS
npx tailwindcss init -p

# Actualizar configuración de Tailwind
cat > tailwind.config.js << EOL
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class'
}
EOL

# Actualizar contenido CSS
cat > src/index.css << EOL
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100;
}
EOL

# Volver al directorio raíz
cd ..
```

#### Paso 5: Configuración del backend

Inicializamos el proyecto Node.js con Express para el backend:

```bash
# Navegar al directorio backend
cd backend

# Inicializar proyecto npm
npm init -y

# Instalar dependencias
npm install express mongoose jsonwebtoken bcrypt cors dotenv
npm install --save-dev typescript ts-node @types/express @types/mongoose @types/jsonwebtoken @types/bcrypt @types/cors nodemon

# Configurar TypeScript
cat > tsconfig.json << EOL
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
EOL

# Crear estructura de directorios
mkdir -p src/{api,models,services,utils,config}

# Crear archivo de entrada principal
cat > src/server.ts << EOL
// AI-Hint Architecture: [Express API] [Implementa REST API para TaskFlow] [Sigue Clean Architecture]

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();

// Configurar middleware
app.use(cors());
app.use(express.json());

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.json({ message: 'TaskFlow API' });
});

// Conectar a MongoDB y arrancar servidor
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskflow';

mongoose.connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(\`Server running on port \${PORT}\`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
EOL

# Crear archivo .env de ejemplo
cat > .env.example << EOL
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_jwt_secret_here
MCP_AI_TOKEN=your_mcp_token_here
EOL

# Configurar scripts en package.json
cat > package.json << EOL
{
  "name": "taskflow-backend",
  "version": "0.1.0",
  "description": "Backend for TaskFlow application",
  "main": "dist/server.js",
  "scripts": {
    "start": "node dist/server.js",
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["task", "management", "ai"],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^6.0.0",
    "jsonwebtoken": "^8.5.1",
    "bcrypt": "^5.0.1",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0"
  },
  "devDependencies": {
    "typescript": "^4.4.3",
    "ts-node": "^10.2.1",
    "@types/express": "^4.17.13",
    "@types/mongoose": "^5.11.97",
    "@types/jsonwebtoken": "^8.5.5",
    "@types/bcrypt": "^5.0.0",
    "@types/cors": "^2.8.12",
    "nodemon": "^2.0.12"
  }
}
EOL

# Volver al directorio raíz
cd ..
```

#### Paso 6: Configuración de Docker

Creamos archivos Docker para facilitar el despliegue:

```bash
# Crear Dockerfile para el frontend
cat > frontend/Dockerfile << EOL
FROM node:16-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOL

# Crear configuración Nginx
cat > frontend/nginx.conf << EOL
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
    }
}
EOL

# Crear Dockerfile para el backend
cat > backend/Dockerfile << EOL
FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 5000
CMD ["node", "dist/server.js"]
EOL

# Crear docker-compose.yml
cat > docker-compose.yml << EOL
version: '3'

services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://localhost:5000

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongo
    environment:
      - PORT=5000
      - MONGODB_URI=mongodb://mongo:27017/taskflow
      - JWT_SECRET=dev_jwt_secret
      - NODE_ENV=development

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
EOL
```

### Fase 2: Implementación del Backend

A continuación, implementaremos los componentes principales del backend, aplicando los conceptos aprendidos durante el curso.

#### Paso 1: Modelos de datos

Comenzamos definiendo los modelos de datos utilizando Mongoose:

```typescript
// backend/src/models/User.ts

// AI-Hint Data: [User Model] [Representa usuario del sistema] [Incluye autenticación y permisos]

import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'],
    default: 'user' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

// Pre-save hook para hashear password
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Método para comparar passwords
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
```

```typescript
// backend/src/models/Project.ts

// AI-Hint Data: [Project Model] [Agrupador de tareas con miembros] [Gestiona permisos por proyecto]

import mongoose, { Document, Schema } from 'mongoose';

export interface IMember {
  userId: mongoose.Types.ObjectId;
  role: 'viewer' | 'editor' | 'admin';
  addedAt: Date;
}

export interface IProject extends Document {
  name: string;
  description: string;
  ownerId: mongoose.Types.ObjectId;
  members: IMember[];
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema: Schema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['viewer', 'editor', 'admin'],
    default: 'viewer' 
  },
  addedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const ProjectSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    default: '' 
  },
  ownerId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  members: [MemberSchema],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

export default mongoose.model<IProject>('Project', ProjectSchema);
```

```typescript
// backend/src/models/Task.ts

// AI-Hint Data: [Task Model] [Unidad de trabajo con estado y prioridad] [Organizada por proyectos]

import mongoose, { Document, Schema } from 'mongoose';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface ISubtask {
  title: string;
  completed: boolean;
}

export interface ITask extends Document {
  title: string;
  description: string;
  status: TaskStatus;
  priority: number; // 1 (highest) to 5 (lowest)
  dueDate: Date | null;
  projectId: mongoose.Types.ObjectId | null;
  assigneeId: mongoose.Types.ObjectId | null;
  createdBy: mongoose.Types.ObjectId;
  subtasks: ISubtask[];
  labels: string[];
  aiSuggestions: any; // Sugerencias generadas por IA
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
}

const SubtaskSchema: Schema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  completed: { 
    type: Boolean, 
    default: false 
  }
});

const TaskSchema: Schema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    default: '' 
  },
  status: { 
    type: String, 
    enum: Object.values(TaskStatus),
    default: TaskStatus.PENDING 
  },
  priority: { 
    type: Number, 
    min: 1, 
    max: 5, 
    default: 3 
  },
  dueDate: { 
    type: Date, 
    default: null 
  },
  projectId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Project', 
    default: null 
  },
  assigneeId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    default: null 
  },
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  subtasks: [SubtaskSchema],
  labels: [{ 
    type: String 
  }],
  aiSuggestions: { 
    type: Schema.Types.Mixed, 
    default: {} 
  },
  completedAt: { 
    type: Date, 
    default: null 
  }
}, {
  timestamps: true
});

// Índices para mejorar búsquedas
TaskSchema.index({ status: 1 });
TaskSchema.index({ projectId: 1 });
TaskSchema.index({ assigneeId: 1 });
TaskSchema.index({ createdBy: 1 });
TaskSchema.index({ dueDate: 1 });

export default mongoose.model<ITask>('Task', TaskSchema);
```

#### Paso 2: Servicios principales

Implementamos los servicios que contendrán la lógica de negocio:

```typescript
// backend/src/services/AuthService.ts

// AI-Hint Component: [AuthService] [Gestiona autenticación y tokens] [Mantiene estado de sesión]

import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { ApiError } from '../utils/errors';

interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

interface AuthResponse {
  user: Partial<IUser>;
  token: string;
  refreshToken?: string;
}

class AuthService {
  private static instance: AuthService;
  private readonly JWT_SECRET: string;
  private readonly TOKEN_EXPIRY: string;
  
  private constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
    this.TOKEN_EXPIRY = '1h';
    
    if (!process.env.JWT_SECRET) {
      console.warn('WARNING: JWT_SECRET not set in environment variables');
    }
  }
  
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
  
  public async registerUser(userData: Partial<IUser>): Promise<AuthResponse> {
    // Validar campos requeridos
    if (!userData.email || !userData.password || !userData.name) {
      throw new ApiError(400, 'Email, password and name are required');
    }
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new ApiError(409, 'Email already registered');
    }
    
    // Crear nuevo usuario
    const user = new User(userData);
    await user.save();
    
    // Generar token JWT
    const token = this.generateToken(user);
    
    // Preparar respuesta (excluir password)
    const userResponse = user.toObject();
    delete userResponse.password;
    
    return { user: userResponse, token };
  }
  
  public async loginUser(email: string, password: string): Promise<AuthResponse> {
    // Validar campos
    if (!email || !password) {
      throw new ApiError(400, 'Email and password are required');
    }
    
    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }
    
    // Verificar password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid credentials');
    }
    
    // Generar token JWT
    const token = this.generateToken(user);
    
    // Preparar respuesta (excluir password)
    const userResponse = user.toObject();
    delete userResponse.password;
    
    return { user: userResponse, token };
  }
  
  public verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.JWT_SECRET) as TokenPayload;
    } catch (error) {
      throw new ApiError(401, 'Invalid or expired token');
    }
  }
  
  private generateToken(user: IUser): string {
    const payload: TokenPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role
    };
    
    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: this.TOKEN_EXPIRY });
  }
}

export default AuthService;
```

```typescript
// backend/src/services/TaskService.ts

// AI-Hint Component: [TaskService] [Gestiona operaciones CRUD de tareas] [Incluye lógica de negocio]

import Task, { ITask, TaskStatus } from '../models/Task';
import Project from '../models/Project';
import { ApiError } from '../utils/errors';
import { AIService } from './AIService';
import mongoose from 'mongoose';

interface TaskFilters {
  status?: TaskStatus[];
  priority?: number[];
  projectId?: string;
  assigneeId?: string;
  dueDate?: { from?: Date; to?: Date };
  search?: string;
  labels?: string[];
}

interface TaskQuery {
  status?: { $in: TaskStatus[] };
  priority?: { $in: number[] };
  projectId?: mongoose.Types.ObjectId;
  assigneeId?: mongoose.Types.ObjectId;
  dueDate?: { $gte?: Date; $lte?: Date };
  $or?: any[];
  labels?: { $in: string[] };
}

class TaskService {
  private static instance: TaskService;
  private aiService: AIService;
  
  private constructor() {
    this.aiService = AIService.getInstance();
  }
  
  public static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }
    return TaskService.instance;
  }
  
  // Obtener tareas con filtros
  public async getTasks(
    userId: string, 
    filters: TaskFilters = {}, 
    pagination = { page: 1, limit: 20 },
    sort = { field: 'updatedAt', order: 'desc' as 'asc' | 'desc' }
  ): Promise<{ tasks: ITask[]; total: number; pages: number }> {
    // Construir query
    const query: TaskQuery = {};
    
    // Acceso basado en usuario (tareas propias o asignadas o de proyectos del usuario)
    query.$or = [
      { createdBy: new mongoose.Types.ObjectId(userId) },
      { assigneeId: new mongoose.Types.ObjectId(userId) }
    ];
    
    // Obtener IDs de proyectos del usuario
    const userProjects = await Project.find({
      $or: [
        { ownerId: userId },
        { 'members.userId': userId }
      ]
    }).select('_id');
    
    const projectIds = userProjects.map(p => p._id);
    if (projectIds.length > 0) {
      query.$or.push({ projectId: { $in: projectIds } });
    }
    
    // Aplicar filtros
    if (filters.status && filters.status.length > 0) {
      query.status = { $in: filters.status };
    }
    
    if (filters.priority && filters.priority.length > 0) {
      query.priority = { $in: filters.priority };
    }
    
    if (filters.projectId) {
      query.projectId = new mongoose.Types.ObjectId(filters.projectId);
    }
    
    if (filters.assigneeId) {
      query.assigneeId = new mongoose.Types.ObjectId(filters.assigneeId);
    }
    
    if (filters.dueDate) {
      query.dueDate = {};
      if (filters.dueDate.from) {
        query.dueDate.$gte = filters.dueDate.from;
      }
      if (filters.dueDate.to) {
        query.dueDate.$lte = filters.dueDate.to;
      }
    }
    
    if (filters.labels && filters.labels.length > 0) {
      query.labels = { $in: filters.labels };
    }
    
    if (filters.search) {
      const searchQuery = { $regex: filters.search, $options: 'i' };
      query.$or = query.$or || [];
      query.$or.push(
        { title: searchQuery },
        { description: searchQuery }
      );
    }
    
    // Calcular paginación
    const skip = (pagination.page - 1) * pagination.limit;
    
    // Preparar ordenamiento
    const sortOption: any = {};
    sortOption[sort.field] = sort.order === 'asc' ? 1 : -1;
    
    // Ejecutar consulta
    const [tasks, total] = await Promise.all([
      Task.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(pagination.limit)
        .populate('assigneeId', 'name email')
        .populate('projectId', 'name'),
      Task.countDocuments(query)
    ]);
    
    return {
      tasks,
      total,
      pages: Math.ceil(total / pagination.limit)
    };
  }
  
  // Obtener tarea por ID
  public async getTaskById(taskId: string, userId: string): Promise<ITask> {
    const task = await Task.findById(taskId)
      .populate('assigneeId', 'name email')
      .populate('projectId', 'name');
    
    if (!task) {
      throw new ApiError(404, 'Task not found');
    }
    
    // Verificar acceso
    await this.checkTaskAccess(task, userId);
    
    return task;
  }
  
  // Crear tarea
  public async createTask(taskData: Partial<ITask>, userId: string): Promise<ITask> {
    // Verificar acceso al proyecto si se especifica
    if (taskData.projectId) {
      await this.checkProjectAccess(taskData.projectId.toString(), userId);
    }
    
    // Crear tarea
    const task = new Task({
      ...taskData,
      createdBy: userId,
      status: taskData.status || TaskStatus.PENDING
    });
    
    await task.save();
    
    // Analizar con IA si está disponible
    try {
      const aiAnalysis = await this.aiService.analyzeTask(task);
      
      if (aiAnalysis && Object.keys(aiAnalysis).length > 0) {
        task.aiSuggestions = aiAnalysis.suggestions || {};
        
        // Aplicar sugerencias automáticas si existen
        if (aiAnalysis.suggestedChanges) {
          Object.assign(task, aiAnalysis.suggestedChanges);
        }
        
        await task.save();
      }
    } catch (error) {
      console.error('Error analyzing task with AI:', error);
      // Continuar sin análisis de IA
    }
    
    return task.populate([
      { path: 'assigneeId', select: 'name email' },
      { path: 'projectId', select: 'name' }
    ]);
  }
  
  // Actualizar tarea
  public async updateTask(
    taskId: string, 
    updateData: Partial<ITask>, 
    userId: string
  ): Promise<ITask> {
    const task = await Task.findById(taskId);
    
    if (!task) {
      throw new ApiError(404, 'Task not found');
    }
    
    // Verificar acceso con permisos de edición
    await this.checkTaskAccess(task, userId, true);
    
    // Verificar acceso al proyecto si cambia
    if (updateData.projectId && updateData.projectId.toString() !== task.projectId?.toString()) {
      await this.checkProjectAccess(updateData.projectId.toString(), userId);
    }
    
    // Actualizar campos
    Object.assign(task, updateData);
    
    // Si cambia a completado, establecer completedAt
    if (updateData.status === TaskStatus.COMPLETED && task.status !== TaskStatus.COMPLETED) {
      task.completedAt = new Date();
    }
    
    await task.save();
    
    return task.populate([
      { path: 'assigneeId', select: 'name email' },
      { path: 'projectId', select: 'name' }
    ]);
  }
  
  // Eliminar tarea
  public async deleteTask(taskId: string, userId: string): Promise<void> {
    const task = await Task.findById(taskId);
    
    if (!task) {
      throw new ApiError(404, 'Task not found');
    }
    
    // Verificar acceso
    await this.checkTaskAccess(task, userId, true);
    
    await task.remove();
  }
  
  // Verificar acceso a tarea
  private async checkTaskAccess(
    task: ITask, 
    userId: string, 
    requireEditPermission = false
  ): Promise<void> {
    // El creador siempre tiene acceso
    if (task.createdBy.toString() === userId) {
      return;
    }
    
    // El asignado tiene acceso
    if (task.assigneeId && task.assigneeId.toString() === userId) {
      return;
    }
    
    // Verificar acceso por proyecto
    if (task.projectId) {
      const project = await Project.findById(task.projectId);
      
      if (!project) {
        throw new ApiError(404, 'Associated project not found');
      }
      
      // Propietario del proyecto tiene acceso completo
      if (project.ownerId.toString() === userId) {
        return;
      }
      
      // Miembros del proyecto según permisos
      const member = project.members.find(m => m.userId.toString() === userId);
      
      if (member) {
        if (!requireEditPermission || member.role === 'editor' || member.role === 'admin') {
          return;
        }
      }
    }
    
    throw new ApiError(403, 'You don\'t have access to this task');
  }
  
  // Verificar acceso a proyecto
  private async checkProjectAccess(
    projectId: string, 
    userId: string, 
    requireEditPermission = false
  ): Promise<void> {
    const project = await Project.findById(projectId);
    
    if (!project) {
      throw new ApiError(404, 'Project not found');
    }
    
    // Propietario tiene todos los permisos
    if (project.ownerId.toString() === userId) {
      return;
    }
    
    // Verificar miembro y rol
    const member = project.members.find(m => m.userId.toString() === userId);
    
    if (!member) {
      throw new ApiError(403, 'You don\'t have access to this project');
    }
    
    if (requireEditPermission && member.role === 'viewer') {
      throw new ApiError(403, 'You don\'t have edit permission for this project');
    }
  }
}

export default TaskService;
```

```typescript
// backend/src/services/AIService.ts

// AI-Hint Component: [AIService] [Proporciona capacidades de IA para tareas] [Integra con MCP]

import { ITask } from '../models/Task';
import { mcpClient } from '../utils/mcpClient';

interface TaskAnalysis {
  suggestions?: {
    estimatedEffort?: 'low' | 'medium' | 'high';
    suggestedPriority?: number;
    timeEstimate?: number; // minutos
    riskLevel?: 'low' | 'medium' | 'high';
    recommendedDueDate?: Date;
    similarTasks?: string[];
  };
  suggestedChanges?: Partial<ITask>;
  confidence?: number;
}

interface WorkloadAnalysis {
  overview: string;
  taskDistribution: any;
  recommendations: string[];
}

export class AIService {
  private static instance: AIService;
  
  private constructor() {}
  
  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }
  
  // Analizar tarea con IA
  public async analyzeTask(task: ITask): Promise<TaskAnalysis> {
    try {
      // Intentar usar MCP para análisis avanzado
      return await this.analyzeWithMCP(task);
    } catch (error) {
      console.warn('MCP analysis failed, using fallback:', error);
      // Fallback a análisis local básico
      return this.fallbackAnalysis(task);
    }
  }
  
  // Analizar carga de trabajo
  public async analyzeWorkload(
    userId: string,
    projectId?: string,
    timeRange?: { start: Date; end: Date }
  ): Promise<WorkloadAnalysis> {
    try {
      // Intentar usar MCP para análisis avanzado
      const input = {
        userId,
        projectId,
        timeRange: timeRange || {
          start: new Date(),
          end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 2 semanas
        }
      };
      
      const result = await mcpClient.invokeModel('workload-optimizer', input);
      return result;
    } catch (error) {
      console.warn('MCP workload analysis failed, using fallback:', error);
      // Fallback a análisis básico
      return {
        overview: 'Basic workload analysis (AI service unavailable)',
        taskDistribution: {},
        recommendations: [
          'Consider prioritizing tasks by due date',
          'Balance work across team members when possible'
        ]
      };
    }
  }
  
  // Análisis MCP avanzado
  private async analyzeWithMCP(task: ITask): Promise<TaskAnalysis> {
    // Preparar input para MCP
    const input = {
      task: {
        id: task._id.toString(),
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        status: task.status,
        subtasks: task.subtasks,
        labels: task.labels
      }
    };
    
    // Llamar al modelo MCP
    const result = await mcpClient.invokeModel('task-analyzer', input);
    
    // Validar y normalizar resultado
    return this.validateAnalysisResult(result);
  }
  
  // Análisis local básico (fallback)
  private fallbackAnalysis(task: ITask): TaskAnalysis {
    const analysis: TaskAnalysis = {
      suggestions: {},
      confidence: 0.6
    };
    
    // Estimar esfuerzo basado en descripción
    if (task.description) {
      const length = task.description.length;
      
      if (length < 100) {
        analysis.suggestions!.estimatedEffort = 'low';
      } else if (length < 500) {
        analysis.suggestions!.estimatedEffort = 'medium';
      } else {
        analysis.suggestions!.estimatedEffort = 'high';
      }
    }
    
    // Sugerir prioridad basada en fecha límite
    if (task.dueDate) {
      const now = new Date();
      const daysUntilDue = Math.ceil(
        (task.dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysUntilDue <= 1) {
        analysis.suggestions!.suggestedPriority = 1; // Muy alta
      } else if (daysUntilDue <= 3) {
        analysis.suggestions!.suggestedPriority = 2; // Alta
      } else if (daysUntilDue <= 7) {
        analysis.suggestions!.suggestedPriority = 3; // Media
      } else {
        analysis.suggestions!.suggestedPriority = 4; // Baja
      }
    }
    
    return analysis;
  }
  
  // Validar resultado del análisis
  private validateAnalysisResult(result: any): TaskAnalysis {
    // Implementar validación básica
    const analysis: TaskAnalysis = {
      suggestions: {},
      confidence: result.confidence || 0.7
    };
    
    // Copiar sugerencias válidas
    if (result.suggestions) {
      if (['low', 'medium', 'high'].includes(result.suggestions.estimatedEffort)) {
        analysis.suggestions!.estimatedEffort = result.suggestions.estimatedEffort;
      }
      
      if (result.suggestions.suggestedPriority >= 1 && result.suggestions.suggestedPriority <= 5) {
        analysis.suggestions!.suggestedPriority = result.suggestions.suggestedPriority;
      }
      
      if (result.suggestions.timeEstimate > 0) {
        analysis.suggestions!.timeEstimate = result.suggestions.timeEstimate;
      }
      
      if (['low', 'medium', 'high'].includes(result.suggestions.riskLevel)) {
        analysis.suggestions!.riskLevel = result.suggestions.riskLevel;
      }
      
      if (result.suggestions.recommendedDueDate) {
        analysis.suggestions!.recommendedDueDate = new Date(result.suggestions.recommendedDueDate);
      }
      
      if (Array.isArray(result.suggestions.similarTasks)) {
        analysis.suggestions!.similarTasks = result.suggestions.similarTasks;
      }
    }
    
    // Copiar cambios sugeridos si existen
    if (result.suggestedChanges) {
      analysis.suggestedChanges = {};
      
      // Solo permitir cambios seguros
      if (result.suggestedChanges.priority >= 1 && result.suggestedChanges.priority <= 5) {
        analysis.suggestedChanges.priority = result.suggestedChanges.priority;
      }
      
      if (Array.isArray(result.suggestedChanges.labels)) {
        analysis.suggestedChanges.labels = result.suggestedChanges.labels;
      }
    }
    
    return analysis;
  }
}
```

## 7.3. Revisión y Mejoras

Una vez implementadas las funcionalidades básicas del proyecto, es momento de revisar el código, optimizar su rendimiento y refinar la documentación para maximizar la eficiencia del desarrollo asistido por IA.

### Análisis del código generado

Durante la implementación, es importante revisar regularmente la calidad del código generado. Algunos aspectos clave a considerar:

1. **Coherencia arquitectónica**:
   - ¿El código sigue los patrones definidos en IMPLEMENTATION_PLAN.md?
   - ¿Hay una separación clara de responsabilidades?
   - ¿Las dependencias fluyen en la dirección correcta?

2. **Calidad del código**:
   - ¿Se siguen las convenciones de estilo establecidas?
   - ¿El código es legible y mantenible?
   - ¿Hay duplicación innecesaria?

3. **Rendimiento**:
   - ¿Se han implementado optimizaciones donde es necesario?
   - ¿Las consultas a la base de datos están optimizadas?
   - ¿Se utilizan técnicas como caché cuando es apropiado?

4. **Seguridad**:
   - ¿Se validan adecuadamente las entradas?
   - ¿La autenticación y autorización están implementadas correctamente?
   - ¿Se manejan adecuadamente los datos sensibles?

### Refinamiento de AI-Hints

Un aspecto crítico para mejorar la eficiencia del desarrollo asistido por IA es el refinamiento de los AI-Hints. Después de la implementación inicial, es recomendable:

1. **Revisar y actualizar AI-Hints existentes**:
   - Verificar que sean precisos y completos
   - Actualizarlos cuando cambie la lógica o estructura
   - Expandirlos con información adicional relevante

2. **Añadir AI-Hints donde falten**:
   - Identificar componentes sin AI-Hints
   - Priorizar áreas complejas o frecuentemente modificadas
   - Asegurar cobertura en puntos críticos del sistema

3. **Optimizar la estructura**:
   - Seguir un formato consistente
   - Proporcionar información concisa pero completa
   - Incluir relaciones y contexto

#### Ejemplo de AI-Hints refinados:

```typescript
// Antes
// AI-Hint Component: [TaskService] [Gestiona operaciones CRUD de tareas] [Incluye lógica de negocio]

// Después
// AI-Hint Component: [TaskService] [Gestiona operaciones CRUD de tareas con filtrado avanzado y análisis IA] [Central para lógica de negocio de tareas]
// AI-Hint Flow: [Creación de tarea] [Validar → Guardar → Analizar con IA → Aplicar sugerencias] [Seguridad: verifica permisos de proyecto]
// AI-Hint Business: [Permisos de tareas] [Creador, asignado y miembros de proyecto con rol adecuado] [Edición requiere permisos específicos]
```

### Optimizaciones de configuración

La configuración de `.cursor.json` y `.mcp` puede refinarse basándose en la experiencia real de desarrollo:

1. **Actualizar puntos de entrada**:
   - Identificar archivos clave descubiertos durante el desarrollo
   - Añadir nuevos puntos de entrada relevantes
   - Eliminar puntos que ya no son críticos

2. **Refinar patrones**:
   - Documenta patrones arquitectónicos emergentes
   - Actualiza descripciones basadas en implementación real
   - Añade nuevos patrones descubiertos

3. **Mejorar integración MCP**:
   - Ajustar configuraciones basadas en uso real
   - Optimizar parámetros de caché y timeout
   - Añadir nuevos recursos o modelos identificados

#### Ejemplo de configuración `.cursor.json` refinada:

```json
{
  "project": {
    "name": "TaskFlow",
    "description": "Aplicación de gestión de tareas con capacidades de IA",
    "version": "0.2.0"
  },
  "context": {
    "entryPoints": [
      "frontend/src/index.tsx",
      "backend/src/server.ts",
      "backend/src/services/TaskService.ts",
      "backend/src/services/AIService.ts",
      "frontend/src/components/TaskBoard/TaskBoard.tsx"
    ],
    "criticalPaths": [
      "frontend/src/components",
      "frontend/src/store",
      "backend/src/api",
      "backend/src/services",
      "backend/src/models"
    ],
    "documentation": [
      "docs/index.md",
      "docs/architecture/architecture.md",
      "docs/api/api.md"
    ]
  },
  "aiHints": {
    "architecture": {
      "frontend": "React SPA with Redux and React Router",
      "backend": "Express API with MongoDB following Clean Architecture",
      "communication": "REST API with JWT auth and real-time updates"
    },
    "patterns": [
      "Feature-based organization for frontend",
      "Repository pattern for data access",
      "Service layer for business logic",
      "AI-assisted features via MCP integration"
    ],
    "terminology": {
      "Task": "Unidad de trabajo con título, descripción, estado y prioridad",
      "Project": "Agrupación de tareas con miembros y permisos",
      "Workload": "Análisis de carga de trabajo y distribución de tareas"
    }
  },
  "files": {
    "include": ["**/*.{ts,tsx,js,jsx,json,md}"],
    "exclude": [
      "**/node_modules/**", 
      "**/dist/**", 
      "**/build/**",
      "**/*.test.{ts,tsx}",
      "**/.git/**"
    ]
  }
}
```

### Medición de eficiencia

Es importante evaluar objetivamente la eficiencia del enfoque de desarrollo asistido por IA. Algunas métricas a considerar:

1. **Tiempo de desarrollo**:
   - Tiempo promedio por tarea
   - Comparación con desarrollo tradicional
   - Reducción en iteraciones

2. **Calidad del código**:
   - Errores/bugs encontrados
   - Cobertura de pruebas
   - Mantenibilidad del código (métricas como complejidad ciclomática)

3. **Eficiencia de la IA**:
   - Precisión de las sugerencias
   - Tiempo de respuesta
   - Relevancia del código generado

#### Ejemplo de análisis de eficiencia:

```markdown
# Análisis de Eficiencia del Desarrollo

## Métricas de tiempo
- **Implementación de modelos**: 2 horas (estimado tradicional: 4 horas)
- **Implementación de servicios**: 4 horas (estimado tradicional: 8 horas)
- **Implementación de API**: 3 horas (estimado tradicional: 6 horas)

## Calidad del código
- **Cobertura de pruebas**: 85%
- **Problemas de linting**: 0
- **Bugs encontrados en QA**: 2

## Eficiencia de la IA
- **Código aceptado sin modificaciones**: 75%
- **Código que requirió modificaciones menores**: 20%
- **Código que requirió reescritura**: 5%

## Patrones de eficiencia
- AI-Hints resultaron especialmente útiles en componentes complejos
- La configuración MCP aumentó significativamente la precisión para análisis de tareas
- El uso de diagramas Mermaid en la documentación mejoró la comprensión de la arquitectura
```

### Próximos pasos

Una vez completada la implementación básica, hay varias direcciones para continuar el desarrollo:

1. **Expansión de funcionalidades**:
   - Implementar notificaciones en tiempo real
   - Añadir más visualizaciones (gráficos de Gantt, líneas de tiempo)
   - Desarrollar reportes y estadísticas avanzadas

2. **Mejoras de experiencia de usuario**:
   - Optimizar la interfaz para diferentes dispositivos
   - Implementar temas personalizables
   - Mejorar accesibilidad (WCAG AA)

3. **Integración y extensibilidad**:
   - Añadir APIs para integración con otras herramientas
   - Desarrollar un sistema de plugins
   - Implementar webhooks para eventos

4. **Mejoras en IA**:
   - Entrenar modelos más específicos para el dominio
   - Ampliar capacidades predictivas
   - Implementar asistentes conversacionales para tareas