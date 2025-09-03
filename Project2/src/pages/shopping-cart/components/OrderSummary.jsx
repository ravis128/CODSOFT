import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummary = ({ 
  subtotal, 
  tax, 
  shipping, 
  total, 
  onApplyPromoCode, 
  onProceedToCheckout,
  isCheckoutLoading = false,
  lineItemSavings = 0,
  cartDiscount = 0,
  freeShippingThreshold = 50,
  freeShippingProgress = 0,
  freeShippingRemaining = 0
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const handleApplyPromo = async () => {
    if (!promoCode?.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    setIsApplyingPromo(true);
    setPromoError('');
    setPromoSuccess('');

    try {
      const result = await onApplyPromoCode(promoCode);
      if (result?.success) {
        setPromoSuccess(`Promo code applied! You saved $${result?.discount?.toFixed(2)}`);
        setPromoCode('');
      } else {
        setPromoError(result?.message || 'Invalid promo code');
      }
    } catch (error) {
      setPromoError('Failed to apply promo code');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>
      {/* Promo Code Section */}
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e?.target?.value?.toUpperCase())}
              error={promoError}
              disabled={isApplyingPromo}
            />
          </div>
          <Button
            variant="outline"
            onClick={handleApplyPromo}
            loading={isApplyingPromo}
            disabled={!promoCode?.trim()}
            className="px-4"
          >
            Apply
          </Button>
        </div>
        {promoSuccess && (
          <div className="mt-2 p-2 bg-success/10 border border-success/20 rounded-md">
            <p className="text-sm text-success">{promoSuccess}</p>
          </div>
        )}
      </div>
      {/* Free Shipping Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-muted-foreground">Free shipping at ${freeShippingThreshold.toFixed(0)}</span>
          <span className="text-muted-foreground">{Math.round(freeShippingProgress * 100)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: `${Math.min(100, freeShippingProgress * 100)}%` }} />
        </div>
        {freeShippingRemaining > 0 ? (
          <p className="text-xs text-muted-foreground mt-2">Add ${freeShippingRemaining.toFixed(2)} more for free shipping</p>
        ) : (
          <p className="text-xs text-success mt-2 flex items-center gap-1">
            <Icon name="Truck" size={14} /> Free shipping unlocked
          </p>
        )}
      </div>

      {/* Order Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">${subtotal?.toFixed(2)}</span>
        </div>
        
        {lineItemSavings > 0 && (
          <div className="flex justify-between text-sm text-success">
            <span className="">Savings</span>
            <span className="">- ${lineItemSavings?.toFixed(2)}</span>
          </div>
        )}

        {cartDiscount > 0 && (
          <div className="flex justify-between text-sm text-success">
            <span className="">Promo Discount</span>
            <span className="">- ${cartDiscount?.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Tax</span>
          <span className="text-foreground">${tax?.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground">
            {shipping === 0 ? 'FREE' : `$${shipping?.toFixed(2)}`}
          </span>
        </div>

        {shipping === 0 && (
          <div className="flex items-center gap-2 text-xs text-success">
            <Icon name="Truck" size={14} />
            <span>Free shipping on orders over $50</span>
          </div>
        )}
        
        <div className="border-t border-border pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-foreground">Total</span>
            <span className="text-foreground">${total?.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Checkout Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        onClick={onProceedToCheckout}
        loading={isCheckoutLoading}
        iconName="CreditCard"
        iconPosition="left"
        className="mb-4"
      >
        Proceed to Checkout
      </Button>
      {/* Security Badges */}
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Icon name="Shield" size={14} />
          <span>Secure Checkout</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="Lock" size={14} />
          <span>SSL Encrypted</span>
        </div>
      </div>
      {/* Payment Methods */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center mb-2">We accept</p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
            <Icon name="CreditCard" size={12} />
          </div>
          <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
            <span className="text-xs font-bold">PP</span>
          </div>
          <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
            <span className="text-xs font-bold">GP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;