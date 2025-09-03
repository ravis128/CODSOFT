import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Icon from '../AppIcon';
import UserProfileMenu from './UserProfileMenu';
import CartIndicator from './CartIndicator';
import Button from './Button';

const CustomerNavigation = ({ cartItemCount = 0 }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Shop', path: '/product-catalog', icon: 'Store' },
    { label: 'Cart', path: '/shopping-cart', icon: 'ShoppingCart' },
    { label: 'Account', path: '/user-dashboard', icon: 'User' }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-1000 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => handleNavigation('/')}
                className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="ShoppingBag" size={20} color="white" />
                </div>
                <span className="text-xl font-bold">EcommerceHub</span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <CartIndicator count={cartItemCount} onClick={() => handleNavigation('/shopping-cart')} />
              {isAuthenticated ? (
                <UserProfileMenu user={user} context="customer" />
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation('/signin')}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Sign in
                  </Button>
                  <Button
                    onClick={() => handleNavigation('/signup')}
                    className="px-4"
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </button>
            ))}
            
            {!isAuthenticated && (
              <div className="pt-4 border-t border-border space-y-2">
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => handleNavigation('/signin')}
                  className="justify-start text-muted-foreground hover:text-foreground"
                >
                  Sign in
                </Button>
                <Button
                  fullWidth
                  onClick={() => handleNavigation('/signup')}
                  className="justify-start"
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors duration-200"
        >
          <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
        </button>
      </div>
    </>
  );
};

export default CustomerNavigation;