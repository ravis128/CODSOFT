import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MobileNavigation from '../../components/ui/MobileNavigation';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProfileTab from './components/ProfileTab';
import AccountTab from './components/AccountTab';
import NotificationsTab from './components/NotificationsTab';
import SecurityTab from './components/SecurityTab';
import IntegrationsTab from './components/IntegrationsTab';

const UserProfileSettings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock data for user profile
  const [profileData, setProfileData] = useState({
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    firstName: "John",
    lastName: "Doe",
    jobTitle: "Senior Project Manager",
    bio: `Experienced project manager with over 8 years in leading cross-functional teams and delivering complex projects on time and within budget. Passionate about agile methodologies and team collaboration.`,
    email: "john.doe@projectflow.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    location: "San Francisco, CA",
    timezone: "UTC-08:00",
    language: "en"
  });

  const [accountData, setAccountData] = useState({
    subscription: {
      plan: "professional",
      price: 29,
      nextBilling: "01/15/2025"
    },
    usage: {
      projects: { used: 8, total: 25 },
      teamMembers: { used: 12, total: 25 },
      storage: { used: 2.4, total: 10 }
    },
    billing: {
      companyName: "ProjectFlow Inc.",
      taxId: "123-45-6789",
      email: "billing@projectflow.com",
      country: "US",
      address1: "123 Market Street",
      address2: "Suite 400",
      city: "San Francisco",
      zipCode: "94105"
    },
    paymentMethods: [
      {
        id: "pm_1",
        last4: "4242",
        brand: "Visa",
        expiry: "12/26",
        isDefault: true
      }
    ]
  });

  const [notificationData, setNotificationData] = useState({
    channels: {
      email: true,
      browser: true,
      mobile: false
    },
    digestFrequency: "daily",
    email: {
      taskAssigned: true,
      taskCompleted: true,
      projectStatusChange: true,
      milestoneReached: true,
      teamMemberJoined: false,
      mentionInComment: true,
      teamMemberLeft: false,
      deadlineApproaching: true,
      overdueTask: true,
      weeklyDigest: true,
      securityAlerts: true,
      billingUpdates: true,
      systemMaintenance: true
    },
    browser: {
      taskAssigned: true,
      taskCompleted: false,
      projectStatusChange: true,
      milestoneReached: true,
      teamMemberJoined: false,
      mentionInComment: true,
      teamMemberLeft: false,
      deadlineApproaching: true,
      overdueTask: true,
      weeklyDigest: false,
      securityAlerts: true,
      billingUpdates: false,
      systemMaintenance: true
    },
    mobile: {
      taskAssigned: false,
      taskCompleted: false,
      projectStatusChange: false,
      milestoneReached: false,
      teamMemberJoined: false,
      mentionInComment: false,
      teamMemberLeft: false,
      deadlineApproaching: false,
      overdueTask: false,
      weeklyDigest: false,
      securityAlerts: false,
      billingUpdates: false,
      systemMaintenance: false
    },
    projectOverrides: {
      proj1: true,
      proj2: true,
      proj3: false,
      proj4: true
    }
  });

  const [securityData, setSecurityData] = useState({
    twoFactorEnabled: false,
    activeSessions: [
      {
        id: "session_1",
        device: "desktop",
        browser: "Chrome 120",
        os: "macOS",
        location: "San Francisco, CA",
        ipAddress: "192.168.1.100",
        lastActive: "2025-01-11T18:30:00Z",
        current: true
      },
      {
        id: "session_2",
        device: "mobile",
        browser: "Safari Mobile",
        os: "iOS 17",
        location: "San Francisco, CA",
        ipAddress: "192.168.1.101",
        lastActive: "2025-01-11T16:45:00Z",
        current: false
      },
      {
        id: "session_3",
        device: "desktop",
        browser: "Firefox 121",
        os: "Windows 11",
        location: "New York, NY",
        ipAddress: "203.0.113.42",
        lastActive: "2025-01-10T14:20:00Z",
        current: false
      }
    ],
    apiKeys: []
  });

  const [integrationsData, setIntegrationsData] = useState([
    {
      id: "google-calendar",
      name: "Google Calendar",
      icon: "Calendar",
      category: "calendar",
      color: "bg-blue-500",
      status: "connected",
      connectedAt: "2025-01-05T10:00:00Z",
      settings: {
        email: "john.doe@gmail.com",
        syncDeadlines: true,
        syncMeetings: true
      }
    },
    {
      id: "slack",
      name: "Slack",
      icon: "MessageSquare",
      category: "communication",
      color: "bg-purple-500",
      status: "connected",
      connectedAt: "2025-01-03T15:30:00Z",
      settings: {
        workspace: "projectflow-team",
        defaultChannel: "#general",
        notifyDeadlines: true,
        notifyTaskUpdates: false
      }
    }
  ]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User', description: 'Personal information and preferences' },
    { id: 'account', label: 'Account', icon: 'CreditCard', description: 'Subscription and billing details' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell', description: 'Manage notification preferences' },
    { id: 'security', label: 'Security', icon: 'Shield', description: 'Password and security settings' },
    { id: 'integrations', label: 'Integrations', icon: 'Link', description: 'Connected services and apps' }
  ];

  const handleProfileUpdate = (updatedProfile) => {
    setProfileData(updatedProfile);
    showSuccess();
  };

  const handleAccountUpdate = (updatedAccount) => {
    setAccountData(updatedAccount);
    showSuccess();
  };

  const handleNotificationUpdate = (updatedNotifications) => {
    setNotificationData(updatedNotifications);
    showSuccess();
  };

  const handleSecurityUpdate = (updatedSecurity) => {
    setSecurityData(updatedSecurity);
    showSuccess();
  };

  const handleIntegrationsUpdate = (updatedIntegrations) => {
    setIntegrationsData(updatedIntegrations);
    showSuccess();
  };

  const showSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab profileData={profileData} onProfileUpdate={handleProfileUpdate} />;
      case 'account':
        return <AccountTab accountData={accountData} onAccountUpdate={handleAccountUpdate} />;
      case 'notifications':
        return <NotificationsTab notificationData={notificationData} onNotificationUpdate={handleNotificationUpdate} />;
      case 'security':
        return <SecurityTab securityData={securityData} onSecurityUpdate={handleSecurityUpdate} />;
      case 'integrations':
        return <IntegrationsTab integrationsData={integrationsData} onIntegrationsUpdate={handleIntegrationsUpdate} />;
      default:
        return <ProfileTab profileData={profileData} onProfileUpdate={handleProfileUpdate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        onMenuToggle={() => setMobileNavOpen(true)}
        notificationCount={3}
      />
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      {/* Mobile Navigation */}
      <MobileNavigation
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}`}>
        <div className="p-6">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
              <p className="text-muted-foreground mt-2">
                Manage your account settings and preferences
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex"
            >
              <Icon name={sidebarCollapsed ? "PanelLeftOpen" : "PanelLeftClose"} size={20} />
            </Button>
          </div>

          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <p className="text-success font-medium">Settings updated successfully!</p>
            </div>
          )}

          {/* Settings Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Navigation - Desktop */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="bg-card rounded-lg border border-border p-2 sticky top-24">
                <nav className="space-y-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-left transition-colors duration-200 ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon
                        name={tab?.icon}
                        size={20}
                        className={activeTab === tab?.id ? 'text-primary-foreground' : 'text-muted-foreground'}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{tab?.label}</p>
                        <p className={`text-xs ${
                          activeTab === tab?.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                        }`}>
                          {tab?.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Mobile Tab Navigation */}
            <div className="lg:hidden col-span-1">
              <div className="bg-card rounded-lg border border-border p-2 mb-6">
                <div className="flex overflow-x-auto space-x-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 rounded-md transition-colors duration-200 ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon
                        name={tab?.icon}
                        size={16}
                        className={activeTab === tab?.id ? 'text-primary-foreground' : 'text-muted-foreground'}
                      />
                      <span className="font-medium whitespace-nowrap">{tab?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="col-span-1 lg:col-span-9">
              <div className="bg-card rounded-lg border border-border">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <Icon
                      name={tabs?.find(tab => tab?.id === activeTab)?.icon || 'User'}
                      size={24}
                      className="text-primary"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {tabs?.find(tab => tab?.id === activeTab)?.label}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {tabs?.find(tab => tab?.id === activeTab)?.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfileSettings;