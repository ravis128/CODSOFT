import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RoleManagement = ({ roles, onCreateRole, onUpdateRole, onDeleteRole }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: []
  });

  const availablePermissions = [
    { id: 'project_create', label: 'Create Projects', category: 'Projects' },
    { id: 'project_edit', label: 'Edit Projects', category: 'Projects' },
    { id: 'project_delete', label: 'Delete Projects', category: 'Projects' },
    { id: 'project_view', label: 'View Projects', category: 'Projects' },
    { id: 'task_create', label: 'Create Tasks', category: 'Tasks' },
    { id: 'task_edit', label: 'Edit Tasks', category: 'Tasks' },
    { id: 'task_delete', label: 'Delete Tasks', category: 'Tasks' },
    { id: 'task_assign', label: 'Assign Tasks', category: 'Tasks' },
    { id: 'team_invite', label: 'Invite Members', category: 'Team' },
    { id: 'team_manage', label: 'Manage Members', category: 'Team' },
    { id: 'team_remove', label: 'Remove Members', category: 'Team' },
    { id: 'reports_view', label: 'View Reports', category: 'Reports' },
    { id: 'reports_export', label: 'Export Reports', category: 'Reports' },
    { id: 'admin_settings', label: 'Admin Settings', category: 'Administration' },
    { id: 'admin_billing', label: 'Billing Management', category: 'Administration' }
  ];

  const permissionCategories = [...new Set(availablePermissions.map(p => p.category))];

  const handleFormSubmit = (e) => {
    e?.preventDefault();
    
    if (editingRole) {
      onUpdateRole(editingRole?.id, formData);
      setEditingRole(null);
    } else {
      onCreateRole(formData);
      setShowCreateForm(false);
    }
    
    setFormData({ name: '', description: '', permissions: [] });
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setFormData({
      name: role?.name,
      description: role?.description,
      permissions: role?.permissions
    });
    setShowCreateForm(true);
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setEditingRole(null);
    setFormData({ name: '', description: '', permissions: [] });
  };

  const handlePermissionToggle = (permissionId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev?.permissions?.includes(permissionId)
        ? prev?.permissions?.filter(id => id !== permissionId)
        : [...prev?.permissions, permissionId]
    }));
  };

  const getPermissionCount = (role) => {
    return role?.permissions?.length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Role Management</h3>
          <p className="text-sm text-muted-foreground">
            Create and manage custom roles with specific permissions
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Create Role
        </Button>
      </div>
      {/* Create/Edit Role Form */}
      {showCreateForm && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-medium text-foreground">
              {editingRole ? 'Edit Role' : 'Create New Role'}
            </h4>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Role Name"
                type="text"
                placeholder="e.g., Senior Developer"
                value={formData?.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e?.target?.value }))}
                required
              />
              <Input
                label="Description"
                type="text"
                placeholder="Brief description of the role"
                value={formData?.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e?.target?.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-4">
                Permissions
              </label>
              <div className="space-y-4">
                {permissionCategories?.map(category => (
                  <div key={category} className="border border-border rounded-lg p-4">
                    <h5 className="font-medium text-foreground mb-3">{category}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {availablePermissions?.filter(p => p?.category === category)?.map(permission => (
                          <Checkbox
                            key={permission?.id}
                            label={permission?.label}
                            checked={formData?.permissions?.includes(permission?.id)}
                            onChange={() => handlePermissionToggle(permission?.id)}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {editingRole ? 'Update Role' : 'Create Role'}
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Existing Roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles?.map((role) => (
          <div key={role?.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">{role?.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{role?.description}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(role)}
                >
                  <Icon name="Edit" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteRole(role?.id)}
                  className="text-error hover:text-error"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Permissions</span>
                <span className="font-medium text-foreground">{getPermissionCount(role)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Members</span>
                <span className="font-medium text-foreground">{role?.memberCount || 0}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <div className="flex flex-wrap gap-1">
                {role?.permissions?.slice(0, 3)?.map(permissionId => {
                  const permission = availablePermissions?.find(p => p?.id === permissionId);
                  return permission ? (
                    <span key={permissionId} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                      {permission?.label}
                    </span>
                  ) : null;
                })}
                {role?.permissions?.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{role?.permissions?.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleManagement;