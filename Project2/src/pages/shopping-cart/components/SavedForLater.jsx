import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavedForLater = ({ items, onMoveToCart, onRemove }) => {
  if (!items || items?.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Saved for Later ({items?.length})
        </h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="ChevronDown"
          iconPosition="right"
          className="text-muted-foreground"
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {items?.slice(0, 3)?.map((item) => (
          <div key={item?.cartId} className="flex gap-4 p-4 bg-muted rounded-lg">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-background rounded-lg overflow-hidden">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground mb-1 line-clamp-2">
                {item?.name}
              </h3>
              {item?.variant && (
                <p className="text-xs text-muted-foreground mb-2">
                  {item?.variant}
                </p>
              )}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-bold text-foreground">
                  ${item?.price?.toFixed(2)}
                </span>
                {item?.originalPrice && item?.originalPrice > item?.price && (
                  <span className="text-xs text-muted-foreground line-through">
                    ${item?.originalPrice?.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-3">
                {item?.inStock ? (
                  <div className="flex items-center gap-1 text-xs text-success">
                    <Icon name="Check" size={12} />
                    <span>In Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-error">
                    <Icon name="X" size={12} />
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => onMoveToCart(item?.cartId)}
                  disabled={!item?.inStock}
                  iconName="ShoppingCart"
                  iconPosition="left"
                  iconSize={12}
                >
                  Move to Cart
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onRemove(item?.cartId)}
                  iconName="Trash2"
                  iconPosition="left"
                  iconSize={12}
                  className="text-error hover:text-error/80"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {items?.length > 3 && (
        <div className="mt-4 pt-4 border-t border-border text-center">
          <Button variant="ghost" size="sm">
            View {items?.length - 3} more items
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedForLater;