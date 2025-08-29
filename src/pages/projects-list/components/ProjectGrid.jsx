import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectGrid = ({ 
  projects, 
  onEdit, 
  onArchive, 
  onShare, 
  onViewDetails 
}) => {
  if (projects?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
        <p className="text-muted-foreground max-w-sm">
          No projects match your current filters. Try adjusting your search criteria or create a new project.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects?.map((project) => (
        <ProjectCard
          key={project?.id}
          project={project}
          onEdit={onEdit}
          onArchive={onArchive}
          onShare={onShare}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;