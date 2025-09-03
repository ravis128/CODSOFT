import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentOrders = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);

  const orders = [
    {
      id: 'ORD-2024-001',
      customer: 'John Smith',
      email: 'john.smith@email.com',
      total: 299.99,
      status: 'pending',
      items: 2,
      date: '2024-08-30',
      time: '14:30'
    },
    {
      id: 'ORD-2024-002',
      customer: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      total: 149.50,
      status: 'processing',
      items: 1,
      date: '2024-08-30',
      time: '13:15'
    },
    {
      id: 'ORD-2024-003',
      customer: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      total: 89.99,
      status: 'shipped',
      items: 3,
      date: '2024-08-30',
      time: '11:45'
    },
    {
      id: 'ORD-2024-004',
      customer: 'Emily Davis',
      email: 'emily.davis@email.com',
      total: 199.99,
      status: 'delivered',
      items: 1,
      date: '2024-08-29',
      time: '16:20'
    },
    {
      id: 'ORD-2024-005',
      customer: 'David Brown',
      email: 'david.brown@email.com',
      total: 349.99,
      status: 'pending',
      items: 4,
      date: '2024-08-29',
      time: '15:10'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'processing':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'shipped':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'delivered':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev?.includes(orderId) 
        ? prev?.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    setSelectedOrders(
      selectedOrders?.length === orders?.length 
        ? [] 
        : orders?.map(order => order?.id)
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
          <p className="text-sm text-muted-foreground">Latest customer orders</p>
        </div>
        <div className="flex items-center space-x-2">
          {selectedOrders?.length > 0 && (
            <Button variant="outline" size="sm" iconName="Archive" iconPosition="left">
              Bulk Actions
            </Button>
          )}
          <Button variant="outline" size="sm" iconName="Filter" iconPosition="left">
            Filter
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2">
                <input
                  type="checkbox"
                  checked={selectedOrders?.length === orders?.length}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order?.id} className="border-b border-border hover:bg-muted/50 transition-colors duration-200">
                <td className="py-4 px-2">
                  <input
                    type="checkbox"
                    checked={selectedOrders?.includes(order?.id)}
                    onChange={() => handleSelectOrder(order?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-medium text-foreground">{order?.id}</span>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{order?.customer}</p>
                    <p className="text-xs text-muted-foreground">{order?.email}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">${order?.total}</p>
                    <p className="text-xs text-muted-foreground">{order?.items} items</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
                    {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-sm text-foreground">{order?.date}</p>
                    <p className="text-xs text-muted-foreground">{order?.time}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200">
                      <Icon name="Eye" size={16} />
                    </button>
                    <button className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200">
                      <Icon name="Edit" size={16} />
                    </button>
                    <button className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200">
                      <Icon name="MoreHorizontal" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Showing {orders?.length} of 150 orders
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="ChevronLeft" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" iconName="ChevronRight">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;