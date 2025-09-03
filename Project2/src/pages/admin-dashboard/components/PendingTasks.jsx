import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingTasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Review pending orders',
      description: '5 orders waiting for approval',
      priority: 'high',
      dueDate: 'Today',
      completed: false,
      category: 'orders'
    },
    {
      id: 2,
      title: 'Update product descriptions',
      description: '12 products need better descriptions',
      priority: 'medium',
      dueDate: 'Tomorrow',
      completed: false,
      category: 'products'
    },
    {
      id: 3,
      title: 'Respond to customer inquiries',
      description: '3 support tickets pending',
      priority: 'high',
      dueDate: 'Today',
      completed: false,
      category: 'support'
    },
    {
      id: 4,
      title: 'Inventory audit',
      description: 'Monthly stock verification',
      priority: 'low',
      dueDate: 'This week',
      completed: false,
      category: 'inventory'
    },
    {
      id: 5,
      title: 'Generate sales report',
      description: 'Weekly performance analysis',
      priority: 'medium',
      dueDate: 'Friday',
      completed: true,
      category: 'reports'
    }
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'orders':
        return 'ShoppingCart';
      case 'products':
        return 'Package';
      case 'support':
        return 'MessageCircle';
      case 'inventory':
        return 'Archive';
      case 'reports':
        return 'BarChart3';
      default:
        return 'CheckSquare';
    }
  };

  const toggleTask = (id) => {
    setTasks(prev =>
      prev?.map(task =>
        task?.id === id ? { ...task, completed: !task?.completed } : task
      )
    );
  };

  const pendingTasks = tasks?.filter(task => !task?.completed);
  const completedTasks = tasks?.filter(task => task?.completed);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Pending Tasks</h3>
          <p className="text-sm text-muted-foreground">
            {pendingTasks?.length} tasks remaining
          </p>
        </div>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Add Task
        </Button>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {/* Pending Tasks */}
        {pendingTasks?.map((task) => (
          <div
            key={task?.id}
            className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200"
          >
            <div className="flex items-start space-x-3">
              <button
                onClick={() => toggleTask(task?.id)}
                className="mt-1 p-1 rounded-md hover:bg-muted transition-colors duration-200"
              >
                <Icon 
                  name={task?.completed ? 'CheckSquare' : 'Square'} 
                  size={16} 
                  className={task?.completed ? 'text-success' : 'text-muted-foreground'}
                />
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground">{task?.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getCategoryIcon(task?.category)} 
                      size={14} 
                      className="text-muted-foreground" 
                    />
                    <span className={`text-xs font-medium ${getPriorityColor(task?.priority)}`}>
                      {task?.priority?.toUpperCase()}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{task?.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">Due: {task?.dueDate}</span>
                  <button className="text-xs text-primary hover:text-primary/80 transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Completed Tasks */}
        {completedTasks?.length > 0 && (
          <>
            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                Completed ({completedTasks?.length})
              </h4>
            </div>
            {completedTasks?.map((task) => (
              <div
                key={task?.id}
                className="p-3 border border-border rounded-lg bg-muted/30 opacity-75"
              >
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => toggleTask(task?.id)}
                    className="mt-1 p-1 rounded-md hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="CheckSquare" size={16} className="text-success" />
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-muted-foreground line-through">
                        {task?.title}
                      </h4>
                      <Icon 
                        name={getCategoryIcon(task?.category)} 
                        size={14} 
                        className="text-muted-foreground" 
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{task?.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {pendingTasks?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={32} className="text-success mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">All tasks completed!</p>
        </div>
      )}
    </div>
  );
};

export default PendingTasks;