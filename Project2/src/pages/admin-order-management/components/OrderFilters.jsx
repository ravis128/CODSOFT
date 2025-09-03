import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const OrderFilters = ({ 
  activeFilter, 
  onFilterChange, 
  searchTerm, 
  onSearchChange, 
  dateRange, 
  onDateRangeChange,
  onBulkAction,
  selectedOrders,
  orderCounts 
}) => {
  const filterTabs = [
    { key: 'all', label: 'All Orders', count: orderCounts?.all },
    { key: 'pending', label: 'Pending', count: orderCounts?.pending },
    { key: 'processing', label: 'Processing', count: orderCounts?.processing },
    { key: 'shipped', label: 'Shipped', count: orderCounts?.shipped },
    { key: 'delivered', label: 'Delivered', count: orderCounts?.delivered },
    { key: 'cancelled', label: 'Cancelled', count: orderCounts?.cancelled }
  ];

  const bulkActions = [
    { value: 'update-status', label: 'Update Status' },
    { value: 'generate-labels', label: 'Generate Shipping Labels' },
    { value: 'export-orders', label: 'Export Orders' },
    { value: 'send-notifications', label: 'Send Notifications' }
  ];

  const handleBulkActionSelect = (action) => {
    if (onBulkAction) {
      onBulkAction(action, selectedOrders);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterTabs?.map((tab) => (
          <button
            key={tab?.key}
            onClick={() => onFilterChange(tab?.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              activeFilter === tab?.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            <span>{tab?.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeFilter === tab?.key
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-background text-foreground'
            }`}>
              {tab?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Search and Actions */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search by order number, customer name..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Date Range */}
          <div className="flex gap-2">
            <Input
              type="date"
              value={dateRange?.start}
              onChange={(e) => onDateRangeChange({ ...dateRange, start: e?.target?.value })}
              className="w-40"
            />
            <Input
              type="date"
              value={dateRange?.end}
              onChange={(e) => onDateRangeChange({ ...dateRange, end: e?.target?.value })}
              className="w-40"
            />
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="flex gap-2">
          {selectedOrders?.length > 0 && (
            <Select
              placeholder="Bulk Actions"
              options={bulkActions}
              value=""
              onChange={handleBulkActionSelect}
              className="w-48"
            />
          )}
          
          <Button variant="outline" iconName="Download">
            Export
          </Button>
          
          <Button variant="outline" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
      {/* Selected Orders Info */}
      {selectedOrders?.length > 0 && (
        <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-accent-foreground">
              {selectedOrders?.length} order{selectedOrders?.length !== 1 ? 's' : ''} selected
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFilterChange(activeFilter)}
              iconName="X"
            >
              Clear Selection
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFilters;