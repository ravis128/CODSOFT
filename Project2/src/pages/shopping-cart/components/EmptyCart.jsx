import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = ({ onContinueShopping }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-8 text-center">
      <div className="max-w-md mx-auto">
        {/* Empty Cart Illustration */}
        <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
        </div>

        {/* Empty State Content */}
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
        </p>

        {/* Continue Shopping Button */}
        <Button
          variant="default"
          size="lg"
          onClick={onContinueShopping}
          iconName="ArrowLeft"
          iconPosition="left"
          className="mb-6"
        >
          Continue Shopping
        </Button>

        {/* Popular Categories */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-foreground mb-4">Popular Categories</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onContinueShopping}
              className="p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-200 text-left"
            >
              <Icon name="Laptop" size={20} className="text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground">Electronics</p>
            </button>
            <button 
              onClick={onContinueShopping}
              className="p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-200 text-left"
            >
              <Icon name="Shirt" size={20} className="text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground">Fashion</p>
            </button>
            <button 
              onClick={onContinueShopping}
              className="p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-200 text-left"
            >
              <Icon name="Home" size={20} className="text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground">Home & Garden</p>
            </button>
            <button 
              onClick={onContinueShopping}
              className="p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-200 text-left"
            >
              <Icon name="Dumbbell" size={20} className="text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground">Sports</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;