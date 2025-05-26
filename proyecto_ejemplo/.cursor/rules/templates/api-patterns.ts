// AI-Hint Component: [API Patterns Template] [Patrones comunes para APIs] [Response types, error handling, middleware]

// Estructura estándar de respuestas
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Middleware de validación con Zod
export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Datos de entrada inválidos',
          details: error.errors
        });
      }
      next(error);
    }
  };
};

// Wrapper para controladores async
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Patrón de controlador estándar
export abstract class BaseController {
  protected sendSuccess<T>(res: Response, data: T, message?: string, status = 200) {
    res.status(status).json({
      success: true,
      data,
      message
    });
  }

  protected sendError(res: Response, error: string, status = 400, details?: any) {
    res.status(status).json({
      success: false,
      error,
      details
    });
  }

  protected sendPaginated<T>(res: Response, data: T[], pagination: PaginationMeta, message?: string) {
    res.json({
      success: true,
      data,
      pagination,
      message
    });
  }
}

// Ejemplo de implementación
export class TaskController extends BaseController {
  async createTask(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const task = await this.taskService.create({
        ...req.body,
        userId: req.user.id
      });
      
      this.sendSuccess(res, task, 'Tarea creada exitosamente', 201);
    } catch (error) {
      next(error);
    }
  }
} 