import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const SecurityTab = ({ securityData, onSecurityUpdate }) => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [apiKeys, setApiKeys] = useState(securityData?.apiKeys || []);
  const [newApiKeyName, setNewApiKeyName] = useState('');
  const [showNewApiKeyForm, setShowNewApiKeyForm] = useState(false);

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordSubmit = () => {
    if (passwordForm?.newPassword !== passwordForm?.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Simulate password change
    alert('Password updated successfully');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleTwoFactorSetup = () => {
    setShowTwoFactorSetup(true);
  };

  const handleTwoFactorConfirm = () => {
    if (twoFactorCode === '123456') {
      onSecurityUpdate({
        ...securityData,
        twoFactorEnabled: true
      });
      setShowTwoFactorSetup(false);
      setTwoFactorCode('');
      alert('Two-factor authentication enabled successfully');
    } else {
      alert('Invalid verification code. Please try again.');
    }
  };

  const handleDisableTwoFactor = () => {
    onSecurityUpdate({
      ...securityData,
      twoFactorEnabled: false
    });
    alert('Two-factor authentication disabled');
  };

  const handleRevokeSession = (sessionId) => {
    const updatedSessions = securityData?.activeSessions?.filter(session => session?.id !== sessionId);
    onSecurityUpdate({
      ...securityData,
      activeSessions: updatedSessions
    });
  };

  const handleGenerateApiKey = () => {
    if (!newApiKeyName?.trim()) {
      alert('Please enter a name for the API key');
      return;
    }

    const newKey = {
      id: Date.now()?.toString(),
      name: newApiKeyName,
      key: `pk_${Math.random()?.toString(36)?.substr(2, 32)}`,
      createdAt: new Date()?.toISOString(),
      lastUsed: null
    };

    setApiKeys(prev => [...prev, newKey]);
    setNewApiKeyName('');
    setShowNewApiKeyForm(false);
    alert('API key generated successfully');
  };

  const handleRevokeApiKey = (keyId) => {
    setApiKeys(prev => prev?.filter(key => key?.id !== keyId));
    alert('API key revoked successfully');
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Password Change */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={passwordForm?.currentPassword}
            onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
            placeholder="Enter current password"
            required
          />
          <Input
            label="New Password"
            type="password"
            value={passwordForm?.newPassword}
            onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
            placeholder="Enter new password"
            description="Password must be at least 8 characters long"
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordForm?.confirmPassword}
            onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
            placeholder="Confirm new password"
            required
          />
          <Button
            variant="default"
            onClick={handlePasswordSubmit}
            iconName="Lock"
            iconPosition="left"
            iconSize={16}
            disabled={!passwordForm?.currentPassword || !passwordForm?.newPassword || !passwordForm?.confirmPassword}
          >
            Update Password
          </Button>
        </div>
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {securityData?.twoFactorEnabled ? (
              <span className="bg-success text-success-foreground text-sm px-3 py-1 rounded-full">
                Enabled
              </span>
            ) : (
              <span className="bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full">
                Disabled
              </span>
            )}
          </div>
        </div>

        {!securityData?.twoFactorEnabled ? (
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-background rounded-lg border border-border">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-2">Secure Your Account</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Two-factor authentication adds an extra layer of security by requiring a verification code from your phone in addition to your password.
                </p>
                <Button
                  variant="default"
                  onClick={handleTwoFactorSetup}
                  iconName="Smartphone"
                  iconPosition="left"
                  iconSize={16}
                >
                  Enable Two-Factor Authentication
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-success/5 rounded-lg border border-success/20">
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <div>
                  <p className="font-medium text-foreground">Two-factor authentication is enabled</p>
                  <p className="text-sm text-muted-foreground">Your account is protected with 2FA</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleDisableTwoFactor}
                iconName="X"
                iconPosition="left"
                iconSize={16}
              >
                Disable
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Active Sessions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Active Sessions</h3>
        <div className="space-y-4">
          {securityData?.activeSessions?.map((session) => (
            <div key={session?.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon 
                    name={session?.device === 'desktop' ? 'Monitor' : session?.device === 'mobile' ? 'Smartphone' : 'Tablet'} 
                    size={20} 
                    className="text-muted-foreground" 
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-foreground">{session?.browser} on {session?.os}</p>
                    {session?.current && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {session?.location} • Last active: {formatDate(session?.lastActive)}
                  </p>
                  <p className="text-xs text-muted-foreground">IP: {session?.ipAddress}</p>
                </div>
              </div>
              {!session?.current && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRevokeSession(session?.id)}
                  iconName="LogOut"
                  iconPosition="left"
                  iconSize={14}
                >
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* API Keys */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">API Keys</h3>
            <p className="text-sm text-muted-foreground">
              Generate API keys for integrating with external services
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowNewApiKeyForm(true)}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Generate New Key
          </Button>
        </div>

        {showNewApiKeyForm && (
          <div className="mb-6 p-4 bg-background rounded-lg border border-border">
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <Input
                  label="API Key Name"
                  type="text"
                  value={newApiKeyName}
                  onChange={(e) => setNewApiKeyName(e?.target?.value)}
                  placeholder="e.g., Mobile App Integration"
                />
              </div>
              <Button
                variant="default"
                onClick={handleGenerateApiKey}
                iconName="Key"
                iconPosition="left"
                iconSize={16}
              >
                Generate
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setShowNewApiKeyForm(false);
                  setNewApiKeyName('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {apiKeys?.length > 0 ? (
          <div className="space-y-4">
            {apiKeys?.map((apiKey) => (
              <div key={apiKey?.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name="Key" size={16} className="text-muted-foreground" />
                    <p className="font-medium text-foreground">{apiKey?.name}</p>
                  </div>
                  <div className="font-mono text-sm text-muted-foreground bg-muted px-3 py-2 rounded border">
                    {apiKey?.key}
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                    <span>Created: {formatDate(apiKey?.createdAt)}</span>
                    <span>Last used: {apiKey?.lastUsed ? formatDate(apiKey?.lastUsed) : 'Never'}</span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigator.clipboard?.writeText(apiKey?.key)}
                    iconName="Copy"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRevokeApiKey(apiKey?.id)}
                    iconName="Trash2"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Revoke
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Key" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No API keys generated</p>
          </div>
        )}
      </div>
      {/* Two-Factor Setup Modal */}
      {showTwoFactorSetup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border max-w-md w-full">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-semibold text-foreground">Enable Two-Factor Authentication</h3>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded border-2 border-border flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-1">
                      {Array.from({ length: 64 })?.map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Scan this QR code with your authenticator app, then enter the 6-digit code below.
                </p>
              </div>
              <div className="space-y-4">
                <Input
                  label="Verification Code"
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e?.target?.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                />
                <p className="text-xs text-muted-foreground">
                  Use mock code: <strong>123456</strong> for testing
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowTwoFactorSetup(false);
                  setTwoFactorCode('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleTwoFactorConfirm}
                disabled={twoFactorCode?.length !== 6}
              >
                Enable 2FA
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityTab;