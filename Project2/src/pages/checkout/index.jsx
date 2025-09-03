import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CustomerNavigation from '../../components/ui/CustomerNavigation';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Information
    paymentMethod: 'card', // 'card' | 'upi' | 'netbanking' | 'wallet' | 'cod'
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    selectedBank: '',
    selectedWallet: '',
    
    // Billing
    sameAsShipping: true,
    
    // Promo Code
    promoCode: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [pincode, setPincode] = useState('');
  const [serviceability, setServiceability] = useState(null); // { serviceable: boolean, cod: boolean, eta: string }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping - promoDiscount;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Shipping validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    // Payment validation (based on selected method)
    switch (formData.paymentMethod) {
      case 'card':
        if (!formData.cardNumber.replace(/\s/g, '')) newErrors.cardNumber = 'Card number is required';
        if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
        if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv) newErrors.cvv = 'CVV is required';
        break;
      case 'upi':
        if (!formData.upiId.trim()) newErrors.upiId = 'UPI ID is required';
        break;
      case 'netbanking':
        if (!formData.selectedBank.trim()) newErrors.selectedBank = 'Please select your bank';
        break;
      case 'wallet':
        if (!formData.selectedWallet.trim()) newErrors.selectedWallet = 'Please select a wallet';
        break;
      case 'cod':
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePromoCode = () => {
    if (formData.promoCode.toLowerCase() === 'welcome10') {
      setPromoDiscount(subtotal * 0.1); // 10% discount
      setPromoApplied(true);
    } else {
      setErrors({ promoCode: 'Invalid promo code' });
    }
  };

  const checkPincode = async () => {
    // Mock India serviceability: pin starting with 4/5/6 are serviceable; COD blocked for some
    const trimmed = pincode.trim();
    if (!trimmed || trimmed.length < 6) {
      setServiceability({ serviceable: false, cod: false, eta: null, error: 'Enter a valid 6-digit pincode' });
      return;
    }
    await new Promise(r => setTimeout(r, 600));
    const serviceable = ['4', '5', '6', '7', '8'].includes(trimmed[0]);
    const cod = serviceable && !['0', '9'].includes(trimmed[5]);
    const eta = serviceable ? '2-5 days' : null;
    setServiceability({ serviceable, cod, eta, error: serviceable ? null : 'Not serviceable for delivery' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (cartItems.length === 0) {
      setErrors({ general: 'Your cart is empty' });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful order
      console.log('Order placed successfully:', {
        items: cartItems,
        total,
        shipping: formData,
        payment: formData.paymentMethod === 'card'
          ? { method: 'Card', last4: formData.cardNumber.slice(-4), cardName: formData.cardName }
          : formData.paymentMethod === 'upi'
            ? { method: 'UPI', upiId: formData.upiId }
            : formData.paymentMethod === 'netbanking'
              ? { method: 'NetBanking', bank: formData.selectedBank }
              : formData.paymentMethod === 'wallet'
                ? { method: 'Wallet', wallet: formData.selectedWallet }
                : { method: 'Cash on Delivery' }
      });
      
      // Clear cart and redirect to success page
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Checkout failed:', error);
      setErrors({ general: 'Payment failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerNavigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Icon name="ShoppingCart" size={64} className="text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some items to your cart to proceed with checkout</p>
            <Button onClick={() => navigate('/product-catalog')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomerNavigation cartItemCount={cartItems.length} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Checkout Information</h2>
              
              {errors.general && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 mb-6">
                  <p className="text-sm text-destructive">{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Information */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Icon name="MapPin" size={20} className="mr-2 text-primary" />
                    Shipping Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name *
                      </label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                        placeholder="First Name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name *
                      </label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                        placeholder="Last Name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        placeholder="Email"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone *
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                        placeholder="Phone"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Address *
                      </label>
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        error={errors.address}
                        placeholder="Street Address"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        City *
                      </label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        error={errors.city}
                        placeholder="City"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        State *
                      </label>
                      <Input
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        error={errors.state}
                        placeholder="State"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        ZIP Code *
                      </label>
                      <Input
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        error={errors.zipCode}
                        placeholder="ZIP Code"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Icon name="CreditCard" size={20} className="mr-2 text-primary" />
                    Payment Information
                  </h3>
                  
                  {/* Payment Method Selector */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                    {[
                      { id: 'card', label: 'Card' },
                      { id: 'upi', label: 'UPI' },
                      { id: 'netbanking', label: 'NetBanking' },
                      { id: 'wallet', label: 'Wallets' },
                      { id: 'cod', label: 'COD' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: opt.id }))}
                        className={`px-3 py-2 rounded border text-sm ${formData.paymentMethod === opt.id ? 'border-primary text-primary bg-primary/10' : 'border-border text-foreground hover:bg-muted'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {/* Method-specific Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.paymentMethod === 'card' && (
                      <>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Card Number *
                          </label>
                          <Input
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            error={errors.cardNumber}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Cardholder Name *
                          </label>
                          <Input
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            error={errors.cardName}
                            placeholder="Name on Card"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Expiry Date *
                          </label>
                          <Input
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            error={errors.expiryDate}
                            placeholder="MM/YY"
                            maxLength="5"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            CVV *
                          </label>
                          <Input
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            error={errors.cvv}
                            placeholder="123"
                            maxLength="4"
                          />
                        </div>
                      </>
                    )}

                    {formData.paymentMethod === 'upi' && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          UPI ID *
                        </label>
                        <Input
                          name="upiId"
                          value={formData.upiId}
                          onChange={handleInputChange}
                          error={errors.upiId}
                          placeholder="yourname@upi"
                        />
                      </div>
                    )}

                    {formData.paymentMethod === 'netbanking' && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Select Bank *
                        </label>
                        <select
                          name="selectedBank"
                          value={formData.selectedBank}
                          onChange={e => setFormData(prev => ({ ...prev, selectedBank: e.target.value }))}
                          className="w-full border border-border rounded-md px-3 py-2 bg-background"
                        >
                          <option value="">Choose your bank</option>
                          <option value="SBI">State Bank of India</option>
                          <option value="HDFC">HDFC Bank</option>
                          <option value="ICICI">ICICI Bank</option>
                          <option value="AXIS">Axis Bank</option>
                          <option value="KOTAK">Kotak Mahindra Bank</option>
                          <option value="PNB">Punjab National Bank</option>
                        </select>
                        {errors.selectedBank && (
                          <p className="text-sm text-red-500 mt-1">{errors.selectedBank}</p>
                        )}
                      </div>
                    )}

                    {formData.paymentMethod === 'wallet' && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Select Wallet *
                        </label>
                        <select
                          name="selectedWallet"
                          value={formData.selectedWallet}
                          onChange={e => setFormData(prev => ({ ...prev, selectedWallet: e.target.value }))}
                          className="w-full border border-border rounded-md px-3 py-2 bg-background"
                        >
                          <option value="">Choose a wallet</option>
                          <option value="Paytm">Paytm</option>
                          <option value="PhonePe">PhonePe</option>
                          <option value="AmazonPay">Amazon Pay</option>
                          <option value="Mobikwik">Mobikwik</option>
                        </select>
                        {errors.selectedWallet && (
                          <p className="text-sm text-red-500 mt-1">{errors.selectedWallet}</p>
                        )}
                      </div>
                    )}

                    {formData.paymentMethod === 'cod' && (
                      <div className="md:col-span-2 text-sm text-muted-foreground">
                        Cash on Delivery available for eligible addresses. Please keep exact change ready.
                      </div>
                    )}
                  </div>
                </div>

                {/* Billing Address */}
                <div>
                  <div className="flex items-center mb-4">
                    <input
                      id="sameAsShipping"
                      name="sameAsShipping"
                      type="checkbox"
                      checked={formData.sameAsShipping}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                    />
                    <label htmlFor="sameAsShipping" className="ml-2 text-sm text-foreground">
                      Billing address same as shipping address
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                  className="w-full py-3 text-lg"
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" size={20} className="animate-spin mr-2" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Icon name="Lock" size={20} className="mr-2" />
                      Place Order
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>
              
              {/* Pincode Serviceability */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Check Delivery to your Pincode</label>
                <div className="flex gap-2">
                  <Input
                    name="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, '').slice(0,6))}
                    placeholder="e.g. 560001"
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={checkPincode}>Check</Button>
                </div>
                {serviceability && (
                  <div className={`mt-2 text-sm ${serviceability.serviceable ? 'text-success' : 'text-destructive'}`}>
                    {serviceability.error ? serviceability.error : `Delivery available. ETA ${serviceability.eta}${serviceability.cod ? ' • COD available' : ' • COD unavailable'}`}
                  </div>
                )}
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <Input
                    name="promoCode"
                    value={formData.promoCode}
                    onChange={handleInputChange}
                    placeholder="Enter promo code"
                    error={errors.promoCode}
                    className="flex-1"
                  />
                  <Button
                    onClick={handlePromoCode}
                    disabled={!formData.promoCode || promoApplied}
                    variant="outline"
                  >
                    Apply
                  </Button>
                </div>
                {promoApplied && (
                  <p className="text-sm text-success mt-2">Promo code applied! 10% off</p>
                )}
              </div>

              {/* Cart Items */}
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Promo Discount</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              {shipping === 0 && (
                <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-md">
                  <div className="flex items-center text-success text-sm">
                    <Icon name="Truck" size={16} className="mr-2" />
                    Free shipping on orders over $50
                  </div>
                </div>
              )}

              {/* Security Info */}
              <div className="mt-6 space-y-2 text-center">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <Icon name="Shield" size={16} className="mr-2" />
                  Secure Checkout
                </div>
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <Icon name="Lock" size={16} className="mr-2" />
                  SSL Encrypted
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">We accept</p>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">VISA</span>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">MC</span>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">AMEX</span>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">RUPAY</span>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">UPI</span>
                  </div>
                  <div className="w-16 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">NET-BANK</span>
                  </div>
                  <div className="w-16 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">WALLET</span>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">COD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
