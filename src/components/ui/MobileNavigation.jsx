import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const MobileNavigation = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    projects: false,
  });

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview and quick actions',
    },
    {
      label: 'Projects',
      path: '/projects-list',
      icon: 'FolderOpen',
      description: 'Manage all projects',
      badge: '12',
      children: [
        { label: 'All Projects', path: '/projects-list', description: 'View all projects' },
        { label: 'Active Projects', path: '/projects-list?status=active', description: 'Currently active' },
        { label: 'Completed', path: '/projects-list?status=completed', description: 'Finished projects' },
      ],
    },
    {
      label: 'Team Management',
      path: '/team-management',
      icon: 'Users',
      description: 'Manage team members and roles',
    },
    {
      label: 'Reports & Analytics',
      path: '/reports-analytics',
      icon: 'BarChart3',
      description: 'Performance insights and data',
    },
  ];

  const secondaryItems = [
    {
      label: 'Profile Settings',
      path: '/user-profile-settings',
      icon: 'Settings',
      description: 'Account and preferences',
    },
    {
      label: 'Help & Support',
      path: '/help',
      icon: 'HelpCircle',
      description: 'Get help and support',
    },
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
    onClose();
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section],
    }));
  };

  const isActiveRoute = (path) => {
    if (path === '/projects-list') {
      return location?.pathname === '/projects-list' || location?.pathname === '/project-detail';
    }
    return location?.pathname === path;
  };

  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-1200 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Navigation Panel */}
      <div className="relative flex flex-col w-full max-w-sm bg-card animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">ProjectFlow</h1>
              <p className="text-sm text-muted-foreground">Project Management</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Primary Navigation */}
          <div className="p-6">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Main Navigation
            </h2>
            <div className="space-y-2">
              {navigationItems?.map((item) => (
                <div key={item?.path}>
                  <div
                    className={`flex items-center justify-between p-4 rounded-lg transition-colors duration-200 ${
                      isActiveRoute(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => {
                      if (item?.children) {
                        toggleSection('projects');
                      } else {
                        handleNavigation(item?.path);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <Icon
                        name={item?.icon}
                        size={24}
                        className={isActiveRoute(item?.path) ? 'text-primary-foreground' : 'text-muted-foreground'}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{item?.label}</span>
                          {item?.badge && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              isActiveRoute(item?.path)
                                ? 'bg-primary-foreground text-primary'
                                : 'bg-accent text-accent-foreground'
                            }`}>
                              {item?.badge}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm ${
                          isActiveRoute(item?.path) ? 'text-primary-foreground/80' : 'text-muted-foreground'
                        }`}>
                          {item?.description}
                        </p>
                      </div>
                    </div>
                    {item?.children && (
                      <Icon
                        name="ChevronDown"
                        size={20}
                        className={`transition-transform duration-200 ${
                          expandedSections?.projects ? 'rotate-180' : ''
                        } ${isActiveRoute(item?.path) ? 'text-primary-foreground' : 'text-muted-foreground'}`}
                      />
                    )}
                  </div>

                  {/* Sub-navigation */}
                  {item?.children && expandedSections?.projects && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item?.children?.map((child) => (
                        <div
                          key={child?.path}
                          className="flex items-center space-x-3 p-3 rounded-md hover:bg-muted transition-colors duration-200"
                          onClick={() => handleNavigation(child?.path)}
                        >
                          <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-foreground">{child?.label}</span>
                            <p className="text-xs text-muted-foreground">{child?.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Navigation */}
          <div className="px-6 pb-6">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Account & Support
            </h2>
            <div className="space-y-2">
              {secondaryItems?.map((item) => (
                <div
                  key={item?.path}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-colors duration-200 ${
                    location?.pathname === item?.path
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => handleNavigation(item?.path)}
                >
                  <Icon
                    name={item?.icon}
                    size={24}
                    className={location?.pathname === item?.path ? 'text-primary-foreground' : 'text-muted-foreground'}
                  />
                  <div className="flex-1">
                    <span className="font-medium">{item?.label}</span>
                    <p className={`text-sm ${
                      location?.pathname === item?.path ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {item?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Info Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={20} color="white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">John Doe</p>
              <p className="text-sm text-muted-foreground">Project Manager</p>
            </div>
            <Button variant="ghost" size="icon">
              <Icon name="LogOut" size={20} className="text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;