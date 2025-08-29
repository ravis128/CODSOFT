import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProjectListView = ({ 
  projects, 
  selectedProjects, 
  onSelectProject, 
  onSelectAll, 
  onEdit, 
  onArchive, 
  onShare, 
  onViewDetails,
  sortConfig,
  onSort 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'completed': return 'bg-primary text-primary-foreground';
      case 'on-hold': return 'bg-warning text-warning-foreground';
      case 'cancelled': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSort = (field) => {
    const direction = sortConfig?.field === field && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    onSort({ field, direction });
  };

  const getSortIcon = (field) => {
    if (sortConfig?.field !== field) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const isAllSelected = projects?.length > 0 && selectedProjects?.length === projects?.length;
  const isIndeterminate = selectedProjects?.length > 0 && selectedProjects?.length < projects?.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={onSelectAll}
                />
              </th>
              <th className="text-left px-4 py-3">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('name')}
                  className="h-auto p-0 font-medium text-foreground hover:text-primary"
                >
                  <div className="flex items-center space-x-1">
                    <span>Project Name</span>
                    <Icon name={getSortIcon('name')} size={14} />
                  </div>
                </Button>
              </th>
              <th className="text-left px-4 py-3">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('status')}
                  className="h-auto p-0 font-medium text-foreground hover:text-primary"
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    <Icon name={getSortIcon('status')} size={14} />
                  </div>
                </Button>
              </th>
              <th className="text-left px-4 py-3">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('progress')}
                  className="h-auto p-0 font-medium text-foreground hover:text-primary"
                >
                  <div className="flex items-center space-x-1">
                    <span>Progress</span>
                    <Icon name={getSortIcon('progress')} size={14} />
                  </div>
                </Button>
              </th>
              <th className="text-left px-4 py-3">Team</th>
              <th className="text-left px-4 py-3">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('priority')}
                  className="h-auto p-0 font-medium text-foreground hover:text-primary"
                >
                  <div className="flex items-center space-x-1">
                    <span>Priority</span>
                    <Icon name={getSortIcon('priority')} size={14} />
                  </div>
                </Button>
              </th>
              <th className="text-left px-4 py-3">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('dueDate')}
                  className="h-auto p-0 font-medium text-foreground hover:text-primary"
                >
                  <div className="flex items-center space-x-1">
                    <span>Due Date</span>
                    <Icon name={getSortIcon('dueDate')} size={14} />
                  </div>
                </Button>
              </th>
              <th className="w-32 px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project) => (
              <tr
                key={project?.id}
                className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => onViewDetails(project?.id)}
              >
                <td className="px-4 py-4">
                  <Checkbox
                    checked={selectedProjects?.includes(project?.id)}
                    onChange={(e) => {
                      e?.stopPropagation();
                      onSelectProject(project?.id);
                    }}
                  />
                </td>
                <td className="px-4 py-4">
                  <div>
                    <h3 className="font-medium text-foreground hover:text-primary transition-colors">
                      {project?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                      {project?.description}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
                    {project?.status?.charAt(0)?.toUpperCase() + project?.status?.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${project?.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground min-w-0">
                      {project?.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex -space-x-2">
                    {project?.teamMembers?.slice(0, 3)?.map((member) => (
                      <div
                        key={member?.id}
                        className="w-8 h-8 rounded-full border-2 border-card overflow-hidden"
                        title={member?.name}
                      >
                        <Image
                          src={member?.avatar}
                          alt={member?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {project?.teamMembers?.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                        <span className="text-xs font-medium text-muted-foreground">
                          +{project?.teamMembers?.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Flag" size={14} className={getPriorityColor(project?.priority)} />
                    <span className={`text-sm font-medium ${getPriorityColor(project?.priority)}`}>
                      {project?.priority?.charAt(0)?.toUpperCase() + project?.priority?.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-muted-foreground">
                    {formatDate(project?.dueDate)}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onEdit(project?.id);
                      }}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit2" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onShare(project?.id);
                      }}
                      className="h-8 w-8"
                    >
                      <Icon name="Share2" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onArchive(project?.id);
                      }}
                      className="h-8 w-8"
                    >
                      <Icon name="Archive" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectListView;