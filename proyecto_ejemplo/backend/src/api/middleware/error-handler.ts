// AI-Hint Component: [Error Handler Middleware] [Centralized error handling] [Error formatting, logging, security]

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '@/utils/logger';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error('Error occurred:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
  });

  // Errores de validación Zod
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: 'Datos de entrada inválidos',
      details: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    });
    return;
  }

  // Error genérico
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
  });
}; 