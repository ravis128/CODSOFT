import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PriorityTasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete user authentication system",
      project: "E-commerce Platform",
      priority: "high",
      dueDate: "2025-01-12",
      assignee: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      status: "in_progress",
      progress: 75,
      tags: ["Backend", "Security"]
    },
    {
      id: 2,
      title: "Design mobile app wireframes",
      project: "Mobile App Redesign",
      priority: "high",
      dueDate: "2025-01-13",
      assignee: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      status: "todo",
      progress: 0,
      tags: ["Design", "UI/UX"]
    },
    {
      id: 3,
      title: "Database migration and optimization",
      project: "Backend Optimization",
      priority: "medium",
      dueDate: "2025-01-14",
      assignee: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      status: "in_progress",
      progress: 45,
      tags: ["Database", "Performance"]
    },
    {
      id: 4,
      title: "API integration for payment gateway",
      project: "Customer Portal",
      priority: "high",
      dueDate: "2025-01-15",
      assignee: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      status: "todo",
      progress: 0,
      tags: ["API", "Payment"]
    },
    {
      id: 5,
      title: "Create brand style guide",
      project: "Brand Guidelines",
      priority: "medium",
      dueDate: "2025-01-16",
      assignee: {
        name: "Lisa Wang",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      status: "in_progress",
      progress: 60,
      tags: ["Design", "Branding"]
    }
  ]);

  const priorityColors = {
    high: "bg-error text-error-foreground",
    medium: "bg-warning text-warning-foreground",
    low: "bg-success text-success-foreground"
  };

  const statusColors = {
    todo: "bg-muted text-muted-foreground",
    in_progress: "bg-primary text-primary-foreground",
    completed: "bg-success text-success-foreground"
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks?.map(task => 
      task?.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Priority Tasks</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Icon name="Filter" size={16} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="MoreVertical" size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {tasks?.map((task) => {
          const daysUntilDue = getDaysUntilDue(task?.dueDate);
          const isOverdue = daysUntilDue < 0;
          const isDueSoon = daysUntilDue <= 2 && daysUntilDue >= 0;
          
          return (
            <div key={task?.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors duration-200">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2">
                      {task?.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{task?.project}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors?.[task?.priority]}`}>
                      {task?.priority}
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                {task?.progress > 0 && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-medium text-foreground">{task?.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${task?.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {task?.tags?.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={task?.assignee?.avatar}
                        alt={task?.assignee?.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs text-muted-foreground">{task?.assignee?.name}</span>
                    </div>
                    
                    <div className={`flex items-center space-x-1 text-xs ${
                      isOverdue ? 'text-error' : isDueSoon ? 'text-warning' : 'text-muted-foreground'
                    }`}>
                      <Icon name="Calendar" size={12} />
                      <span>
                        {isOverdue ? `${Math.abs(daysUntilDue)} days overdue` : 
                         daysUntilDue === 0 ? 'Due today' :
                         daysUntilDue === 1 ? 'Due tomorrow' :
                         `${daysUntilDue} days left`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors?.[task?.status]}`}>
                      {task?.status?.replace('_', ' ')}
                    </span>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleStatusChange(task?.id, task?.status === 'completed' ? 'todo' : 'completed')}
                      className="w-6 h-6"
                    >
                      <Icon 
                        name={task?.status === 'completed' ? 'RotateCcw' : 'Check'} 
                        size={12} 
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full text-sm">
          View All Tasks
        </Button>
      </div>
    </div>
  );
};

export default PriorityTasks;