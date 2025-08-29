import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProjectInfoCard = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'completed': return 'text-primary bg-primary/10';
      case 'on-hold': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      {/* Project Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">{project?.name}</h2>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
                {project?.status?.charAt(0)?.toUpperCase() + project?.status?.slice(1)}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project?.priority)}`}>
                {project?.priority?.charAt(0)?.toUpperCase() + project?.priority?.slice(1)} Priority
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-muted rounded-md transition-colors">
              <Icon name="Share2" size={16} className="text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-md transition-colors">
              <Icon name="MoreHorizontal" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project?.description}
        </p>
      </div>
      {/* Project Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Start Date</span>
          </div>
          <p className="text-sm text-muted-foreground">{project?.startDate}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="CalendarCheck" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Due Date</span>
          </div>
          <p className="text-sm text-muted-foreground">{project?.dueDate}</p>
        </div>
      </div>
      {/* Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Progress</span>
          <span className="text-sm font-medium text-foreground">{project?.progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${project?.progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{project?.completedTasks} of {project?.totalTasks} tasks completed</span>
          <span>{Math.round((project?.totalTasks - project?.completedTasks) / project?.totalTasks * 100)}% remaining</span>
        </div>
      </div>
      {/* Team Members */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Team Members</span>
          <span className="text-xs text-muted-foreground">{project?.teamMembers?.length} members</span>
        </div>
        <div className="space-y-2">
          {project?.teamMembers?.slice(0, 4)?.map((member) => (
            <div key={member?.id} className="flex items-center space-x-3">
              <Image
                src={member?.avatar}
                alt={member?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{member?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{member?.role}</p>
              </div>
              <div className="flex items-center space-x-1">
                {member?.isOnline && (
                  <div className="w-2 h-2 bg-success rounded-full" />
                )}
              </div>
            </div>
          ))}
          {project?.teamMembers?.length > 4 && (
            <button className="flex items-center space-x-2 text-xs text-primary hover:text-primary/80 transition-colors">
              <span>View all {project?.teamMembers?.length} members</span>
              <Icon name="ChevronRight" size={12} />
            </button>
          )}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center space-x-2 p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            <Icon name="Plus" size={16} />
            <span className="text-sm font-medium">Add Task</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-2 border border-border rounded-md hover:bg-muted transition-colors">
            <Icon name="UserPlus" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Add Member</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoCard;