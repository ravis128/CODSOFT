import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingInvites = ({ invites, onResend, onCancel }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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

  if (invites?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center">
          <Icon name="Mail" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Pending Invites</h3>
          <p className="text-muted-foreground">
            All team invitations have been accepted or cancelled
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Pending Invitations</h3>
          <span className="text-sm text-muted-foreground">{invites?.length} pending</span>
        </div>
      </div>
      <div className="divide-y divide-border">
        {invites?.map((invite) => (
          <div key={invite?.id} className="p-4 hover:bg-muted/30 transition-colors duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Icon name="Mail" size={16} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{invite?.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${getRoleColor(invite?.role)}`}>
                        {invite?.role}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Sent {formatDate(invite?.sentAt)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {invite?.projects && invite?.projects?.length > 0 && (
                  <div className="ml-11">
                    <p className="text-sm text-muted-foreground mb-1">Project Access:</p>
                    <div className="flex flex-wrap gap-1">
                      {invite?.projects?.slice(0, 3)?.map((project, index) => (
                        <span key={index} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                          {project}
                        </span>
                      ))}
                      {invite?.projects?.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{invite?.projects?.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onResend(invite)}
                  iconName="RefreshCw"
                  iconPosition="left"
                  iconSize={14}
                >
                  Resend
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onCancel(invite)}
                  iconName="X"
                  iconPosition="left"
                  iconSize={14}
                  className="text-error hover:text-error"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingInvites;