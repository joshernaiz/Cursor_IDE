// AI-Hint Architecture: [React Component] [Tarjeta que muestra información condensada de una tarea] [Reutilizable en múltiples vistas]

// AI-Hint Component: [TaskCard] [Muestra resumen visual de tarea con estado, prioridad y fecha] [Se usa en Dashboard, ProjectView y TaskList]

// AI-Hint Business: [Prioridad visual con colores] [Fechas vencidas en rojo, próximas en amarillo, futuras en verde] [Estado editable si el usuario tiene permisos]

import React from 'react';
import { format } from 'date-fns';
import { Task, TaskPriority, TaskStatus } from '../types/Task';
import { useTaskActions } from '../hooks/useTaskActions';
import { PriorityFlag, StatusBadge, UserAvatar } from './common';

interface TaskCardProps {
  task: Task;
  compact?: boolean;
  onSelect?: (taskId: string) => void;
  className?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  compact = false, 
  onSelect, 
  className = '' 
}) => {
  const { updateTaskStatus } = useTaskActions();
  
  const handleStatusChange = (newStatus: TaskStatus) => {
    updateTaskStatus(task.id, newStatus);
  };
  
  const handleClick = () => {
    if (onSelect) {
      onSelect(task.id);
    }
  };
  
  // Determinar clase de fecha basada en proximidad de vencimiento
  const getDueDateClass = () => {
    if (!task.dueDate) return 'text-gray-500';
    
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    
    if (dueDate < today) return 'text-red-600 font-bold';
    
    const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    if (diffDays <= 2) return 'text-amber-500 font-bold';
    
    return 'text-green-600';
  };
  
  return (
    <div 
      className={`border rounded-lg p-4 shadow-sm hover:shadow transition-all cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <StatusBadge status={task.status} onChange={handleStatusChange} />
        <PriorityFlag priority={task.priority} />
      </div>
      
      <h3 className="font-medium text-lg mt-2 mb-1">{task.title}</h3>
      
      {!compact && task.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
      )}
      
      <div className="flex justify-between items-center mt-2">
        {task.dueDate && (
          <span className={`text-sm flex items-center ${getDueDateClass()}`}>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {format(new Date(task.dueDate), 'dd MMM')}
          </span>
        )}
        
        {task.assignee && (
          <UserAvatar user={task.assignee} size="sm" />
        )}
      </div>
      
      {!compact && task.subtasks && task.subtasks.length > 0 && (
        <div className="mt-3 text-xs text-gray-500">
          {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length} subtareas
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
            <div 
              className="bg-blue-600 h-1.5 rounded-full" 
              style={{ 
                width: `${(task.subtasks.filter(st => st.completed).length / task.subtasks.length) * 100}%` 
              }}
            />
          </div>
        </div>
      )}
      
      {!compact && task.labels && task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {task.labels.map(label => (
            <span 
              key={label.id} 
              className="px-2 py-0.5 text-xs rounded-full"
              style={{ 
                backgroundColor: `${label.color}20`, 
                color: label.color 
              }}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskCard;