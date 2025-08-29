import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MobileNavigation from '../../components/ui/MobileNavigation';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import TeamTable from './components/TeamTable';
import TeamMemberCard from './components/TeamMemberCard';
import TeamAnalytics from './components/TeamAnalytics';
import InviteModal from './components/InviteModal';
import PendingInvites from './components/PendingInvites';
import RoleManagement from './components/RoleManagement';

const TeamManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('members');
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Mock data
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@projectflow.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      role: "Project Manager",
      projectsAssigned: 5,
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "active"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@projectflow.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      role: "Team Lead",
      projectsAssigned: 3,
      lastActive: new Date(Date.now() - 30 * 60 * 1000),
      status: "active"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@projectflow.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      role: "Developer",
      projectsAssigned: 4,
      lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: "active"
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@projectflow.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      role: "Developer",
      projectsAssigned: 2,
      lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: "inactive"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.thompson@projectflow.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      role: "Admin",
      projectsAssigned: 8,
      lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000),
      status: "active"
    },
    {
      id: 6,
      name: "James Wilson",
      email: "james.wilson@projectflow.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      role: "Developer",
      projectsAssigned: 3,
      lastActive: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: "active"
    }
  ];

  const pendingInvites = [
    {
      id: 1,
      email: "alex.martinez@example.com",
      role: "Developer",
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      projects: ["E-commerce Platform", "Mobile App Development"]
    },
    {
      id: 2,
      email: "rachel.green@example.com",
      role: "Team Lead",
      sentAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      projects: ["Data Analytics Dashboard"]
    }
  ];

  const customRoles = [
    {
      id: 1,
      name: "Senior Developer",
      description: "Experienced developer with mentoring responsibilities",
      permissions: ["project_view", "task_create", "task_edit", "task_assign"],
      memberCount: 3
    },
    {
      id: 2,
      name: "QA Lead",
      description: "Quality assurance team leader",
      permissions: ["project_view", "task_view", "task_edit", "reports_view"],
      memberCount: 2
    }
  ];

  const analytics = {
    totalMembers: teamMembers?.length,
    activeMembers: teamMembers?.filter(m => m?.status === 'active')?.length,
    pendingInvites: pendingInvites?.length
  };

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Project Manager', label: 'Project Manager' },
    { value: 'Team Lead', label: 'Team Lead' },
    { value: 'Developer', label: 'Developer' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  const tabs = [
    { id: 'members', label: 'Team Members', icon: 'Users' },
    { id: 'invites', label: 'Pending Invites', icon: 'Mail' },
    { id: 'roles', label: 'Role Management', icon: 'Shield' }
  ];

  // Filter and sort members
  const filteredMembers = teamMembers?.filter(member => {
    const matchesSearch = member?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         member?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesRole = !roleFilter || member?.role === roleFilter;
    const matchesStatus = !statusFilter || member?.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const sortedMembers = [...filteredMembers]?.sort((a, b) => {
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];
    
    if (sortConfig?.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectMember = (memberId) => {
    setSelectedMembers(prev =>
      prev?.includes(memberId)
        ? prev?.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMembers?.length === sortedMembers?.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(sortedMembers?.map(member => member?.id));
    }
  };

  const handleEditMember = (member) => {
    console.log('Edit member:', member);
  };

  const handleDeactivateMember = (member) => {
    console.log('Deactivate member:', member);
  };

  const handleMessageMember = (member) => {
    console.log('Message member:', member);
  };

  const handleReassignProjects = (member) => {
    console.log('Reassign projects for member:', member);
  };

  const handleInviteMembers = (inviteData) => {
    console.log('Invite members:', inviteData);
  };

  const handleResendInvite = (invite) => {
    console.log('Resend invite:', invite);
  };

  const handleCancelInvite = (invite) => {
    console.log('Cancel invite:', invite);
  };

  const handleCreateRole = (roleData) => {
    console.log('Create role:', roleData);
  };

  const handleUpdateRole = (roleId, roleData) => {
    console.log('Update role:', roleId, roleData);
  };

  const handleDeleteRole = (roleId) => {
    console.log('Delete role:', roleId);
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'for members:', selectedMembers);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.action-menu')) {
        // Close any open action menus
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuToggle={() => setMobileMenuOpen(true)}
        notificationCount={3}
      />
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <MobileNavigation 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <main className={`pt-16 transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      }`}>
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Team Management</h1>
                <p className="text-muted-foreground mt-2">
                  Manage your team members, roles, and permissions
                </p>
              </div>
              <Button onClick={() => setShowInviteModal(true)} iconName="UserPlus" iconPosition="left">
                Invite Members
              </Button>
            </div>
            
            <nav className="flex space-x-8 overflow-x-auto pb-2">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex-shrink-0 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                  {tab?.id === 'invites' && pendingInvites?.length > 0 && (
                    <span className="bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {pendingInvites?.length}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-8 min-w-0">
              {activeTab === 'members' && (
                <div className="space-y-6">
                  {/* Toolbar */}
                  <div className="bg-card border border-border rounded-lg p-4 overflow-hidden">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 min-w-0 flex-1">
                        <Input
                          type="search"
                          placeholder="Search team members..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e?.target?.value)}
                          className="w-full sm:w-80"
                        />
                        <div className="flex space-x-3 flex-shrink-0">
                          <Select
                            placeholder="Filter by role"
                            options={roleOptions}
                            value={roleFilter}
                            onChange={setRoleFilter}
                            className="w-40"
                          />
                          <Select
                            placeholder="Filter by status"
                            options={statusOptions}
                            value={statusFilter}
                            onChange={setStatusFilter}
                            className="w-40"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 flex-shrink-0">
                        {selectedMembers?.length > 0 && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">
                              {selectedMembers?.length} selected
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleBulkAction('deactivate')}
                              iconName="UserX"
                              iconPosition="left"
                              iconSize={14}
                            >
                              Bulk Actions
                            </Button>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-1 bg-muted rounded-md p-1 flex-shrink-0">
                          <Button
                            variant={viewMode === 'table' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('table')}
                            iconName="Table"
                            className="h-8 w-8 p-0"
                          />
                          <Button
                            variant={viewMode === 'grid' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('grid')}
                            iconName="Grid3X3"
                            className="h-8 w-8 p-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Members Display */}
                  {viewMode === 'table' ? (
                    <div className="overflow-x-auto">
                      <TeamTable
                        members={sortedMembers}
                        selectedMembers={selectedMembers}
                        onSelectMember={handleSelectMember}
                        onSelectAll={handleSelectAll}
                        onSort={handleSort}
                        sortConfig={sortConfig}
                        onEdit={handleEditMember}
                        onDeactivate={handleDeactivateMember}
                        onMessage={handleMessageMember}
                        onReassign={handleReassignProjects}
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {sortedMembers?.map((member) => (
                        <TeamMemberCard
                          key={member?.id}
                          member={member}
                          onEdit={handleEditMember}
                          onDeactivate={handleDeactivateMember}
                          onMessage={handleMessageMember}
                          onReassign={handleReassignProjects}
                        />
                      ))}
                    </div>
                  )}

                  {sortedMembers?.length === 0 && (
                    <div className="bg-card border border-border rounded-lg p-12 text-center">
                      <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No team members found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchQuery || roleFilter || statusFilter
                          ? 'Try adjusting your search or filter criteria' :'Start by inviting team members to your organization'
                        }
                      </p>
                      <Button onClick={() => setShowInviteModal(true)}>
                        Invite Team Members
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'invites' && (
                <PendingInvites
                  invites={pendingInvites}
                  onResend={handleResendInvite}
                  onCancel={handleCancelInvite}
                />
              )}

              {activeTab === 'roles' && (
                <RoleManagement
                  roles={customRoles}
                  onCreateRole={handleCreateRole}
                  onUpdateRole={handleUpdateRole}
                  onDeleteRole={handleDeleteRole}
                />
              )}
            </div>

            {/* Right Panel - Analytics */}
            <div className="xl:col-span-4 min-w-0">
              <TeamAnalytics analytics={analytics} />
            </div>
          </div>
        </div>
      </main>
      {/* Invite Modal */}
      <InviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInvite={handleInviteMembers}
      />
    </div>
  );
};

export default TeamManagement;