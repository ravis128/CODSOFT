import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const UpcomingDeadlines = () => {
  const deadlines = [
    {
      id: 1,
      title: "User Authentication Module",
      project: "E-commerce Platform",
      dueDate: "2025-01-12",
      dueTime: "5:00 PM",
      assignee: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      priority: "high",
      type: "task"
    },
    {
      id: 2,
      title: "Mobile App Wireframes",
      project: "Mobile App Redesign",
      dueDate: "2025-01-13",
      dueTime: "2:00 PM",
      assignee: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      priority: "high",
      type: "deliverable"
    },
    {
      id: 3,
      title: "Phase 1 Milestone",
      project: "CRM System",
      dueDate: "2025-01-14",
      dueTime: "End of day",
      assignee: {
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      priority: "medium",
      type: "milestone"
    },
    {
      id: 4,
      title: "API Integration Testing",
      project: "Customer Portal",
      dueDate: "2025-01-15",
      dueTime: "12:00 PM",
      assignee: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      priority: "high",
      type: "task"
    },
    {
      id: 5,
      title: "Brand Guidelines Review",
      project: "Brand Guidelines",
      dueDate: "2025-01-16",
      dueTime: "3:00 PM",
      assignee: {
        name: "Lisa Wang",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      priority: "medium",
      type: "review"
    }
  ];

  const typeIcons = {
    task: "CheckSquare",
    deliverable: "Package",
    milestone: "Flag",
    review: "Eye"
  };

  const priorityColors = {
    high: "text-error",
    medium: "text-warning",
    low: "text-success"
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Upcoming Deadlines</h2>
          <Icon name="Clock" size={20} className="text-muted-foreground" />
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {deadlines?.map((deadline) => {
          const daysUntilDue = getDaysUntilDue(deadline?.dueDate);
          const isOverdue = daysUntilDue < 0;
          const isDueSoon = daysUntilDue <= 1 && daysUntilDue >= 0;
          
          return (
            <div key={deadline?.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors duration-200">
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isOverdue ? 'bg-error/10 text-error' : isDueSoon ?'bg-warning/10 text-warning': 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={typeIcons?.[deadline?.type]} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-foreground text-sm line-clamp-1">
                      {deadline?.title}
                    </h3>
                    <span className={`text-xs font-medium ${priorityColors?.[deadline?.priority]}`}>
                      {deadline?.priority}
                    </span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">{deadline?.project}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={deadline?.assignee?.avatar}
                        alt={deadline?.assignee?.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-xs text-muted-foreground">{deadline?.assignee?.name}</span>
                    </div>
                    
                    <div className={`text-xs font-medium ${
                      isOverdue ? 'text-error' : isDueSoon ?'text-warning': 'text-muted-foreground'
                    }`}>
                      {formatDate(deadline?.dueDate)} • {deadline?.dueTime}
                    </div>
                  </div>
                  
                  {(isOverdue || isDueSoon) && (
                    <div className={`mt-2 text-xs font-medium ${
                      isOverdue ? 'text-error' : 'text-warning'
                    }`}>
                      {isOverdue ? `${Math.abs(daysUntilDue)} days overdue` : 
                       daysUntilDue === 0 ? 'Due today' : 'Due tomorrow'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
          View Calendar
        </button>
      </div>
    </div>
  );
};

export default UpcomingDeadlines;