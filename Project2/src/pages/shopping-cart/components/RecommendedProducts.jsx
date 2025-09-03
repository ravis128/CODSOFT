import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendedProducts = ({ products, onAddToCart, title = "Recommended for You" }) => {
  if (!products || products?.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products?.map((product) => (
          <div key={product?.id} className="bg-muted rounded-lg p-4 hover:bg-muted/80 transition-colors duration-200">
            {/* Product Image */}
            <div className="aspect-square bg-background rounded-lg overflow-hidden mb-3">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground line-clamp-2">
                {product?.name}
              </h3>
              
              {/* Rating */}
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < Math.floor(product?.rating) 
                        ? "text-accent fill-current" :"text-muted-foreground"
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product?.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">
                  ${product?.price?.toFixed(2)}
                </span>
                {product?.originalPrice && product?.originalPrice > product?.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product?.originalPrice?.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => onAddToCart(product)}
                iconName="Plus"
                iconPosition="left"
                iconSize={14}
                className="mt-3"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;