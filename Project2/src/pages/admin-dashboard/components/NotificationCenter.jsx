import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'Low Stock Alert',
      message: 'Wireless Headphones inventory is running low',
      time: '5 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'order',
      title: 'New Order',
      message: 'Order #ORD-2024-001 requires processing',
      time: '10 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'customer',
      title: 'Customer Support',
      message: 'New inquiry about product warranty',
      time: '1 hour ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'system',
      title: 'System Update',
      message: 'Scheduled maintenance completed successfully',
      time: '2 hours ago',
      read: true,
      priority: 'low'
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert':
        return 'AlertTriangle';
      case 'order':
        return 'ShoppingCart';
      case 'customer':
        return 'MessageCircle';
      case 'system':
        return 'Settings';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    if (priority === 'medium') return 'text-warning';
    
    switch (type) {
      case 'alert':
        return 'text-warning';
      case 'order':
        return 'text-success';
      case 'customer':
        return 'text-primary';
      case 'system':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev?.map(notif =>
        notif?.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev?.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-medium">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all read
          </Button>
        )}
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {notifications?.map((notification) => (
          <div
            key={notification?.id}
            className={`p-3 rounded-lg border transition-colors duration-200 cursor-pointer ${
              notification?.read
                ? 'bg-background border-border hover:bg-muted/50' :'bg-primary/5 border-primary/20 hover:bg-primary/10'
            }`}
            onClick={() => markAsRead(notification?.id)}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-1 rounded-full ${notification?.read ? 'opacity-60' : ''}`}>
                <Icon 
                  name={getNotificationIcon(notification?.type)} 
                  size={16} 
                  className={getNotificationColor(notification?.type, notification?.priority)}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`text-sm font-medium ${
                    notification?.read ? 'text-muted-foreground' : 'text-foreground'
                  }`}>
                    {notification?.title}
                  </h4>
                  {!notification?.read && (
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  )}
                </div>
                <p className={`text-sm mt-1 ${
                  notification?.read ? 'text-muted-foreground' : 'text-foreground'
                }`}>
                  {notification?.message}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {notification?.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="outline" size="sm" fullWidth>
          View All Notifications
        </Button>
      </div>
    </div>
  );
};

export default NotificationCenter;