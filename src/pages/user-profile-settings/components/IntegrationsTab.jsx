import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import { Checkbox } from '../../../components/ui/Checkbox';

const IntegrationsTab = ({ integrationsData, onIntegrationsUpdate }) => {
  const [integrations, setIntegrations] = useState(integrationsData);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [connectionForm, setConnectionForm] = useState({});

  const availableIntegrations = [
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Sync project deadlines and meetings with your Google Calendar',
      icon: 'Calendar',
      category: 'calendar',
      color: 'bg-blue-500',
      fields: [
        { key: 'email', label: 'Google Account Email', type: 'email', required: true },
        { key: 'syncDeadlines', label: 'Sync task deadlines', type: 'checkbox', default: true },
        { key: 'syncMeetings', label: 'Sync project meetings', type: 'checkbox', default: true }
      ]
    },
    {
      id: 'outlook-calendar',
      name: 'Outlook Calendar',
      description: 'Integrate with Microsoft Outlook for seamless scheduling',
      icon: 'Calendar',
      category: 'calendar',
      color: 'bg-blue-600',
      fields: [
        { key: 'email', label: 'Outlook Email', type: 'email', required: true },
        { key: 'syncDeadlines', label: 'Sync task deadlines', type: 'checkbox', default: true }
      ]
    },
    {
      id: 'google-drive',
      name: 'Google Drive',
      description: 'Store and share project files directly from Google Drive',
      icon: 'HardDrive',
      category: 'storage',
      color: 'bg-green-500',
      fields: [
        { key: 'email', label: 'Google Account Email', type: 'email', required: true },
        { key: 'defaultFolder', label: 'Default Folder', type: 'text', placeholder: 'ProjectFlow Files' },
        { key: 'autoSync', label: 'Auto-sync project files', type: 'checkbox', default: false }
      ]
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      description: 'Access and manage your Dropbox files within projects',
      icon: 'Cloud',
      category: 'storage',
      color: 'bg-blue-400',
      fields: [
        { key: 'email', label: 'Dropbox Email', type: 'email', required: true },
        { key: 'defaultFolder', label: 'Default Folder', type: 'text', placeholder: '/ProjectFlow' }
      ]
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get project notifications and updates in your Slack channels',
      icon: 'MessageSquare',
      category: 'communication',
      color: 'bg-purple-500',
      fields: [
        { key: 'workspace', label: 'Slack Workspace', type: 'text', required: true },
        { key: 'defaultChannel', label: 'Default Channel', type: 'text', placeholder: '#general' },
        { key: 'notifyDeadlines', label: 'Notify about deadlines', type: 'checkbox', default: true },
        { key: 'notifyTaskUpdates', label: 'Notify about task updates', type: 'checkbox', default: false }
      ]
    },
    {
      id: 'microsoft-teams',
      name: 'Microsoft Teams',
      description: 'Collaborate with your team through Microsoft Teams integration',
      icon: 'Users',
      category: 'communication',
      color: 'bg-indigo-500',
      fields: [
        { key: 'tenantId', label: 'Tenant ID', type: 'text', required: true },
        { key: 'defaultTeam', label: 'Default Team', type: 'text', placeholder: 'ProjectFlow Team' }
      ]
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Link code repositories and track development progress',
      icon: 'GitBranch',
      category: 'development',
      color: 'bg-gray-800',
      fields: [
        { key: 'username', label: 'GitHub Username', type: 'text', required: true },
        { key: 'organization', label: 'Organization (optional)', type: 'text' },
        { key: 'syncIssues', label: 'Sync GitHub issues as tasks', type: 'checkbox', default: true }
      ]
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'Synchronize tasks and issues with Atlassian Jira',
      icon: 'Bug',
      category: 'development',
      color: 'bg-blue-700',
      fields: [
        { key: 'serverUrl', label: 'Jira Server URL', type: 'url', required: true },
        { key: 'username', label: 'Username', type: 'text', required: true },
        { key: 'projectKey', label: 'Default Project Key', type: 'text', placeholder: 'PROJ' }
      ]
    }
  ];

  const categories = [
    { key: 'calendar', label: 'Calendar & Scheduling', icon: 'Calendar' },
    { key: 'storage', label: 'File Storage', icon: 'HardDrive' },
    { key: 'communication', label: 'Communication', icon: 'MessageSquare' },
    { key: 'development', label: 'Development Tools', icon: 'Code' }
  ];

  const handleConnect = (integration) => {
    setSelectedIntegration(integration);
    setConnectionForm({});
    setShowConnectModal(true);
  };

  const handleDisconnect = (integrationId) => {
    const updatedIntegrations = integrations?.filter(int => int?.id !== integrationId);
    setIntegrations(updatedIntegrations);
    onIntegrationsUpdate(updatedIntegrations);
  };

  const handleFormChange = (field, value) => {
    setConnectionForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConnectSubmit = () => {
    const newIntegration = {
      id: selectedIntegration?.id,
      name: selectedIntegration?.name,
      icon: selectedIntegration?.icon,
      category: selectedIntegration?.category,
      color: selectedIntegration?.color,
      status: 'connected',
      connectedAt: new Date()?.toISOString(),
      settings: connectionForm
    };

    const updatedIntegrations = [...integrations, newIntegration];
    setIntegrations(updatedIntegrations);
    onIntegrationsUpdate(updatedIntegrations);
    setShowConnectModal(false);
    setSelectedIntegration(null);
    setConnectionForm({});
  };

  const handleConfigureIntegration = (integrationId) => {
    const integration = integrations?.find(int => int?.id === integrationId);
    const template = availableIntegrations?.find(temp => temp?.id === integrationId);
    
    if (integration && template) {
      setSelectedIntegration(template);
      setConnectionForm(integration?.settings || {});
      setShowConnectModal(true);
    }
  };

  const isConnected = (integrationId) => {
    return integrations?.some(int => int?.id === integrationId);
  };

  const getConnectedIntegration = (integrationId) => {
    return integrations?.find(int => int?.id === integrationId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Connected Integrations Overview */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Connected Services</h3>
        {integrations?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations?.map((integration) => (
              <div key={integration?.id} className="bg-background rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 ${integration?.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={integration?.icon} size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{integration?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Connected {formatDate(integration?.connectedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleConfigureIntegration(integration?.id)}
                    iconName="Settings"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Configure
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDisconnect(integration?.id)}
                    iconName="Unlink"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Link" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No integrations connected yet</p>
          </div>
        )}
      </div>
      {/* Available Integrations by Category */}
      {categories?.map((category) => {
        const categoryIntegrations = availableIntegrations?.filter(int => int?.category === category?.key);
        
        return (
          <div key={category?.key} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={category?.icon} size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{category?.label}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryIntegrations?.map((integration) => {
                const connected = isConnected(integration?.id);
                const connectedData = getConnectedIntegration(integration?.id);
                
                return (
                  <div key={integration?.id} className="bg-background rounded-lg border border-border p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${integration?.color} rounded-lg flex items-center justify-center`}>
                        <Icon name={integration?.icon} size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-foreground">{integration?.name}</h4>
                          {connected && (
                            <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
                              Connected
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {integration?.description}
                        </p>
                        {connected ? (
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleConfigureIntegration(integration?.id)}
                              iconName="Settings"
                              iconPosition="left"
                              iconSize={14}
                            >
                              Configure
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDisconnect(integration?.id)}
                              iconName="Unlink"
                              iconPosition="left"
                              iconSize={14}
                            >
                              Disconnect
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleConnect(integration)}
                            iconName="Link"
                            iconPosition="left"
                            iconSize={14}
                          >
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {/* Connection Modal */}
      {showConnectModal && selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${selectedIntegration?.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={selectedIntegration?.icon} size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Connect {selectedIntegration?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedIntegration?.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {selectedIntegration?.fields?.map((field) => {
                  if (field?.type === 'checkbox') {
                    return (
                      <Checkbox
                        key={field?.key}
                        label={field?.label}
                        checked={connectionForm?.[field?.key] ?? field?.default ?? false}
                        onChange={(e) => handleFormChange(field?.key, e?.target?.checked)}
                      />
                    );
                  }
                  
                  return (
                    <Input
                      key={field?.key}
                      label={field?.label}
                      type={field?.type}
                      value={connectionForm?.[field?.key] || ''}
                      onChange={(e) => handleFormChange(field?.key, e?.target?.value)}
                      placeholder={field?.placeholder}
                      required={field?.required}
                    />
                  );
                })}
              </div>
            </div>
            
            <div className="p-6 border-t border-border flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowConnectModal(false);
                  setSelectedIntegration(null);
                  setConnectionForm({});
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleConnectSubmit}
                iconName="Link"
                iconPosition="left"
                iconSize={16}
              >
                {isConnected(selectedIntegration?.id) ? 'Update Connection' : 'Connect'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationsTab;