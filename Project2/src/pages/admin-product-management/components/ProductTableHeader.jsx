import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductTableHeader = ({ 
  selectedCount, 
  onBulkAction, 
  onAddProduct, 
  searchQuery, 
  onSearchChange,
  onToggleFilters,
  showFilters 
}) => {
  const bulkActions = [
    { value: 'delete', label: 'Delete Selected', icon: 'Trash2' },
    { value: 'activate', label: 'Activate Selected', icon: 'Eye' },
    { value: 'deactivate', label: 'Deactivate Selected', icon: 'EyeOff' },
    { value: 'export', label: 'Export Selected', icon: 'Download' }
  ];

  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title and Bulk Actions */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-foreground">Product Management</h1>
          {selectedCount > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedCount} selected
              </span>
              <select
                onChange={(e) => onBulkAction(e?.target?.value)}
                className="text-sm border border-border rounded-md px-3 py-1 bg-background text-foreground"
                defaultValue=""
              >
                <option value="" disabled>Bulk Actions</option>
                {bulkActions?.map(action => (
                  <option key={action?.value} value={action?.value}>
                    {action?.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:w-80">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search products by name, SKU, or category..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onToggleFilters}
              iconName={showFilters ? "X" : "Filter"}
              iconPosition="left"
            >
              {showFilters ? "Hide Filters" : "Filters"}
            </Button>
            
            <Button
              variant="default"
              onClick={onAddProduct}
              iconName="Plus"
              iconPosition="left"
            >
              Add Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTableHeader;