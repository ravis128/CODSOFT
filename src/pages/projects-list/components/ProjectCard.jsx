import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onEdit, onArchive, onShare, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'completed': return 'bg-primary text-primary-foreground';
      case 'on-hold': return 'bg-warning text-warning-foreground';
      case 'cancelled': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="group bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-all duration-200 cursor-pointer overflow-hidden">
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="flex-1 min-w-0" onClick={() => onViewDetails(project?.id)}>
          <div className="flex items-center space-x-2 mb-2 flex-wrap">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors break-words leading-tight">
              {project?.name}
            </h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(project?.status)}`}>
              {project?.status?.charAt(0)?.toUpperCase() + project?.status?.slice(1)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {project?.description}
          </p>
        </div>
        
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e?.stopPropagation();
              onEdit(project?.id);
            }}
            className="h-8 w-8"
          >
            <Icon name="Edit2" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e?.stopPropagation();
              onShare(project?.id);
            }}
            className="h-8 w-8"
          >
            <Icon name="Share2" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e?.stopPropagation();
              onArchive(project?.id);
            }}
            className="h-8 w-8"
          >
            <Icon name="Archive" size={16} />
          </Button>
        </div>
      </div>
      <div onClick={() => onViewDetails(project?.id)}>
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{project?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${project?.progress}%` }}
            />
          </div>
        </div>

        {/* Team Members */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Team:</span>
            <div className="flex -space-x-2">
              {project?.teamMembers?.slice(0, 4)?.map((member, index) => (
                <div
                  key={member?.id}
                  className="relative w-8 h-8 rounded-full border-2 border-card overflow-hidden"
                  title={member?.name}
                >
                  <Image
                    src={member?.avatar}
                    alt={member?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {project?.teamMembers?.length > 4 && (
                <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    +{project?.teamMembers?.length - 4}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Flag" size={14} className={getPriorityColor(project?.priority)} />
            <span className={`text-sm font-medium ${getPriorityColor(project?.priority)}`}>
              {project?.priority?.charAt(0)?.toUpperCase() + project?.priority?.slice(1)}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>Due: {formatDate(project?.dueDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="CheckSquare" size={14} />
              <span>{project?.completedTasks}/{project?.totalTasks} tasks</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>Updated {formatDate(project?.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;