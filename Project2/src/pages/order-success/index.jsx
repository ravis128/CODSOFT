import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerNavigation from '../../components/ui/CustomerNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <CustomerNavigation />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mb-8">
            <Icon name="CheckCircle" size={48} className="text-success" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Order Placed Successfully!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your purchase! We've received your order and will begin processing it right away.
          </p>

          {/* Order Details */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Order Details</h2>
            
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number</span>
                <span className="font-medium">#{Date.now().toString().slice(-8)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="text-success font-medium">Confirmed</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">What's Next?</h3>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Order Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">You'll receive a confirmation email with order details</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Order Processing</p>
                  <p className="text-sm text-muted-foreground">We'll process and prepare your order for shipping</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Shipping Notification</p>
                  <p className="text-sm text-muted-foreground">You'll get tracking information once your order ships</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/user-dashboard')}
              variant="outline"
              size="lg"
              iconName="User"
              iconPosition="left"
            >
              View My Orders
            </Button>
            
            <Button
              onClick={() => navigate('/product-catalog')}
              size="lg"
              iconName="ShoppingBag"
              iconPosition="left"
            >
              Continue Shopping
            </Button>
          </div>

          {/* Support Info */}
          <div className="mt-12 p-4 bg-primary/5 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Have questions about your order?
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200">
                <Icon name="Mail" size={16} />
                <span>Email Support</span>
              </button>
              <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200">
                <Icon name="Phone" size={16} />
                <span>Call Us</span>
              </button>
              <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200">
                <Icon name="MessageCircle" size={16} />
                <span>Live Chat</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderSuccess;
