import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerNavigation from '../../components/ui/CustomerNavigation';
import AccountSummary from './components/AccountSummary';
import NotificationCenter from './components/NotificationCenter';
import PrimaryActions from './components/PrimaryActions';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import QuickActions from './components/QuickActions';
import RecentOrders from './components/RecentOrders';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';
import WelcomeHeader from './components/WelcomeHeader';
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(3);

  // Mock recent orders data
  const mockRecentOrders = [
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      productName: "Wireless Bluetooth Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
      status: "Delivered",
      orderDate: "Aug 25, 2024"
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      productName: "Smart Fitness Watch",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop",
      status: "Shipped",
      orderDate: "Aug 28, 2024"
    },
    {
      id: 3,
      orderNumber: "ORD-2024-003",
      productName: "Laptop Stand Adjustable",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=150&h=150&fit=crop",
      status: "Processing",
      orderDate: "Aug 29, 2024"
    }
  ];

  // Mock account summary data
  const mockAccountData = {
    loyaltyPoints: 2450,
    nextTierPoints: 5000,
    membershipTier: "Silver",
    nextTier: "Gold",
    savedItemsCount: 12,
    totalOrders: 28
  };

  // Mock recently viewed items
  const mockRecentlyViewed = [
    {
      id: 1,
      name: "Wireless Mouse",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      name: "USB-C Cable",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Phone Case",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=200&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Desk Lamp",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
    }
  ];

  // Mock recommendations
  const mockRecommendations = [
    {
      id: 1,
      name: "Premium Wireless Charger",
      price: 39.99,
      rating: 4.5,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Bluetooth Speaker Portable",
      price: 59.99,
      rating: 4.8,
      reviews: 256,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop"
    }
  ];

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      type: "order",
      title: "Order Delivered",
      message: "Your order #ORD-2024-001 has been delivered successfully.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false
    },
    {
      id: 2,
      type: "promotion",
      title: "Flash Sale Alert",
      message: "50% off on electronics! Limited time offer ending soon.",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: false
    },
    {
      id: 3,
      type: "account",
      title: "Profile Updated",
      message: "Your profile information has been updated successfully.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true
    },
    {
      id: 4,
      type: "payment",
      title: "Payment Method Added",
      message: "New payment method has been added to your account.",
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      read: true
    }
  ];

  // user is provided by AuthContext

  const handleQuickAction = (actionId) => {
    console.log(`Quick action clicked: ${actionId}`);
    // Handle different quick actions
    switch (actionId) {
      case 'reorder': console.log('Opening reorder favorites...');
        break;
      case 'track': console.log('Opening package tracking...');
        break;
      case 'addresses': console.log('Opening address management...');
        break;
      case 'payment': console.log('Opening payment methods...');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CustomerNavigation cartItemCount={cartItemCount} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 lg:pb-6">
        {/* Welcome Header */}
        <WelcomeHeader user={user} />

        {/* Desktop Layout */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-6">
          {/* Left Column - Main Content (60%) */}
          <div className="lg:col-span-7 space-y-6">
            <RecentOrders orders={mockRecentOrders} />
            <QuickActions onActionClick={handleQuickAction} />
            <PersonalizedRecommendations 
              recentlyViewed={mockRecentlyViewed}
              recommendations={mockRecommendations}
            />
          </div>

          {/* Right Column - Sidebar (40%) */}
          <div className="lg:col-span-5 space-y-6 mt-6 lg:mt-0">
            <AccountSummary accountData={mockAccountData} />
            <NotificationCenter notifications={mockNotifications} />
            <PrimaryActions />
          </div>
        </div>

        {/* Breadcrumb for Desktop */}
        <div className="hidden lg:block mt-8 pt-6 border-t border-border">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Account</span>
            <span>/</span>
            <span className="text-foreground font-medium">Dashboard</span>
          </nav>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;