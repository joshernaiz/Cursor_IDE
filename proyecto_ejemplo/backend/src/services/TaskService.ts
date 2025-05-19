// AI-Hint Architecture: [Service Layer] [Implementa lógica de negocio para tareas] [Sigue patrón Repository para acceso a datos]

// AI-Hint Component: [TaskService] [Centraliza operaciones CRUD y lógica de negocio para tareas] [Interactúa con TaskRepository y AIService]

// AI-Hint Business: [Reglas de estado de tareas] [Solo creador o miembros del proyecto pueden editar] [Tareas completadas no pueden volver a pendiente después de 7 días]

// AI-Hint Flow: [Creación de tarea] [Validación → Guardar → Notificar → Analizar con IA] [Requiere usuario autenticado]

import { FilterQuery } from 'mongoose';
import { Task, TaskStatus, TaskPriority } from '../models/Task';
import { TaskRepository } from '../repositories/TaskRepository';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { AIService } from '../ai/AIService';
import { NotificationService } from './NotificationService';
import { BadRequestError, NotFoundError, ForbiddenError } from '../utils/errors';
import { validateTask } from '../validators/taskValidator';
import { logger } from '../utils/logger';

export class TaskService {
  constructor(
    private taskRepository: TaskRepository,
    private projectRepository: ProjectRepository,
    private aiService: AIService,
    private notificationService: NotificationService
  ) {}

  /**
   * Obtiene tareas con filtros, paginación y ordenamiento
   */
  async getTasks(options: {
    userId: string;
    filters?: {
      status?: TaskStatus[];
      priority?: TaskPriority[];
      projectId?: string;
      dueDate?: { from?: Date; to?: Date };
      assigneeId?: string;
      search?: string;
      labelIds?: string[];
    };
    pagination?: {
      page: number;
      limit: number;
    };
    sort?: {
      field: string;
      order: 'asc' | 'desc';
    };
  }) {
    const { userId, filters = {}, pagination, sort } = options;
    
    // Construir query de filtrado
    const query: FilterQuery<Task> = {};
    
    // Asegurar que el usuario solo ve tareas a las que tiene acceso
    query.$or = [
      { createdBy: userId },
      { assigneeId: userId },
      { projectId: { $in: await this.getUserProjectIds(userId) } }
    ];
    
    // Aplicar filtros adicionales si existen
    if (filters.status && filters.status.length) {
      query.status = { $in: filters.status };
    }
    
    if (filters.priority && filters.priority.length) {
      query.priority = { $in: filters.priority };
    }
    
    if (filters.projectId) {
      query.projectId = filters.projectId;
    }
    
    if (filters.assigneeId) {
      query.assigneeId = filters.assigneeId;
    }
    
    if (filters.dueDate) {
      query.dueDate = {};
      if (filters.dueDate.from) {
        query.dueDate.$gte = filters.dueDate.from;
      }
      if (filters.dueDate.to) {
        query.dueDate.$lte = filters.dueDate.to;
      }
    }
    
    if (filters.labelIds && filters.labelIds.length) {
      query.labelIds = { $in: filters.labelIds };
    }
    
    if (filters.search) {
      query.$or = query.$or || [];
      query.$or.push(
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } }
      );
    }
    
    // Ejecutar consulta con opciones
    return this.taskRepository.findTasks(
      query,
      pagination,
      sort
    );
  }

  /**
   * Obtiene una tarea por ID
   */
  async getTaskById(taskId: string, userId: string) {
    const task = await this.taskRepository.findById(taskId);
    
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    
    // Verificar si el usuario tiene acceso a esta tarea
    await this.validateTaskAccess(task, userId);
    
    return task;
  }

  /**
   * Crea una nueva tarea
   */
  async createTask(taskData: Partial<Task>, userId: string) {
    // Validar datos
    const validationResult = validateTask(taskData);
    if (!validationResult.success) {
      throw new BadRequestError('Invalid task data', validationResult.error);
    }
    
    const { projectId } = taskData;
    
    // Si hay un proyecto, verificar que existe y el usuario tiene acceso
    if (projectId) {
      const project = await this.projectRepository.findById(projectId);
      if (!project) {
        throw new NotFoundError('Project not found');
      }
      
      const isMember = project.members.some(m => m.userId === userId);
      if (!isMember && project.ownerId !== userId) {
        throw new ForbiddenError('You dont have access to this project');
      }
    }
    
    // Crear la tarea
    const task = await this.taskRepository.create({
      ...taskData,
      createdBy: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: taskData.status || TaskStatus.PENDING
    });
    
    // Notificar si hay un asignado diferente al creador
    if (task.assigneeId && task.assigneeId !== userId) {
      await this.notificationService.notifyTaskAssigned(task);
    }
    
    // Obtener análisis y sugerencias de IA
    try {
      const aiAnalysis = await this.aiService.analyzeTask(task);
      
      // Si la IA sugiere cambios de prioridad o etiquetas, actualizar
      if (aiAnalysis.suggestedChanges) {
        await this.taskRepository.update(task.id, {
          aiSuggestions: aiAnalysis.suggestions,
          ...aiAnalysis.suggestedChanges
        });
        
        // Recuperar la tarea actualizada
        return this.taskRepository.findById(task.id);
      }
      
      task.aiSuggestions = aiAnalysis.suggestions;
      return task;
    } catch (error) {
      // Si falla el análisis IA, seguimos adelante con la creación normal
      logger.warn('Failed to analyze task with AI', { taskId: task.id, error });
      return task;
    }
  }

  /**
   * Actualiza una tarea existente
   */
  async updateTask(taskId: string, updates: Partial<Task>, userId: string) {
    const task = await this.taskRepository.findById(taskId);
    
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    
    // Verificar acceso y permisos de edición
    await this.validateTaskAccess(task, userId, true);
    
    // Validar datos de actualización
    const validationResult = validateTask(updates, true);
    if (!validationResult.success) {
      throw new BadRequestError('Invalid task data', validationResult.error);
    }
    
    // Si cambia el proyecto, verificar acceso
    if (updates.projectId && updates.projectId !== task.projectId) {
      const newProject = await this.projectRepository.findById(updates.projectId);
      if (!newProject) {
        throw new NotFoundError('Project not found');
      }
      
      const isMember = newProject.members.some(m => m.userId === userId);
      if (!isMember && newProject.ownerId !== userId) {
        throw new ForbiddenError('You dont have access to the target project');
      }
    }
    
    // Si cambia el asignado, enviar notificación
    if (updates.assigneeId && updates.assigneeId !== task.assigneeId) {
      await this.notificationService.notifyTaskAssigned({
        ...task,
        ...updates,
        assigneeId: updates.assigneeId
      });
    }
    
    // Regla: tareas completadas hace más de 7 días no pueden volver a pendiente
    if (
      task.status === TaskStatus.COMPLETED &&
      updates.status === TaskStatus.PENDING &&
      task.updatedAt &&
      new Date().getTime() - task.updatedAt.getTime() > 7 * 24 * 60 * 60 * 1000
    ) {
      throw new BadRequestError(
        'Completed tasks older than 7 days cannot be set back to pending'
      );
    }
    
    // Si cambia el estado a completado, establecer completedAt
    if (updates.status === TaskStatus.COMPLETED && task.status !== TaskStatus.COMPLETED) {
      updates.completedAt = new Date();
    }
    
    updates.updatedAt = new Date();
    
    // Actualizar la tarea
    const updatedTask = await this.taskRepository.update(taskId, updates);
    
    // Analizar cambios con IA si hay modificaciones significativas
    const significantChanges = 
      updates.title || 
      updates.description || 
      updates.dueDate || 
      updates.priority ||
      updates.status;
      
    if (significantChanges) {
      try {
        const aiAnalysis = await this.aiService.analyzeTaskUpdate(updatedTask, task);
        
        // Guardar sugerencias sin aplicar cambios automáticos en updates
        if (aiAnalysis.suggestions) {
          await this.taskRepository.update(taskId, {
            aiSuggestions: aiAnalysis.suggestions
          });
          
          // Recuperar la versión final
          return this.taskRepository.findById(taskId);
        }
      } catch (error) {
        logger.warn('Failed to analyze task update with AI', { taskId, error });
      }
    }
    
    return updatedTask;
  }

  /**
   * Actualiza sólo el estado de una tarea
   */
  async updateTaskStatus(taskId: string, status: TaskStatus, userId: string) {
    return this.updateTask(taskId, { status }, userId);
  }

  /**
   * Elimina una tarea
   */
  async deleteTask(taskId: string, userId: string) {
    const task = await this.taskRepository.findById(taskId);
    
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    
    // Sólo el creador o propietario del proyecto puede eliminar
    if (task.createdBy !== userId) {
      // Si hay proyecto, verificar si el usuario es propietario
      if (task.projectId) {
        const project = await this.projectRepository.findById(task.projectId);
        if (!project || project.ownerId !== userId) {
          throw new ForbiddenError('You dont have permission to delete this task');
        }
      } else {
        throw new ForbiddenError('You dont have permission to delete this task');
      }
    }
    
    return this.taskRepository.delete(taskId);
  }

  /**
   * Obtiene los IDs de proyectos a los que tiene acceso un usuario
   */
  private async getUserProjectIds(userId: string): Promise<string[]> {
    const projects = await this.projectRepository.findUserProjects(userId);
    return projects.map(p => p.id);
  }

  /**
   * Valida si un usuario tiene acceso a una tarea
   */
  private async validateTaskAccess(
    task: Task, 
    userId: string, 
    requireEditPermission = false
  ): Promise<boolean> {
    // El creador siempre tiene acceso
    if (task.createdBy === userId) {
      return true;
    }
    
    // El asignado tiene acceso
    if (task.assigneeId === userId) {
      return true;
    }
    
    // Verificar acceso vía proyecto
    if (task.projectId) {
      const project = await this.projectRepository.findById(task.projectId);
      
      if (!project) {
        throw new NotFoundError('Associated project not found');
      }
      
      // Propietario del proyecto tiene acceso completo
      if (project.ownerId === userId) {
        return true;
      }
      
      // Miembros del proyecto tienen acceso según permisos
      const membership = project.members.find(m => m.userId === userId);
      if (membership) {
        if (!requireEditPermission || membership.role === 'editor' || membership.role === 'admin') {
          return true;
        }
      }
    }
    
    throw new ForbiddenError('You dont have access to this task');
  }
}