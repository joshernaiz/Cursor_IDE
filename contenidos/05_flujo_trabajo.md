# 5. Flujo de Trabajo Completo

## 5.1. Inicialización Automática del Proyecto

El nuevo flujo de trabajo simplificado comienza con una inicialización automática que crea toda la estructura necesaria para el desarrollo eficiente con IA. Este enfoque elimina la necesidad de múltiples prompts separados y proporciona un punto de partida consistente para cualquier proyecto.

### Uso del script init_base_doc.sh

El script `init_base_doc.sh` automatiza la creación de la estructura base del proyecto, incluyendo directorios .cursor, archivos de configuración y la descarga del prompt genérico desde GitHub. Este enfoque garantiza consistencia y reduce el tiempo de configuración inicial.

#### Proceso de ejecución:

1. **Preparación del entorno**:
   - Navega hasta el directorio raíz de tu proyecto
   - Asegúrate de tener permisos de escritura en el directorio
   - Verifica que tengas `curl` o `wget` disponible para descargas
   - Opcional: Inicializa un repositorio git si aún no existe

2. **Ejecución del script**:
   ```bash
   # Descargar el script (si no lo tienes localmente)
   curl -O https://raw.githubusercontent.com/joshernaiz/Cursor_IDE/main/prompts/base/scripts/init_base_doc.sh
   
   # Dar permisos de ejecución
   chmod +x init_base_doc.sh
   
   # Ejecutar el script
   ./init_base_doc.sh
   ```

3. **Verificación de resultados**:
   - Revisa la estructura de directorios creada
   - Confirma que el prompt genérico se descargó correctamente
   - Verifica que todos los archivos template están en su lugar

#### Estructura creada por el script:

El script automáticamente genera:

- **Directorio .cursor/**:
  - `rules/base.mdc` - Reglas de optimización de memoria y contexto
  - `rules/task_execution.mdc` - Metodología para ejecutar tareas TODO
  - `rules/documentation_access.mdc` - Estrategias de acceso a documentación
  - `memory/long_memory/` - Archivos de memoria permanente para la IA

- **Directorio docs/**:
  - `base_prompt/base_prompt.md` - Prompt genérico descargado desde GitHub
  - Estructura preparada para documentación del proyecto

- **Archivos de memoria permanente**:
  - `project_brief.md` - Resumen ejecutivo del proyecto
  - `architecture.md` - Documentación de arquitectura del sistema
  - `decisions.md` - Registro de decisiones arquitectónicas y técnicas  
  - `patterns.md` - Patrones de código y convenciones de desarrollo

### Beneficios de la inicialización automática

La inicialización automática mediante el script proporciona múltiples ventajas:

1. **Consistencia**: Todos los proyectos inician con la misma estructura base
2. **Eficiencia**: Se reduce el tiempo de configuración inicial de horas a minutos
3. **Actualización automática**: El prompt genérico siempre se descarga en su versión más reciente
4. **Flexibilidad**: La estructura base es adaptable a cualquier tipo de proyecto

## 5.2. Generación de Estructura Personalizada

Una vez inicializada la estructura base, el siguiente paso es personalizar todo el contenido según las necesidades específicas del proyecto utilizando el prompt genérico descargado automáticamente.

### Uso del prompt genérico base_prompt.md

El archivo `docs/base_prompt/base_prompt.md` descargado contiene un prompt integral que genera automáticamente toda la estructura .cursor personalizada para cualquier proyecto, incluyendo reglas de comportamiento, memoria de contexto y lista de tareas ejecutables.

#### Proceso de ejecución:

1. **Preparación de requisitos del proyecto**:
   - Define claramente qué tipo de proyecto vas a desarrollar
   - Identifica el stack tecnológico que utilizarás
   - Recopila los requisitos funcionales principales
   - Establece las restricciones y consideraciones especiales

2. **Uso del prompt genérico**:
   - Copia el contenido completo de `docs/base_prompt/base_prompt.md`
   - Al final del prompt, agrega los requisitos específicos de tu proyecto
   - Ejecuta el prompt completo en Cursor
   - La IA generará automáticamente todos los archivos personalizados

3. **Aplicación de resultados**:
   - Copia cada archivo generado a su ubicación correspondiente
   - Verifica que todo el contenido esté personalizado para tu proyecto
   - Ajusta detalles específicos si es necesario

#### Elementos que genera automáticamente:

El prompt genérico produce una estructura completa que incluye:

- **8 archivos .cursor personalizados**:
  - 3 archivos de reglas (base.mdc, task_execution.mdc, documentation_access.mdc)
  - 4 archivos de memoria permanente (project_brief.md, architecture.md, decisions.md, patterns.md)
  - 1 archivo TODO.md con lista ejecutable de tareas

- **Contenido específico del proyecto**:
  - Tecnologías y stack tecnológico definidos
  - Patrones de código usando los lenguajes del proyecto
  - Decisiones arquitectónicas relevantes
  - Convenciones de desarrollo apropiadas
  - AI-Hints estratégicos para el contexto del proyecto

## 5.3. Ejecución Estructurada de Tareas

Con la estructura .cursor personalizada en su lugar, el desarrollo se vuelve altamente eficiente siguiendo la metodología definida en las reglas generadas automáticamente.

### Uso del archivo TODO.md generado

El archivo `docs/TODO.md` generado automáticamente contiene una lista completa de tareas específicas, atómicas y organizadas según la arquitectura y tecnologías de tu proyecto específico.

#### Proceso de ejecución:

1. **Metodología establecida automáticamente**:
   - Las reglas en `.cursor/rules/task_execution.mdc` definen la metodología
   - Formato estándar: `Ejecutar tarea: {{TASK}} del archivo {{FILEMD}}`
   - Ejemplo: `Ejecutar tarea: 2.3 del archivo TODO.md`

2. **Ejecución paso a paso**:
   - La IA sigue automáticamente el proceso de 4 fases:
     - **Análisis inicial**: Lee el TODO.md y analiza la tarea específica
     - **Planificación**: Divide en subtareas y define criterios de éxito
     - **Implementación**: Genera código con AI-Hints obligatorios
     - **Documentación**: Actualiza `docs/info/` y marca como completado

3. **Seguimiento automático**:
   - Cada tarea genera documentación en `docs/info/`
   - Se actualiza automáticamente el índice maestro `docs/info/index.md`
   - Se marcan subtareas como completadas en el TODO.md

#### Características del TODO.md generado:

El archivo TODO.md creado automáticamente incluye:

- **Tareas específicas y atómicas**: Cada tarea es concreta, verificable y completable en 1-2 horas
- **Organización por módulos**: Agrupadas según la arquitectura específica del proyecto
- **Secuencia lógica**: Orden que respeta dependencias técnicas del stack elegido
- **Formato de checklist**: Facilita seguimiento visual del progreso
- **Integración con documentación**: Cada tarea incluye actualización automática de `docs/info/`
- **AI-Hints obligatorios**: Todas las tareas de implementación incluyen generación de AI-Hints

## 5.4. Mantenimiento y Evolución

Una vez implementado el sistema básico, el flujo de trabajo se enfoca en el mantenimiento continuo y la evolución del proyecto, aprovechando la estructura .cursor establecida.

### Evolución continua del sistema

El sistema .cursor generado está diseñado para evolucionar junto con el proyecto, manteniendo siempre la eficiencia en el desarrollo con IA.

#### Áreas de evolución continua:

1. **Actualización de documentación**:
   - Mantener actualizada la información en `docs/info/`
   - Refinar el índice maestro conforme crece la documentación
   - Añadir nuevas categorías de documentación según necesidades

2. **Refinamiento de AI-Hints**:
   - Mejorar AI-Hints basándose en la experiencia de uso
   - Añadir contexto adicional donde la IA necesite más información
   - Actualizar AI-Hints cuando cambie la arquitectura o funcionalidad

3. **Optimización de reglas .cursor**:
   - Ajustar reglas de memoria basándose en patrones de uso reales
   - Añadir nuevas reglas específicas que emerjan durante el desarrollo
   - Optimizar la eficiencia de acceso a documentación

#### Beneficios del flujo simplificado:

Este nuevo enfoque proporciona ventajas significativas:

1. **Eficiencia mejorada**:
   - Un solo script crea toda la estructura base
   - Un solo prompt genera toda la personalización
   - Eliminación de múltiples pasos manuales

2. **Consistencia garantizada**:
   - Estructura estándar para todos los proyectos
   - Metodología uniforme de desarrollo
   - Patrones de AI-Hints consistentes

3. **Escalabilidad del sistema**:
   - Fácil adaptación a proyectos de cualquier tamaño
   - Estructura evolutiva que crece con el proyecto
   - Reutilización de patrones exitosos

4. **Reducción de errores**:
   - Menos pasos manuales significa menos oportunidades de error
   - Estructura pre-validada y probada
   - Documentación automáticamente consistente

### Flujo de trabajo diario simplificado

Una vez establecida la estructura .cursor, el trabajo diario sigue un flujo altamente optimizado y predecible.

#### Ciclo de desarrollo diario:

1. **Identificar siguiente tarea**:
   - Revisar `docs/TODO.md` para la siguiente tarea pendiente
   - Verificar que las dependencias estén completadas
   - Entender el contexto específico de la tarea

2. **Ejecutar tarea con metodología establecida**:
   ```
   Ejecutar tarea: [NÚMERO] del archivo TODO.md
   ```
   - La IA automáticamente sigue la metodología definida en `.cursor/rules/`
   - Genera código con AI-Hints obligatorios
   - Documenta automáticamente en `docs/info/`

3. **Validación automática**:
   - El proceso incluye pruebas automáticas según las reglas establecidas
   - Se actualizan los archivos de memoria permanente si es necesario
   - Se marca la tarea como completada en el TODO.md

4. **Evolución continua**:
   - La estructura .cursor se refina basándose en el uso real
   - Los AI-Hints mejoran la eficiencia en sesiones futuras
   - La documentación crece orgánicamente con el proyecto

#### Prácticas recomendadas para maximizar eficiencia:

1. **Seguir la metodología establecida**:
   - Usar siempre el formato: `Ejecutar tarea: X.Y del archivo TODO.md`
   - Confiar en las reglas .cursor generadas automáticamente
   - Permitir que la IA siga el proceso de 4 fases definido

2. **Mantener AI-Hints actualizados**:
   - Los AI-Hints se generan automáticamente con el formato estándar
   - Actualizar cuando la funcionalidad o arquitectura cambie
   - Añadir contexto adicional donde sea necesario

3. **Documentación incremental**:
   - Cada tarea automáticamente actualiza `docs/info/`
   - Revisar periódicamente el índice maestro
   - Mantener las categorías organizadas y relevantes

4. **Evolución basada en uso real**:
   - Refinar reglas .cursor basándose en la experiencia
   - Ajustar patrones de memoria según necesidades reales
   - Optimizar el flujo conforme el proyecto crece

### Ejemplos prácticos del nuevo flujo

#### Ejemplo completo: De script inicial a implementación

**Paso 1: Inicialización automática**

```bash
# Clonar o crear directorio del proyecto
mkdir mi-nuevo-proyecto && cd mi-nuevo-proyecto

# Ejecutar script de inicialización
curl -O https://raw.githubusercontent.com/joshernaiz/Cursor_IDE/main/prompts/base/scripts/init_base_doc.sh
chmod +x init_base_doc.sh
./init_base_doc.sh

# Resultado: Estructura completa creada automáticamente
```

**Paso 2: Personalización con prompt genérico**

```markdown
[Copiar contenido completo de docs/base_prompt/base_prompt.md y añadir al final:]

## INFORMACIÓN DEL PROYECTO A PROCESAR

**Proyecto**: API de Gestión de Inventarios
**Stack**: Node.js + Express + MongoDB + React
**Funcionalidades principales**:
- Gestión de productos (CRUD)
- Control de stock y alertas
- Dashboard de reportes
- Autenticación JWT
- API REST con documentación OpenAPI

**Arquitectura**: Microservicios con API Gateway
**Usuarios**: Administradores de almacén y gerentes
**Restricciones**: Debe ser escalable y soportar 1000+ productos
```

**Resultado**: 8 archivos .cursor personalizados generados automáticamente

**Paso 3: Desarrollo siguiendo el TODO.md generado**

```markdown
# En Cursor IDE, simplemente escribir:
Ejecutar tarea: 1.1 del archivo TODO.md

# La IA automáticamente:
# 1. Lee el TODO.md y analiza la tarea 1.1
# 2. Planifica subtareas específicas
# 3. Implementa con AI-Hints automáticos
# 4. Documenta en docs/info/ y actualiza índice
# 5. Marca como completado en TODO.md
```

#### Comparación: Antes vs Ahora

**Flujo anterior (4 prompts separados)**:
- ⏱️ 2-4 horas de configuración inicial
- 📝 4 prompts diferentes para ejecutar
- 🔄 Múltiples pasos manuales
- 📋 Documentos separados que mantener sincronizados

**Nuevo flujo simplificado**:
- ⚡ 5 minutos de configuración inicial
- 🎯 1 script + 1 prompt = todo listo
- 🤖 Metodología automática establecida
- 📚 Documentación que crece automáticamente

#### Métricas de eficiencia

El nuevo flujo reduce significativamente:
- **Tiempo de setup**: De 2-4 horas a 5-10 minutos
- **Comandos manuales**: De 20+ pasos a 2 comandos
- **Errores de configuración**: Eliminados por automatización
- **Inconsistencias**: Estructura estándar garantizada

#### Escalabilidad

Este sistema escala eficientemente:
- **Proyectos pequeños**: Setup completo en minutos
- **Proyectos medianos**: Metodología robusta establecida
- **Proyectos grandes**: Documentación y memoria que evoluciona
- **Equipos**: Estructura consistente para todos los desarrolladores

### Resumen del capítulo

El flujo de trabajo completo se ha simplificado radicalmente, pasando de un proceso manual de múltiples pasos a un sistema automatizado y eficiente:

1. **🚀 Inicialización**: Un script crea toda la estructura y descarga el prompt genérico
2. **🎯 Personalización**: Un prompt genera automáticamente 8 archivos .cursor específicos del proyecto  
3. **⚡ Ejecución**: Metodología establecida para desarrollo eficiente con IA
4. **🔄 Evolución**: Sistema que mejora continuamente basándose en uso real

Este enfoque maximiza la eficiencia del desarrollo con IA mientras mantiene la calidad y consistencia en todos los proyectos.
```typescript
// src/services/auth.service.ts

// AI-Hint Architecture: [Service Layer] [Implementa lógica de autenticación y autorización] [Sigue patrón singleton]

// AI-Hint Component: [AuthService] [Gestiona autenticación, tokens JWT y permisos] [Central para seguridad de la app]

import { User, IUser } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config';

export class AuthService {
  private static instance: AuthService;
  
  private constructor() {}
  
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
  
  // Métodos a implementar:
  // - registerUser
  // - loginUser
  // - verifyToken
  // - refreshToken
  // - hashPassword
  // - comparePassword
}
```

#### 2. Implementar métodos de hash y comparación
```typescript
// Añadir a AuthService:

// AI-Hint Security: [Password hashing] [Usa bcrypt con salt rounds configurable] [Nunca almacena contraseñas en texto plano]
public async hashPassword(password: string): Promise<string> {
  const saltRounds = config.security.saltRounds || 10;
  return bcrypt.hash(password, saltRounds);
}

public async comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
```

#### 3. Implementar registro de usuario
```typescript
// Añadir a AuthService:

// AI-Hint Flow: [Registro de usuario] [Validar → Hash password → Crear usuario → Generar token] [Evita duplicados por email]
public async registerUser(userData: Partial<IUser>): Promise<{user: Partial<IUser>, token: string}> {
  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('Email already registered');
  }
  
  // Hash del password
  const hashedPassword = await this.hashPassword(userData.password);
  
  // Crear nuevo usuario
  const user = new User({
    ...userData,
    password: hashedPassword,
    role: userData.role || 'user'
  });
  
  await user.save();
  
  // Generar token
  const token = this.generateToken(user);
  
  // Devolver usuario (sin password) y token
  const userResponse = user.toObject();
  delete userResponse.password;
  
  return { user: userResponse, token };
}
```

#### 4. Pruebas para registro de usuario
```typescript
// tests/auth.service.test.ts

import { AuthService } from '../src/services/auth.service';
import { User } from '../src/models/user.model';
import mongoose from 'mongoose';

// Mock de dependencias
jest.mock('../src/models/user.model');

describe('AuthService - registerUser', () => {
  let authService: AuthService;
  
  beforeEach(() => {
    authService = AuthService.getInstance();
    jest.clearAllMocks();
  });
  
  it('should register a new user successfully', async () => {
    // Arrange
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'securepassword'
    };
    
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (User.prototype.save as jest.Mock).mockResolvedValue(userData);
    
    // Act
    const result = await authService.registerUser(userData);
    
    // Assert
    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('token');
    expect(result.user).not.toHaveProperty('password');
    expect(User.prototype.save).toHaveBeenCalled();
  });
  
  it('should throw error if email already exists', async () => {
    // Arrange
    const userData = {
      name: 'Test User',
      email: 'existing@example.com',
      password: 'securepassword'
    };
    
    (User.findOne as jest.Mock).mockResolvedValue({ email: 'existing@example.com' });
    
    // Act & Assert
    await expect(authService.registerUser(userData)).rejects.toThrow('Email already registered');
  });
});
```

#### 5. Documentación de API
```markdown
# Auth API

## Register User

**Endpoint:** `POST /api/auth/register`

**Description:** Registers a new user in the system

**Request Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "60d21b4667d0d8992e610c85",
      "name": "User Name",
      "email": "user@example.com",
      "role": "user",
      "createdAt": "2023-06-22T17:32:28Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**

- **409 Conflict:** Email already registered
- **400 Bad Request:** Invalid input data
```