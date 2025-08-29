import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TeamMemberCard = ({ member, onEdit, onDeactivate, onMessage, onReassign }) => {
  const [showActions, setShowActions] = useState(false);

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

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-shadow duration-200 overflow-hidden">
      <div className="flex items-start justify-between mb-3 gap-3">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            <Image
              src={member?.avatar}
              alt={member?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
              member?.status === 'active' ? 'bg-success' : 'bg-muted'
            }`} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground truncate">{member?.name}</h3>
            <p className="text-sm text-muted-foreground truncate" title={member?.email}>{member?.email}</p>
          </div>
        </div>
        
        <div className="relative flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowActions(!showActions)}
          >
            <Icon name="MoreVertical" size={16} />
          </Button>
          
          {showActions && (
            <div className="dropdown-overlay absolute right-0 top-8 w-48 bg-popover border border-border rounded-md shadow-elevation-3">
              <div className="p-1">
                <Button
                  variant="ghost"
                  onClick={() => {
                    onEdit(member);
                    setShowActions(false);
                  }}
                  iconName="Edit"
                  iconPosition="left"
                  iconSize={14}
                  className="w-full justify-start text-sm"
                >
                  Edit Permissions
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    onReassign(member);
                    setShowActions(false);
                  }}
                  iconName="RefreshCw"
                  iconPosition="left"
                  iconSize={14}
                  className="w-full justify-start text-sm"
                >
                  Reassign Projects
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    onMessage(member);
                    setShowActions(false);
                  }}
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
                  onClick={() => {
                    onDeactivate(member);
                    setShowActions(false);
                  }}
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
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Role</span>
          <span className={`text-xs px-2 py-1 rounded-full ${getRoleColor(member?.role)}`}>
            {member?.role}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Projects</span>
          <span className="text-sm font-medium text-foreground">{member?.projectsAssigned}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(member?.status)}`}>
            {member?.status}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Last Active</span>
          <span className="text-sm text-foreground">{formatLastActive(member?.lastActive)}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;