import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Calendar, Users, Target, FileText } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateProjectModal = ({ isOpen, onClose, onCreateProject }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const projectType = watch('type');

  const projectTypes = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-app', label: 'Mobile App' },
    { value: 'design', label: 'Design Project' },
    { value: 'marketing', label: 'Marketing Campaign' },
    { value: 'research', label: 'Research & Analysis' },
    { value: 'other', label: 'Other' }
  ];

  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const templates = [
    { value: 'blank', label: 'Blank Project' },
    { value: 'product-launch', label: 'Product Launch' },
    { value: 'website-redesign', label: 'Website Redesign' },
    { value: 'mobile-app', label: 'Mobile App Development' },
    { value: 'marketing-campaign', label: 'Marketing Campaign' }
  ];

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create project object
      const newProject = {
        id: Date.now(), // In production, this would come from the backend
        name: data.name,
        description: data.description,
        type: data.type,
        priority: data.priority,
        template: data.template,
        startDate: data.startDate,
        dueDate: data.dueDate,
        status: 'planning',
        progress: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        teamMembers: [],
        completedTasks: 0,
        totalTasks: 0
      };

      // Call the parent function to create the project
      onCreateProject(newProject);
      
      // Reset form and close modal
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999999] p-4">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Create New Project</h2>
              <p className="text-sm text-muted-foreground">Set up your project details and get started</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Project Name *
                </label>
                <Input
                  id="name"
                  placeholder="Enter project name"
                  {...register('name', {
                    required: 'Project name is required',
                    minLength: {
                      value: 3,
                      message: 'Project name must be at least 3 characters'
                    }
                  })}
                />
                {errors.name && (
                  <p className="text-sm text-error">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium text-foreground">
                  Project Type *
                </label>
                <Select
                  id="type"
                  options={projectTypes}
                  placeholder="Select project type"
                  {...register('type', {
                    required: 'Project type is required'
                  })}
                />
                {errors.type && (
                  <p className="text-sm text-error">{errors.type.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-foreground">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="Describe your project goals and objectives"
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                {...register('description')}
              />
            </div>
          </div>

          {/* Project Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Project Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="priority" className="text-sm font-medium text-foreground">
                  Priority
                </label>
                <Select
                  id="priority"
                  options={priorities}
                  placeholder="Select priority"
                  {...register('priority')}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="template" className="text-sm font-medium text-foreground">
                  Template
                </label>
                <Select
                  id="template"
                  options={templates}
                  placeholder="Select template"
                  {...register('template')}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="teamSize" className="text-sm font-medium text-foreground">
                  Team Size
                </label>
                <Input
                  id="teamSize"
                  type="number"
                  min="1"
                  max="50"
                  placeholder="Number of team members"
                  {...register('teamSize', {
                    min: {
                      value: 1,
                      message: 'Team size must be at least 1'
                    }
                  })}
                />
                {errors.teamSize && (
                  <p className="text-sm text-error">{errors.teamSize.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Timeline</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startDate" className="text-sm font-medium text-foreground">
                  Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="startDate"
                    type="date"
                    className="pl-10"
                    {...register('startDate')}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="dueDate" className="text-sm font-medium text-foreground">
                  Due Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="dueDate"
                    type="date"
                    className="pl-10"
                    {...register('dueDate')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              iconName="Plus"
              iconPosition="left"
            >
              {isLoading ? 'Creating Project...' : 'Create Project'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal; 