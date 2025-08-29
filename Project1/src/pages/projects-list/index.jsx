import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProjectToolbar from './components/ProjectToolbar';
import ProjectGrid from './components/ProjectGrid';
import ProjectListView from './components/ProjectListView';
import FilterPanel from './components/FilterPanel';
import PaginationControls from './components/PaginationControls';
import MobileNavigation from '../../components/ui/MobileNavigation';
import CreateProjectModal from './components/CreateProjectModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProjectsList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [filterPanelCollapsed, setFilterPanelCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortConfig, setSortConfig] = useState({ field: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    status: [],
    priority: [],
    teamMembers: [],
    templates: [],
    startDate: '',
    endDate: ''
  });
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock projects data
  const mockProjects = [
    {
      id: 1,
      name: "E-commerce Platform Redesign",
      description: "Complete overhaul of the existing e-commerce platform with modern UI/UX design, improved performance, and enhanced user experience features.",
      status: "active",
      priority: "high",
      progress: 75,
      dueDate: "2025-02-15",
      createdAt: "2024-12-01",
      updatedAt: "2025-01-10",
      completedTasks: 18,
      totalTasks: 24,
      teamMembers: [
        { id: 1, name: "Sarah Johnson", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
        { id: 2, name: "Mike Chen", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
        { id: 3, name: "Emily Davis", avatar: "https://randomuser.me/api/portraits/women/3.jpg" }
      ],
      template: "web-development"
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Native iOS and Android application development for customer engagement and loyalty program management.",
      status: "active",
      priority: "high",
      progress: 45,
      dueDate: "2025-03-20",
      createdAt: "2024-11-15",
      updatedAt: "2025-01-08",
      completedTasks: 9,
      totalTasks: 20,
      teamMembers: [
        { id: 2, name: "Mike Chen", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
        { id: 4, name: "Alex Rodriguez", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
        { id: 5, name: "Lisa Wang", avatar: "https://randomuser.me/api/portraits/women/5.jpg" }
      ],
      template: "mobile-app"
    },
    {
      id: 3,
      name: "Marketing Campaign Q1 2025",
      description: "Comprehensive digital marketing campaign for Q1 product launch including social media, email marketing, and content creation.",
      status: "active",
      priority: "medium",
      progress: 30,
      dueDate: "2025-03-31",
      createdAt: "2024-12-15",
      updatedAt: "2025-01-09",
      completedTasks: 6,
      totalTasks: 20,
      teamMembers: [
        { id: 3, name: "Emily Davis", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
        { id: 6, name: "David Kim", avatar: "https://randomuser.me/api/portraits/men/6.jpg" }
      ],
      template: "marketing-campaign"
    },
    {
      id: 4,
      name: "Data Analytics Dashboard",
      description: "Business intelligence dashboard for real-time data visualization and reporting with advanced analytics capabilities.",
      status: "completed",
      priority: "medium",
      progress: 100,
      dueDate: "2024-12-31",
      createdAt: "2024-10-01",
      updatedAt: "2024-12-31",
      completedTasks: 15,
      totalTasks: 15,
      teamMembers: [
        { id: 1, name: "Sarah Johnson", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
        { id: 7, name: "James Wilson", avatar: "https://randomuser.me/api/portraits/men/7.jpg" }
      ],
      template: "web-development"
    },
    {
      id: 5,
      name: "Customer Support Portal",
      description: "Self-service customer support portal with knowledge base, ticket system, and live chat integration.",
      status: "on-hold",
      priority: "low",
      progress: 20,
      dueDate: "2025-04-15",
      createdAt: "2024-11-01",
      updatedAt: "2024-12-20",
      completedTasks: 3,
      totalTasks: 15,
      teamMembers: [
        { id: 4, name: "Alex Rodriguez", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
        { id: 8, name: "Maria Garcia", avatar: "https://randomuser.me/api/portraits/women/8.jpg" }
      ],
      template: "web-development"
    },
    {
      id: 6,
      name: "Product Launch Strategy",
      description: "Strategic planning and execution for new product launch including market research, positioning, and go-to-market strategy.",
      status: "active",
      priority: "high",
      progress: 60,
      dueDate: "2025-02-28",
      createdAt: "2024-12-10",
      updatedAt: "2025-01-11",
      completedTasks: 12,
      totalTasks: 20,
      teamMembers: [
        { id: 3, name: "Emily Davis", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
        { id: 6, name: "David Kim", avatar: "https://randomuser.me/api/portraits/men/6.jpg" },
        { id: 9, name: "Jennifer Lee", avatar: "https://randomuser.me/api/portraits/women/9.jpg" }
      ],
      template: "product-launch"
    },
    {
      id: 7,
      name: "API Integration Platform",
      description: "Microservices architecture implementation with RESTful APIs and third-party service integrations.",
      status: "active",
      priority: "medium",
      progress: 85,
      dueDate: "2025-01-31",
      createdAt: "2024-10-15",
      updatedAt: "2025-01-10",
      completedTasks: 17,
      totalTasks: 20,
      teamMembers: [
        { id: 2, name: "Mike Chen", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
        { id: 7, name: "James Wilson", avatar: "https://randomuser.me/api/portraits/men/7.jpg" },
        { id: 10, name: "Rachel Brown", avatar: "https://randomuser.me/api/portraits/women/10.jpg" }
      ],
      template: "web-development"
    },
    {
      id: 8,
      name: "Security Audit & Compliance",
      description: "Comprehensive security assessment and compliance implementation for GDPR, SOC2, and industry standards.",
      status: "completed",
      priority: "high",
      progress: 100,
      dueDate: "2024-11-30",
      createdAt: "2024-09-01",
      updatedAt: "2024-11-30",
      completedTasks: 12,
      totalTasks: 12,
      teamMembers: [
        { id: 4, name: "Alex Rodriguez", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
        { id: 11, name: "Tom Anderson", avatar: "https://randomuser.me/api/portraits/men/11.jpg" }
      ],
      template: "web-development"
    }
  ];

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = mockProjects?.filter(project => {
      // Search filter
      if (searchQuery && !project?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
          !project?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters?.status?.length > 0 && !filters?.status?.includes(project?.status)) {
        return false;
      }

      // Priority filter
      if (filters?.priority?.length > 0 && !filters?.priority?.includes(project?.priority)) {
        return false;
      }

      // Team members filter
      if (filters?.teamMembers?.length > 0) {
        const hasTeamMember = project?.teamMembers?.some(member => 
          filters?.teamMembers?.includes(member?.id)
        );
        if (!hasTeamMember) return false;
      }

      // Template filter
      if (filters?.templates?.length > 0 && !filters?.templates?.includes(project?.template)) {
        return false;
      }

      // Date range filter
      if (filters?.startDate && new Date(project.createdAt) < new Date(filters.startDate)) {
        return false;
      }
      if (filters?.endDate && new Date(project.createdAt) > new Date(filters.endDate)) {
        return false;
      }

      return true;
    });

    // Sort projects
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.field];
      let bValue = b?.[sortConfig?.field];

      if (sortConfig?.field === 'name') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      } else if (sortConfig?.field === 'date') {
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
      }

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [mockProjects, searchQuery, filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProjects?.length / itemsPerPage);
  const paginatedProjects = filteredAndSortedProjects?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, sortConfig]);

  const handleSelectProject = (projectId) => {
    setSelectedProjects(prev => 
      prev?.includes(projectId)
        ? prev?.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProjects?.length === paginatedProjects?.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(paginatedProjects?.map(p => p?.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'on projects:', selectedProjects);
    // Implement bulk actions here
    setSelectedProjects([]);
  };

  const handleClearFilters = () => {
    setFilters({
      status: [],
      priority: [],
      teamMembers: [],
      templates: [],
      startDate: '',
      endDate: ''
    });
    setSearchQuery('');
  };

  const handleProjectAction = (action, projectId) => {
    console.log(`${action} project:`, projectId);
    // Implement project actions here
  };

  const handleNewProject = () => {
    setShowCreateModal(true);
  };

  const handleCreateProject = (newProject) => {
    // Add the new project to the beginning of the projects list
    const updatedProjects = [newProject, ...mockProjects];
    
    // In a real app, you would make an API call here
    console.log('New project created:', newProject);
    
    // For demo purposes, we'll just show a success message
    alert(`Project "${newProject.name}" created successfully!`);
    
    // You could also update the local state here if needed
    // setMockProjects(updatedProjects);
  };

  const handleExport = () => {
    console.log('Export projects');
    // Implement export functionality
  };

  const handleViewDetails = (projectId) => {
    window.location.href = '/project-detail';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuToggle={() => setMobileNavOpen(true)}
        notificationCount={3}
      />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      <MobileNavigation
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      <main className={`transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      } pt-16`}>
        <div className="flex">
          <FilterPanel
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={handleClearFilters}
            isCollapsed={filterPanelCollapsed}
            onToggleCollapse={() => setFilterPanelCollapsed(!filterPanelCollapsed)}
          />

          <div className="flex-1 min-w-0">
            <div className="p-6">
              <Breadcrumb />
              
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
                <p className="text-muted-foreground">
                  Manage and track all your projects in one place
                </p>
                <div className="flex space-x-6 mt-4">
                  <button
                    className={`text-lg font-medium focus:outline-none ${filters.status.length === 0 ? 'text-primary underline' : 'text-foreground'}`}
                    onClick={() => setFilters({ ...filters, status: [] })}
                  >
                    All Projects
                  </button>
                  <button
                    className={`text-lg font-medium focus:outline-none ${filters.status.length === 1 && filters.status[0] === 'active' ? 'text-primary underline' : 'text-foreground'}`}
                    onClick={() => setFilters({ ...filters, status: ['active'] })}
                  >
                    Active Projects
                  </button>
                  <button
                    className={`text-lg font-medium focus:outline-none ${filters.status.length === 1 && filters.status[0] === 'completed' ? 'text-primary underline' : 'text-foreground'}`}
                    onClick={() => setFilters({ ...filters, status: ['completed'] })}
                  >
                    Completed
                  </button>
                </div>
              </div>

              <ProjectToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                sortConfig={sortConfig}
                onSortChange={setSortConfig}
                selectedProjects={selectedProjects}
                onBulkAction={handleBulkAction}
                onNewProject={handleNewProject}
                onExport={handleExport}
              />

              <div className="mt-6">
                {viewMode === 'grid' ? (
                  <ProjectGrid
                    projects={paginatedProjects}
                    onEdit={(id) => handleProjectAction('edit', id)}
                    onArchive={(id) => handleProjectAction('archive', id)}
                    onShare={(id) => handleProjectAction('share', id)}
                    onViewDetails={handleViewDetails}
                  />
                ) : (
                  <ProjectListView
                    projects={paginatedProjects}
                    selectedProjects={selectedProjects}
                    onSelectProject={handleSelectProject}
                    onSelectAll={handleSelectAll}
                    onEdit={(id) => handleProjectAction('edit', id)}
                    onArchive={(id) => handleProjectAction('archive', id)}
                    onShare={(id) => handleProjectAction('share', id)}
                    onViewDetails={handleViewDetails}
                    sortConfig={sortConfig}
                    onSort={setSortConfig}
                  />
                )}
              </div>

              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredAndSortedProjects?.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(value) => {
                  setItemsPerPage(parseInt(value));
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </div>
      </main>
      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
};

export default ProjectsList;