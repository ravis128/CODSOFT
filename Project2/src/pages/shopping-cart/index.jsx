import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CustomerNavigation from '../../components/ui/CustomerNavigation';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';
import RecommendedProducts from './components/RecommendedProducts';
import SavedForLater from './components/SavedForLater';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { 
    cartItems, 
    savedItems, 
    updateQuantity, 
    removeFromCart, 
    saveForLater, 
    moveToCart, 
    removeSavedItem, 
    clearCart,
    getCartItemCount,
    getCartTotal,
    addToCart
  } = useCart();
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [promoState, setPromoState] = useState({ code: null, type: null, value: 0 });

  // Mock recommended products
  const mockRecommendedProducts = [
    {
      id: 6,
      name: "Wireless Mouse with RGB Lighting",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.5,
      reviewCount: 128,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop"
    },
    {
      id: 7,
      name: "Mechanical Gaming Keyboard",
      price: 79.99,
      originalPrice: null,
      rating: 4.8,
      reviewCount: 256,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop"
    },
    {
      id: 8,
      name: "USB-C Hub with Multiple Ports",
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.3,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop"
    },
    {
      id: 9,
      name: "Portable Phone Stand Adjustable",
      price: 19.99,
      originalPrice: null,
      rating: 4.6,
      reviewCount: 342,
      image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&h=400&fit=crop"
    }
  ];

  useEffect(() => {
    // Simulate loading recommended products
    const loadRecommendedProducts = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRecommendedProducts(mockRecommendedProducts);
      } catch (error) {
        console.error('Error loading recommended products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecommendedProducts();
  }, []);

  // Calculate totals
  const subtotal = getCartTotal(); // based on discounted line prices
  const lineItemSavings = cartItems?.reduce((acc, item) => {
    const hasSavings = item?.originalPrice && item?.originalPrice > item?.price;
    return acc + (hasSavings ? (item.originalPrice - item.price) * item.quantity : 0);
  }, 0) || 0;

  // Cart-level promo discount (percentage on subtotal) and free shipping logic
  const freeShippingThreshold = 50;
  const cartDiscount = promoState?.type === 'percent' ? (subtotal * (promoState.value / 100)) : 0;
  const subtotalAfterDiscount = Math.max(0, subtotal - cartDiscount);

  // Tiered shipping (unless free by code). Free over threshold, else tiered
  const shippingFreeByCode = promoState?.type === 'shipping';
  let shipping = 0;
  if (shippingFreeByCode || subtotalAfterDiscount >= freeShippingThreshold) {
    shipping = 0;
  } else if (subtotalAfterDiscount >= 30) {
    shipping = 4.99;
  } else {
    shipping = 9.99;
  }

  const tax = subtotalAfterDiscount * 0.08; // 8% tax on discounted subtotal
  const total = subtotalAfterDiscount + tax + shipping;

  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotalAfterDiscount);
  const freeShippingProgress = Math.min(1, subtotalAfterDiscount / freeShippingThreshold);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleSaveForLater = (itemId) => {
    saveForLater(itemId);
  };

  const handleMoveToCart = (itemId) => {
    moveToCart(itemId);
  };

  const handleRemoveSavedItem = (itemId) => {
    removeSavedItem(itemId);
  };

  const handleApplyPromoCode = async (code) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock promo codes with types
    // SAVE10: 10% off cart, WELCOME20: 20% off cart, FREESHIP: free shipping
    const validCodes = {
      'SAVE10': { type: 'percent', value: 10, message: '10% off applied' },
      'WELCOME20': { type: 'percent', value: 20, message: '20% off applied' },
      'FREESHIP': { type: 'shipping', value: 0, message: 'Free shipping applied' }
    };

    const upper = code?.toUpperCase();
    if (validCodes?.[upper]) {
      const def = validCodes[upper];
      setPromoState({ code: upper, type: def.type, value: def.value });
      const appliedDiscount = def.type === 'percent' ? subtotal * (def.value / 100) : shipping;
      return { success: true, discount: appliedDiscount, message: def.message };
    } else {
      setPromoState({ code: null, type: null, value: 0 });
      return { success: false, message: 'Invalid promo code' };
    }
  };

  const handleProceedToCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    
    setIsCheckoutLoading(true);
    try {
      // Simulate checkout preparation
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Navigate to checkout page
      navigate('/checkout');
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const handleContinueShopping = () => {
    navigate('/product-catalog');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerNavigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomerNavigation cartItemCount={getCartItemCount()} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground mt-1">
              {cartItems?.length === 0 
                ? "Your cart is empty" 
                : `${getCartItemCount()} ${getCartItemCount() === 1 ? 'item' : 'items'} in your cart`
              }
            </p>
          </div>
          
          {cartItems?.length > 0 && (
            <div className="hidden lg:flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleClearCart}
                iconName="Trash2"
                iconPosition="left"
                className="text-error hover:text-error/80"
              >
                Clear Cart
              </Button>
              <Button
                variant="ghost"
                onClick={handleContinueShopping}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>

        {cartItems?.length === 0 ? (
          <div className="space-y-8">
            <EmptyCart onContinueShopping={handleContinueShopping} />
            
            {savedItems?.length > 0 && (
              <SavedForLater
                items={savedItems}
                onMoveToCart={handleMoveToCart}
                onRemove={handleRemoveSavedItem}
              />
            )}
            
            <RecommendedProducts
              products={recommendedProducts}
              onAddToCart={handleAddToCart}
              title="Popular Products"
            />
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items - Left Column */}
            <div className="lg:col-span-8">
              <div className="space-y-6">
                {/* Cart Items List */}
                <div>
                  {cartItems?.map((item) => (
                    <CartItem
                      key={item?.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                      onSaveForLater={handleSaveForLater}
                    />
                  ))}
                </div>

                {/* Mobile Continue Shopping */}
                <div className="lg:hidden">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={handleContinueShopping}
                    iconName="ArrowLeft"
                    iconPosition="left"
                  >
                    Continue Shopping
                  </Button>
                </div>

                {/* Saved for Later */}
                {savedItems?.length > 0 && (
                  <SavedForLater
                    items={savedItems}
                    onMoveToCart={handleMoveToCart}
                    onRemove={handleRemoveSavedItem}
                  />
                )}

                {/* Recommended Products */}
                <RecommendedProducts
                  products={recommendedProducts}
                  onAddToCart={handleAddToCart}
                />
              </div>
            </div>

            {/* Order Summary - Right Column */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="lg:sticky lg:top-8">
                <OrderSummary
                  subtotal={subtotal}
                  tax={tax}
                  shipping={shipping}
                  total={total}
                  lineItemSavings={lineItemSavings}
                  cartDiscount={cartDiscount}
                  freeShippingThreshold={freeShippingThreshold}
                  freeShippingProgress={freeShippingProgress}
                  freeShippingRemaining={freeShippingRemaining}
                  onApplyPromoCode={handleApplyPromoCode}
                  onProceedToCheckout={handleProceedToCheckout}
                  isCheckoutLoading={isCheckoutLoading}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Mobile Fixed Checkout Button */}
      {cartItems?.length > 0 && (
        <div className="lg:hidden fixed bottom-16 left-0 right-0 p-4 bg-background border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Total:</span>
            <span className="text-lg font-bold text-foreground">${total?.toFixed(2)}</span>
          </div>
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={handleProceedToCheckout}
            loading={isCheckoutLoading}
            iconName="CreditCard"
            iconPosition="left"
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;