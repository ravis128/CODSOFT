import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const filterOptions = {
    status: [
      { value: 'all', label: 'All Status', count: 24 },
      { value: 'todo', label: 'To Do', count: 8 },
      { value: 'in-progress', label: 'In Progress', count: 6 },
      { value: 'review', label: 'Review', count: 4 },
      { value: 'completed', label: 'Completed', count: 6 }
    ],
    priority: [
      { value: 'all', label: 'All Priority', count: 24 },
      { value: 'high', label: 'High', count: 5 },
      { value: 'medium', label: 'Medium', count: 12 },
      { value: 'low', label: 'Low', count: 7 }
    ],
    assignee: [
      { value: 'all', label: 'All Members', count: 24 },
      { value: 'john-doe', label: 'John Doe', count: 8 },
      { value: 'sarah-wilson', label: 'Sarah Wilson', count: 6 },
      { value: 'mike-johnson', label: 'Mike Johnson', count: 5 },
      { value: 'unassigned', label: 'Unassigned', count: 5 }
    ]
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== 'all');

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs"
          >
            Clear All
          </Button>
        )}
      </div>
      {/* Status Filter */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Status
        </label>
        <div className="space-y-1">
          {filterOptions?.status?.map((option) => (
            <button
              key={option?.value}
              onClick={() => onFilterChange('status', option?.value)}
              className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors ${
                filters?.status === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-foreground'
              }`}
            >
              <span>{option?.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                filters?.status === option?.value
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {option?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Priority Filter */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Priority
        </label>
        <div className="space-y-1">
          {filterOptions?.priority?.map((option) => (
            <button
              key={option?.value}
              onClick={() => onFilterChange('priority', option?.value)}
              className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors ${
                filters?.priority === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-foreground'
              }`}
            >
              <div className="flex items-center space-x-2">
                {option?.value !== 'all' && (
                  <div className={`w-2 h-2 rounded-full ${
                    option?.value === 'high' ? 'bg-error' :
                    option?.value === 'medium' ? 'bg-warning' : 'bg-success'
                  }`} />
                )}
                <span>{option?.label}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                filters?.priority === option?.value
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {option?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Assignee Filter */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Assignee
        </label>
        <div className="space-y-1">
          {filterOptions?.assignee?.map((option) => (
            <button
              key={option?.value}
              onClick={() => onFilterChange('assignee', option?.value)}
              className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors ${
                filters?.assignee === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-foreground'
              }`}
            >
              <div className="flex items-center space-x-2">
                {option?.value !== 'all' && option?.value !== 'unassigned' && (
                  <div className="w-4 h-4 bg-muted rounded-full flex items-center justify-center">
                    <Icon name="User" size={10} className="text-muted-foreground" />
                  </div>
                )}
                {option?.value === 'unassigned' && (
                  <Icon name="UserX" size={14} className="text-muted-foreground" />
                )}
                <span>{option?.label}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                filters?.assignee === option?.value
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {option?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Quick Filters */}
      <div className="pt-4 border-t border-border space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Quick Filters
        </label>
        <div className="space-y-1">
          <button className="w-full flex items-center space-x-2 p-2 rounded-md text-sm hover:bg-muted text-foreground transition-colors">
            <Icon name="Clock" size={14} className="text-warning" />
            <span>Due Today</span>
            <span className="ml-auto text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">3</span>
          </button>
          <button className="w-full flex items-center space-x-2 p-2 rounded-md text-sm hover:bg-muted text-foreground transition-colors">
            <Icon name="AlertTriangle" size={14} className="text-error" />
            <span>Overdue</span>
            <span className="ml-auto text-xs bg-error/20 text-error px-2 py-1 rounded-full">2</span>
          </button>
          <button className="w-full flex items-center space-x-2 p-2 rounded-md text-sm hover:bg-muted text-foreground transition-colors">
            <Icon name="User" size={14} className="text-primary" />
            <span>My Tasks</span>
            <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">8</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;