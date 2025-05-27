// AI-Hint Component: [Not Found Handler] [404 error handling] [Route not found middleware]

import { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    message: `La ruta ${req.method} ${req.path} no existe`,
    timestamp: new Date().toISOString(),
  });
}; 