// AI-Hint Architecture: [Service Layer] [Proporciona funcionalidades de IA para análisis de tareas] [Integración con MCP Servers y fallback local]

// AI-Hint Component: [AIService] [Centraliza operaciones de IA como análisis, sugerencias y optimización] [Utiliza modelos específicos vía MCP]

// AI-Hint Flow: [Análisis de tarea] [Procesar datos → Llamar modelo MCP → Postprocesar resultados → Aplicar reglas negocio] [Incluye caché y fallback]

// AI-Hint Security: [Datos sensibles omitidos en llamadas a IA] [Resultados validados antes de aplicar] [Límites configurables de tasa y tamaño]

import { Task, TaskPriority } from '../models/Task';
import { Project } from '../models/Project';
import { User } from '../models/User';
import { mcpClient } from '../config/mcp';
import { AIAnalysisCache } from '../repositories/AIAnalysisCache';
import { logger } from '../utils/logger';
import { TaskRepository } from '../repositories/TaskRepository';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { UserRepository } from '../repositories/UserRepository';

// Tipos para resultados de IA
export interface TaskAnalysis {
  suggestions: {
    estimatedEffort?: 'low' | 'medium' | 'high';
    suggestedPriority?: TaskPriority;
    dependsOn?: string[];
    skills?: string[];
    risk?: 'low' | 'medium' | 'high';
    splitSuggestion?: string[];
    timeEstimate?: number; // en minutos
  };
  suggestedChanges?: Partial<Task>; // Cambios que la IA sugiere aplicar automáticamente
  confidence: number; // 0-1 nivel de confianza en las sugerencias
}

export interface WorkloadAnalysis {
  overallAssessment: string;
  userWorkloads: {
    userId: string;
    status: 'underutilized' | 'balanced' | 'overloaded';
    recommendation: string;
  }[];
  taskRecommendations: {
    taskId: string;
    recommendedAssigneeId?: string;
    recommendedDueDate?: Date;
    recommendedPriority?: TaskPriority;
    reasoning: string;
  }[];
}

export interface WeeklyPlan {
  days: {
    date: string;
    tasks: {
      taskId: string;
      startTime?: string;
      endTime?: string;
      reasoning: string;
    }[];
  }[];
  unscheduledTasks: string[];
  summary: string;
}

export class AIService {
  private taskRepository: TaskRepository;
  private projectRepository: ProjectRepository;
  private userRepository: UserRepository;
  private cache: AIAnalysisCache;
  
  constructor(
    taskRepository: TaskRepository,
    projectRepository: ProjectRepository,
    userRepository: UserRepository,
    cache: AIAnalysisCache
  ) {
    this.taskRepository = taskRepository;
    this.projectRepository = projectRepository;
    this.userRepository = userRepository;
    this.cache = cache;
  }

  /**
   * Analiza una tarea nueva para proporcionar sugerencias
   */
  async analyzeTask(task: Task): Promise<TaskAnalysis> {
    try {
      // Verificar caché primero
      const cachedAnalysis = await this.cache.getTaskAnalysis(task.id);
      if (cachedAnalysis) {
        logger.debug('Using cached task analysis', { taskId: task.id });
        return cachedAnalysis;
      }
      
      // Obtener datos de contexto
      const [project, assignee, relatedTasks] = await Promise.all([
        task.projectId ? this.projectRepository.findById(task.projectId) : null,
        task.assigneeId ? this.userRepository.findById(task.assigneeId) : null,
        this.getRelatedTasks(task)
      ]);
      
      // Preparar datos para el modelo
      const input = this.prepareTaskAnalysisInput(task, project, assignee, relatedTasks);
      
      // Intentar usar MCP para análisis avanzado
      try {
        const result = await mcpClient.invokeModel('task-analyzer', input);
        logger.debug('MCP task analysis successful', { taskId: task.id });
        
        // Validar el resultado
        const analysis = this.validateAndNormalizeTaskAnalysis(result);
        
        // Guardar en caché
        await this.cache.saveTaskAnalysis(task.id, analysis);
        
        return analysis;
      } catch (mcpError) {
        // Log del error pero continuar con fallback
        logger.warn('MCP task analysis failed, using fallback', { 
          taskId: task.id, 
          error: mcpError.message 
        });
        
        // Usar análisis local como fallback
        const fallbackAnalysis = this.fallbackTaskAnalysis(task, project, relatedTasks);
        
        // Guardar el resultado fallback en caché con TTL más corto
        await this.cache.saveTaskAnalysis(task.id, fallbackAnalysis, 1800); // 30 minutos
        
        return fallbackAnalysis;
      }
    } catch (error) {
      logger.error('Task analysis failed completely', { 
        taskId: task.id, 
        error: error.message 
      });
      
      // Devolver un análisis mínimo en caso de error
      return {
        suggestions: {},
        confidence: 0.1
      };
    }
  }

  /**
   * Analiza cambios en una tarea existente
   */
  async analyzeTaskUpdate(
    updatedTask: Task, 
    previousVersion: Task
  ): Promise<TaskAnalysis> {
    try {
      // Comparar versiones para detectar cambios relevantes
      const changes = this.detectSignificantChanges(updatedTask, previousVersion);
      
      // Si no hay cambios significativos, devolver análisis mínimo
      if (Object.keys(changes).length === 0) {
        return {
          suggestions: {},
          confidence: 0.1
        };
      }
      
      // Obtener datos de contexto
      const [project, assignee, relatedTasks] = await Promise.all([
        updatedTask.projectId ? this.projectRepository.findById(updatedTask.projectId) : null,
        updatedTask.assigneeId ? this.userRepository.findById(updatedTask.assigneeId) : null,
        this.getRelatedTasks(updatedTask)
      ]);
      
      // Preparar datos para el modelo
      const input = {
        ...this.prepareTaskAnalysisInput(updatedTask, project, assignee, relatedTasks),
        changes,
        previousVersion: this.sanitizeTask(previousVersion)
      };
      
      // Intentar usar MCP para análisis
      try {
        const result = await mcpClient.invokeModel('task-analyzer', input);
        
        // Validar el resultado
        const analysis = this.validateAndNormalizeTaskAnalysis(result);
        
        // Actualizar caché
        await this.cache.saveTaskAnalysis(updatedTask.id, analysis);
        
        return analysis;
      } catch (mcpError) {
        // Log del error pero continuar con fallback
        logger.warn('MCP task update analysis failed, using fallback', { 
          taskId: updatedTask.id, 
          error: mcpError.message 
        });
        
        // Usar análisis local como fallback
        return this.fallbackTaskAnalysis(updatedTask, project, relatedTasks);
      }
    } catch (error) {
      logger.error('Task update analysis failed completely', { 
        taskId: updatedTask.id, 
        error: error.message 
      });
      
      // Devolver un análisis mínimo en caso de error
      return {
        suggestions: {},
        confidence: 0.1
      };
    }
  }

  /**
   * Analiza la carga de trabajo del equipo o usuario
   */
  async analyzeWorkload(options: {
    projectId?: string;
    userId?: string;
    timeRange: {
      start: Date;
      end: Date;
    };
  }): Promise<WorkloadAnalysis> {
    try {
      const { projectId, userId, timeRange } = options;
      
      // Obtener tareas relevantes
      let tasks: Task[] = [];
      
      if (projectId) {
        // Tareas del proyecto
        tasks = await this.taskRepository.findTasksByProject(
          projectId,
          timeRange.start,
          timeRange.end
        );
        
        // Obtener datos del proyecto
        const project = await this.projectRepository.findById(projectId);
        
        if (!project) {
          throw new Error('Project not found');
        }
        
        // Obtener usuarios del proyecto
        const userIds = [
          project.ownerId,
          ...project.members.map(m => m.userId)
        ];
        
        const users = await this.userRepository.findByIds(userIds);
        
        // Preparar datos para el modelo
        const input = {
          project: this.sanitizeProject(project),
          tasks: tasks.map(t => this.sanitizeTask(t)),
          users: users.map(u => this.sanitizeUser(u)),
          timeRange
        };
        
        try {
          // Usar MCP para análisis avanzado
          const result = await mcpClient.invokeModel('workload-optimizer', input);
          
          // Validar y normalizar resultado
          return this.validateWorkloadAnalysis(result);
        } catch (mcpError) {
          logger.warn('MCP workload analysis failed, using fallback', { 
            projectId, 
            error: mcpError.message 
          });
          
          // Fallback a análisis básico
          return this.fallbackWorkloadAnalysis(tasks, users);
        }
      } else if (userId) {
        // Tareas del usuario
        tasks = await this.taskRepository.findTasksByUser(
          userId,
          timeRange.start,
          timeRange.end
        );
        
        // Obtener usuario
        const user = await this.userRepository.findById(userId);
        
        if (!user) {
          throw new Error('User not found');
        }
        
        // Preparar datos para el modelo
        const input = {
          user: this.sanitizeUser(user),
          tasks: tasks.map(t => this.sanitizeTask(t)),
          timeRange
        };
        
        try {
          // Usar MCP para análisis
          const result = await mcpClient.invokeModel('workload-optimizer', input);
          
          // Validar resultado
          return this.validateWorkloadAnalysis(result);
        } catch (mcpError) {
          logger.warn('MCP user workload analysis failed, using fallback', { 
            userId, 
            error: mcpError.message 
          });
          
          // Fallback a análisis básico
          return this.fallbackWorkloadAnalysis(tasks, [user]);
        }
      } else {
        throw new Error('Either projectId or userId must be provided');
      }
    } catch (error) {
      logger.error('Workload analysis failed completely', { error: error.message });
      
      // Devolver un análisis mínimo en caso de error
      return {
        overallAssessment: 'Unable to analyze workload due to an error',
        userWorkloads: [],
        taskRecommendations: []
      };
    }
  }

  /**
   * Genera un plan semanal optimizado
   */
  async generateWeeklyPlan(userId: string, startDate: Date): Promise<WeeklyPlan> {
    try {
      // Calcular fecha fin (7 días después)
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 7);
      
      // Obtener tareas del usuario
      const tasks = await this.taskRepository.findTasksByUser(userId, startDate, endDate);
      
      // Obtener usuario
      const user = await this.userRepository.findById(userId);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // Preparar datos para el modelo
      const input = {
        user: this.sanitizeUser(user),
        tasks: tasks.map(t => this.sanitizeTask(t)),
        startDate,
        endDate
      };
      
      try {
        // Usar MCP para generación de plan
        const result = await mcpClient.invokeModel('workload-optimizer', input);
        
        // Validar resultado
        return this.validateWeeklyPlan(result);
      } catch (mcpError) {
        logger.warn('MCP weekly plan generation failed, using fallback', { 
          userId, 
          error: mcpError.message 
        });
        
        // Fallback a planificación básica
        return this.fallbackWeeklyPlan(tasks, startDate);
      }
    } catch (error) {
      logger.error('Weekly plan generation failed completely', { 
        userId, 
        error: error.message 
      });
      
      // Devolver un plan mínimo en caso de error
      return {
        days: [],
        unscheduledTasks: [],
        summary: 'Unable to generate weekly plan due to an error'
      };
    }
  }

  // Métodos privados auxiliares
  
  /**
   * Prepara los datos para enviar al modelo de análisis de tareas
   */
  private prepareTaskAnalysisInput(
    task: Task,
    project: Project | null,
    assignee: User | null,
    relatedTasks: Task[]
  ) {
    return {
      task: this.sanitizeTask(task),
      project: project ? this.sanitizeProject(project) : null,
      assignee: assignee ? this.sanitizeUser(assignee) : null,
      relatedTasks: relatedTasks.map(t => this.sanitizeTask(t)),
      currentTime: new Date().toISOString()
    };
  }

  /**
   * Obtiene tareas que podrían estar relacionadas con la tarea actual
   */
  private async getRelatedTasks(task: Task): Promise<Task[]> {
    // Obtener tareas del mismo proyecto
    if (task.projectId) {
      return this.taskRepository.findTasksByProject(
        task.projectId,
        null,
        null,
        { limit: 10, excludeTaskId: task.id }
      );
    }
    
    // Si no hay proyecto, obtener tareas recientes del mismo creador
    return this.taskRepository.findRecentTasksByUser(
      task.createdBy,
      { limit: 5, excludeTaskId: task.id }
    );
  }

  /**
   * Detecta cambios significativos entre versiones de tarea
   */
  private detectSignificantChanges(
    updatedTask: Task,
    previousVersion: Task
  ): Partial<Task> {
    const changes: Partial<Task> = {};
    
    // Comparar campos relevantes
    if (updatedTask.title !== previousVersion.title) {
      changes.title = updatedTask.title;
    }
    
    if (updatedTask.description !== previousVersion.description) {
      changes.description = updatedTask.description;
    }
    
    if (updatedTask.status !== previousVersion.status) {
      changes.status = updatedTask.status;
    }
    
    if (updatedTask.priority !== previousVersion.priority) {
      changes.priority = updatedTask.priority;
    }
    
    if (updatedTask.dueDate?.getTime() !== previousVersion.dueDate?.getTime()) {
      changes.dueDate = updatedTask.dueDate;
    }
    
    if (updatedTask.assigneeId !== previousVersion.assigneeId) {
      changes.assigneeId = updatedTask.assigneeId;
    }
    
    // Comparar etiquetas
    const prevLabels = previousVersion.labelIds || [];
    const newLabels = updatedTask.labelIds || [];
    
    if (
      prevLabels.length !== newLabels.length ||
      !prevLabels.every(l => newLabels.includes(l))
    ) {
      changes.labelIds = updatedTask.labelIds;
    }
    
    return changes;
  }

  /**
   * Limpia datos sensibles o innecesarios de una tarea
   */
  private sanitizeTask(task: Task): Partial<Task> {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      completedAt: task.completedAt,
      projectId: task.projectId,
      assigneeId: task.assigneeId,
      labelIds: task.labelIds,
      // Omitir datos sensibles o innecesarios
    };
  }

  /**
   * Limpia datos sensibles o innecesarios de un proyecto
   */
  private sanitizeProject(project: Project): Partial<Project> {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      createdAt: project.createdAt,
      // Omitir datos sensibles
    };
  }

  /**
   * Limpia datos sensibles o innecesarios de un usuario
   */
  private sanitizeUser(user: User): Partial<User> {
    return {
      id: user.id,
      name: user.name,
      // Omitir datos sensibles como email, roles, etc.
    };
  }

  /**
   * Valida y normaliza el resultado del análisis de tarea
   */
  private validateAndNormalizeTaskAnalysis(result: any): TaskAnalysis {
    // Asegurar estructura mínima válida
    const analysis: TaskAnalysis = {
      suggestions: {},
      confidence: result.confidence || 0.5
    };
    
    // Normalizar campos del resultado
    if (result.suggestions) {
      analysis.suggestions = {
        estimatedEffort: this.validateEnumValue(
          result.suggestions.estimatedEffort,
          ['low', 'medium', 'high']
        ),
        suggestedPriority: this.validateEnumValue(
          result.suggestions.suggestedPriority,
          [1, 2, 3, 4, 5]
        ),
        dependsOn: Array.isArray(result.suggestions.dependsOn)
          ? result.suggestions.dependsOn
          : undefined,
        skills: Array.isArray(result.suggestions.skills)
          ? result.suggestions.skills
          : undefined,
        risk: this.validateEnumValue(
          result.suggestions.risk,
          ['low', 'medium', 'high']
        ),
        splitSuggestion: Array.isArray(result.suggestions.splitSuggestion)
          ? result.suggestions.splitSuggestion
          : undefined
      };
    }
    
    // Validar cambios sugeridos si existen
    if (result.suggestedChanges) {
      const validChanges: Partial<Task> = {};
      
      // Solo permitir ciertos campos
      if (result.suggestedChanges.priority) {
        validChanges.priority = this.validateEnumValue(
          result.suggestedChanges.priority,
          [1, 2, 3, 4, 5]
        );
      }
      
      // Solo añadir si hay cambios válidos
      if (Object.keys(validChanges).length > 0) {
        analysis.suggestedChanges = validChanges;
      }
    }
    
    return analysis;
  }

  /**
   * Valida que un valor esté dentro de opciones permitidas
   */
  private validateEnumValue<T>(value: any, allowedValues: T[]): T | undefined {
    return allowedValues.includes(value) ? value : undefined;
  }

  /**
   * Valida el resultado del análisis de carga de trabajo
   */
  private validateWorkloadAnalysis(result: any): WorkloadAnalysis {
    // Implementar validación
    return result as WorkloadAnalysis;
  }

  /**
   * Valida el resultado de la planificación semanal
   */
  private validateWeeklyPlan(result: any): WeeklyPlan {
    // Implementar validación
    return result as WeeklyPlan;
  }

  /**
   * Implementación local de análisis de tarea como fallback
   */
  private fallbackTaskAnalysis(
    task: Task,
    project: Project | null,
    relatedTasks: Task[]
  ): TaskAnalysis {
    // Algoritmo básico de análisis en caso de que MCP no esté disponible
    const analysis: TaskAnalysis = {
      suggestions: {},
      confidence: 0.3
    };
    
    // Estimar esfuerzo basado en la longitud de la descripción
    if (task.description) {
      if (task.description.length < 100) {
        analysis.suggestions.estimatedEffort = 'low';
      } else if (task.description.length < 500) {
        analysis.suggestions.estimatedEffort = 'medium';
      } else {
        analysis.suggestions.estimatedEffort = 'high';
      }
    }
    
    // Sugerir prioridad basada en la fecha de vencimiento
    if (task.dueDate) {
      const today = new Date();
      const daysUntilDue = Math.ceil(
        (task.dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysUntilDue <= 1) {
        analysis.suggestions.suggestedPriority = 1; // Urgente
      } else if (daysUntilDue <= 3) {
        analysis.suggestions.suggestedPriority = 2; // Alta
      } else if (daysUntilDue <= 7) {
        analysis.suggestions.suggestedPriority = 3; // Media
      } else {
        analysis.suggestions.suggestedPriority = 4; // Baja
      }
    }
    
    return analysis;
  }

  /**
   * Implementación local de análisis de carga como fallback
   */
  private fallbackWorkloadAnalysis(tasks: Task[], users: User[]): WorkloadAnalysis {
    // Implementación básica
    return {
      overallAssessment: `Analyzing ${tasks.length} tasks across ${users.length} users`,
      userWorkloads: users.map(user => ({
        userId: user.id,
        status: 'balanced' as const,
        recommendation: 'No specific recommendations available in fallback mode'
      })),
      taskRecommendations: []
    };
  }

  /**
   * Implementación local de planificación semanal como fallback
   */
  private fallbackWeeklyPlan(tasks: Task[], startDate: Date): WeeklyPlan {
    // Crear estructura básica de días
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        tasks: []
      });
    }
    
    // Distribuir tareas uniformemente
    const tasksPerDay = Math.ceil(tasks.length / 7);
    const scheduledTaskIds: string[] = [];
    
    for (let i = 0; i < days.length; i++) {
      const startIdx = i * tasksPerDay;
      const endIdx = Math.min(startIdx + tasksPerDay, tasks.length);
      
      for (let j = startIdx; j < endIdx; j++) {
        if (tasks[j]) {
          days[i].tasks.push({
            taskId: tasks[j].id,
            reasoning: 'Basic distribution (fallback mode)'
          });
          scheduledTaskIds.push(tasks[j].id);
        }
      }
    }
    
    // Identificar tareas no programadas
    const unscheduledTasks = tasks
      .filter(task => !scheduledTaskIds.includes(task.id))
      .map(task => task.id);
    
    return {
      days,
      unscheduledTasks,
      summary: 'Basic weekly plan generated in fallback mode'
    };
  }
}