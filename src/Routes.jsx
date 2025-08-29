import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Login from "pages/login";
import Register from "pages/register";
import Dashboard from './pages/dashboard';
import UserProfileSettings from './pages/user-profile-settings';
import ProjectsList from './pages/projects-list';
import TeamManagement from './pages/team-management';
import ReportsAnalytics from './pages/reports-analytics';
import ProjectDetail from './pages/project-detail';
import ProtectedRoute from "components/ProtectedRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/user-profile-settings" element={
          <ProtectedRoute>
            <UserProfileSettings />
          </ProtectedRoute>
        } />
        <Route path="/projects-list" element={
          <ProtectedRoute>
            <ProjectsList />
          </ProtectedRoute>
        } />
        <Route path="/team-management" element={
          <ProtectedRoute>
            <TeamManagement />
          </ProtectedRoute>
        } />
        <Route path="/reports-analytics" element={
          <ProtectedRoute>
            <ReportsAnalytics />
          </ProtectedRoute>
        } />
        <Route path="/project-detail" element={
          <ProtectedRoute>
            <ProjectDetail />
          </ProtectedRoute>
        } />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
