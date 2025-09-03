import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onQuickAdd, onProductClick }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleQuickAdd = (e) => {
    e?.stopPropagation();
    onQuickAdd(product);
  };

  const handleProductClick = () => {
    onProductClick(product);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={12} className="text-amber-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={12} className="text-amber-400 fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={handleProductClick}
      onMouseEnter={() => setShowQuickAdd(true)}
      onMouseLeave={() => setShowQuickAdd(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {isImageLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <Icon name="Package" size={32} className="text-muted-foreground" />
          </div>
        )}
        <Image
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onLoad={handleImageLoad}
          loading="lazy"
          decoding="async"
          sources={[
            { type: 'image/webp', srcSet: `${product?.image}&fm=webp 1x, ${product?.image}&fm=webp&w=800 2x` },
          ]}
        />
        
        {/* Sale Badge */}
        {product?.isOnSale && (
          <div className="absolute top-2 left-2 bg-error text-error-foreground px-2 py-1 rounded-md text-xs font-medium">
            Sale
          </div>
        )}

        {/* Quick Add Button - Desktop */}
        <div className={`absolute inset-x-2 bottom-2 transition-all duration-300 ${
          showQuickAdd ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        } hidden sm:block`}>
          <Button
            variant="default"
            size="sm"
            fullWidth
            iconName="Plus"
            iconPosition="left"
            onClick={handleQuickAdd}
            className="shadow-lg"
          >
            Quick Add
          </Button>
        </div>
      </div>
      {/* Product Info */}
      <div className="p-3 space-y-2">
        <div className="space-y-1">
          <h3 className="font-medium text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {product?.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {product?.category}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="flex items-center space-x-0.5">
            {renderStars(product?.rating)}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product?.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-foreground">
              ${product?.price?.toFixed(2)}
            </span>
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <span className="text-xs text-muted-foreground line-through">
                ${product?.originalPrice?.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              product?.stock > 10 ? 'bg-success' : 
              product?.stock > 0 ? 'bg-warning' : 'bg-error'
            }`} />
            <span className="text-xs text-muted-foreground">
              {product?.stock > 10 ? 'In Stock' : 
               product?.stock > 0 ? 'Low Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Mobile Quick Add Button */}
        <div className="sm:hidden pt-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Plus"
            iconPosition="left"
            onClick={handleQuickAdd}
            disabled={product?.stock === 0}
          >
            {product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;