import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MobileNavigation from '../../components/ui/MobileNavigation';
import MetricsCard from './components/MetricsCard';
import ActivityFeed from './components/ActivityFeed';
import PriorityTasks from './components/PriorityTasks';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import QuickActions from './components/QuickActions';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount] = useState(5);
  const navigate = useNavigate();

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const metricsData = [
    {
      title: "Active Projects",
      value: "12",
      subtitle: "3 due this week",
      icon: "FolderOpen",
      trend: "up",
      trendValue: "+2",
      color: "primary"
    },
    {
      title: "Overdue Tasks",
      value: "8",
      subtitle: "Requires attention",
      icon: "AlertTriangle",
      trend: "down",
      trendValue: "-3",
      color: "error"
    },
    {
      title: "Team Utilization",
      value: "87%",
      subtitle: "Above target",
      icon: "Users",
      trend: "up",
      trendValue: "+5%",
      color: "success"
    },
    {
      title: "Upcoming Deadlines",
      value: "15",
      subtitle: "Next 7 days",
      icon: "Clock",
      trend: "neutral",
      trendValue: "0",
      color: "warning"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onMenuToggle={() => setMobileMenuOpen(true)}
        notificationCount={notificationCount}
      />
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      {/* Mobile Navigation */}
      <MobileNavigation 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      }`}>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <Breadcrumb />
              <div className="flex items-center space-x-4">
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="hidden lg:flex"
                >
                  <Icon name={sidebarCollapsed ? "PanelLeftOpen" : "PanelLeftClose"} size={20} />
                </Button>
              </div>
              <p className="text-muted-foreground mt-2">
                Welcome back! Here's what's happening with your projects today.
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" iconName="Download" iconPosition="left">
                Export Report
              </Button>
              <Button variant="default" iconName="Plus" iconPosition="left" onClick={() => navigate('/projects-list')}>
                Create Project
              </Button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                subtitle={metric?.subtitle}
                icon={metric?.icon}
                trend={metric?.trend}
                trendValue={metric?.trendValue}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Activity Feed */}
            <div className="lg:col-span-4">
              <ActivityFeed />
            </div>

            {/* Center Column - Priority Tasks */}
            <div className="lg:col-span-5">
              <PriorityTasks />
            </div>

            {/* Right Column - Deadlines & Quick Actions */}
            <div className="lg:col-span-3 space-y-6">
              <UpcomingDeadlines />
              <QuickActions />
            </div>
          </div>

          {/* Additional Stats Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Project Health</h3>
                <Icon name="TrendingUp" size={20} className="text-success" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">On Track</span>
                  <span className="text-sm font-medium text-success">8 projects</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">At Risk</span>
                  <span className="text-sm font-medium text-warning">3 projects</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Delayed</span>
                  <span className="text-sm font-medium text-error">1 project</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Team Performance</h3>
                <Icon name="Users" size={20} className="text-primary" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tasks Completed</span>
                  <span className="text-sm font-medium text-foreground">142 this week</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average Velocity</span>
                  <span className="text-sm font-medium text-foreground">28.4 tasks/week</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Team Satisfaction</span>
                  <span className="text-sm font-medium text-success">4.2/5.0</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Resource Usage</h3>
                <Icon name="Activity" size={20} className="text-accent" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Storage Used</span>
                  <span className="text-sm font-medium text-foreground">2.4 GB / 10 GB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">API Calls</span>
                  <span className="text-sm font-medium text-foreground">1,247 / 5,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Users</span>
                  <span className="text-sm font-medium text-foreground">23 / 50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;