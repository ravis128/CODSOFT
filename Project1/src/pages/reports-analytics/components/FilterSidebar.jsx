import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const FilterSidebar = ({ onFiltersChange, savedReports }) => {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'this-quarter', label: 'This Quarter' },
    { value: 'this-year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const projectOptions = [
    { value: 'project-1', label: 'Website Redesign' },
    { value: 'project-2', label: 'Mobile App Development' },
    { value: 'project-3', label: 'Marketing Campaign' },
    { value: 'project-4', label: 'Database Migration' },
    { value: 'project-5', label: 'API Integration' }
  ];

  const teamMemberOptions = [
    { value: 'member-1', label: 'John Doe' },
    { value: 'member-2', label: 'Sarah Wilson' },
    { value: 'member-3', label: 'Mike Johnson' },
    { value: 'member-4', label: 'Emily Davis' },
    { value: 'member-5', label: 'Alex Chen' }
  ];

  const handleApplyFilters = () => {
    const filters = {
      dateRange,
      customStartDate,
      customEndDate,
      selectedProjects,
      selectedTeamMembers
    };
    onFiltersChange(filters);
  };

  const handleResetFilters = () => {
    setDateRange('last-30-days');
    setSelectedProjects([]);
    setSelectedTeamMembers([]);
    setCustomStartDate('');
    setCustomEndDate('');
    onFiltersChange({
      dateRange: 'last-30-days',
      customStartDate: '',
      customEndDate: '',
      selectedProjects: [],
      selectedTeamMembers: []
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleResetFilters}>
          <Icon name="RotateCcw" size={16} />
          Reset
        </Button>
      </div>
      {/* Date Range Filter */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Date Range</label>
        <Select
          options={dateRangeOptions}
          value={dateRange}
          onChange={setDateRange}
          placeholder="Select date range"
        />
        
        {dateRange === 'custom' && (
          <div className="grid grid-cols-1 gap-3">
            <Input
              type="date"
              label="Start Date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e?.target?.value)}
            />
            <Input
              type="date"
              label="End Date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e?.target?.value)}
            />
          </div>
        )}
      </div>
      {/* Project Filter */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Projects</label>
        <Select
          options={projectOptions}
          value={selectedProjects}
          onChange={setSelectedProjects}
          placeholder="Select projects"
          multiple
          searchable
        />
      </div>
      {/* Team Members Filter */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Team Members</label>
        <Select
          options={teamMemberOptions}
          value={selectedTeamMembers}
          onChange={setSelectedTeamMembers}
          placeholder="Select team members"
          multiple
          searchable
        />
      </div>
      {/* Saved Reports */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Saved Reports</label>
        <div className="space-y-2">
          {savedReports?.map((report) => (
            <div
              key={report?.id}
              className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <Icon name="FileText" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{report?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Created {report?.createdDate}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="Play" size={14} />
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Apply Filters Button */}
      <Button onClick={handleApplyFilters} className="w-full">
        <Icon name="Filter" size={16} />
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;