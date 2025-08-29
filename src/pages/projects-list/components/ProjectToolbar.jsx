import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProjectToolbar = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortConfig,
  onSortChange,
  selectedProjects,
  onBulkAction,
  onNewProject,
  onExport
}) => {
  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'status-asc', label: 'Status (A-Z)' },
    { value: 'progress-desc', label: 'Progress (High-Low)' },
    { value: 'progress-asc', label: 'Progress (Low-High)' }
  ];

  const bulkActions = [
    { value: 'archive', label: 'Archive Selected', icon: 'Archive' },
    { value: 'delete', label: 'Delete Selected', icon: 'Trash2' },
    { value: 'export', label: 'Export Selected', icon: 'Download' },
    { value: 'duplicate', label: 'Duplicate Selected', icon: 'Copy' }
  ];

  const handleSortChange = (value) => {
    const [field, direction] = value?.split('-');
    onSortChange({ field, direction });
  };

  const getCurrentSortValue = () => {
    return `${sortConfig?.field}-${sortConfig?.direction}`;
  };

  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Search and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSearchChange(e.target.value);
                }
              }}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground focus:outline-none"
              onClick={() => onSearchChange(searchQuery)}
            >
              <Icon
                name="Search"
                size={18}
              />
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <Select
              options={sortOptions}
              value={getCurrentSortValue()}
              onChange={handleSortChange}
              placeholder="Sort by..."
              className="w-48"
            />

            {/* View Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('grid')}
                className="px-3"
              >
                <Icon name="Grid3X3" size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('list')}
                className="px-3"
              >
                <Icon name="List" size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          {/* Bulk Actions */}
          {selectedProjects?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedProjects?.length} selected
              </span>
              <Select
                options={bulkActions}
                placeholder="Bulk actions..."
                onChange={onBulkAction}
                className="w-40"
              />
            </div>
          )}

          {/* Export Button */}
          <Button
            variant="outline"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
            className="hidden sm:flex"
          >
            Export
          </Button>

          {/* New Project Button */}
          <Button
            variant="default"
            onClick={onNewProject}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            New Project
          </Button>
        </div>
      </div>
      {/* Mobile Actions Row */}
      <div className="flex sm:hidden items-center justify-between mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={onExport}
          iconName="Download"
          iconPosition="left"
          iconSize={16}
          size="sm"
        >
          Export
        </Button>

        {selectedProjects?.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {selectedProjects?.length} selected
            </span>
            <Button
              variant="outline"
              size="sm"
              iconName="MoreHorizontal"
              onClick={() => {/* Handle mobile bulk actions */}}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectToolbar;