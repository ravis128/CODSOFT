import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      title: "Create Project",
      description: "Start a new project",
      icon: "Plus",
      color: "bg-primary text-primary-foreground",
      onClick: () => navigate('/projects-list')
    },
    {
      id: 2,
      title: "Add Team Member",
      description: "Invite new member",
      icon: "UserPlus",
      color: "bg-success text-success-foreground",
      onClick: () => navigate('/team-management')
    },
    {
      id: 3,
      title: "View Reports",
      description: "Analytics & insights",
      icon: "BarChart3",
      color: "bg-accent text-accent-foreground",
      onClick: () => navigate('/reports-analytics')
    },
    {
      id: 4,
      title: "Quick Task",
      description: "Create urgent task",
      icon: "Zap",
      color: "bg-warning text-warning-foreground",
      onClick: () => console.log('Quick task creation')
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: "E-commerce Platform",
      progress: 75,
      color: "bg-primary"
    },
    {
      id: 2,
      name: "Mobile App Redesign",
      progress: 45,
      color: "bg-success"
    },
    {
      id: 3,
      name: "Backend Optimization",
      progress: 60,
      color: "bg-warning"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
        </div>
        
        <div className="p-6 space-y-3">
          {actions?.map((action) => (
            <Button
              key={action?.id}
              variant="ghost"
              onClick={action?.onClick}
              className="w-full justify-start p-4 h-auto hover:bg-muted/50"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action?.color}`}>
                  <Icon name={action?.icon} size={20} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground text-sm">{action?.title}</p>
                  <p className="text-xs text-muted-foreground">{action?.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Recent Projects */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Projects</h2>
            <Button variant="ghost" size="icon">
              <Icon name="MoreVertical" size={16} />
            </Button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          {recentProjects?.map((project) => (
            <div key={project?.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${project?.color}`} />
                  <span className="font-medium text-foreground text-sm">{project?.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{project?.progress}%</span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${project?.color}`}
                  style={{ width: `${project?.progress}%` }}
                />
              </div>
            </div>
          ))}
          
          <Button variant="ghost" className="w-full text-sm mt-4">
            View All Projects
          </Button>
        </div>
      </div>
      {/* Calendar Widget */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Calendar</h2>
            <Icon name="Calendar" size={20} className="text-muted-foreground" />
          </div>
        </div>
        
        <div className="p-6">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-foreground">
              {new Date()?.toLocaleDateString('en-US', { day: 'numeric' })}
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date()?.toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long',
                year: 'numeric'
              })}
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Today's Tasks</span>
              <span className="font-medium text-foreground">3</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">This Week</span>
              <span className="font-medium text-foreground">12</span>
            </div>
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            Open Calendar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;