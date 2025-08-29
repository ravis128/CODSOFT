import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AccountTab = ({ accountData, onAccountUpdate }) => {
  const [billingData, setBillingData] = useState(accountData?.billing);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['Up to 3 projects', '5 team members', 'Basic reporting', 'Email support'],
      current: accountData?.subscription?.plan === 'free'
    },
    {
      name: 'Professional',
      price: '$29',
      period: 'per month',
      features: ['Unlimited projects', '25 team members', 'Advanced reporting', 'Priority support', 'Time tracking'],
      current: accountData?.subscription?.plan === 'professional'
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      features: ['Everything in Professional', 'Unlimited team members', 'Custom integrations', 'Dedicated support', 'Advanced security'],
      current: accountData?.subscription?.plan === 'enterprise'
    }
  ];

  const handleBillingChange = (field, value) => {
    setBillingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveBilling = () => {
    onAccountUpdate({
      ...accountData,
      billing: billingData
    });
  };

  const formatUsagePercentage = (used, total) => {
    return Math.round((used / total) * 100);
  };

  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Current Plan</h3>
          <Button
            variant="outline"
            onClick={() => setShowUpgradeModal(true)}
            iconName="ArrowUp"
            iconPosition="left"
            iconSize={16}
          >
            Upgrade Plan
          </Button>
        </div>
        
        <div className="bg-muted rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-semibold text-foreground capitalize">
                {accountData?.subscription?.plan} Plan
              </h4>
              <p className="text-muted-foreground">
                {accountData?.subscription?.plan === 'free' ? 'Free forever' : 
                 `$${accountData?.subscription?.price}/month`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Next billing date</p>
              <p className="font-medium text-foreground">
                {accountData?.subscription?.nextBilling || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Projects</span>
              <span className="text-sm font-medium text-foreground">
                {accountData?.usage?.projects?.used}/{accountData?.usage?.projects?.total}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${formatUsagePercentage(
                    accountData?.usage?.projects?.used,
                    accountData?.usage?.projects?.total
                  )}%`
                }}
              />
            </div>
          </div>
          
          <div className="bg-background rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Team Members</span>
              <span className="text-sm font-medium text-foreground">
                {accountData?.usage?.teamMembers?.used}/{accountData?.usage?.teamMembers?.total}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${formatUsagePercentage(
                    accountData?.usage?.teamMembers?.used,
                    accountData?.usage?.teamMembers?.total
                  )}%`
                }}
              />
            </div>
          </div>
          
          <div className="bg-background rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Storage</span>
              <span className="text-sm font-medium text-foreground">
                {accountData?.usage?.storage?.used}GB/{accountData?.usage?.storage?.total}GB
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${formatUsagePercentage(
                    accountData?.usage?.storage?.used,
                    accountData?.usage?.storage?.total
                  )}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Billing Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Billing Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Company Name"
            type="text"
            value={billingData?.companyName}
            onChange={(e) => handleBillingChange('companyName', e?.target?.value)}
            placeholder="Your Company Inc."
          />
          <Input
            label="Tax ID / VAT Number"
            type="text"
            value={billingData?.taxId}
            onChange={(e) => handleBillingChange('taxId', e?.target?.value)}
            placeholder="123-45-6789"
          />
          <Input
            label="Billing Email"
            type="email"
            value={billingData?.email}
            onChange={(e) => handleBillingChange('email', e?.target?.value)}
            placeholder="billing@company.com"
            required
          />
          <Select
            label="Country"
            options={[
              { value: 'US', label: 'United States' },
              { value: 'CA', label: 'Canada' },
              { value: 'GB', label: 'United Kingdom' },
              { value: 'DE', label: 'Germany' },
              { value: 'FR', label: 'France' },
              { value: 'AU', label: 'Australia' },
              { value: 'JP', label: 'Japan' },
              { value: 'IN', label: 'India' }
            ]}
            value={billingData?.country}
            onChange={(value) => handleBillingChange('country', value)}
            searchable
            placeholder="Select country"
          />
          <Input
            label="Address Line 1"
            type="text"
            value={billingData?.address1}
            onChange={(e) => handleBillingChange('address1', e?.target?.value)}
            placeholder="123 Main Street"
            className="md:col-span-2"
          />
          <Input
            label="Address Line 2"
            type="text"
            value={billingData?.address2}
            onChange={(e) => handleBillingChange('address2', e?.target?.value)}
            placeholder="Suite 100 (optional)"
            className="md:col-span-2"
          />
          <Input
            label="City"
            type="text"
            value={billingData?.city}
            onChange={(e) => handleBillingChange('city', e?.target?.value)}
            placeholder="New York"
          />
          <Input
            label="ZIP / Postal Code"
            type="text"
            value={billingData?.zipCode}
            onChange={(e) => handleBillingChange('zipCode', e?.target?.value)}
            placeholder="10001"
          />
        </div>
        <div className="flex justify-end mt-6">
          <Button
            variant="default"
            onClick={handleSaveBilling}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
          >
            Save Billing Info
          </Button>
        </div>
      </div>
      {/* Payment Method */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Payment Method</h3>
          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Add Payment Method
          </Button>
        </div>
        
        {accountData?.paymentMethods?.length > 0 ? (
          <div className="space-y-4">
            {accountData?.paymentMethods?.map((method) => (
              <div key={method?.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-6 bg-muted rounded flex items-center justify-center">
                    <Icon name="CreditCard" size={16} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      •••• •••• •••• {method?.last4}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expires {method?.expiry} • {method?.brand}
                    </p>
                  </div>
                  {method?.isDefault && (
                    <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Remove</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="CreditCard" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No payment methods added</p>
          </div>
        )}
      </div>
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">Choose Your Plan</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowUpgradeModal(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans?.map((plan) => (
                  <div
                    key={plan?.name}
                    className={`rounded-lg border p-6 ${
                      plan?.current
                        ? 'border-primary bg-primary/5' :'border-border bg-background'
                    }`}
                  >
                    <div className="text-center mb-6">
                      <h4 className="text-xl font-semibold text-foreground mb-2">
                        {plan?.name}
                      </h4>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-foreground">
                          {plan?.price}
                        </span>
                        <span className="text-muted-foreground">/{plan?.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan?.features?.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Icon name="Check" size={16} className="text-success" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plan?.current ? "outline" : "default"}
                      className="w-full"
                      disabled={plan?.current}
                    >
                      {plan?.current ? 'Current Plan' : `Upgrade to ${plan?.name}`}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountTab;