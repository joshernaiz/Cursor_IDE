# Prompt para Configuración y Uso de MCP Servers

Eres un ingeniero DevOps especializado en infraestructura como código y configuración de servidores. Quiero que generes una configuración completa para los MCP Servers (Model Control Protocol) que se utilizarán en este proyecto, facilitando la comunicación eficiente entre Cursor IDE y recursos externos.

## Objetivo
Crear una configuración `.mcp` que permita a Cursor IDE conectarse a servidores MCP, optimizando el acceso a recursos externos, modelos de IA específicos, y herramientas compartidas del proyecto.

## Estructura del directorio `.mcp`

```
.mcp/
├── config.json             # Configuración principal
├── README.md               # Documentación de uso
├── schemas/                # Esquemas JSON para validación
│   └── *.schema.json
├── resources/              # Recursos específicos
│   ├── data/               # Datos de referencia
│   ├── templates/          # Plantillas
│   └── models/             # Configuración de modelos IA
└── scripts/                # Scripts de utilidad
    └── setup.sh            # Script de configuración
```

## Configuración principal (config.json)

```json
{
  "version": "1.0",
  "project": {
    "id": "NOMBRE_PROYECTO",
    "description": "DESCRIPCIÓN_BREVE"
  },
  "servers": [
    {
      "id": "primary",
      "url": "https://mcp.ejemplo.com/api",
      "auth": {
        "type": "token",
        "envVar": "MCP_API_TOKEN"
      },
      "resources": [
        {
          "name": "data",
          "path": "/data",
          "description": "Datos de referencia y entrenamiento"
        },
        {
          "name": "models",
          "path": "/models",
          "description": "Modelos de IA disponibles"
        },
        {
          "name": "tools",
          "path": "/tools",
          "description": "Herramientas específicas del proyecto"
        }
      ]
    }
  ],
  "settings": {
    "cacheEnabled": true,
    "cacheTTL": 3600,
    "requestTimeout": 30000,
    "maxRetries": 3,
    "logLevel": "info"
  },
  "models": [
    {
      "id": "domain-specific",
      "provider": "anthropic",
      "description": "Modelo entrenado para este dominio específico",
      "contextLength": 100000,
      "endpoint": "/models/domain-specific"
    }
  ]
}
```

## Elementos a configurar

1. **Información del Proyecto**
   - ID único para el proyecto
   - Descripción concisa

2. **Configuración de Servidores**
   - URL de los servidores MCP
   - Métodos de autenticación
   - Recursos disponibles en cada servidor

3. **Recursos**
   - Datos de referencia
   - Modelos de IA específicos
   - Herramientas y utilitarios

4. **Configuración de Cliente**
   - Opciones de caché
   - Timeouts y reintentos
   - Niveles de logging

5. **Modelos de IA**
   - Descripciones de modelos disponibles
   - Parámetros específicos de cada modelo
   - Endpoints para acceder a ellos

## Contenido del README.md

El archivo README.md dentro de la carpeta `.mcp` debe incluir:

1. **Introducción a MCP Servers**
   - Qué son y cómo funcionan
   - Beneficios para el proyecto actual

2. **Configuración inicial**
   - Requisitos de acceso
   - Variables de entorno necesarias
   - Proceso de autenticación

3. **Uso desde Cursor IDE**
   - Cómo referenciar recursos MCP en el código
   - Ejemplos de uso de los diferentes recursos
   - Comandos Cursor para acceder a MCP

4. **Recursos disponibles**
   - Listado detallado de todos los recursos
   - Descripción y casos de uso de cada uno
   - Limitaciones y consideraciones

5. **Modelos de IA**
   - Descripción de modelos disponibles
   - Escenarios de uso recomendados
   - Ejemplos de prompts optimizados

6. **Troubleshooting**
   - Problemas comunes y soluciones
   - Procedimientos de diagnóstico
   - Contactos de soporte

## Script de configuración (setup.sh)

El script `setup.sh` debe incluir:

1. **Verificación de requisitos**
   - Comprobar acceso a MCP servers
   - Verificar variables de entorno
   - Validar permisos

2. **Configuración de entorno**
   - Crear variables de entorno necesarias
   - Configurar el archivo `.cursor.json` para integración con MCP
   - Sincronizar recursos iniciales

3. **Prueba de conexión**
   - Validar acceso a todos los recursos
   - Verificar autenticación
   - Comprobar velocidad de respuesta

## Instrucciones y recomendaciones

1. **Seguridad**
   - Nunca incluir tokens o claves en los archivos de configuración
   - Usar variables de entorno para credenciales
   - Implementar rotación periódica de claves

2. **Rendimiento**
   - Configurar caché apropiado para recursos estáticos
   - Optimizar tamaños de batch para modelos de IA
   - Establecer timeouts adecuados

3. **Monitoreo**
   - Habilitar logs adecuados
   - Configurar alertas para fallos de conexión
   - Implementar métricas de uso

4. **Escalabilidad**
   - Estructurar recursos para permitir crecimiento
   - Separar configuraciones por entorno (dev/staging/prod)
   - Documentar proceso de adición de nuevos recursos

## Integración con Cursor IDE

Para asegurar que Cursor IDE pueda utilizar correctamente los MCP Servers, actualiza el archivo `.cursor.json` con esta configuración:

```json
{
  "project": {
    "name": "NOMBRE_PROYECTO"
  },
  "mcpConfig": {
    "enabled": true,
    "configPath": ".mcp/config.json",
    "defaultServerId": "primary",
    "autoAuthenticate": true
  }
}
```