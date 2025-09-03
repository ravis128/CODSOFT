import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const PrimaryActions = () => {
  const navigate = useNavigate();

  const handleViewAllOrders = () => {
    // Navigate to orders page or show orders modal
    console.log('Viewing all orders...');
  };

  const handleAccountSettings = () => {
    // Navigate to profile settings page
    navigate('/profile');
  };

  const handleStartShopping = () => {
    navigate('/product-catalog');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-card-foreground mb-4">Quick Access</h2>
      
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          iconName="Package"
          iconPosition="left"
          onClick={handleViewAllOrders}
          className="justify-start"
        >
          View All Orders
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          iconName="Settings"
          iconPosition="left"
          onClick={handleAccountSettings}
          className="justify-start"
        >
          Account Settings
        </Button>
        
        <Button
          variant="secondary"
          fullWidth
          iconName="ShoppingBag"
          iconPosition="left"
          onClick={handleStartShopping}
          className="justify-start"
        >
          Continue Shopping
        </Button>
      </div>

      {/* Customer Service */}
      <div className="mt-6 pt-4 border-t border-border">
        <h3 className="text-sm font-medium text-card-foreground mb-3">Need Help?</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-2 p-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200">
            <span>📞</span>
            <span>Contact Support</span>
          </button>
          <button className="w-full flex items-center space-x-2 p-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200">
            <span>💬</span>
            <span>Live Chat</span>
          </button>
          <button className="w-full flex items-center space-x-2 p-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200">
            <span>❓</span>
            <span>FAQ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrimaryActions;