import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TaskCard = ({ task, onTaskClick, onStatusChange, isDragging = false }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-error bg-error/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-success bg-success/5';
      default: return 'border-l-muted bg-muted/5';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Minus';
      case 'low': return 'ArrowDown';
      default: return 'Minus';
    }
  };

  const getPriorityIconColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task?.status !== 'completed';
  const isDueToday = new Date(task.dueDate)?.toDateString() === new Date()?.toDateString();

  return (
    <div
      className={`bg-card border border-border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-elevation-2 ${
        getPriorityColor(task?.priority)
      } ${isDragging ? 'opacity-50 rotate-2 scale-105' : ''}`}
      onClick={() => onTaskClick(task)}
    >
      {/* Task Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground line-clamp-2 mb-1">
            {task?.title}
          </h4>
          {task?.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {task?.description}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-1 ml-2">
          <Icon
            name={getPriorityIcon(task?.priority)}
            size={12}
            className={getPriorityIconColor(task?.priority)}
          />
          <button
            onClick={(e) => {
              e?.stopPropagation();
              // Handle more options
            }}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            <Icon name="MoreHorizontal" size={12} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      {/* Task Tags */}
      {task?.tags && task?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task?.tags?.slice(0, 2)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {task?.tags?.length > 2 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{task?.tags?.length - 2}
            </span>
          )}
        </div>
      )}
      {/* Task Progress */}
      {task?.progress !== undefined && task?.progress > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs font-medium text-foreground">{task?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1">
            <div
              className="bg-primary h-1 rounded-full transition-all duration-300"
              style={{ width: `${task?.progress}%` }}
            />
          </div>
        </div>
      )}
      {/* Task Footer */}
      <div className="flex items-center justify-between">
        {/* Assignee */}
        <div className="flex items-center space-x-2">
          {task?.assignee ? (
            <div className="flex items-center space-x-2">
              <Image
                src={task?.assignee?.avatar}
                alt={task?.assignee?.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-xs text-muted-foreground truncate max-w-20">
                {task?.assignee?.name}
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                <Icon name="UserX" size={12} className="text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">Unassigned</span>
            </div>
          )}
        </div>

        {/* Due Date */}
        <div className="flex items-center space-x-1">
          <Icon
            name="Calendar"
            size={12}
            className={
              isOverdue ? 'text-error' : isDueToday ?'text-warning': 'text-muted-foreground'
            }
          />
          <span
            className={`text-xs ${
              isOverdue ? 'text-error font-medium' : isDueToday ?'text-warning font-medium': 'text-muted-foreground'
            }`}
          >
            {new Date(task.dueDate)?.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
      {/* Task Attachments & Comments Indicators */}
      {(task?.attachments > 0 || task?.comments > 0) && (
        <div className="flex items-center space-x-3 mt-3 pt-3 border-t border-border">
          {task?.attachments > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="Paperclip" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{task?.attachments}</span>
            </div>
          )}
          {task?.comments > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{task?.comments}</span>
            </div>
          )}
          {task?.subtasks > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="CheckSquare" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {task?.completedSubtasks}/{task?.subtasks}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;