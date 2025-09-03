import React from 'react';

const OrderStatusBadge = ({ status, type = 'fulfillment' }) => {
  const getStatusConfig = (status, type) => {
    if (type === 'payment') {
      switch (status?.toLowerCase()) {
        case 'paid':
          return { color: 'bg-success text-success-foreground', label: 'Paid' };
        case 'pending':
          return { color: 'bg-warning text-warning-foreground', label: 'Pending' };
        case 'failed':
          return { color: 'bg-error text-error-foreground', label: 'Failed' };
        case 'refunded':
          return { color: 'bg-secondary text-secondary-foreground', label: 'Refunded' };
        default:
          return { color: 'bg-muted text-muted-foreground', label: 'Unknown' };
      }
    } else {
      switch (status?.toLowerCase()) {
        case 'pending':
          return { color: 'bg-warning text-warning-foreground', label: 'Pending' };
        case 'processing':
          return { color: 'bg-accent text-accent-foreground', label: 'Processing' };
        case 'shipped':
          return { color: 'bg-primary text-primary-foreground', label: 'Shipped' };
        case 'delivered':
          return { color: 'bg-success text-success-foreground', label: 'Delivered' };
        case 'cancelled':
          return { color: 'bg-error text-error-foreground', label: 'Cancelled' };
        default:
          return { color: 'bg-muted text-muted-foreground', label: 'Unknown' };
      }
    }
  };

  const config = getStatusConfig(status, type);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config?.color}`}>
      {config?.label}
    </span>
  );
};

export default OrderStatusBadge;