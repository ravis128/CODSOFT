import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const TeamAnalytics = ({ analytics }) => {
  const COLORS = ['#2563EB', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6'];

  const activityData = [
    { name: 'Mon', active: 12, total: 15 },
    { name: 'Tue', active: 14, total: 15 },
    { name: 'Wed', active: 13, total: 15 },
    { name: 'Thu', active: 15, total: 15 },
    { name: 'Fri', active: 11, total: 15 },
    { name: 'Sat', active: 8, total: 15 },
    { name: 'Sun', active: 6, total: 15 },
  ];

  const roleDistribution = [
    { name: 'Developers', value: 8, color: '#2563EB' },
    { name: 'Project Managers', value: 3, color: '#F59E0B' },
    { name: 'Team Leads', value: 2, color: '#10B981' },
    { name: 'Admins', value: 2, color: '#EF4444' },
  ];

  const projectParticipation = [
    { month: 'Jan', participation: 85 },
    { month: 'Feb', participation: 88 },
    { month: 'Mar', participation: 92 },
    { month: 'Apr', participation: 87 },
    { month: 'May', participation: 94 },
    { month: 'Jun', participation: 91 },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{analytics?.totalMembers}</p>
              <p className="text-sm text-muted-foreground">Total Members</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="UserCheck" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{analytics?.activeMembers}</p>
              <p className="text-sm text-muted-foreground">Active Today</p>
            </div>
          </div>
        </div>
      </div>
      {/* Member Activity Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Weekly Activity</h3>
          <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-popover-foreground)'
                }}
              />
              <Bar dataKey="active" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Role Distribution */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Role Distribution</h3>
          <Icon name="PieChart" size={20} className="text-muted-foreground" />
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={roleDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {roleDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-popover-foreground)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {roleDistribution?.map((role, index) => (
            <div key={role?.name} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
              />
              <span className="text-sm text-muted-foreground">{role?.name}: {role?.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Project Participation Trend */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Project Participation</h3>
          <Icon name="Activity" size={20} className="text-muted-foreground" />
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectParticipation}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-popover-foreground)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="participation" 
                stroke="var(--color-success)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TeamAnalytics;