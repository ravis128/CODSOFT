import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const TopProductsChart = () => {
  const productData = [
    { name: 'Wireless Headphones', value: 35, sales: 1250, color: '#1E40AF' },
    { name: 'Smart Watch', value: 25, sales: 890, color: '#F59E0B' },
    { name: 'Laptop Stand', value: 20, sales: 720, color: '#10B981' },
    { name: 'USB-C Cable', value: 12, sales: 430, color: '#EF4444' },
    { name: 'Others', value: 8, sales: 285, color: '#6B7280' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground">{data?.name}</p>
          <p className="text-sm text-muted-foreground">Sales: ${data?.sales}</p>
          <p className="text-sm text-muted-foreground">Share: {data?.value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Top Products</h3>
          <p className="text-sm text-muted-foreground">Best selling products this month</p>
        </div>
        <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200">
          <Icon name="MoreHorizontal" size={20} />
        </button>
      </div>
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={productData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {productData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {productData?.map((product, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: product?.color }}
              />
              <span className="text-sm font-medium text-foreground">{product?.name}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">${product?.sales}</p>
              <p className="text-xs text-muted-foreground">{product?.value}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProductsChart;