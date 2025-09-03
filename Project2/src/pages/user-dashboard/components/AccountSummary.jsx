import React from 'react';
import Icon from '../../../components/AppIcon';

const AccountSummary = ({ accountData }) => {
  const progressPercentage = (accountData?.loyaltyPoints / accountData?.nextTierPoints) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-card-foreground mb-4">Account Summary</h2>
      <div className="space-y-6">
        {/* Loyalty Points */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Star" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-card-foreground">Loyalty Points</h3>
              <p className="text-xs text-muted-foreground">
                {accountData?.loyaltyPoints} points available
              </p>
            </div>
          </div>
          <span className="text-lg font-bold text-accent">
            {accountData?.loyaltyPoints}
          </span>
        </div>

        {/* Membership Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-card-foreground">
              {accountData?.membershipTier} Member
            </span>
            <span className="text-xs text-muted-foreground">
              {accountData?.nextTierPoints - accountData?.loyaltyPoints} points to {accountData?.nextTier}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Saved Items */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="Heart" size={20} className="text-error" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-card-foreground">Saved Items</h3>
              <p className="text-xs text-muted-foreground">
                Items in your wishlist
              </p>
            </div>
          </div>
          <span className="text-lg font-bold text-card-foreground">
            {accountData?.savedItemsCount}
          </span>
        </div>

        {/* Total Orders */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-card-foreground">Total Orders</h3>
              <p className="text-xs text-muted-foreground">
                Lifetime orders placed
              </p>
            </div>
          </div>
          <span className="text-lg font-bold text-card-foreground">
            {accountData?.totalOrders}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;