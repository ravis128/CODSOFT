import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TimelineView = ({ tasks, milestones = [] }) => {
  // Combine tasks and milestones for timeline
  const timelineItems = [
    ...tasks?.map(task => ({
      ...task,
      type: 'task',
      date: task?.dueDate
    })),
    ...milestones?.map(milestone => ({
      ...milestone,
      type: 'milestone'
    }))
  ]?.sort((a, b) => new Date(a.date) - new Date(b.date));

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success border-success';
      case 'in-progress': return 'bg-warning border-warning';
      case 'review': return 'bg-primary border-primary';
      default: return 'bg-muted border-muted';
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
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 0) return `In ${diffDays} days`;
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;

    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Project Timeline</h3>
          <p className="text-sm text-muted-foreground">
            Track project progress and upcoming deadlines
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-md hover:bg-muted/80 transition-colors">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-md hover:bg-muted/80 transition-colors">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">View Calendar</span>
          </button>
        </div>
      </div>
      {/* Timeline Content */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

        {/* Timeline Items */}
        <div className="space-y-6">
          {timelineItems?.map((item, index) => (
            <div key={`${item?.type}-${item?.id}`} className="relative flex items-start space-x-6">
              {/* Timeline Dot */}
              <div className={`relative z-10 w-4 h-4 rounded-full border-2 ${
                item?.type === 'milestone' ?'bg-primary border-primary' 
                  : getStatusColor(item?.status)
              }`}>
                {item?.type === 'milestone' && (
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                )}
              </div>

              {/* Timeline Content */}
              <div className="flex-1 min-w-0 pb-6">
                <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-shadow">
                  {/* Item Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        {item?.type === 'milestone' ? (
                          <Icon name="Flag" size={16} className="text-primary" />
                        ) : (
                          <Icon name="CheckSquare" size={16} className={getPriorityColor(item?.priority)} />
                        )}
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {item?.title}
                        </h4>
                        {item?.type === 'task' && (
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item?.status === 'completed' ? 'bg-success/20 text-success' :
                            item?.status === 'in-progress' ? 'bg-warning/20 text-warning' :
                            item?.status === 'review'? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                          }`}>
                            {item?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                          </span>
                        )}
                      </div>
                      {item?.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {item?.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xs font-medium text-foreground">
                        {formatDate(item?.date)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.date)?.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Item Details */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Assignee */}
                      {item?.assignee && (
                        <div className="flex items-center space-x-2">
                          <Image
                            src={item?.assignee?.avatar}
                            alt={item?.assignee?.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-xs text-muted-foreground">
                            {item?.assignee?.name}
                          </span>
                        </div>
                      )}

                      {/* Progress */}
                      {item?.progress !== undefined && item?.progress > 0 && (
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-muted rounded-full h-1">
                            <div
                              className="bg-primary h-1 rounded-full"
                              style={{ width: `${item?.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {item?.progress}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-1">
                      {item?.comments > 0 && (
                        <div className="flex items-center space-x-1">
                          <Icon name="MessageCircle" size={12} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{item?.comments}</span>
                        </div>
                      )}
                      {item?.attachments > 0 && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Paperclip" size={12} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{item?.attachments}</span>
                        </div>
                      )}
                      <button className="p-1 hover:bg-muted rounded transition-colors">
                        <Icon name="MoreHorizontal" size={12} className="text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {timelineItems?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Calendar" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No timeline items</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tasks and milestones will appear here as they are created
            </p>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors mx-auto">
              <Icon name="Plus" size={16} />
              <span>Add Milestone</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineView;