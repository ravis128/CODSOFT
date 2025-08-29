import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GanttChart = ({ projects, onProjectClick }) => {
  const [viewMode, setViewMode] = useState('months');
  const [selectedProject, setSelectedProject] = useState(null);

  const viewModes = [
    { value: 'days', label: 'Days' },
    { value: 'weeks', label: 'Weeks' },
    { value: 'months', label: 'Months' }
  ];

  const getProjectProgress = (project) => {
    const total = project?.endDate - project?.startDate;
    const elapsed = Date.now() - project?.startDate;
    return Math.min(Math.max((elapsed / total) * 100, 0), 100);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'in-progress': return 'bg-primary';
      case 'delayed': return 'bg-error';
      case 'on-hold': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const generateTimelineHeaders = () => {
    const headers = [];
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    
    for (let i = 0; i < 6; i++) {
      const month = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + i, 1);
      headers?.push({
        label: month?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        value: month?.getTime()
      });
    }
    return headers;
  };

  const timelineHeaders = generateTimelineHeaders();

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Project Timeline</h3>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {viewModes?.map((mode) => (
              <Button
                key={mode?.value}
                variant={viewMode === mode?.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode(mode?.value)}
                className="px-3 py-1"
              >
                {mode?.label}
              </Button>
            ))}
          </div>
          
          <Button variant="outline" size="sm">
            <Icon name="Calendar" size={16} />
            Today
          </Button>
        </div>
      </div>
      {/* Gantt Chart Content */}
      <div className="p-4">
        <div className="overflow-x-auto">
          {/* Timeline Header */}
          <div className="flex mb-4">
            <div className="w-64 flex-shrink-0"></div>
            <div className="flex-1 grid grid-cols-6 gap-1">
              {timelineHeaders?.map((header, index) => (
                <div key={index} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {header?.label}
                </div>
              ))}
            </div>
          </div>

          {/* Project Rows */}
          <div className="space-y-3">
            {projects?.map((project) => {
              const progress = getProjectProgress(project);
              const isSelected = selectedProject === project?.id;
              
              return (
                <div
                  key={project?.id}
                  className={`flex items-center cursor-pointer transition-colors ${
                    isSelected ? 'bg-primary/5' : 'hover:bg-muted/30'
                  }`}
                  onClick={() => {
                    setSelectedProject(isSelected ? null : project?.id);
                    onProjectClick(project);
                  }}
                >
                  {/* Project Info */}
                  <div className="w-64 flex-shrink-0 p-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(project?.status)}`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {project?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(project?.startDate)} - {formatDate(project?.endDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Timeline Bar */}
                  <div className="flex-1 px-3">
                    <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
                      {/* Progress Bar */}
                      <div
                        className={`absolute top-0 left-0 h-full ${getStatusColor(project?.status)} opacity-80 rounded-lg transition-all duration-300`}
                        style={{ width: `${progress}%` }}
                      ></div>
                      
                      {/* Progress Text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium text-foreground">
                          {Math.round(progress)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex items-center space-x-2 px-3">
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Edit" size={14} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-sm text-muted-foreground">Delayed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-sm text-muted-foreground">On Hold</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;