// AI-Hint Component: [Main Entry Point] [Express server bootstrap] [Database connection, middleware setup, graceful shutdown]
// AI-Hint Flow: [Server Initialization] [Config load → DB connect → Express setup → Server start] [Error handling, signal handling]

import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { config } from '@/config/environment';
import { connectDatabase } from '@/config/database';
import { logger } from '@/utils/logger';
import { errorHandler } from '@/middleware/error-handler';
import { notFoundHandler } from '@/middleware/not-found-handler';
import { requestLogger } from '@/middleware/request-logger';
import { rateLimiter } from '@/middleware/rate-limiter';

// Cargar variables de entorno
dotenv.config();

// AI-Hint Security: [Express App Setup] [Security middleware, CORS, request parsing] [Production-ready configuration]
const createApp = (): express.Application => {
  const app = express();

  // Trust proxy para deployment detrás de reverse proxy
  app.set('trust proxy', 1);

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }));

  // CORS configuration
  app.use(cors({
    origin: config.cors.origins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }));

  // Compression middleware
  app.use(compression());

  // Rate limiting
  app.use(rateLimiter);

  // Request parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Logging
  if (config.env !== 'test') {
    app.use(morgan('combined', {
      stream: { write: (message: string) => logger.info(message.trim()) }
    }));
  }
  app.use(requestLogger);

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.env,
      version: process.env.npm_package_version || '1.0.0',
    });
  });

  // API routes
  app.use('/api/v1', async (req, res, next) => {
    // Placeholder para rutas de API
    res.status(200).json({
      message: 'TaskFlow API v1 - Coming Soon',
      timestamp: new Date().toISOString(),
      path: req.path,
    });
  });

  // 404 handler
  app.use(notFoundHandler);

  // Error handler (debe ir al final)
  app.use(errorHandler);

  return app;
};

// AI-Hint Flow: [Graceful Shutdown] [SIGTERM/SIGINT handling] [Database cleanup, server close]
const gracefulShutdown = (server: any): void => {
  const shutdown = (signal: string) => {
    logger.info(`${signal} received, starting graceful shutdown`);
    
    server.close(async (err: Error) => {
      if (err) {
        logger.error('Error during server shutdown:', err);
        process.exit(1);
      }

      try {
        // Cerrar conexión a la base de datos
        await import('mongoose').then(mongoose => mongoose.default.connection.close());
        logger.info('Database connection closed');
        
        logger.info('Graceful shutdown completed');
        process.exit(0);
      } catch (error) {
        logger.error('Error during graceful shutdown:', error);
        process.exit(1);
      }
    });

    // Force shutdown after 30 seconds
    setTimeout(() => {
      logger.error('Forcing shutdown after timeout');
      process.exit(1);
    }, 30000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

// AI-Hint Flow: [Server Startup] [Database → Express → Listen] [Error handling, logging]
const startServer = async (): Promise<void> => {
  try {
    logger.info('Starting TaskFlow API server...');

    // Conectar a la base de datos
    await connectDatabase();
    logger.info('Database connected successfully');

    // Crear aplicación Express
    const app = createApp();

    // Iniciar servidor
    const server = app.listen(config.port, () => {
      logger.info(`🚀 TaskFlow API running on port ${config.port} in ${config.env} mode`);
      logger.info(`📋 Health check: http://localhost:${config.port}/health`);
      logger.info(`🔗 API endpoint: http://localhost:${config.port}/api/v1`);
    });

    // Configurar graceful shutdown
    gracefulShutdown(server);

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Manejar errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Iniciar servidor
if (process.env.NODE_ENV !== 'test') {
  startServer().catch((error) => {
    logger.error('Server startup failed:', error);
    process.exit(1);
  });
}

export { createApp }; 