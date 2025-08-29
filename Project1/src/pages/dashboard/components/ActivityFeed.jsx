import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      action: "completed task",
      target: "User Authentication Module",
      project: "E-commerce Platform",
      timestamp: "2 minutes ago",
      type: "task_completed",
      icon: "CheckCircle",
      color: "text-success"
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      action: "created new project",
      target: "Mobile App Redesign",
      project: null,
      timestamp: "15 minutes ago",
      type: "project_created",
      icon: "Plus",
      color: "text-primary"
    },
    {
      id: 3,
      user: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      action: "commented on",
      target: "Database Migration",
      project: "Backend Optimization",
      timestamp: "1 hour ago",
      type: "comment_added",
      icon: "MessageCircle",
      color: "text-accent"
    },
    {
      id: 4,
      user: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      action: "assigned task to",
      target: "API Integration",
      project: "Customer Portal",
      timestamp: "2 hours ago",
      type: "task_assigned",
      icon: "UserPlus",
      color: "text-secondary"
    },
    {
      id: 5,
      user: {
        name: "Lisa Wang",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      action: "uploaded files to",
      target: "Design Assets",
      project: "Brand Guidelines",
      timestamp: "3 hours ago",
      type: "file_uploaded",
      icon: "Upload",
      color: "text-warning"
    },
    {
      id: 6,
      user: {
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      action: "marked milestone as complete",
      target: "Phase 1 Development",
      project: "CRM System",
      timestamp: "4 hours ago",
      type: "milestone_completed",
      icon: "Flag",
      color: "text-success"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          <Icon name="Activity" size={20} className="text-muted-foreground" />
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors duration-200">
            <div className="flex items-start space-x-3">
              <div className="relative">
                <Image
                  src={activity?.user?.avatar}
                  alt={activity?.user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 bg-card border-2 border-card rounded-full flex items-center justify-center ${activity?.color}`}>
                  <Icon name={activity?.icon} size={12} />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-foreground text-sm">{activity?.user?.name}</span>
                  <span className="text-muted-foreground text-sm">{activity?.action}</span>
                </div>
                
                <p className="text-sm font-medium text-foreground mb-1">{activity?.target}</p>
                
                {activity?.project && (
                  <p className="text-xs text-muted-foreground mb-2">in {activity?.project}</p>
                )}
                
                <p className="text-xs text-muted-foreground">{activity?.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;