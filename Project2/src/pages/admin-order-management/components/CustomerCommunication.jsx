import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CustomerCommunication = ({ selectedOrder, onSendEmail }) => {
  const [emailTemplate, setEmailTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [emailSubject, setEmailSubject] = useState('');

  const emailTemplates = [
    { 
      value: 'order-confirmation', 
      label: 'Order Confirmation',
      subject: 'Order Confirmation - #{orderNumber}',
      content: `Dear {customerName},\n\nThank you for your order! We're excited to confirm that we've received your order #{orderNumber} and it's being processed.\n\nOrder Details:\n- Order Number: #{orderNumber}\n- Order Date: {orderDate}\n- Total: {orderTotal}\n\nWe'll send you another email with tracking information once your order ships.\n\nBest regards,\nEcommerceHub Team`
    },
    { 
      value: 'shipping-notification', 
      label: 'Shipping Notification',
      subject: 'Your Order #{orderNumber} Has Shipped!',
      content: `Dear {customerName},\n\nGreat news! Your order #{orderNumber} has been shipped and is on its way to you.\n\nShipping Details:\n- Tracking Number: {trackingNumber}\n- Shipping Method: {shippingMethod}\n- Estimated Delivery: {estimatedDelivery}\n\nYou can track your package using the tracking number above.\n\nBest regards,\nEcommerceHub Team`
    },
    { 
      value: 'delivery-confirmation', 
      label: 'Delivery Confirmation',
      subject: 'Your Order #{orderNumber} Has Been Delivered',
      content: `Dear {customerName},\n\nWe're happy to confirm that your order #{orderNumber} has been successfully delivered!\n\nWe hope you're satisfied with your purchase. If you have any questions or concerns, please don't hesitate to contact us.\n\nThank you for choosing EcommerceHub!\n\nBest regards,\nEcommerceHub Team`
    },
    { 
      value: 'order-cancelled', label: 'Order Cancellation',subject: 'Order #{orderNumber} Cancellation Confirmation',
      content: `Dear {customerName},\n\nWe're writing to confirm that your order #{orderNumber} has been cancelled as requested.\n\nIf you were charged for this order, a full refund will be processed within 3-5 business days.\n\nIf you have any questions, please contact our customer service team.\n\nBest regards,\nEcommerceHub Team`
    },
    { 
      value: 'custom', 
      label: 'Custom Message',
      subject: '',
      content: ''
    }
  ];

  const handleTemplateChange = (templateValue) => {
    setEmailTemplate(templateValue);
    const template = emailTemplates?.find(t => t?.value === templateValue);
    if (template && selectedOrder) {
      setEmailSubject(template?.subject?.replace('{orderNumber}', selectedOrder?.orderNumber));
      setCustomMessage(template?.content?.replace('{customerName}', selectedOrder?.customer?.name)?.replace(/{orderNumber}/g, selectedOrder?.orderNumber)?.replace('{orderDate}', new Date(selectedOrder.date)?.toLocaleDateString())?.replace('{orderTotal}', `$${selectedOrder?.total?.toFixed(2)}`)?.replace('{trackingNumber}', selectedOrder?.trackingNumber || 'TBD')?.replace('{shippingMethod}', selectedOrder?.shippingMethod)?.replace('{estimatedDelivery}', 'TBD')
      );
    } else {
      setEmailSubject('');
      setCustomMessage('');
    }
  };

  const handleSendEmail = () => {
    if (onSendEmail && selectedOrder && emailSubject && customMessage) {
      onSendEmail({
        orderId: selectedOrder?.id,
        customerEmail: selectedOrder?.customer?.email,
        subject: emailSubject,
        message: customMessage,
        template: emailTemplate
      });
      
      // Reset form
      setEmailTemplate('');
      setEmailSubject('');
      setCustomMessage('');
    }
  };

  if (!selectedOrder) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-8">
          <Icon name="Mail" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Customer Communication</h3>
          <p className="text-muted-foreground">Select an order to send emails to the customer.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-foreground">Customer Communication</h3>
            <p className="text-sm text-muted-foreground">Send email to {selectedOrder?.customer?.name}</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Mail" size={16} />
            <span>{selectedOrder?.customer?.email}</span>
          </div>
        </div>
      </div>
      {/* Email Form */}
      <div className="p-6 space-y-4">
        {/* Template Selection */}
        <Select
          label="Email Template"
          placeholder="Choose a template..."
          options={emailTemplates}
          value={emailTemplate}
          onChange={handleTemplateChange}
        />

        {/* Subject Line */}
        <Input
          label="Subject Line"
          type="text"
          placeholder="Enter email subject"
          value={emailSubject}
          onChange={(e) => setEmailSubject(e?.target?.value)}
          required
        />

        {/* Message Content */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Message</label>
          <textarea
            placeholder="Enter your message..."
            value={customMessage}
            onChange={(e) => setCustomMessage(e?.target?.value)}
            className="w-full p-3 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            rows={8}
            required
          />
          <p className="text-xs text-muted-foreground">
            Available placeholders: {'{customerName}'}, {'{orderNumber}'}, {'{orderDate}'}, {'{orderTotal}'}, {'{trackingNumber}'}, {'{shippingMethod}'}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTemplateChange('order-confirmation')}
            iconName="CheckCircle"
          >
            Order Confirmation
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTemplateChange('shipping-notification')}
            iconName="Truck"
          >
            Shipping Update
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTemplateChange('delivery-confirmation')}
            iconName="Package"
          >
            Delivery Confirmation
          </Button>
        </div>

        {/* Send Button */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>Email will be sent immediately</span>
          </div>
          <Button
            onClick={handleSendEmail}
            disabled={!emailSubject || !customMessage}
            iconName="Send"
          >
            Send Email
          </Button>
        </div>
      </div>
      {/* Recent Communications */}
      <div className="p-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Recent Communications</h4>
        <div className="space-y-3">
          {selectedOrder?.communications?.length > 0 ? (
            selectedOrder?.communications?.slice(0, 3)?.map((comm, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                <Icon name="Mail" size={16} className="text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{comm?.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    Sent {new Date(comm.date)?.toLocaleDateString()} by {comm?.sender}
                  </p>
                </div>
                <Button variant="ghost" size="sm" iconName="ExternalLink" className="h-6 w-6 p-0" />
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No recent communications</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerCommunication;