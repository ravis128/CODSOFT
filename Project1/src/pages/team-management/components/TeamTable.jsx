import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const TeamTable = ({ members, selectedMembers, onSelectMember, onSelectAll, onSort, sortConfig, onEdit, onDeactivate, onMessage, onReassign }) => {
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-error text-error-foreground';
      case 'Project Manager':
        return 'bg-primary text-primary-foreground';
      case 'Team Lead':
        return 'bg-accent text-accent-foreground';
      case 'Developer':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatLastActive = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date)?.toLocaleDateString();
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const handleActionClick = (memberId, action, member) => {
    setActionMenuOpen(null);
    switch (action) {
      case 'edit':
        onEdit(member);
        break;
      case 'reassign':
        onReassign(member);
        break;
      case 'message':
        onMessage(member);
        break;
      case 'deactivate':
        onDeactivate(member);
        break;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={selectedMembers?.length === members?.length}
                  onChange={onSelectAll}
                  indeterminate={selectedMembers?.length > 0 && selectedMembers?.length < members?.length}
                />
              </th>
              <th className="text-left px-4 py-3">
                <Button
                  variant="ghost"
                  onClick={() => onSort('name')}
                  iconName={getSortIcon('name')}
                  iconPosition="right"
                  iconSize={14}
                  className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground"
                >
                  Member
                </Button>
              </th>
              <th className="text-left px-4 py-3">
                <Button
                  variant="ghost"
                  onClick={() => onSort('role')}
                  iconName={getSortIcon('role')}
                  iconPosition="right"
                  iconSize={14}
                  className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground"
                >
                  Role
                </Button>
              </th>
              <th className="text-left px-4 py-3">
                <Button
                  variant="ghost"
                  onClick={() => onSort('projectsAssigned')}
                  iconName={getSortIcon('projectsAssigned')}
                  iconPosition="right"
                  iconSize={14}
                  className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground"
                >
                  Projects
                </Button>
              </th>
              <th className="text-left px-4 py-3">
                <Button
                  variant="ghost"
                  onClick={() => onSort('lastActive')}
                  iconName={getSortIcon('lastActive')}
                  iconPosition="right"
                  iconSize={14}
                  className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground"
                >
                  Last Active
                </Button>
              </th>
              <th className="text-left px-4 py-3">
                <Button
                  variant="ghost"
                  onClick={() => onSort('status')}
                  iconName={getSortIcon('status')}
                  iconPosition="right"
                  iconSize={14}
                  className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground"
                >
                  Status
                </Button>
              </th>
              <th className="w-12 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {members?.map((member) => (
              <tr key={member?.id} className="border-b border-border hover:bg-muted/30 transition-colors duration-200">
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedMembers?.includes(member?.id)}
                    onChange={() => onSelectMember(member?.id)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image
                        src={member?.avatar}
                        alt={member?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                        member?.status === 'active' ? 'bg-success' : 'bg-muted'
                      }`} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">{member?.name}</p>
                      <p className="text-sm text-muted-foreground truncate" title={member?.email}>{member?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getRoleColor(member?.role)}`}>
                    {member?.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-foreground">{member?.projectsAssigned}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">{formatLastActive(member?.lastActive)}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(member?.status)}`}>
                    {member?.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setActionMenuOpen(actionMenuOpen === member?.id ? null : member?.id)}
                    >
                      <Icon name="MoreVertical" size={16} />
                    </Button>
                    
                    {actionMenuOpen === member?.id && (
                      <div className="dropdown-overlay absolute right-0 top-8 w-48 bg-popover border border-border rounded-md shadow-elevation-3">
                        <div className="p-1">
                          <Button
                            variant="ghost"
                            onClick={() => handleActionClick(member?.id, 'edit', member)}
                            iconName="Edit"
                            iconPosition="left"
                            iconSize={14}
                            className="w-full justify-start text-sm"
                          >
                            Edit Permissions
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => handleActionClick(member?.id, 'reassign', member)}
                            iconName="RefreshCw"
                            iconPosition="left"
                            iconSize={14}
                            className="w-full justify-start text-sm"
                          >
                            Reassign Projects
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => handleActionClick(member?.id, 'message', member)}
                            iconName="MessageSquare"
                            iconPosition="left"
                            iconSize={14}
                            className="w-full justify-start text-sm"
                          >
                            Send Message
                          </Button>
                          <div className="border-t border-border my-1" />
                          <Button
                            variant="ghost"
                            onClick={() => handleActionClick(member?.id, 'deactivate', member)}
                            iconName="UserX"
                            iconPosition="left"
                            iconSize={14}
                            className="w-full justify-start text-sm text-error hover:text-error"
                          >
                            Deactivate Account
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamTable;