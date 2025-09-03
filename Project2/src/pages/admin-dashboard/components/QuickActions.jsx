import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Add New Product',
      description: 'Create and list a new product',
      icon: 'Plus',
      variant: 'default',
      onClick: () => navigate('/admin-product-management')
    },
    {
      title: 'Process Orders',
      description: 'Review and fulfill pending orders',
      icon: 'Package',
      variant: 'outline',
      onClick: () => navigate('/admin-order-management')
    },
    {
      title: 'View Reports',
      description: 'Access detailed analytics',
      icon: 'BarChart3',
      variant: 'outline',
      onClick: () => console.log('View Reports clicked')
    },
    {
      title: 'Manage Inventory',
      description: 'Update stock levels',
      icon: 'Archive',
      variant: 'outline',
      onClick: () => navigate('/admin-product-management')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <p className="text-sm text-muted-foreground">Common administrative tasks</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action, index) => (
          <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName={action?.icon}
                  onClick={action?.onClick}
                  className="w-8 h-8 text-primary hover:bg-transparent"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground mb-1">{action?.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">{action?.description}</p>
                <Button
                  variant={action?.variant}
                  size="sm"
                  onClick={action?.onClick}
                  className="w-full"
                >
                  {action?.title}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;