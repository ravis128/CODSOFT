import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'order',
      title: 'New order received',
      description: 'Order #ORD-2024-001 from John Smith',
      time: '2 minutes ago',
      icon: 'ShoppingCart',
      iconColor: 'text-success',
      iconBg: 'bg-success/10'
    },
    {
      id: 2,
      type: 'inventory',
      title: 'Low stock alert',
      description: 'Wireless Headphones - Only 5 units left',
      time: '15 minutes ago',
      icon: 'AlertTriangle',
      iconColor: 'text-warning',
      iconBg: 'bg-warning/10'
    },
    {
      id: 3,
      type: 'customer',
      title: 'New customer inquiry',
      description: 'Sarah Johnson asked about product warranty',
      time: '1 hour ago',
      icon: 'MessageCircle',
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10'
    },
    {
      id: 4,
      type: 'order',
      title: 'Order shipped',
      description: 'Order #ORD-2024-002 has been dispatched',
      time: '2 hours ago',
      icon: 'Truck',
      iconColor: 'text-success',
      iconBg: 'bg-success/10'
    },
    {
      id: 5,
      type: 'product',
      title: 'Product updated',
      description: 'Smart Watch price updated to $299',
      time: '3 hours ago',
      icon: 'Edit',
      iconColor: 'text-muted-foreground',
      iconBg: 'bg-muted'
    },
    {
      id: 6,
      type: 'inventory',
      title: 'Stock replenished',
      description: 'USB-C Cable - 50 units added to inventory',
      time: '4 hours ago',
      icon: 'Package',
      iconColor: 'text-success',
      iconBg: 'bg-success/10'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Latest updates and notifications</p>
        </div>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200">
          View All
        </button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className={`p-2 rounded-lg ${activity?.iconBg}`}>
              <Icon name={activity?.icon} size={16} className={activity?.iconColor} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity?.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{activity?.description}</p>
              <p className="text-xs text-muted-foreground mt-2">{activity?.time}</p>
            </div>
            
            <button className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200">
              <Icon name="MoreHorizontal" size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;