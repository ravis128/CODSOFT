import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NotificationCenter = ({ notifications }) => {
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification?.read;
    return notification?.type === filter;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return 'Package';
      case 'promotion':
        return 'Tag';
      case 'account':
        return 'User';
      case 'payment':
        return 'CreditCard';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'order':
        return 'text-primary bg-primary/10';
      case 'promotion':
        return 'text-success bg-success/10';
      case 'account':
        return 'text-warning bg-warning/10';
      case 'payment':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInHours = Math.floor((now - notificationTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return notificationTime?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-card-foreground">Notifications</h2>
        <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200">
          Mark All Read
        </button>
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-4 bg-muted p-1 rounded-lg">
        {['all', 'unread', 'order', 'promotion']?.map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 capitalize ${
              filter === filterType
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {filterType}
          </button>
        ))}
      </div>
      {/* Notifications List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {filteredNotifications?.length > 0 ? (
          filteredNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors duration-200 cursor-pointer hover:border-primary/50 ${
                notification?.read ? 'border-border' : 'border-primary/20 bg-primary/5'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification?.type)}`}>
                <Icon name={getNotificationIcon(notification?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm font-medium mb-1 ${notification?.read ? 'text-muted-foreground' : 'text-card-foreground'}`}>
                  {notification?.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {notification?.message}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatTime(notification?.timestamp)}
                  </span>
                  {!notification?.read && (
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No notifications found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;