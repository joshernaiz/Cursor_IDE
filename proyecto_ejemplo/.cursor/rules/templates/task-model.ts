// AI-Hint Data: [Task Model Template] [Modelo base para tareas] [Incluye validaciones, timestamps, relaciones]

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  tags: string[];
  userId: string;
  projectId?: string;
  parentTaskId?: string;
  
  // Campos de IA
  aiAnalysis?: TaskAnalysis;
  estimatedDuration?: number; // en minutos
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  completedAt?: Date;
}

export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TaskAnalysis {
  suggestedPriority: TaskPriority;
  estimatedDuration: number;
  suggestedTags: string[];
  dependencies: string[];
  complexity: 'simple' | 'moderate' | 'complex';
  confidence: number; // 0-1
  generatedAt: Date;
}

// Ejemplo de uso con Mongoose
export const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  
  description: {
    type: String,
    maxlength: 1000
  },
  
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  tags: [{
    type: String,
    trim: true
  }],
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
}, {
  timestamps: true // Añade automáticamente createdAt y updatedAt
}); 