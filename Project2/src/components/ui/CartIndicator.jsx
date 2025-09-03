import React, { useState } from 'react';
import Icon from '../AppIcon';

const CartIndicator = ({ count = 0, onClick, showPreview = true }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleMouseEnter = () => {
    if (showPreview && window.innerWidth >= 768) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleClick}
        className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
      >
        <Icon name="ShoppingCart" size={20} />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </button>
      {/* Desktop Hover Preview */}
      {isHovered && showPreview && count > 0 && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-1100 animate-fade-in">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-popover-foreground">Shopping Cart</h3>
              <span className="text-xs text-muted-foreground">{count} {count === 1 ? 'item' : 'items'}</span>
            </div>
          </div>

          <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
            {/* Sample cart items - replace with actual cart data */}
            {[1, 2, 3]?.slice(0, Math.min(count, 3))?.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                  <Icon name="Package" size={16} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-popover-foreground truncate">
                    Sample Product {index + 1}
                  </p>
                  <p className="text-xs text-muted-foreground">Qty: 1</p>
                </div>
                <div className="text-sm font-medium text-popover-foreground">
                  $29.99
                </div>
              </div>
            ))}

            {count > 3 && (
              <div className="text-center py-2">
                <span className="text-xs text-muted-foreground">
                  and {count - 3} more {count - 3 === 1 ? 'item' : 'items'}
                </span>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-popover-foreground">Subtotal:</span>
              <span className="text-sm font-bold text-popover-foreground">$89.97</span>
            </div>
            <button
              onClick={handleClick}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              View Cart
            </button>
          </div>
        </div>
      )}
      {/* Empty Cart Preview */}
      {isHovered && showPreview && count === 0 && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg z-1100 animate-fade-in">
          <div className="p-6 text-center">
            <Icon name="ShoppingCart" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-4">Your cart is empty</p>
            <button
              onClick={() => window.location.href = '/product-catalog'}
              className="bg-primary text-primary-foreground py-2 px-4 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Start Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartIndicator;