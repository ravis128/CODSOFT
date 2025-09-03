import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentOrders = ({ orders }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-success text-success-foreground';
      case 'shipped':
        return 'bg-primary text-primary-foreground';
      case 'processing':
        return 'bg-warning text-warning-foreground';
      case 'cancelled':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-card-foreground">Recent Orders</h2>
        <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200">
          View All Orders
        </button>
      </div>
      <div className="space-y-4">
        {orders?.map((order) => (
          <div key={order?.id} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex-shrink-0">
              <Image
                src={order?.image}
                alt={order?.productName}
                className="w-16 h-16 object-cover rounded-md"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-card-foreground truncate">
                {order?.productName}
              </h3>
              <p className="text-xs text-muted-foreground">
                Order #{order?.orderNumber}
              </p>
              <p className="text-xs text-muted-foreground">
                {order?.orderDate}
              </p>
            </div>
            
            <div className="flex flex-col items-end space-y-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
                {order?.status}
              </span>
              <button className="text-primary hover:text-primary/80 text-xs font-medium flex items-center space-x-1 transition-colors duration-200">
                <Icon name="Truck" size={12} />
                <span>Track</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;