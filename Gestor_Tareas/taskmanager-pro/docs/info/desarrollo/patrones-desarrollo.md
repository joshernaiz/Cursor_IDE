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

---

## AI-Hints Obligatorios

### 📝 Formato Estándar de AI-Hints

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

**Ejemplo completo de AI-Hint**:
```python
# AI-Hint: Servicio de autenticación con JWT | Depende de UserService y PasswordService | Usa bcrypt para hashing y python-jose para JWT | TODO: Implementar refresh tokens y rate limiting
```

---

**Creado**: 2024-12-19  
**Estado**: ✅ Completado  
**Fuente**: Memoria de contexto patterns.md

<!-- AI-Hint: Documentación de patrones TaskManager Pro | Guía para desarrollo consistente | AI-Hints obligatorios y convenciones | TODO: Completar con ejemplos detallados de código -->
