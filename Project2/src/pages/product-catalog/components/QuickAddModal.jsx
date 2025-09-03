import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const QuickAddModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Mock product variants
  const sizes = [
    { value: 'xs', label: 'XS' },
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' },
    { value: 'xxl', label: 'XXL' }
  ];

  const colors = [
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
    { value: 'blue', label: 'Blue' },
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' }
  ];

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
      cartId: Date.now()
    };
    
    onAddToCart(cartItem);
    setIsAdding(false);
    
    // Reset form
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
    
    onClose();
  };

  const incrementQuantity = () => {
    if (quantity < product?.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const isAddDisabled = () => {
    if (product?.category === 'clothing' && (!selectedSize || !selectedColor)) {
      return true;
    }
    return product?.stock === 0 || isAdding;
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-1300 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Quick Add to Cart</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground line-clamp-2 mb-1">
                {product?.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {product?.category}
              </p>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">
                  ${product?.price?.toFixed(2)}
                </span>
                {product?.originalPrice && product?.originalPrice > product?.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product?.originalPrice?.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Size Selection (for clothing) */}
          {product?.category === 'clothing' && (
            <div>
              <Select
                label="Size"
                placeholder="Select size"
                options={sizes}
                value={selectedSize}
                onChange={setSelectedSize}
                required
                error={!selectedSize ? 'Please select a size' : ''}
              />
            </div>
          )}

          {/* Color Selection (for clothing) */}
          {product?.category === 'clothing' && (
            <div>
              <Select
                label="Color"
                placeholder="Select color"
                options={colors}
                value={selectedColor}
                onChange={setSelectedColor}
                required
                error={!selectedColor ? 'Please select a color' : ''}
              />
            </div>
          )}

          {/* Quantity Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Icon name="Minus" size={16} />
              </Button>
              
              <span className="w-12 text-center font-medium text-foreground">
                {quantity}
              </span>
              
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                disabled={quantity >= product?.stock}
              >
                <Icon name="Plus" size={16} />
              </Button>
              
              <span className="text-sm text-muted-foreground ml-2">
                {product?.stock} available
              </span>
            </div>
          </div>

          {/* Stock Warning */}
          {product?.stock <= 5 && product?.stock > 0 && (
            <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm text-warning">
                Only {product?.stock} left in stock!
              </span>
            </div>
          )}

          {/* Out of Stock */}
          {product?.stock === 0 && (
            <div className="flex items-center gap-2 p-3 bg-error/10 border border-error/20 rounded-lg">
              <Icon name="XCircle" size={16} className="text-error" />
              <span className="text-sm text-error">
                This item is currently out of stock
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-semibold text-foreground">
              ${(product?.price * quantity)?.toFixed(2)}
            </span>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleAddToCart}
              disabled={isAddDisabled()}
              loading={isAdding}
              iconName="ShoppingCart"
              iconPosition="left"
              className="flex-1"
            >
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAddModal;