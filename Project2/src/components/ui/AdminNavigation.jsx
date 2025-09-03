import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import UserProfileMenu from './UserProfileMenu';

const AdminNavigation = ({ isCollapsed = false, user = null }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isCollapsed);

  const navigationItems = [
    { label: 'Dashboard', path: '/admin-dashboard', icon: 'BarChart3' },
    { label: 'Products', path: '/admin-product-management', icon: 'Package' },
    { label: 'Orders', path: '/admin-order-management', icon: 'ShoppingCart' }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-1000 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
            >
              <Icon name="Menu" size={20} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <span className="text-lg font-bold">EcommerceHub</span>
            </div>
          </div>
          
          <UserProfileMenu user={user} context="admin" />
        </div>
      </header>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col z-1000 bg-card border-r border-border transition-all duration-300 ${
        sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <span className="text-lg font-bold">EcommerceHub</span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
          >
            <Icon name={sidebarCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors duration-200 ${
                isActivePath(item?.path)
                  ? 'text-primary bg-primary/10 border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={sidebarCollapsed ? item?.label : ''}
            >
              <Icon name={item?.icon} size={20} />
              {!sidebarCollapsed && (
                <span className="font-medium">{item?.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-border">
          <UserProfileMenu user={user} context="admin" collapsed={sidebarCollapsed} />
        </div>
      </aside>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-1200 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-card shadow-lg animate-slide-in">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="ShoppingBag" size={20} color="white" />
                </div>
                <span className="text-lg font-bold">EcommerceHub</span>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <nav className="p-4 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10 border border-primary/20' :'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
      {/* Main Content Offset */}
      <div className={`lg:pl-${sidebarCollapsed ? '16' : '64'} transition-all duration-300`}>
        {/* Content goes here */}
      </div>
    </>
  );
};

export default AdminNavigation;