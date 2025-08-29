import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const DashboardToolbar = ({ onAddWidget, onExport, onSave, onShare, onRefresh }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isCustomizing, setIsCustomizing] = useState(false);

  const exportOptions = [
    { value: 'pdf', label: 'PDF Report' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV Data' },
    { value: 'png', label: 'PNG Image' }
  ];

  const widgetTypes = [
    { value: 'bar-chart', label: 'Bar Chart', icon: 'BarChart3' },
    { value: 'line-chart', label: 'Line Chart', icon: 'TrendingUp' },
    { value: 'pie-chart', label: 'Pie Chart', icon: 'PieChart' },
    { value: 'area-chart', label: 'Area Chart', icon: 'Activity' },
    { value: 'data-table', label: 'Data Table', icon: 'Table' },
    { value: 'kpi-card', label: 'KPI Card', icon: 'Target' }
  ];

  const handleExport = () => {
    onExport(exportFormat);
  };

  const handleAddWidget = (widgetType) => {
    onAddWidget(widgetType);
    setIsCustomizing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 gap-4">
        {/* Left Section - Dashboard Controls */}
        <div className="flex items-center space-x-4 min-w-0 flex-1">
          <h2 className="text-xl font-semibold text-foreground truncate">Analytics Dashboard</h2>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button
              variant={isCustomizing ? "default" : "outline"}
              onClick={() => setIsCustomizing(!isCustomizing)}
              className="flex-shrink-0"
            >
              <Icon name="Layout" size={16} />
              Customize
            </Button>
            
            <Button variant="outline" onClick={onRefresh} className="flex-shrink-0">
              <Icon name="RefreshCw" size={16} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Right Section - Export and Actions */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Select
              options={exportOptions}
              value={exportFormat}
              onChange={setExportFormat}
              className="w-40"
            />
            <Button variant="outline" onClick={handleExport} className="flex-shrink-0">
              <Icon name="Download" size={16} />
              Export
            </Button>
          </div>
          
          <Button variant="outline" onClick={onShare} className="flex-shrink-0">
            <Icon name="Share2" size={16} />
            Share
          </Button>
          
          <Button onClick={onSave} className="flex-shrink-0">
            <Icon name="Save" size={16} />
            Save Dashboard
          </Button>
        </div>
      </div>
      
      {/* Widget Addition Panel */}
      {isCustomizing && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <span className="text-sm font-medium text-foreground flex-shrink-0">Add Widget:</span>
            <div className="flex items-center space-x-2 flex-wrap">
              {widgetTypes?.map((widget) => (
                <Button
                  key={widget?.value}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAddWidget(widget?.value)}
                  className="flex items-center space-x-2 flex-shrink-0"
                >
                  <Icon name={widget?.icon} size={16} />
                  <span>{widget?.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Dashboard Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0 gap-4">
          <div className="flex items-center space-x-6 flex-wrap min-w-0">
            <span className="text-sm text-muted-foreground flex-shrink-0">Last updated: {new Date()?.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground flex-shrink-0">Data range: Last 30 days</span>
            <span className="text-sm text-muted-foreground flex-shrink-0">Auto-refresh: Every 5 minutes</span>
          </div>
          
          <div className="flex items-center space-x-4 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-muted-foreground">Live data</span>
            </div>
            <Button variant="ghost" size="sm" className="flex-shrink-0">
              <Icon name="Settings" size={14} />
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardToolbar;