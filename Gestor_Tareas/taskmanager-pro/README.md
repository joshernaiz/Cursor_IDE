# TaskManager Pro

Sistema de gestión de tareas desarrollado con React + FastAPI + MariaDB para el aprendizaje y demostración de desarrollo full-stack moderno.

## 🚀 Stack Tecnológico

### Frontend
- **React 18+** - Biblioteca de UI con hooks y componentes funcionales
- **TypeScript** - Tipado estático para mayor robustez
- **Vite** - Build tool moderno y rápido
- **Tailwind CSS** - Framework de CSS utilitario
- **React Router** - Enrutamiento del lado cliente
- **React Hook Form** - Manejo de formularios
- **Axios** - Cliente HTTP para API

### Backend
- **FastAPI 0.100+** - Framework web moderno para Python
- **SQLAlchemy** - ORM para Python
- **Pydantic** - Validation y serialización de datos
- **Alembic** - Migraciones de base de datos
- **JWT** - Autenticación basada en tokens
- **Uvicorn** - Servidor ASGI de alto rendimiento

### Base de Datos
- **MariaDB 10.11+** - Sistema de gestión de base de datos relacional
- **Docker** - Containerización para desarrollo y producción

## 🎯 Características Principales

- ✅ **Gestión completa de tareas** - CRUD con filtros y ordenamiento
- 🔐 **Autenticación JWT** - Registro, login y gestión de sesiones
- 📊 **Dashboard interactivo** - Métricas y visualización de datos
- 🎨 **Interfaz moderna** - Diseño responsive con Tailwind CSS
- 🐳 **Containerización** - Desarrollo y despliegue con Docker
- 🧪 **Testing completo** - Pruebas unitarias e integración
- 📚 **Documentación** - API autodocumentada con FastAPI

## 🛠️ Instalación y Configuración

### Prerequisitos
- Docker y Docker Compose
- Node.js 18+ (para desarrollo local)
- Python 3.11+ (para desarrollo local)

### Instalación Rápida con Docker

```bash
# Clonar el repositorio
git clone <repository-url>
cd taskmanager-pro

# Copiar variables de entorno
cp .env.example .env

# Levantar servicios
docker-compose up -d

# Acceder a la aplicación
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Desarrollo Local

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend (en otra terminal)
cd frontend
npm install
npm run dev
```

## 📁 Estructura del Proyecto

```
taskmanager-pro/
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/         # Páginas principales
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # Servicios API
│   │   └── types/         # Tipos TypeScript
│   └── package.json
├── backend/               # API FastAPI
│   ├── app/
│   │   ├── models/        # Modelos SQLAlchemy
│   │   ├── schemas/       # Esquemas Pydantic
│   │   ├── services/      # Lógica de negocio
│   │   ├── routers/       # Endpoints API
│   │   └── main.py        # Aplicación principal
│   └── requirements.txt
├── database/              # Scripts de inicialización
├── docs/                  # Documentación técnica
└── docker-compose.yml     # Orquestación de servicios
```

## 🧪 Testing

```bash
# Backend
cd backend
pytest --cov=app tests/

# Frontend
cd frontend
npm run test
npm run test:coverage
```

## 📖 Documentación

- **API Docs**: http://localhost:8000/docs (Swagger UI)
- **Documentación Técnica**: `/docs/info/`
- **Guías de Desarrollo**: `/docs/info/desarrollo/`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🎓 Propósito Educativo

TaskManager Pro está diseñado como un proyecto educativo para demostrar:
- Arquitectura de 3 capas bien estructurada
- Mejores prácticas de desarrollo full-stack
- Integración de tecnologías modernas
- Patrones de diseño y desarrollo
- Testing y documentación completa

---

**Versión**: 1.0.0  
**Última Actualización**: 2024-12-19

<!-- AI-Hint: README principal del proyecto TaskManager Pro | Documentación completa de setup y uso | Stack tecnológico detallado | TODO: Añadir badges de CI/CD, screenshots, y roadmap --> 