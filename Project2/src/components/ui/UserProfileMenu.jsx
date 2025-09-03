import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Icon from '../AppIcon';

const UserProfileMenu = ({ context = 'customer', collapsed = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const menuRef = useRef(null);

  const customerMenuItems = [
    {
      label: 'My Dashboard',
      icon: 'LayoutDashboard',
      action: () => navigate('/user-dashboard')
    },
    {
      label: 'Profile Settings',
      icon: 'Settings',
      action: () => navigate('/profile')
    },
    {
      label: 'My Orders',
      icon: 'Package',
      action: () => navigate('/user-dashboard')
    },
    {
      label: 'Wishlist',
      icon: 'Heart',
      action: () => navigate('/user-dashboard')
    },
    {
      label: 'Help & Support',
      icon: 'HelpCircle',
      action: () => navigate('/user-dashboard')
    }
  ];

  const adminMenuItems = [
    { label: 'Admin Settings', icon: 'Settings', action: () => navigate('/admin-settings') },
    { label: 'User Management', icon: 'Users', action: () => navigate('/admin-users') },
    { label: 'System Logs', icon: 'FileText', action: () => navigate('/admin-logs') },
    { label: 'Switch to Customer', icon: 'ArrowLeftRight', action: () => navigate('/product-catalog') }
  ];

  const menuItems = context === 'admin' ? adminMenuItems : customerMenuItems;

  const handleLogout = () => {
    signOut();
    setIsOpen(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (action) => {
    action();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const userInitials = user?.name ? user?.name?.split(' ')?.map(n => n?.[0])?.join('')?.toUpperCase() : 'U';
  const userName = user?.name || 'User';
  const userEmail = user?.email || 'user@example.com';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors duration-200"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
          {userInitials}
        </div>
        {!collapsed && (
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>
        )}
        <Icon 
          name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          className="text-muted-foreground" 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg z-1100 animate-fade-in">
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                {userInitials}
              </div>
              <div>
                <p className="text-sm font-medium text-popover-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">{userEmail}</p>
              </div>
            </div>
          </div>

          <div className="p-2">
            {menuItems?.map((item) => (
              <button
                key={item?.label}
                onClick={() => handleMenuItemClick(item?.action)}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-popover-foreground hover:text-popover-foreground hover:bg-accent transition-colors duration-200"
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            ))}
          </div>

          <div className="p-2 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors duration-200"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileMenu;