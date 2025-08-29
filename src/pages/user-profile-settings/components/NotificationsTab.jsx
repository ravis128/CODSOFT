import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const NotificationsTab = ({ notificationData, onNotificationUpdate }) => {
  const [settings, setSettings] = useState(notificationData);

  const handleToggle = (category, type, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [type]: value
      }
    }));
  };

  const handleDigestFrequency = (value) => {
    setSettings(prev => ({
      ...prev,
      digestFrequency: value
    }));
  };

  const handleProjectOverride = (projectId, enabled) => {
    setSettings(prev => ({
      ...prev,
      projectOverrides: {
        ...prev?.projectOverrides,
        [projectId]: enabled
      }
    }));
  };

  const handleSave = () => {
    onNotificationUpdate(settings);
  };

  const notificationCategories = [
    {
      title: 'Project Updates',
      description: 'Notifications about project progress and changes',
      icon: 'FolderOpen',
      settings: [
        { key: 'taskAssigned', label: 'Task assigned to me', description: 'When someone assigns a task to you' },
        { key: 'taskCompleted', label: 'Task completed', description: 'When a task you created is completed' },
        { key: 'projectStatusChange', label: 'Project status changes', description: 'When project status is updated' },
        { key: 'milestoneReached', label: 'Milestone reached', description: 'When project milestones are achieved' }
      ]
    },
    {
      title: 'Team Activity',
      description: 'Notifications about team member activities',
      icon: 'Users',
      settings: [
        { key: 'teamMemberJoined', label: 'New team member', description: 'When someone joins your team' },
        { key: 'mentionInComment', label: 'Mentioned in comments', description: 'When someone mentions you in a comment' },
        { key: 'teamMemberLeft', label: 'Team member left', description: 'When a team member leaves' }
      ]
    },
    {
      title: 'Deadlines & Reminders',
      description: 'Time-sensitive notifications and reminders',
      icon: 'Clock',
      settings: [
        { key: 'deadlineApproaching', label: 'Deadline approaching', description: 'Remind me 24 hours before deadlines' },
        { key: 'overdueTask', label: 'Overdue tasks', description: 'When tasks become overdue' },
        { key: 'weeklyDigest', label: 'Weekly summary', description: 'Weekly digest of activities and upcoming tasks' }
      ]
    },
    {
      title: 'System & Account',
      description: 'Account and system-related notifications',
      icon: 'Settings',
      settings: [
        { key: 'securityAlerts', label: 'Security alerts', description: 'Login attempts and security-related activities' },
        { key: 'billingUpdates', label: 'Billing updates', description: 'Payment confirmations and billing changes' },
        { key: 'systemMaintenance', label: 'System maintenance', description: 'Scheduled maintenance and downtime notices' }
      ]
    }
  ];

  const digestOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'hourly', label: 'Hourly' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'never', label: 'Never' }
  ];

  const projects = [
    { id: 'proj1', name: 'Website Redesign', status: 'active' },
    { id: 'proj2', name: 'Mobile App Development', status: 'active' },
    { id: 'proj3', name: 'Marketing Campaign', status: 'completed' },
    { id: 'proj4', name: 'Database Migration', status: 'planning' }
  ];

  return (
    <div className="space-y-8">
      {/* Notification Channels */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Notification Channels</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="Mail" size={24} className="text-primary" />
            </div>
            <h4 className="font-medium text-foreground mb-2">Email</h4>
            <Checkbox
              label="Enable email notifications"
              checked={settings?.channels?.email}
              onChange={(e) => handleToggle('channels', 'email', e?.target?.checked)}
            />
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="Monitor" size={24} className="text-primary" />
            </div>
            <h4 className="font-medium text-foreground mb-2">Browser</h4>
            <Checkbox
              label="Enable browser notifications"
              checked={settings?.channels?.browser}
              onChange={(e) => handleToggle('channels', 'browser', e?.target?.checked)}
            />
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="Smartphone" size={24} className="text-primary" />
            </div>
            <h4 className="font-medium text-foreground mb-2">Mobile Push</h4>
            <Checkbox
              label="Enable mobile notifications"
              checked={settings?.channels?.mobile}
              onChange={(e) => handleToggle('channels', 'mobile', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Digest Frequency */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Email Digest Frequency</h3>
        <p className="text-muted-foreground mb-6">
          Choose how often you want to receive email summaries of your notifications.
        </p>
        <div className="max-w-xs">
          <Select
            label="Digest Frequency"
            options={digestOptions}
            value={settings?.digestFrequency}
            onChange={handleDigestFrequency}
            placeholder="Select frequency"
          />
        </div>
      </div>
      {/* Notification Categories */}
      {notificationCategories?.map((category) => (
        <div key={category?.title} className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={category?.icon} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{category?.title}</h3>
              <p className="text-sm text-muted-foreground">{category?.description}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {category?.settings?.map((setting) => (
              <div key={setting?.key} className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-foreground">{setting?.label}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{setting?.description}</p>
                </div>
                <div className="flex space-x-4 ml-6">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">Email</p>
                    <Checkbox
                      checked={settings?.email?.[setting?.key] || false}
                      onChange={(e) => handleToggle('email', setting?.key, e?.target?.checked)}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">Browser</p>
                    <Checkbox
                      checked={settings?.browser?.[setting?.key] || false}
                      onChange={(e) => handleToggle('browser', setting?.key, e?.target?.checked)}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">Mobile</p>
                    <Checkbox
                      checked={settings?.mobile?.[setting?.key] || false}
                      onChange={(e) => handleToggle('mobile', setting?.key, e?.target?.checked)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Project-Specific Overrides */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Project-Specific Settings</h3>
        <p className="text-muted-foreground mb-6">
          Override notification settings for specific projects. Disabled projects will not send any notifications.
        </p>
        <div className="space-y-4">
          {projects?.map((project) => (
            <div key={project?.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FolderOpen" size={16} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{project?.name}</h4>
                  <p className="text-sm text-muted-foreground capitalize">{project?.status}</p>
                </div>
              </div>
              <Checkbox
                label="Enable notifications"
                checked={settings?.projectOverrides?.[project?.id] !== false}
                onChange={(e) => handleProjectOverride(project?.id, e?.target?.checked)}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleSave}
          iconName="Save"
          iconPosition="left"
          iconSize={16}
        >
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
};

export default NotificationsTab;