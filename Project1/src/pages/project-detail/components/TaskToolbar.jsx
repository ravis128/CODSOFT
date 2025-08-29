import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TaskToolbar = ({ 
  viewMode, 
  onViewModeChange, 
  searchQuery, 
  onSearchChange, 
  onAddTask,
  onBulkActions,
  selectedTasks = []
}) => {
  const [showBulkActions, setShowBulkActions] = useState(false);

  const viewModes = [
    { id: 'board', label: 'Board', icon: 'Columns' },
    { id: 'list', label: 'List', icon: 'List' },
    { id: 'timeline', label: 'Timeline', icon: 'Calendar' }
  ];

  const bulkActions = [
    { id: 'assign', label: 'Assign to...', icon: 'UserPlus' },
    { id: 'priority', label: 'Set Priority', icon: 'Flag' },
    { id: 'status', label: 'Change Status', icon: 'RefreshCw' },
    { id: 'delete', label: 'Delete Tasks', icon: 'Trash2', variant: 'destructive' }
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* View Mode Toggle */}
        <div className="flex items-center bg-muted rounded-lg p-1">
          {viewModes?.map((mode) => (
            <Button
              key={mode?.id}
              variant={viewMode === mode?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange(mode?.id)}
              iconName={mode?.icon}
              iconPosition="left"
              iconSize={16}
              className="px-3"
            >
              <span className="hidden sm:inline">{mode?.label}</span>
            </Button>
          ))}
        </div>

        {/* Bulk Actions */}
        {selectedTasks?.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {selectedTasks?.length} selected
            </span>
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkActions(!showBulkActions)}
                iconName="ChevronDown"
                iconPosition="right"
                iconSize={14}
              >
                Actions
              </Button>
              
              {showBulkActions && (
                <div className="dropdown-overlay absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-elevation-3">
                  <div className="p-1">
                    {bulkActions?.map((action) => (
                      <Button
                        key={action?.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          onBulkActions(action?.id, selectedTasks);
                          setShowBulkActions(false);
                        }}
                        iconName={action?.icon}
                        iconPosition="left"
                        iconSize={14}
                        className={`w-full justify-start ${
                          action?.variant === 'destructive' ? 'text-error hover:text-error' : ''
                        }`}
                      >
                        {action?.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Right Section */}
      <div className="flex items-center space-x-3">
        {/* Search */}
        <div className="relative w-64">
          <Input
            type="search"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
        </div>

        {/* Filter Toggle */}
        <Button
          variant="outline"
          size="sm"
          iconName="Filter"
          iconPosition="left"
          iconSize={16}
          className="hidden lg:flex"
        >
          Filter
        </Button>

        {/* Sort */}
        <Button
          variant="outline"
          size="sm"
          iconName="ArrowUpDown"
          iconPosition="left"
          iconSize={16}
          className="hidden lg:flex"
        >
          Sort
        </Button>

        {/* Add Task */}
        <Button
          variant="default"
          onClick={onAddTask}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          <span className="hidden sm:inline">Add Task</span>
          <span className="sm:hidden">Add</span>
        </Button>

        {/* More Options */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
        >
          <Icon name="MoreVertical" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default TaskToolbar;