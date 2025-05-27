// AI-Hint Component: [Rate Limiter] [Request rate limiting] [DDoS protection, API throttling]

import rateLimit from 'express-rate-limit';
import { config } from '@/config/environment';

export const rateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: {
    success: false,
    error: 'Demasiadas solicitudes',
    message: 'Has excedido el límite de solicitudes. Intenta de nuevo más tarde.',
  },
  standardHeaders: true,
  legacyHeaders: false,
}); 