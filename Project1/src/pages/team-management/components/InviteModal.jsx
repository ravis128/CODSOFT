import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const InviteModal = ({ isOpen, onClose, onInvite }) => {
  const [inviteData, setInviteData] = useState({
    emails: '',
    role: '',
    projects: [],
    message: ''
  });
  const [errors, setErrors] = useState({});

  const roleOptions = [
    { value: 'Developer', label: 'Developer' },
    { value: 'Team Lead', label: 'Team Lead' },
    { value: 'Project Manager', label: 'Project Manager' },
    { value: 'Admin', label: 'Admin' }
  ];

  const projectOptions = [
    { value: 'project-1', label: 'E-commerce Platform' },
    { value: 'project-2', label: 'Mobile App Development' },
    { value: 'project-3', label: 'Data Analytics Dashboard' },
    { value: 'project-4', label: 'Marketing Website' },
    { value: 'project-5', label: 'API Integration' }
  ];

  const handleInputChange = (field, value) => {
    setInviteData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!inviteData?.emails?.trim()) {
      newErrors.emails = 'Email addresses are required';
    } else {
      const emailList = inviteData?.emails?.split(',')?.map(email => email?.trim());
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const invalidEmails = emailList?.filter(email => !emailRegex?.test(email));
      
      if (invalidEmails?.length > 0) {
        newErrors.emails = 'Please enter valid email addresses';
      }
    }
    
    if (!inviteData?.role) {
      newErrors.role = 'Role selection is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      const emailList = inviteData?.emails?.split(',')?.map(email => email?.trim());
      onInvite({
        emails: emailList,
        role: inviteData?.role,
        projects: inviteData?.projects,
        message: inviteData?.message
      });
      
      // Reset form
      setInviteData({
        emails: '',
        role: '',
        projects: [],
        message: ''
      });
      setErrors({});
      onClose();
    }
  };

  const handleProjectToggle = (projectId) => {
    setInviteData(prev => ({
      ...prev,
      projects: prev?.projects?.includes(projectId)
        ? prev?.projects?.filter(id => id !== projectId)
        : [...prev?.projects, projectId]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1200 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Invite Team Members</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Send invitations to new team members and assign their roles
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <Input
              label="Email Addresses"
              type="email"
              placeholder="john@example.com, jane@example.com"
              description="Enter multiple email addresses separated by commas"
              value={inviteData?.emails}
              onChange={(e) => handleInputChange('emails', e?.target?.value)}
              error={errors?.emails}
              required
            />
          </div>

          <div>
            <Select
              label="Role"
              placeholder="Select a role"
              options={roleOptions}
              value={inviteData?.role}
              onChange={(value) => handleInputChange('role', value)}
              error={errors?.role}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Project Access (Optional)
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto border border-border rounded-md p-3">
              {projectOptions?.map((project) => (
                <Checkbox
                  key={project?.value}
                  label={project?.label}
                  checked={inviteData?.projects?.includes(project?.value)}
                  onChange={() => handleProjectToggle(project?.value)}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Select projects the new members should have access to
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Welcome Message (Optional)
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              rows={4}
              placeholder="Welcome to our team! We're excited to have you on board..."
              value={inviteData?.message}
              onChange={(e) => handleInputChange('message', e?.target?.value)}
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" iconName="Send" iconPosition="left">
              Send Invitations
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteModal;