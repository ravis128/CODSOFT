import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ onActionClick }) => {
  const quickActions = [
    {
      id: 'reorder',
      title: 'Reorder Favorites',
      description: 'Quick reorder from your favorites',
      icon: 'RotateCcw',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'track',
      title: 'Track Packages',
      description: 'Track all your shipments',
      icon: 'Truck',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'addresses',
      title: 'Manage Addresses',
      description: 'Update delivery addresses',
      icon: 'MapPin',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      description: 'Manage payment options',
      icon: 'CreditCard',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => onActionClick(action?.id)}
            className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-sm group"
          >
            <div className={`w-12 h-12 ${action?.bgColor} rounded-lg flex items-center justify-center mb-3 mx-auto group-hover:scale-105 transition-transform duration-200`}>
              <Icon name={action?.icon} size={20} className={action?.color} />
            </div>
            <h3 className="text-sm font-medium text-card-foreground mb-1">
              {action?.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {action?.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;