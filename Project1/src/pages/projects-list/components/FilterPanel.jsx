import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFilterChange, onClearFilters, isCollapsed, onToggleCollapse }) => {
  const [expandedSections, setExpandedSections] = useState({
    status: true,
    priority: true,
    team: true,
    dates: true,
    templates: false
  });

  const statusOptions = [
    { value: 'active', label: 'Active', count: 12 },
    { value: 'completed', label: 'Completed', count: 8 },
    { value: 'on-hold', label: 'On Hold', count: 3 },
    { value: 'cancelled', label: 'Cancelled', count: 2 }
  ];

  const priorityOptions = [
    { value: 'high', label: 'High Priority', count: 5 },
    { value: 'medium', label: 'Medium Priority', count: 12 },
    { value: 'low', label: 'Low Priority', count: 8 }
  ];

  const teamMembers = [
    { id: 1, name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', count: 6 },
    { id: 2, name: 'Mike Chen', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', count: 4 },
    { id: 3, name: 'Emily Davis', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', count: 8 },
    { id: 4, name: 'Alex Rodriguez', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', count: 3 }
  ];

  const projectTemplates = [
    { value: 'web-development', label: 'Web Development', count: 5 },
    { value: 'mobile-app', label: 'Mobile App', count: 3 },
    { value: 'marketing-campaign', label: 'Marketing Campaign', count: 4 },
    { value: 'product-launch', label: 'Product Launch', count: 2 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleStatusChange = (status) => {
    const newStatuses = filters?.status?.includes(status)
      ? filters?.status?.filter(s => s !== status)
      : [...filters?.status, status];
    onFilterChange({ ...filters, status: newStatuses });
  };

  const handlePriorityChange = (priority) => {
    const newPriorities = filters?.priority?.includes(priority)
      ? filters?.priority?.filter(p => p !== priority)
      : [...filters?.priority, priority];
    onFilterChange({ ...filters, priority: newPriorities });
  };

  const handleTeamMemberChange = (memberId) => {
    const newTeamMembers = filters?.teamMembers?.includes(memberId)
      ? filters?.teamMembers?.filter(id => id !== memberId)
      : [...filters?.teamMembers, memberId];
    onFilterChange({ ...filters, teamMembers: newTeamMembers });
  };

  const handleTemplateChange = (template) => {
    const newTemplates = filters?.templates?.includes(template)
      ? filters?.templates?.filter(t => t !== template)
      : [...filters?.templates, template];
    onFilterChange({ ...filters, templates: newTemplates });
  };

  const getActiveFiltersCount = () => {
    return filters?.status?.length + filters?.priority?.length + filters?.teamMembers?.length + filters?.templates?.length +
           (filters?.startDate ? 1 : 0) + (filters?.endDate ? 1 : 0);
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-card border-r border-border p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="w-full"
        >
          <Icon name="Filter" size={20} />
        </Button>
        {getActiveFiltersCount() > 0 && (
          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium mt-2 mx-auto">
            {getActiveFiltersCount()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-r border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <div className="flex items-center space-x-2">
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="h-8 w-8"
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
          </div>
        </div>
        {getActiveFiltersCount() > 0 && (
          <div className="mt-2">
            <span className="text-sm text-muted-foreground">
              {getActiveFiltersCount()} filter{getActiveFiltersCount() !== 1 ? 's' : ''} applied
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Status Filter */}
        <div>
          <Button
            variant="ghost"
            onClick={() => toggleSection('status')}
            className="w-full justify-between p-0 h-auto font-medium text-foreground"
          >
            <span>Status</span>
            <Icon
              name="ChevronDown"
              size={16}
              className={`transition-transform duration-200 ${expandedSections?.status ? 'rotate-180' : ''}`}
            />
          </Button>
          {expandedSections?.status && (
            <div className="mt-3 space-y-2">
              {statusOptions?.map((option) => (
                <div key={option?.value} className="flex items-center justify-between">
                  <Checkbox
                    label={option?.label}
                    checked={filters?.status?.includes(option?.value)}
                    onChange={() => handleStatusChange(option?.value)}
                  />
                  <span className="text-sm text-muted-foreground">{option?.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Priority Filter */}
        <div>
          <Button
            variant="ghost"
            onClick={() => toggleSection('priority')}
            className="w-full justify-between p-0 h-auto font-medium text-foreground"
          >
            <span>Priority</span>
            <Icon
              name="ChevronDown"
              size={16}
              className={`transition-transform duration-200 ${expandedSections?.priority ? 'rotate-180' : ''}`}
            />
          </Button>
          {expandedSections?.priority && (
            <div className="mt-3 space-y-2">
              {priorityOptions?.map((option) => (
                <div key={option?.value} className="flex items-center justify-between">
                  <Checkbox
                    label={option?.label}
                    checked={filters?.priority?.includes(option?.value)}
                    onChange={() => handlePriorityChange(option?.value)}
                  />
                  <span className="text-sm text-muted-foreground">{option?.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Team Members Filter */}
        <div>
          <Button
            variant="ghost"
            onClick={() => toggleSection('team')}
            className="w-full justify-between p-0 h-auto font-medium text-foreground"
          >
            <span>Team Members</span>
            <Icon
              name="ChevronDown"
              size={16}
              className={`transition-transform duration-200 ${expandedSections?.team ? 'rotate-180' : ''}`}
            />
          </Button>
          {expandedSections?.team && (
            <div className="mt-3 space-y-2">
              {teamMembers?.map((member) => (
                <div key={member?.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={filters?.teamMembers?.includes(member?.id)}
                      onChange={() => handleTeamMemberChange(member?.id)}
                    />
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <img
                        src={member?.avatar}
                        alt={member?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-foreground">{member?.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{member?.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date Range Filter */}
        <div>
          <Button
            variant="ghost"
            onClick={() => toggleSection('dates')}
            className="w-full justify-between p-0 h-auto font-medium text-foreground"
          >
            <span>Date Range</span>
            <Icon
              name="ChevronDown"
              size={16}
              className={`transition-transform duration-200 ${expandedSections?.dates ? 'rotate-180' : ''}`}
            />
          </Button>
          {expandedSections?.dates && (
            <div className="mt-3 space-y-3">
              <Input
                type="date"
                label="Start Date"
                value={filters?.startDate}
                onChange={(e) => onFilterChange({ ...filters, startDate: e?.target?.value })}
              />
              <Input
                type="date"
                label="End Date"
                value={filters?.endDate}
                onChange={(e) => onFilterChange({ ...filters, endDate: e?.target?.value })}
              />
            </div>
          )}
        </div>

        {/* Project Templates Filter */}
        <div>
          <Button
            variant="ghost"
            onClick={() => toggleSection('templates')}
            className="w-full justify-between p-0 h-auto font-medium text-foreground"
          >
            <span>Templates</span>
            <Icon
              name="ChevronDown"
              size={16}
              className={`transition-transform duration-200 ${expandedSections?.templates ? 'rotate-180' : ''}`}
            />
          </Button>
          {expandedSections?.templates && (
            <div className="mt-3 space-y-2">
              {projectTemplates?.map((template) => (
                <div key={template?.value} className="flex items-center justify-between">
                  <Checkbox
                    label={template?.label}
                    checked={filters?.templates?.includes(template?.value)}
                    onChange={() => handleTemplateChange(template?.value)}
                  />
                  <span className="text-sm text-muted-foreground">{template?.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;