import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectTabs = ({ activeTab, onTabChange, taskCount = 0, fileCount = 0, activityCount = 0 }) => {
  const tabs = [
    { 
      id: 'tasks', 
      label: 'Tasks', 
      icon: 'CheckSquare', 
      count: taskCount,
      description: 'Manage project tasks and assignments'
    },
    { 
      id: 'timeline', 
      label: 'Timeline', 
      icon: 'Calendar', 
      count: null,
      description: 'View project timeline and milestones'
    },
    { 
      id: 'files', 
      label: 'Files', 
      icon: 'FileText', 
      count: fileCount,
      description: 'Project documents and attachments'
    },
    { 
      id: 'activity', 
      label: 'Activity', 
      icon: 'Activity', 
      count: activityCount,
      description: 'Recent project activity and updates'
    }
  ];

  return (
    <div className="border-b border-border mb-6">
      {/* Desktop Tabs */}
      <div className="hidden md:flex space-x-8">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
              activeTab === tab?.id
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={18} />
            <span className="font-medium">{tab?.label}</span>
            {tab?.count !== null && (
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === tab?.id
                  ? 'bg-primary/20 text-primary' :'bg-muted text-muted-foreground'
              }`}>
                {tab?.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Mobile Tabs */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex-shrink-0 flex flex-col items-center space-y-1 p-3 min-w-20 transition-colors ${
                activeTab === tab?.id
                  ? 'text-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <div className="relative">
                <Icon name={tab?.icon} size={20} />
                {tab?.count !== null && tab?.count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {tab?.count > 99 ? '99+' : tab?.count}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{tab?.label}</span>
            </button>
          ))}
        </div>
        
        {/* Active Tab Indicator */}
        <div className="px-4 py-2 bg-muted/30">
          <p className="text-xs text-muted-foreground">
            {tabs?.find(tab => tab?.id === activeTab)?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectTabs;