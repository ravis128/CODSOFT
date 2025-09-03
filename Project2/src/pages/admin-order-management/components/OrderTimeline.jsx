import React from 'react';
import Icon from '../../../components/AppIcon';
import OrderStatusBadge from './OrderStatusBadge';

const OrderTimeline = ({ selectedOrder, onAddNote }) => {
  if (!selectedOrder) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-8">
          <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Order Timeline</h3>
          <p className="text-muted-foreground">Select an order to view its timeline and history.</p>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'created':
        return 'Plus';
      case 'payment':
        return 'CreditCard';
      case 'processing':
        return 'Package';
      case 'shipped':
        return 'Truck';
      case 'delivered':
        return 'CheckCircle';
      case 'cancelled':
        return 'XCircle';
      case 'note':
        return 'MessageSquare';
      default:
        return 'Clock';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'created':
        return 'text-accent';
      case 'payment':
        return 'text-success';
      case 'processing':
        return 'text-warning';
      case 'shipped':
        return 'text-primary';
      case 'delivered':
        return 'text-success';
      case 'cancelled':
        return 'text-error';
      case 'note':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-foreground">Order Timeline</h3>
            <p className="text-sm text-muted-foreground">Order #{selectedOrder?.orderNumber}</p>
          </div>
          <OrderStatusBadge status={selectedOrder?.status} type="fulfillment" />
        </div>
      </div>
      {/* Timeline */}
      <div className="p-6">
        <div className="space-y-4">
          {selectedOrder?.timeline?.map((event, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getEventColor(event?.type)}`}>
                <Icon name={getEventIcon(event?.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{event?.action}</p>
                  <span className="text-xs text-muted-foreground">{formatDate(event?.date)}</span>
                </div>
                {event?.note && (
                  <p className="text-sm text-muted-foreground mt-1">{event?.note}</p>
                )}
                {event?.user && (
                  <p className="text-xs text-muted-foreground mt-1">by {event?.user}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Note Section */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={16} />
            </div>
            <div className="flex-1">
              <textarea
                placeholder="Add a note to this order..."
                className="w-full p-3 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                rows={3}
                onKeyDown={(e) => {
                  if (e?.key === 'Enter' && e?.ctrlKey) {
                    if (onAddNote && e?.target?.value?.trim()) {
                      onAddNote(selectedOrder?.id, e?.target?.value?.trim());
                      e.target.value = '';
                    }
                  }
                }}
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">Press Ctrl+Enter to add note</span>
                <button
                  onClick={(e) => {
                    const textarea = e?.target?.parentElement?.previousElementSibling;
                    if (onAddNote && textarea?.value?.trim()) {
                      onAddNote(selectedOrder?.id, textarea?.value?.trim());
                      textarea.value = '';
                    }
                  }}
                  className="text-xs text-primary hover:text-primary/80 font-medium"
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;