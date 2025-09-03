import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

import Image from '../../../components/AppImage';
import OrderStatusBadge from './OrderStatusBadge';

const OrderDetailsModal = ({ isOpen, onClose, order, onStatusUpdate }) => {
  const [trackingNumber, setTrackingNumber] = useState(order?.trackingNumber || '');
  const [newStatus, setNewStatus] = useState(order?.status || '');
  const [adminNotes, setAdminNotes] = useState('');

  if (!isOpen || !order) return null;

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusUpdate = () => {
    if (onStatusUpdate) {
      onStatusUpdate(order?.id, {
        status: newStatus,
        trackingNumber,
        adminNotes
      });
    }
    onClose();
  };

  const handlePrintLabel = () => {
    window.print();
  };

  const handleSendEmail = () => {
    // Handle email sending logic
    console.log('Sending email to customer...');
  };

  return (
    <div className="fixed inset-0 z-1200 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Order Details</h2>
            <p className="text-sm text-muted-foreground">Order #{order?.orderNumber}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Order Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Order Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Order Date:</span>
                    <span className="text-sm text-foreground">{formatDate(order?.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Payment Status:</span>
                    <OrderStatusBadge status={order?.paymentStatus} type="payment" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Fulfillment Status:</span>
                    <OrderStatusBadge status={order?.status} type="fulfillment" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Shipping Method:</span>
                    <span className="text-sm text-foreground">{order?.shippingMethod}</span>
                  </div>
                  {order?.trackingNumber && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tracking Number:</span>
                      <span className="text-sm text-foreground font-mono">{order?.trackingNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Customer Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{order?.customer?.name}</p>
                    <p className="text-sm text-muted-foreground">{order?.customer?.email}</p>
                    <p className="text-sm text-muted-foreground">{order?.customer?.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Shipping Address:</p>
                    <div className="text-sm text-muted-foreground">
                      <p>{order?.shippingAddress?.street}</p>
                      <p>{order?.shippingAddress?.city}, {order?.shippingAddress?.state} {order?.shippingAddress?.zipCode}</p>
                      <p>{order?.shippingAddress?.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Order Items</h3>
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="divide-y divide-border">
                  {order?.items?.map((item, index) => (
                    <div key={index} className="p-4 flex items-center space-x-4">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item?.image}
                          alt={item?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground truncate">{item?.name}</h4>
                        <p className="text-sm text-muted-foreground">SKU: {item?.sku}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item?.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{formatCurrency(item?.price)}</p>
                        <p className="text-xs text-muted-foreground">each</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{formatCurrency(item?.price * item?.quantity)}</p>
                        <p className="text-xs text-muted-foreground">total</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Totals */}
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="text-foreground">{formatCurrency(order?.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="text-foreground">{formatCurrency(order?.shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax:</span>
                  <span className="text-foreground">{formatCurrency(order?.tax)}</span>
                </div>
                <div className="border-t border-border pt-2">
                  <div className="flex justify-between text-base font-medium">
                    <span className="text-foreground">Total:</span>
                    <span className="text-foreground">{formatCurrency(order?.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Update Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Update Order</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Order Status"
                  options={statusOptions}
                  value={newStatus}
                  onChange={setNewStatus}
                />
                <Input
                  label="Tracking Number"
                  type="text"
                  placeholder="Enter tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e?.target?.value)}
                />
              </div>
              <Input
                label="Admin Notes"
                type="text"
                placeholder="Add internal notes..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e?.target?.value)}
              />
            </div>

            {/* Order Timeline */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Order Timeline</h3>
              <div className="space-y-3">
                {order?.timeline?.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{event?.action}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(event?.date)}</p>
                      {event?.note && (
                        <p className="text-xs text-muted-foreground mt-1">{event?.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePrintLabel} iconName="Printer">
              Print Label
            </Button>
            <Button variant="outline" onClick={handleSendEmail} iconName="Mail">
              Email Customer
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleStatusUpdate} iconName="Save">
              Update Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;