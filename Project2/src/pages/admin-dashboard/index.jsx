import React, { useState, useEffect } from 'react';
import AdminNavigation from '../../components/ui/AdminNavigation';
import KPICard from './components/KPICard';
import SalesChart from './components/SalesChart';
import TopProductsChart from './components/TopProductsChart';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import RecentOrders from './components/RecentOrders';
import NotificationCenter from './components/NotificationCenter';
import PendingTasks from './components/PendingTasks';

const AdminDashboard = () => {
  const [user] = useState({
    name: 'Admin User',
    email: 'admin@ecommercehub.com',
    role: 'Administrator'
  });

  const [dashboardData] = useState({
    totalSales: '$45,231',
    totalOrders: 1,
    conversionRate: '3.2%',
    inventoryAlerts: 8
  });

  useEffect(() => {
    document.title = 'Admin Dashboard - EcommerceHub';
  }, []);

  const kpiData = [
    {
      title: 'Total Sales',
      value: dashboardData?.totalSales,
      change: '+12.5%',
      changeType: 'positive',
      icon: 'DollarSign'
    },
    {
      title: 'Total Orders',
      value: dashboardData?.totalOrders?.toLocaleString(),
      change: '+8.2%',
      changeType: 'positive',
      icon: 'ShoppingCart'
    },
    {
      title: 'Conversion Rate',
      value: dashboardData?.conversionRate,
      change: '-0.3%',
      changeType: 'negative',
      icon: 'TrendingUp'
    },
    {
      title: 'Inventory Alerts',
      value: dashboardData?.inventoryAlerts?.toString(),
      change: '+2',
      changeType: 'negative',
      icon: 'AlertTriangle'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation user={user} />
      {/* Main Content */}
      <div className="lg:pl-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}. Here's what's happening with your store today.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                change={kpi?.change}
                changeType={kpi?.changeType}
                icon={kpi?.icon}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="lg:col-span-1">
              <SalesChart />
            </div>
            <div className="lg:col-span-1">
              <TopProductsChart />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Recent Activity & Quick Actions */}
            <div className="lg:col-span-2 space-y-6">
              <RecentActivity />
              <QuickActions />
            </div>

            {/* Right Column - Notifications & Tasks */}
            <div className="lg:col-span-1 space-y-6">
              <NotificationCenter />
              <PendingTasks />
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="mb-8">
            <RecentOrders />
          </div>

          {/* Footer */}
          <div className="text-center py-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} EcommerceHub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      {/* Mobile Bottom Padding */}
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default AdminDashboard;