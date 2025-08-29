import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();

  const routeMap = {
    '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/projects-list': { label: 'Projects', icon: 'FolderOpen' },
    '/project-detail': { label: 'Project Details', icon: 'FileText', parent: '/projects-list' },
    '/team-management': { label: 'Team Management', icon: 'Users' },
    '/reports-analytics': { label: 'Reports & Analytics', icon: 'BarChart3' },
    '/user-profile-settings': { label: 'Profile Settings', icon: 'Settings' },
  };

  const generateBreadcrumbs = () => {
    if (customItems) return customItems;

    const currentRoute = routeMap?.[location?.pathname];
    if (!currentRoute) return [];

    const breadcrumbs = [];

    // Add parent if exists
    if (currentRoute?.parent) {
      const parentRoute = routeMap?.[currentRoute?.parent];
      if (parentRoute) {
        breadcrumbs?.push({
          label: parentRoute?.label,
          path: currentRoute?.parent,
          icon: parentRoute?.icon,
        });
      }
    }

    // Add current route
    breadcrumbs?.push({
      label: currentRoute?.label,
      path: location?.pathname,
      icon: currentRoute?.icon,
      current: true,
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length === 0) return null;

  const handleNavigation = (path) => {
    if (path && path !== location?.pathname) {
      window.location.href = path;
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <Icon name="Home" size={16} className="text-muted-foreground" />
      {breadcrumbs?.map((item, index) => (
        <React.Fragment key={item?.path || index}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          
          {item?.current ? (
            <div className="flex items-center space-x-2">
              <Icon name={item?.icon} size={16} className="text-foreground" />
              <span className="font-medium text-foreground" aria-current="page">
                {item?.label}
              </span>
            </div>
          ) : (
            <Button
              variant="ghost"
              onClick={() => handleNavigation(item?.path)}
              className="h-auto p-0 text-muted-foreground hover:text-foreground"
            >
              <div className="flex items-center space-x-2">
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </div>
            </Button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;