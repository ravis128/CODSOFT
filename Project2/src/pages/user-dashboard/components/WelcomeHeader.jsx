import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ user }) => {
  const currentHour = new Date()?.getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-lg mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {getGreeting()}, {user?.name || 'User'}!
          </h1>
          <p className="text-primary-foreground/80">
            Welcome back to your dashboard
          </p>
        </div>
        <div className="relative">
          <button className="p-2 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors duration-200">
            <Icon name="Bell" size={20} />
          </button>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;