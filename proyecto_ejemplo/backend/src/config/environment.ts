// AI-Hint Component: [Environment Config] [Centralized configuration management] [Type-safe env vars, validation, defaults]
// AI-Hint Data: [Config Schema] [Environment variables structure] [Development, testing, production settings]

import { z } from 'zod';

// Schema de validación para variables de entorno
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  
  // Database
  MONGODB_URI: z.string().default('mongodb://localhost:27017/taskflow'),
  
  // JWT
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),
  
  // CORS
  CORS_ORIGINS: z.string().default('http://localhost:3001,http://localhost:3000'),
  
  // Redis (opcional)
  REDIS_URI: z.string().optional(),
  
  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  
  // MCP (Model Context Protocol)
  MCP_API_KEY: z.string().optional(),
  MCP_BASE_URL: z.string().url().optional(),
  MCP_TIMEOUT: z.coerce.number().default(10000),
  
  // Email (opcional)
  EMAIL_HOST: z.string().optional(),
  EMAIL_PORT: z.coerce.number().optional(),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASS: z.string().optional(),
  
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(15 * 60 * 1000), // 15 minutos
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),
  
  // File uploads
  MAX_FILE_SIZE: z.coerce.number().default(10 * 1024 * 1024), // 10MB
  UPLOAD_DIR: z.string().default('./uploads'),
});

// Validar variables de entorno al cargar
const validateEnv = (): z.infer<typeof envSchema> => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      throw new Error(`Environment validation failed:\n${missingVars.join('\n')}`);
    }
    throw error;
  }
};

// Configuración validada
const env = validateEnv();

// AI-Hint Data: [Config Object] [Typed configuration structure] [Database, security, integrations settings]
export const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  
  database: {
    uri: env.MONGODB_URI,
    options: {
      // Configuraciones optimizadas para Mongoose
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    },
  },
  
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
    refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
    algorithm: 'HS256' as const,
  },
  
  cors: {
    origins: env.CORS_ORIGINS.split(',').map(origin => origin.trim()),
  },
  
  redis: {
    uri: env.REDIS_URI,
  },
  
  logging: {
    level: env.LOG_LEVEL,
    file: {
      enabled: env.NODE_ENV === 'production',
      maxFiles: 5,
      maxSize: '5m',
    },
  },
  
  mcp: {
    apiKey: env.MCP_API_KEY,
    baseUrl: env.MCP_BASE_URL,
    timeout: env.MCP_TIMEOUT,
    enabled: Boolean(env.MCP_API_KEY && env.MCP_BASE_URL),
  },
  
  email: {
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
    enabled: Boolean(env.EMAIL_HOST && env.EMAIL_USER && env.EMAIL_PASS),
  },
  
  rateLimit: {
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    maxRequests: env.RATE_LIMIT_MAX_REQUESTS,
  },
  
  upload: {
    maxFileSize: env.MAX_FILE_SIZE,
    uploadDir: env.UPLOAD_DIR,
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
    ],
  },
  
  security: {
    bcryptRounds: 12,
    sessionSecret: env.JWT_SECRET, // Reuso del JWT secret para simplicidad
  },
} as const;

// Tipos exportados para uso en otros módulos
export type Config = typeof config;
export type Environment = typeof env.NODE_ENV; 