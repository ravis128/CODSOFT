import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CustomerNavigation from '../../components/ui/CustomerNavigation';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  
  const [activeTab, setActiveTab] = useState('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Personal Information Form
  const [personalForm, setPersonalForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || ''
  });

  // Address Information Form
  const [addressForm, setAddressForm] = useState({
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
    country: user?.country || 'United States'
  });

  // Password Change Form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Preferences Form
  const [preferencesForm, setPreferencesForm] = useState({
    newsletter: user?.preferences?.newsletter || false,
    marketingEmails: user?.preferences?.marketingEmails || false,
    orderUpdates: user?.preferences?.orderUpdates || true,
    securityAlerts: user?.preferences?.securityAlerts || true,
    language: user?.preferences?.language || 'English',
    currency: user?.preferences?.currency || 'USD'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Update forms when user data changes
    if (user) {
      setPersonalForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || ''
      });
      
      setAddressForm({
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
        country: user.country || 'United States'
      });
      
      setPreferencesForm({
        newsletter: user.preferences?.newsletter || false,
        marketingEmails: user.preferences?.marketingEmails || false,
        orderUpdates: user.preferences?.orderUpdates || true,
        securityAlerts: user.preferences?.securityAlerts || true,
        language: user.preferences?.language || 'English',
        currency: user.preferences?.currency || 'USD'
      });
    }
  }, [user]);

  const handleInputChange = (formType, field, value) => {
    if (formType === 'personal') {
      setPersonalForm(prev => ({ ...prev, [field]: value }));
    } else if (formType === 'address') {
      setAddressForm(prev => ({ ...prev, [field]: value }));
    } else if (formType === 'password') {
      setPasswordForm(prev => ({ ...prev, [field]: value }));
    } else if (formType === 'preferences') {
      setPreferencesForm(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePersonalForm = () => {
    const newErrors = {};
    
    if (!personalForm.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!personalForm.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!personalForm.email) newErrors.email = 'Email is required';
    if (personalForm.email && !/\S+@\S+\.\S+/.test(personalForm.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (personalForm.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(personalForm.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAddressForm = () => {
    const newErrors = {};
    
    if (!addressForm.address.trim()) newErrors.address = 'Address is required';
    if (!addressForm.city.trim()) newErrors.city = 'City is required';
    if (!addressForm.state.trim()) newErrors.state = 'State is required';
    if (!addressForm.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordForm.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!passwordForm.newPassword) newErrors.newPassword = 'New password is required';
    if (passwordForm.newPassword && passwordForm.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    if (passwordForm.newPassword && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordForm.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSavePersonal = async () => {
    if (!validatePersonalForm()) return;

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...user,
        ...personalForm,
        name: `${personalForm.firstName} ${personalForm.lastName}`,
        avatar: `https://ui-avatars.com/api/?name=${personalForm.firstName}+${personalForm.lastName}&background=3b82f6&color=fff`
      };
      
      updateUser(updatedUser);
      setMessage({ type: 'success', text: 'Personal information updated successfully!' });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update personal information. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAddress = async () => {
    if (!validateAddressForm()) return;

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...addressForm };
      updateUser(updatedUser);
      setMessage({ type: 'success', text: 'Address information updated successfully!' });
      
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update address information. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!validatePasswordForm()) return;

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to change password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { 
        ...user, 
        preferences: preferencesForm 
      };
      updateUser(updatedUser);
      setMessage({ type: 'success', text: 'Preferences updated successfully!' });
      
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update preferences. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: 'User' },
    { id: 'address', label: 'Address', icon: 'MapPin' },
    { id: 'password', label: 'Password & Security', icon: 'Lock' },
    { id: 'preferences', label: 'Preferences', icon: 'Settings' }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerNavigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Icon name="User" size={64} className="text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Please sign in</h2>
            <p className="text-muted-foreground mb-6">You need to be signed in to view your profile</p>
            <Button onClick={() => navigate('/signin')}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomerNavigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account information and preferences
          </p>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-md ${
            message.type === 'success' 
              ? 'bg-success/10 border border-success/20 text-success' 
              : 'bg-destructive/10 border border-destructive/20 text-destructive'
          }`}>
            {message.text}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-card border border-border rounded-lg p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-card border border-border rounded-lg p-6">
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name *
                      </label>
                      <Input
                        value={personalForm.firstName}
                        onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                        error={errors.firstName}
                        placeholder="First Name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name *
                      </label>
                      <Input
                        value={personalForm.lastName}
                        onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                        error={errors.lastName}
                        placeholder="Last Name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={personalForm.email}
                        onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                        error={errors.email}
                        placeholder="Email"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone
                      </label>
                      <Input
                        value={personalForm.phone}
                        onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                        error={errors.phone}
                        placeholder="Phone Number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Date of Birth
                      </label>
                      <Input
                        type="date"
                        value={personalForm.dateOfBirth}
                        onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
                        placeholder="Date of Birth"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Gender
                      </label>
                      <select
                        value={personalForm.gender}
                        onChange={(e) => handleInputChange('personal', 'gender', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <Button
                      onClick={handleSavePersonal}
                      disabled={isLoading}
                      iconName="Save"
                      iconPosition="left"
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Address Tab */}
              {activeTab === 'address' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Address Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Street Address *
                      </label>
                      <Input
                        value={addressForm.address}
                        onChange={(e) => handleInputChange('address', 'address', e.target.value)}
                        error={errors.address}
                        placeholder="Street Address"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        City *
                      </label>
                      <Input
                        value={addressForm.city}
                        onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                        error={errors.city}
                        placeholder="City"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        State *
                      </label>
                      <Input
                        value={addressForm.state}
                        onChange={(e) => handleInputChange('address', 'state', e.target.value)}
                        error={errors.state}
                        placeholder="State"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        ZIP Code *
                      </label>
                      <Input
                        value={addressForm.zipCode}
                        onChange={(e) => handleInputChange('address', 'zipCode', e.target.value)}
                        error={errors.zipCode}
                        placeholder="ZIP Code"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Country
                      </label>
                      <select
                        value={addressForm.country}
                        onChange={(e) => handleInputChange('address', 'country', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <Button
                      onClick={handleSaveAddress}
                      disabled={isLoading}
                      iconName="Save"
                      iconPosition="left"
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Password Tab */}
              {activeTab === 'password' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Change Password</h2>
                  
                  <div className="max-w-md space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Current Password *
                      </label>
                      <Input
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => handleInputChange('password', 'currentPassword', e.target.value)}
                        error={errors.currentPassword}
                        placeholder="Current Password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        New Password *
                      </label>
                      <Input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => handleInputChange('password', 'newPassword', e.target.value)}
                        error={errors.newPassword}
                        placeholder="New Password"
                      />
                      <p className="mt-1 text-xs text-muted-foreground">
                        Must be at least 8 characters with uppercase, lowercase, and number
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Confirm New Password *
                      </label>
                      <Input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => handleInputChange('password', 'confirmPassword', e.target.value)}
                        error={errors.confirmPassword}
                        placeholder="Confirm New Password"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <Button
                      onClick={handleChangePassword}
                      disabled={isLoading}
                      iconName="Lock"
                      iconPosition="left"
                    >
                      {isLoading ? 'Changing...' : 'Change Password'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Preferences</h2>
                  
                  <div className="space-y-6">
                    {/* Email Preferences */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Email Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            id="newsletter"
                            type="checkbox"
                            checked={preferencesForm.newsletter}
                            onChange={(e) => handleInputChange('preferences', 'newsletter', e.target.checked)}
                            className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                          />
                          <label htmlFor="newsletter" className="ml-2 text-sm text-foreground">
                            Subscribe to newsletter for exclusive deals and updates
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="marketingEmails"
                            type="checkbox"
                            checked={preferencesForm.marketingEmails}
                            onChange={(e) => handleInputChange('preferences', 'marketingEmails', e.target.checked)}
                            className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                          />
                          <label htmlFor="marketingEmails" className="ml-2 text-sm text-foreground">
                            Receive marketing emails about new products and promotions
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="orderUpdates"
                            type="checkbox"
                            checked={preferencesForm.orderUpdates}
                            onChange={(e) => handleInputChange('preferences', 'orderUpdates', e.target.checked)}
                            className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                          />
                          <label htmlFor="orderUpdates" className="ml-2 text-sm text-foreground">
                            Order status updates and shipping notifications
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="securityAlerts"
                            type="checkbox"
                            checked={preferencesForm.securityAlerts}
                            onChange={(e) => handleInputChange('preferences', 'securityAlerts', e.target.checked)}
                            className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                          />
                          <label htmlFor="securityAlerts" className="ml-2 text-sm text-foreground">
                            Security alerts and account notifications
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Language and Currency */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Language
                        </label>
                        <select
                          value={preferencesForm.language}
                          onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Currency
                        </label>
                        <select
                          value={preferencesForm.currency}
                          onChange={(e) => handleInputChange('preferences', 'currency', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="CAD">CAD (C$)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <Button
                      onClick={handleSavePreferences}
                      disabled={isLoading}
                      iconName="Save"
                      iconPosition="left"
                    >
                      {isLoading ? 'Saving...' : 'Save Preferences'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
