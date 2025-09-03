import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove, onSaveForLater }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    try {
      await onUpdateQuantity(item?.cartId, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = () => {
    onRemove(item?.cartId);
  };

  const handleSaveForLater = () => {
    onSaveForLater(item?.cartId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-full sm:w-24 h-32 sm:h-24 bg-muted rounded-lg overflow-hidden">
            <Image
              src={item?.image}
              alt={item?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
                {item?.name}
              </h3>
              {item?.variant && (
                <p className="text-sm text-muted-foreground mb-2">
                  {item?.variant}
                </p>
              )}
              <div className="flex items-center gap-4 mb-3">
                <span className="text-lg font-bold text-foreground">
                  ${item?.price?.toFixed(2)}
                </span>
                {item?.originalPrice && item?.originalPrice > item?.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${item?.originalPrice?.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden sm:flex flex-col items-end gap-2">
              <div className="text-lg font-bold text-foreground">
                ${(item?.price * item?.quantity)?.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item?.quantity - 1)}
                  disabled={isUpdating || item?.quantity <= 1}
                  className="h-8 w-8 p-0"
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                  {isUpdating ? '...' : item?.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item?.quantity + 1)}
                  disabled={isUpdating || item?.quantity >= item?.maxQuantity}
                  className="h-8 w-8 p-0"
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>

              {/* Stock Status */}
              {item?.stock <= 5 && item?.stock > 0 && (
                <span className="text-xs text-warning">
                  Only {item?.stock} left
                </span>
              )}
            </div>

            {/* Mobile Total */}
            <div className="sm:hidden">
              <span className="text-lg font-bold text-foreground">
                ${(item?.price * item?.quantity)?.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveForLater}
              iconName="Heart"
              iconPosition="left"
              iconSize={16}
              className="text-muted-foreground hover:text-foreground"
            >
              Save for Later
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
              className="text-error hover:text-error/80"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;