import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MobileNavigation from '../../components/ui/MobileNavigation';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProjectInfoCard from './components/ProjectInfoCard';
import TaskFilters from './components/TaskFilters';
import TaskToolbar from './components/TaskToolbar';
import KanbanBoard from './components/KanbanBoard';
import TimelineView from './components/TimelineView';
import ProjectTabs from './components/ProjectTabs';

const ProjectDetail = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');
  const [viewMode, setViewMode] = useState('board');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    assignee: 'all'
  });

  // Mock project data
  const projectData = {
    id: 'proj-001',
    name: 'E-commerce Platform Redesign',
    description: `Complete redesign of the e-commerce platform with modern UI/UX, improved performance, and mobile-first approach. This project includes user research, design system creation, frontend development, and comprehensive testing phases.`,
    status: 'active',
    priority: 'high',
    startDate: '01/15/2025',
    dueDate: '04/30/2025',
    progress: 68,
    completedTasks: 16,
    totalTasks: 24,
    teamMembers: [
      {
        id: 1,
        name: 'Sarah Wilson',
        role: 'Project Manager',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        isOnline: true
      },
      {
        id: 2,
        name: 'Mike Johnson',
        role: 'Lead Developer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        isOnline: true
      },
      {
        id: 3,
        name: 'Emily Chen',
        role: 'UI/UX Designer',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        isOnline: false
      },
      {
        id: 4,
        name: 'David Rodriguez',
        role: 'Frontend Developer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        isOnline: true
      },
      {
        id: 5,
        name: 'Lisa Park',
        role: 'QA Engineer',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        isOnline: false
      }
    ]
  };

  // Mock tasks data
  const tasksData = [
    {
      id: 'task-001',
      title: 'User Research & Analysis',
      description: 'Conduct comprehensive user research including surveys, interviews, and usability testing to understand current pain points.',
      status: 'completed',
      priority: 'high',
      dueDate: '2025-01-25',
      assignee: {
        id: 3,
        name: 'Emily Chen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
      },
      progress: 100,
      tags: ['Research', 'UX'],
      comments: 8,
      attachments: 3,
      subtasks: 5,
      completedSubtasks: 5
    },
    {
      id: 'task-002',
      title: 'Design System Creation',
      description: 'Create a comprehensive design system including components, colors, typography, and spacing guidelines.',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2025-02-15',
      assignee: {
        id: 3,
        name: 'Emily Chen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
      },
      progress: 75,
      tags: ['Design', 'System'],
      comments: 12,
      attachments: 7,
      subtasks: 8,
      completedSubtasks: 6
    },
    {
      id: 'task-003',
      title: 'Homepage Wireframes',
      description: 'Create detailed wireframes for the new homepage layout including mobile and desktop versions.',
      status: 'review',
      priority: 'medium',
      dueDate: '2025-02-08',
      assignee: {
        id: 3,
        name: 'Emily Chen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
      },
      progress: 90,
      tags: ['Design', 'Wireframes'],
      comments: 5,
      attachments: 2,
      subtasks: 3,
      completedSubtasks: 3
    },
    {
      id: 'task-004',
      title: 'Product Catalog API',
      description: 'Develop RESTful API endpoints for product catalog management including search, filtering, and pagination.',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2025-02-20',
      assignee: {
        id: 2,
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      },
      progress: 45,
      tags: ['Backend', 'API'],
      comments: 6,
      attachments: 1,
      subtasks: 12,
      completedSubtasks: 5
    },
    {
      id: 'task-005',
      title: 'Shopping Cart Component',
      description: 'Build responsive shopping cart component with add/remove functionality and real-time price calculations.',
      status: 'todo',
      priority: 'medium',
      dueDate: '2025-03-01',
      assignee: {
        id: 4,
        name: 'David Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      },
      progress: 0,
      tags: ['Frontend', 'Component'],
      comments: 2,
      attachments: 0,
      subtasks: 6,
      completedSubtasks: 0
    },
    {
      id: 'task-006',
      title: 'Payment Integration',
      description: 'Integrate multiple payment gateways including Stripe, PayPal, and Apple Pay with proper error handling.',
      status: 'todo',
      priority: 'high',
      dueDate: '2025-03-15',
      assignee: {
        id: 2,
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      },
      progress: 0,
      tags: ['Backend', 'Payment'],
      comments: 0,
      attachments: 0,
      subtasks: 10,
      completedSubtasks: 0
    },
    {
      id: 'task-007',
      title: 'Mobile Responsiveness Testing',
      description: 'Comprehensive testing of mobile responsiveness across different devices and screen sizes.',
      status: 'todo',
      priority: 'medium',
      dueDate: '2025-04-10',
      assignee: {
        id: 5,
        name: 'Lisa Park',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
      },
      progress: 0,
      tags: ['Testing', 'Mobile'],
      comments: 0,
      attachments: 0,
      subtasks: 15,
      completedSubtasks: 0
    },
    {
      id: 'task-008',
      title: 'Performance Optimization',
      description: 'Optimize application performance including image compression, lazy loading, and code splitting.',
      status: 'todo',
      priority: 'low',
      dueDate: '2025-04-20',
      assignee: {
        id: 4,
        name: 'David Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      },
      progress: 0,
      tags: ['Performance', 'Optimization'],
      comments: 1,
      attachments: 0,
      subtasks: 8,
      completedSubtasks: 0
    }
  ];

  // Mock milestones data
  const milestonesData = [
    {
      id: 'milestone-001',
      title: 'Design Phase Complete',
      description: 'All design assets and wireframes completed and approved',
      date: '2025-02-28',
      status: 'upcoming'
    },
    {
      id: 'milestone-002',
      title: 'MVP Development Complete',
      description: 'Core functionality implemented and ready for testing',
      date: '2025-03-31',
      status: 'upcoming'
    },
    {
      id: 'milestone-003',
      title: 'Beta Launch',
      description: 'Beta version launched for internal testing',
      date: '2025-04-15',
      status: 'upcoming'
    }
  ];

  // Filter tasks based on current filters and search
  const filteredTasks = tasksData?.filter(task => {
    const matchesSearch = task?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         task?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = filters?.status === 'all' || task?.status === filters?.status;
    const matchesPriority = filters?.priority === 'all' || task?.priority === filters?.priority;
    const matchesAssignee = filters?.assignee === 'all' || 
                           (task?.assignee && task?.assignee?.id?.toString() === filters?.assignee) ||
                           (filters?.assignee === 'unassigned' && !task?.assignee);
    
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      priority: 'all',
      assignee: 'all'
    });
  };

  const handleTaskMove = (taskId, newStatus) => {
    // In a real app, this would update the task status via API
    console.log(`Moving task ${taskId} to ${newStatus}`);
  };

  const handleTaskClick = (task) => {
    // In a real app, this would open task detail modal
    console.log('Opening task:', task);
  };

  const handleAddTask = (status = 'todo') => {
    // In a real app, this would open add task modal
    console.log('Adding new task with status:', status);
  };

  const handleBulkActions = (action, tasks) => {
    // In a real app, this would perform bulk operations
    console.log('Bulk action:', action, 'on tasks:', tasks);
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Projects', path: '/projects-list', icon: 'FolderOpen' },
    { label: projectData?.name, path: '/project-detail', icon: 'FileText', current: true }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onMenuToggle={() => setMobileNavOpen(true)}
        notificationCount={3}
      />
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      {/* Mobile Navigation */}
      <MobileNavigation 
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      }`}>
        <div className="p-6">
          {/* Breadcrumb */}
          <Breadcrumb customItems={breadcrumbItems} />

          {/* Project Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {projectData?.name}
                </h1>
                <p className="text-muted-foreground">
                  Manage tasks, track progress, and collaborate with your team
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-muted rounded-md hover:bg-muted/80 transition-colors"
                >
                  <span className="text-sm text-foreground">
                    {sidebarCollapsed ? 'Expand' : 'Collapse'} Sidebar
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Project Info & Filters */}
            <div className={`lg:col-span-3 space-y-6 ${sidebarCollapsed ? 'lg:col-span-2' : ''}`}>
              <ProjectInfoCard project={projectData} />
              <TaskFilters 
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Main Content Area */}
            <div className={`lg:col-span-9 ${sidebarCollapsed ? 'lg:col-span-10' : ''}`}>
              {/* Project Tabs */}
              <ProjectTabs 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                taskCount={tasksData?.length}
                fileCount={12}
                activityCount={25}
              />

              {/* Tab Content */}
              {activeTab === 'tasks' && (
                <div className="space-y-6">
                  <TaskToolbar 
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onAddTask={handleAddTask}
                    onBulkActions={handleBulkActions}
                    selectedTasks={selectedTasks}
                  />

                  {viewMode === 'board' && (
                    <KanbanBoard 
                      tasks={filteredTasks}
                      onTaskMove={handleTaskMove}
                      onTaskClick={handleTaskClick}
                      onAddTask={handleAddTask}
                    />
                  )}

                  {viewMode === 'list' && (
                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">📋</span>
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">List View</h3>
                        <p className="text-sm text-muted-foreground">
                          List view implementation coming soon
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'timeline' && (
                <TimelineView 
                  tasks={filteredTasks}
                  milestones={milestonesData}
                />
              )}

              {activeTab === 'files' && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📁</span>
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Project Files</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      File management system coming soon
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📊</span>
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Activity Feed</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Activity tracking system coming soon
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;