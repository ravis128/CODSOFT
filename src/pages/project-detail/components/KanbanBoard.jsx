import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import TaskCard from './TaskCard';

const KanbanBoard = ({ tasks, onTaskMove, onTaskClick, onAddTask }) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-muted', count: 0 },
    { id: 'in-progress', title: 'In Progress', color: 'bg-warning/20', count: 0 },
    { id: 'review', title: 'Review', color: 'bg-primary/20', count: 0 },
    { id: 'completed', title: 'Completed', color: 'bg-success/20', count: 0 }
  ];

  // Group tasks by status and count them
  const tasksByStatus = tasks?.reduce((acc, task) => {
    if (!acc?.[task?.status]) {
      acc[task.status] = [];
    }
    acc?.[task?.status]?.push(task);
    return acc;
  }, {});

  // Update column counts
  columns?.forEach(column => {
    column.count = tasksByStatus?.[column?.id]?.length || 0;
  });

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, columnId) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  };

  const handleDragLeave = (e) => {
    if (!e?.currentTarget?.contains(e?.relatedTarget)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e, columnId) => {
    e?.preventDefault();
    if (draggedTask && draggedTask?.status !== columnId) {
      onTaskMove(draggedTask?.id, columnId);
    }
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  return (
    <div className="flex-1 overflow-x-auto">
      <div className="flex space-x-6 min-w-max pb-6">
        {columns?.map((column) => (
          <div
            key={column?.id}
            className={`flex-shrink-0 w-80 ${
              dragOverColumn === column?.id ? 'bg-primary/5 rounded-lg' : ''
            }`}
            onDragOver={(e) => handleDragOver(e, column?.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column?.id)}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${column?.color}`} />
                <h3 className="font-medium text-foreground">{column?.title}</h3>
                <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                  {column?.count}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onAddTask(column?.id)}
                  className="w-6 h-6"
                >
                  <Icon name="Plus" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                >
                  <Icon name="MoreHorizontal" size={14} />
                </Button>
              </div>
            </div>

            {/* Column Content */}
            <div className="space-y-3 min-h-96">
              {tasksByStatus?.[column?.id]?.map((task) => (
                <div
                  key={task?.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                  onDragEnd={handleDragEnd}
                >
                  <TaskCard
                    task={task}
                    onTaskClick={onTaskClick}
                    onStatusChange={() => {}}
                    isDragging={draggedTask?.id === task?.id}
                  />
                </div>
              ))}

              {/* Empty State */}
              {(!tasksByStatus?.[column?.id] || tasksByStatus?.[column?.id]?.length === 0) && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
                    <Icon name="Plus" size={20} className="text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">No tasks yet</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onAddTask(column?.id)}
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Add Task
                  </Button>
                </div>
              )}

              {/* Drop Zone Indicator */}
              {dragOverColumn === column?.id && draggedTask && (
                <div className="border-2 border-dashed border-primary bg-primary/5 rounded-lg p-4 text-center">
                  <Icon name="ArrowDown" size={16} className="text-primary mx-auto mb-2" />
                  <p className="text-sm text-primary">Drop task here</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;