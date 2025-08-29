import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ onMenuToggle, notificationCount = 0 }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Projects', path: '/projects-list', icon: 'FolderOpen' },
    { label: 'Team', path: '/team-management', icon: 'Users' },
    { label: 'Reports', path: '/reports-analytics', icon: 'BarChart3' },
  ];

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowUserMenu(false);
  };

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
    setShowNotifications(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowUserMenu(false);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      // Simulate a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Call the logout function from AuthContext
      logout();
      
      // Navigate to login page
      navigate('/login');
      
      // Close the user menu
      setShowUserMenu(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000 h-16">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Icon name="Menu" size={20} />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">ProjectFlow</h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant={location?.pathname === item?.path ? "default" : "ghost"}
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="px-4"
            >
              {item?.label}
            </Button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Icon name="Search" size={20} />
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationClick}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="dropdown-overlay absolute right-0 top-12 w-80 bg-popover border border-border rounded-md shadow-elevation-3">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium text-popover-foreground">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 text-center text-muted-foreground">
                    No new notifications
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleUserMenuClick}
              className="rounded-full"
            >
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <Icon name="User" size={16} />
              </div>
            </Button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="dropdown-overlay absolute right-0 top-12 w-56 bg-popover border border-border rounded-md shadow-elevation-3">
                <div className="p-2">
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation('/user-profile-settings')}
                    iconName="Settings"
                    iconPosition="left"
                    iconSize={16}
                    className="w-full justify-start"
                  >
                    Profile Settings
                  </Button>
                  <Button
                    variant="ghost"
                    iconName="HelpCircle"
                    iconPosition="left"
                    iconSize={16}
                    className="w-full justify-start"
                  >
                    Help & Support
                  </Button>
                  <div className="border-t border-border my-1"></div>
                  <Button
                    variant="ghost"
                    iconName="LogOut"
                    iconPosition="left"
                    iconSize={16}
                    className="w-full justify-start text-error hover:text-error"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;