import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, icon, trend }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 overflow-hidden">
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground truncate">{title}</h3>
        </div>
        <div className="flex items-center space-x-1 flex-shrink-0">
          <Icon name={getChangeIcon()} size={16} className={getChangeColor()} />
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {change}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {trend && (
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-muted rounded-full h-2 min-w-0">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${trend}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground flex-shrink-0">{trend}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;