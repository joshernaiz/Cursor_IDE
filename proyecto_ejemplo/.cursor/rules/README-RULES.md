# Sistema de Cursor Rules - TaskFlow

## Estado Actual de las Reglas

### ✅ Reglas Configuradas Correctamente

| Archivo | Tipo | Estado | Descripción |
|---------|------|--------|-------------|
| `project-main.mdc` | **Always Applied** | ✅ Activo | Reglas principales del proyecto |
| `frontend/react-components.mdc` | **Auto Attached** | ✅ Activo | Reglas para componentes React |
| `backend/api-design.mdc` | **Auto Attached** | ✅ Activo | Reglas para APIs RESTful |
| `ai/ai-integration.mdc` | **Auto Attached** | ✅ Activo | Reglas para servicios de IA |
| `testing/test-standards.mdc` | **Agent Requested** | ✅ Disponible | Estándares de testing |
| `docker-deployment.mdc` | **Agent Requested** | ✅ Disponible | Configuración Docker |
| `manual-usage.mdc` | **Manual** | ✅ Disponible | Guía de uso manual |
| `architecture-principles.mdc` | **Agent Requested** | ✅ Disponible | Principios arquitectónicos y de diseño |

## Tipos de Reglas Implementadas

### 1. Always Applied
- **`project-main.mdc`**: Se aplica automáticamente a todo el proyecto
- Establece convenciones fundamentales, tecnologías aprobadas y AI-Hints obligatorios

### 2. Auto Attached
Se activan automáticamente según patrones de archivos:

- **`frontend/react-components.mdc`**: 
  - Patrones: `frontend/**/*.tsx`, `frontend/**/*.ts`, `**/components/**/*`
  - Reglas específicas para React, hooks, Tailwind CSS

- **`backend/api-design.mdc`**: 
  - Patrones: `backend/**/*.ts`, `**/api/**/*`, `**/routes/**/*`, `**/controllers/**/*`
  - Reglas para APIs RESTful, validación Zod, manejo de errores

- **`ai/ai-integration.mdc`**: 
  - Patrones: `**/ai/**/*`, `**/*ai*`, `**/mcp/**/*`, `**/.mcp/**/*`
  - Reglas para servicios de IA, configuración MCP, fallbacks

### 3. Agent Requested
Disponibles para que la IA las incluya cuando sea relevante:

- **`testing/test-standards.mdc`**: Estándares de testing (unit, integration, E2E)
- **`docker-deployment.mdc`**: Configuración Docker y despliegue
- **`architecture-principles.mdc`**: Principios arquitectónicos extraídos de planes de diseño e implementación

### 4. Manual
- **`manual-usage.mdc`**: Guía de uso disponible con `@manual-usage`

## Cómo Usar las Reglas

### Comandos Útiles en el Chat

```bash
# Para aplicar patrones específicos
"Crea un nuevo componente React siguiendo nuestras reglas"
"Implementa un endpoint API siguiendo nuestros patrones"
"Añade AI-Hints apropiados a este código"
"Configura Docker para este servicio"
"Crea tests siguiendo nuestros estándares"

# Para consultar reglas manualmente
@manual-usage
```

### AI-Hints Obligatorios

Según las reglas principales, todo código debe incluir AI-Hints apropiados:

```typescript
// AI-Hint Component: [ComponentName] [Propósito] [Responsabilidades]
// AI-Hint Flow: [ProcessName] [Pasos del proceso] [Consideraciones especiales]
// AI-Hint Data: [ModelName] [Estructura de datos] [Validaciones y relaciones]
// AI-Hint Security: [SecurityAspect] [Protecciones implementadas] [Consideraciones]
// AI-Hint Testing: [TestType] [Qué se prueba] [Estrategia de testing]
```

## Tecnologías Estandarizadas

### Frontend
- React 18+ con hooks
- TypeScript 5+
- Tailwind CSS para estilos
- Framer Motion para animaciones

### Backend
- Node.js con Express
- TypeScript
- MongoDB con Mongoose
- JWT para autenticación
- Zod para validación de esquemas

### Testing
- Jest para pruebas unitarias
- React Testing Library para componentes
- Supertest para API testing

## Beneficios del Sistema

1. **Consistencia**: Código uniforme en todo el proyecto
2. **Calidad**: Mejores prácticas aplicadas automáticamente
3. **Eficiencia**: Menos tiempo explicando contexto a la IA
4. **Escalabilidad**: Fácil incorporación de nuevos desarrolladores
5. **Documentación Viva**: Las reglas se mantienen actualizadas con el código

## Personalización

Para adaptar estas reglas a tu proyecto:

1. **Modifica las tecnologías** en `project-main.mdc`
2. **Ajusta los patrones glob** en las reglas Auto Attached
3. **Añade nuevas reglas** específicas para tu dominio
4. **Actualiza los AI-Hints** según tus necesidades

## Resolución de Problemas

Si las reglas no se aplican correctamente:

1. Verifica que los archivos estén en `.cursor/rules/`
2. Revisa la sintaxis de la metadata YAML
3. Confirma que los patrones glob coincidan con tus archivos
4. Reinicia Cursor IDE si es necesario

---

**Nota**: Este sistema demuestra todas las capacidades de Cursor Rules mencionadas en la guía del curso, proporcionando un ejemplo práctico y completo para el desarrollo con IA. 