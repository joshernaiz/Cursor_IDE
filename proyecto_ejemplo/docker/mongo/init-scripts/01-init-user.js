// AI-Hint: Script de inicialización MongoDB para TaskFlow
// Crea usuario de aplicación y configuración inicial de la base de datos
// Se ejecuta automáticamente al inicializar el contenedor MongoDB

// Cambiar a la base de datos de la aplicación
db = db.getSiblingDB(process.env.MONGO_DB || 'taskflow');

// Crear usuario de aplicación con permisos específicos
db.createUser({
  user: 'taskflow_app',
  pwd: process.env.MONGO_APP_PASSWORD || 'taskflow_password123',
  roles: [
    {
      role: 'readWrite',
      db: process.env.MONGO_DB || 'taskflow'
    },
    {
      role: 'dbAdmin',
      db: process.env.MONGO_DB || 'taskflow'
    }
  ]
});

// Crear colecciones iniciales con esquemas de validación
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['email', 'password', 'createdAt'],
      properties: {
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
          description: 'Email debe ser válido'
        },
        password: {
          bsonType: 'string',
          minLength: 8,
          description: 'Password debe tener al menos 8 caracteres'
        },
        firstName: {
          bsonType: 'string',
          description: 'Nombre del usuario'
        },
        lastName: {
          bsonType: 'string',
          description: 'Apellido del usuario'
        },
        role: {
          bsonType: 'string',
          enum: ['admin', 'user', 'manager'],
          description: 'Rol del usuario'
        },
        isActive: {
          bsonType: 'bool',
          description: 'Si el usuario está activo'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Fecha de creación'
        },
        updatedAt: {
          bsonType: 'date',
          description: 'Fecha de actualización'
        }
      }
    }
  }
});

db.createCollection('tasks', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'status', 'createdBy', 'createdAt'],
      properties: {
        title: {
          bsonType: 'string',
          minLength: 1,
          maxLength: 200,
          description: 'Título de la tarea'
        },
        description: {
          bsonType: 'string',
          maxLength: 2000,
          description: 'Descripción de la tarea'
        },
        status: {
          bsonType: 'string',
          enum: ['todo', 'in_progress', 'review', 'done', 'cancelled'],
          description: 'Estado de la tarea'
        },
        priority: {
          bsonType: 'string',
          enum: ['low', 'medium', 'high', 'urgent'],
          description: 'Prioridad de la tarea'
        },
        category: {
          bsonType: 'string',
          description: 'Categoría de la tarea'
        },
        dueDate: {
          bsonType: 'date',
          description: 'Fecha límite'
        },
        estimatedTime: {
          bsonType: 'number',
          minimum: 0,
          description: 'Tiempo estimado en minutos'
        },
        actualTime: {
          bsonType: 'number',
          minimum: 0,
          description: 'Tiempo real empleado en minutos'
        },
        tags: {
          bsonType: 'array',
          items: {
            bsonType: 'string'
          },
          description: 'Etiquetas de la tarea'
        },
        createdBy: {
          bsonType: 'objectId',
          description: 'ID del usuario que creó la tarea'
        },
        assignedTo: {
          bsonType: 'objectId',
          description: 'ID del usuario asignado'
        },
        projectId: {
          bsonType: 'objectId',
          description: 'ID del proyecto'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Fecha de creación'
        },
        updatedAt: {
          bsonType: 'date',
          description: 'Fecha de actualización'
        }
      }
    }
  }
});

db.createCollection('projects', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'status', 'createdBy', 'createdAt'],
      properties: {
        name: {
          bsonType: 'string',
          minLength: 1,
          maxLength: 100,
          description: 'Nombre del proyecto'
        },
        description: {
          bsonType: 'string',
          maxLength: 1000,
          description: 'Descripción del proyecto'
        },
        status: {
          bsonType: 'string',
          enum: ['planning', 'active', 'on_hold', 'completed', 'cancelled'],
          description: 'Estado del proyecto'
        },
        startDate: {
          bsonType: 'date',
          description: 'Fecha de inicio'
        },
        endDate: {
          bsonType: 'date',
          description: 'Fecha de finalización'
        },
        members: {
          bsonType: 'array',
          items: {
            bsonType: 'objectId'
          },
          description: 'IDs de los miembros del proyecto'
        },
        createdBy: {
          bsonType: 'objectId',
          description: 'ID del usuario que creó el proyecto'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Fecha de creación'
        },
        updatedAt: {
          bsonType: 'date',
          description: 'Fecha de actualización'
        }
      }
    }
  }
});

// Crear índices para optimización
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: 1 });

db.tasks.createIndex({ createdBy: 1 });
db.tasks.createIndex({ assignedTo: 1 });
db.tasks.createIndex({ projectId: 1 });
db.tasks.createIndex({ status: 1 });
db.tasks.createIndex({ dueDate: 1 });
db.tasks.createIndex({ createdAt: 1 });

db.projects.createIndex({ createdBy: 1 });
db.projects.createIndex({ members: 1 });
db.projects.createIndex({ status: 1 });
db.projects.createIndex({ createdAt: 1 });

print('✅ MongoDB inicializada correctamente para TaskFlow');
print('  - Usuario de aplicación creado');
print('  - Colecciones con validación creadas');
print('  - Índices optimizados creados'); 