import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, isOpen = false, onClose }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    projects: true,
  });

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      badge: null,
    },
    {
      label: 'Projects',
      path: '/projects-list',
      icon: 'FolderOpen',
      badge: '12',
      children: [
        { label: 'All Projects', path: '/projects-list' },
        { label: 'Active Projects', path: '/projects-list?status=active' },
        { label: 'Completed', path: '/projects-list?status=completed' },
      ],
    },
    {
      label: 'Team Management',
      path: '/team-management',
      icon: 'Users',
      badge: null,
    },
    {
      label: 'Reports & Analytics',
      path: '/reports-analytics',
      icon: 'BarChart3',
      badge: null,
    },
  ];

  const secondaryItems = [
    {
      label: 'Profile Settings',
      path: '/user-profile-settings',
      icon: 'Settings',
    },
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
    if (onClose) onClose();
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

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems?.map((item) => (
          <div key={item?.path}>
            <Button
              variant={isActiveRoute(item?.path) ? "default" : "ghost"}
              onClick={() => {
                if (item?.children) {
                  toggleSection('projects');
                } else {
                  handleNavigation(item?.path);
                }
              }}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={20}
              className={`w-full justify-start ${isCollapsed ? 'px-3' : 'px-4'} h-11`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={isCollapsed ? 'sr-only' : ''}>{item?.label}</span>
                <div className="flex items-center space-x-2">
                  {item?.badge && !isCollapsed && (
                    <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                      {item?.badge}
                    </span>
                  )}
                  {item?.children && !isCollapsed && (
                    <Icon
                      name="ChevronDown"
                      size={16}
                      className={`transition-transform duration-200 ${
                        expandedSections?.projects ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>
              </div>
            </Button>

            {/* Sub-navigation */}
            {item?.children && expandedSections?.projects && !isCollapsed && (
              <div className="ml-6 mt-2 space-y-1">
                {item?.children?.map((child) => (
                  <Button
                    key={child?.path}
                    variant="ghost"
                    onClick={() => handleNavigation(child?.path)}
                    className="w-full justify-start px-4 h-9 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {child?.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Secondary Navigation */}
      <div className="px-4 py-4 border-t border-border">
        {secondaryItems?.map((item) => (
          <Button
            key={item?.path}
            variant={location?.pathname === item?.path ? "default" : "ghost"}
            onClick={() => handleNavigation(item?.path)}
            iconName={item?.icon}
            iconPosition="left"
            iconSize={20}
            className={`w-full justify-start ${isCollapsed ? 'px-3' : 'px-4'} h-11`}
          >
            <span className={isCollapsed ? 'sr-only' : ''}>{item?.label}</span>
          </Button>
        ))}
      </div>

      {/* User Info */}
      <div className="px-4 py-4 border-t border-border">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={16} color="white" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Project Manager</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-1000 lg:flex-col bg-card border-r border-border transition-all duration-300 ease-in-out ${
          isCollapsed ? 'lg:w-16' : 'lg:w-72'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-1200 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <aside className="relative flex flex-col w-72 bg-card border-r border-border animate-slide-in">
            {/* Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <h1 className="text-xl font-semibold text-foreground">ProjectFlow</h1>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;