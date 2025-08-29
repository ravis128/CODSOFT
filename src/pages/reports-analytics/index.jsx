import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import KPICard from './components/KPICard';
import FilterSidebar from './components/FilterSidebar';
import ChartWidget from './components/ChartWidget';
import DataTable from './components/DataTable';
import DashboardToolbar from './components/DashboardToolbar';
import GanttChart from './components/GanttChart';

const ReportsAnalytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [dashboardWidgets, setDashboardWidgets] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: 'last-30-days',
    selectedProjects: [],
    selectedTeamMembers: []
  });

  // Mock data for KPI cards
  const kpiData = [
    {
      title: "Project Completion Rate",
      value: "87.5%",
      change: "+5.2%",
      changeType: "positive",
      icon: "Target",
      trend: 87.5
    },
    {
      title: "Team Productivity",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: "TrendingUp",
      trend: 94.2
    },
    {
      title: "Budget Utilization",
      value: "73.8%",
      change: "-1.5%",
      changeType: "negative",
      icon: "DollarSign",
      trend: 73.8
    },
    {
      title: "Deadline Adherence",
      value: "91.3%",
      change: "+3.7%",
      changeType: "positive",
      icon: "Clock",
      trend: 91.3
    }
  ];

  // Mock data for charts
  const chartData = {
    projectProgress: [
      { name: 'Jan', value: 65 },
      { name: 'Feb', value: 72 },
      { name: 'Mar', value: 78 },
      { name: 'Apr', value: 85 },
      { name: 'May', value: 91 },
      { name: 'Jun', value: 87 }
    ],
    taskCompletion: [
      { name: 'Completed', value: 245 },
      { name: 'In Progress', value: 89 },
      { name: 'Pending', value: 34 },
      { name: 'Overdue', value: 12 }
    ],
    teamPerformance: [
      { name: 'Week 1', value: 85 },
      { name: 'Week 2', value: 92 },
      { name: 'Week 3', value: 78 },
      { name: 'Week 4', value: 96 }
    ]
  };

  // Mock data for projects (Gantt chart)
  const projectsData = [
    {
      id: 1,
      name: "Website Redesign",
      startDate: new Date('2024-01-15')?.getTime(),
      endDate: new Date('2024-03-30')?.getTime(),
      status: "in-progress"
    },
    {
      id: 2,
      name: "Mobile App Development",
      startDate: new Date('2024-02-01')?.getTime(),
      endDate: new Date('2024-05-15')?.getTime(),
      status: "in-progress"
    },
    {
      id: 3,
      name: "Marketing Campaign",
      startDate: new Date('2024-01-01')?.getTime(),
      endDate: new Date('2024-02-28')?.getTime(),
      status: "completed"
    },
    {
      id: 4,
      name: "Database Migration",
      startDate: new Date('2024-03-01')?.getTime(),
      endDate: new Date('2024-04-30')?.getTime(),
      status: "delayed"
    }
  ];

  // Mock data for data table
  const tableData = [
    {
      project: "Website Redesign",
      assignee: "John Doe",
      status: "In Progress",
      progress: "75%",
      deadline: "2024-03-30",
      priority: "High"
    },
    {
      project: "Mobile App Development",
      assignee: "Sarah Wilson",
      status: "In Progress",
      progress: "45%",
      deadline: "2024-05-15",
      priority: "Medium"
    },
    {
      project: "Marketing Campaign",
      assignee: "Mike Johnson",
      status: "Completed",
      progress: "100%",
      deadline: "2024-02-28",
      priority: "High"
    },
    {
      project: "Database Migration",
      assignee: "Emily Davis",
      status: "Delayed",
      progress: "30%",
      deadline: "2024-04-30",
      priority: "Critical"
    }
  ];

  const tableColumns = [
    { key: 'project', label: 'Project' },
    { key: 'assignee', label: 'Assignee' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Completed' ? 'bg-success/10 text-success' :
          value === 'In Progress' ? 'bg-primary/10 text-primary' :
          value === 'Delayed'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'progress', label: 'Progress' },
    { key: 'deadline', label: 'Deadline' },
    { 
      key: 'priority', 
      label: 'Priority',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Critical' ? 'bg-error/10 text-error' :
          value === 'High' ? 'bg-warning/10 text-warning' :
          value === 'Medium'? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
        }`}>
          {value}
        </span>
      )
    }
  ];

  // Mock saved reports
  const savedReports = [
    {
      id: 1,
      name: "Monthly Performance Report",
      createdDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Team Productivity Analysis",
      createdDate: "2024-01-10"
    },
    {
      id: 3,
      name: "Project Status Overview",
      createdDate: "2024-01-05"
    }
  ];

  // Initialize default widgets
  useEffect(() => {
    setDashboardWidgets([
      {
        id: 1,
        type: 'bar',
        title: 'Project Progress Trends',
        data: chartData?.projectProgress,
        className: 'col-span-12 lg:col-span-6'
      },
      {
        id: 2,
        type: 'pie',
        title: 'Task Distribution',
        data: chartData?.taskCompletion,
        className: 'col-span-12 lg:col-span-6'
      },
      {
        id: 3,
        type: 'line',
        title: 'Team Performance',
        data: chartData?.teamPerformance,
        className: 'col-span-12'
      }
    ]);
  }, []);

  const handleMenuToggle = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to data here
    console.log('Filters applied:', newFilters);
  };

  const handleAddWidget = (widgetType) => {
    const newWidget = {
      id: Date.now(),
      type: widgetType?.includes('chart') ? widgetType?.split('-')?.[0] : 'bar',
      title: `New ${widgetType?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}`,
      data: chartData?.projectProgress,
      className: 'col-span-12 lg:col-span-6'
    };
    setDashboardWidgets(prev => [...prev, newWidget]);
  };

  const handleRemoveWidget = (widgetId) => {
    setDashboardWidgets(prev => prev?.filter(widget => widget?.id !== widgetId));
  };

  const handleEditWidget = (widgetId) => {
    console.log('Edit widget:', widgetId);
  };

  const handleExport = (format) => {
    console.log('Exporting dashboard as:', format);
  };

  const handleSaveDashboard = () => {
    console.log('Saving dashboard configuration');
  };

  const handleShareDashboard = () => {
    console.log('Sharing dashboard');
  };

  const handleRefreshData = () => {
    console.log('Refreshing dashboard data');
  };

  const handleProjectClick = (project) => {
    console.log('Project clicked:', project);
  };

  const handleTableExport = () => {
    console.log('Exporting table data');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleMenuToggle} notificationCount={3} />
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />
      <main className={`transition-all duration-300 ease-in-out pt-16 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      }`}>
        <div className="p-6">
          <Breadcrumb />
          
          <div className="grid grid-cols-12 gap-6">
            {/* Filter Sidebar */}
            <div className="col-span-12 lg:col-span-3">
              <FilterSidebar 
                onFiltersChange={handleFiltersChange}
                savedReports={savedReports}
              />
            </div>

            {/* Main Dashboard Area */}
            <div className="col-span-12 lg:col-span-9 space-y-6">
              {/* Dashboard Toolbar */}
              <DashboardToolbar
                onAddWidget={handleAddWidget}
                onExport={handleExport}
                onSave={handleSaveDashboard}
                onShare={handleShareDashboard}
                onRefresh={handleRefreshData}
              />

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData?.map((kpi, index) => (
                  <KPICard
                    key={index}
                    title={kpi?.title}
                    value={kpi?.value}
                    change={kpi?.change}
                    changeType={kpi?.changeType}
                    icon={kpi?.icon}
                    trend={kpi?.trend}
                  />
                ))}
              </div>

              {/* Chart Widgets Grid */}
              <div className="grid grid-cols-12 gap-6">
                {dashboardWidgets?.map((widget) => (
                  <ChartWidget
                    key={widget?.id}
                    title={widget?.title}
                    type={widget?.type}
                    data={widget?.data}
                    onRemove={() => handleRemoveWidget(widget?.id)}
                    onEdit={() => handleEditWidget(widget?.id)}
                    className={widget?.className}
                  />
                ))}
              </div>

              {/* Gantt Chart */}
              <GanttChart
                projects={projectsData}
                onProjectClick={handleProjectClick}
              />

              {/* Data Table */}
              <DataTable
                title="Project Details"
                data={tableData}
                columns={tableColumns}
                onExport={handleTableExport}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsAnalytics;