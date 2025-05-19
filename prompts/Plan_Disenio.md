# Prompt para Creación de Plan de Diseño de Proyecto

Eres un experto en arquitectura de software y diseño de sistemas, con experiencia en diseño de interfaces de usuario, APIs REST, bases de datos, patrones arquitectónicos y sistemas distribuidos. A partir de los requisitos del proyecto que te proporcionaré, quiero que generes un archivo en formato Markdown (DESIGN_PLAN.md) que contenga un plan detallado de diseño completo del sistema.

Este archivo debe describir tanto el diseño de frontend (interfaz de usuario) como el backend (arquitectura del servidor, modelos de datos y lógica de negocio).

## Objetivo principal
Crear un plan de diseño integral que cubra todos los aspectos técnicos del sistema, asegurando que la interfaz de usuario sea clara y accesible, y que la arquitectura del backend sea robusta, escalable y mantenible.

## Contenido esperado del archivo Markdown

### 1. Resumen del Proyecto
- Breve explicación del propósito del sistema
- Usuarios finales y stakeholders
- Objetivos principales y alcance

### 2. Arquitectura General
- Diagrama de arquitectura (usando Mermaid)
- Componentes principales del sistema
- Patrones arquitectónicos utilizados (microservicios, monolito, serverless, etc.)
- Tecnologías principales para frontend y backend

### 3. Diseño Frontend

#### 3.1 Tipo de interfaz
- Especificar qué tipo de interfaz se diseñará (web, móvil, desktop, etc.)

#### 3.2 Principios de diseño UI/UX
- Enumerar y explicar brevemente los principios aplicados
- Paleta de colores, tipografía y elementos visuales principales

#### 3.3 Estructura de pantallas
- Mapa de navegación y flujos principales
- Descripción de cada vista/pantalla
- Componentes reutilizables clave
- Estados de UI (loading, error, vacío, etc.)

#### 3.4 Consideraciones técnicas frontend
- Framework/biblioteca a utilizar
- Gestión de estado
- Estrategia de enrutamiento
- Manejo de formularios y validaciones
- Estrategia de optimización (lazy loading, code splitting)

### 4. Diseño Backend

#### 4.1 Arquitectura del servidor
- Patrón arquitectónico (MVC, hexagonal, clean, etc.)
- Capas de la aplicación y responsabilidades
- Estrategia de modularización
- Gestión de dependencias

#### 4.2 Modelo de datos
- Diagrama de entidades (Mermaid)
- Descripción de entidades principales y relaciones
- Estrategia de persistencia (SQL, NoSQL, híbrido)
- Consideraciones de normalización/desnormalización

#### 4.3 API y comunicación
- Diseño de API (REST, GraphQL, gRPC)
- Estructura de endpoints/resolvers
- Autenticación y autorización
- Formatos de petición y respuesta
- Manejo de errores y códigos de estado
- Documentación de API (swagger, etc.)

#### 4.4 Lógica de negocio
- Servicios principales y responsabilidades
- Procesos y flujos de trabajo
- Reglas de negocio críticas
- Validaciones y restricciones

#### 4.5 Consideraciones técnicas backend
- Framework/tecnología a utilizar
- Estrategia de testing
- Manejo de operaciones asíncronas
- Optimización de rendimiento
- Políticas de caché

### 5. Flujos de usuario completos
- Diagramas de secuencia (Mermaid) para 2-3 flujos principales
- Detalle de interacciones frontend-backend
- Explicación paso a paso desde la UI hasta la persistencia

### 6. Consideraciones transversales
- Seguridad (OWASP, encriptación, sanitización)
- Escalabilidad y rendimiento
- Accesibilidad (WCAG)
- Internacionalización (i18n)
- Monitorización y logging
- Despliegue y DevOps

### 7. Ejemplos ilustrativos
- Maquetas/wireframes para interfaces visuales
- Ejemplos de peticiones/respuestas API
- Ejemplos de esquemas de datos
- Pseudocódigo para algoritmos complejos

### 8. AI-Hints para el diseño
- Comentarios para componentes frontend
- Comentarios para componentes backend
- Hints para interacción entre capas
- Formato: `// AI-Hint: [Propósito del componente/módulo] [Comportamiento esperado] [Restricciones importantes]`

### 9. Configuración en `.cursor.json`
- Metadatos para Cursor IDE
- Referencias a documentación complementaria

## Instrucciones adicionales
- Usa encabezados en Markdown para estructurar el documento
- Incluye diagramas Mermaid para visualizar arquitectura, flujos y modelos
- Equilibra la profundidad entre el diseño frontend y backend
- Mantén el enfoque técnico pero evita detalles de implementación excesivamente específicos
- Asegúrate de que ambas partes (frontend y backend) estén coherentemente diseñadas

## Requisitos del proyecto
**(EDITAR)**
[REEMPLAZAR POR LOS REQUISITOS FUNCIONALES Y TÉCNICOS DEL PROYECTO]