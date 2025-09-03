import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import OrderStatusBadge from './OrderStatusBadge';
import OrderDetailsModal from './OrderDetailsModal';

const OrderTable = ({ 
  orders, 
  selectedOrders, 
  onOrderSelect, 
  onSelectAll, 
  onStatusUpdate,
  onViewDetails 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const handleViewDetails = (order) => {
    setSelectedOrderDetails(order);
    setIsDetailsModalOpen(true);
    if (onViewDetails) {
      onViewDetails(order);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isAllSelected = orders?.length > 0 && selectedOrders?.length === orders?.length;
  const isIndeterminate = selectedOrders?.length > 0 && selectedOrders?.length < orders?.length;

  return (
    <>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="w-12 px-4 py-3">
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    onChange={(e) => onSelectAll(e?.target?.checked)}
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('orderNumber')}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                  >
                    <span>Order #</span>
                    <Icon name={getSortIcon('orderNumber')} size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('customer')}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                  >
                    <span>Customer</span>
                    <Icon name={getSortIcon('customer')} size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('date')}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                  >
                    <span>Date</span>
                    <Icon name={getSortIcon('date')} size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('total')}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                  >
                    <span>Total</span>
                    <Icon name={getSortIcon('total')} size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">Payment</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Shipping</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders?.map((order) => (
                <tr key={order?.id} className="hover:bg-muted/30 transition-colors duration-150">
                  <td className="px-4 py-4">
                    <Checkbox
                      checked={selectedOrders?.includes(order?.id)}
                      onChange={(e) => onOrderSelect(order?.id, e?.target?.checked)}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="text-sm font-medium text-primary hover:text-primary/80"
                    >
                      #{order?.orderNumber}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-sm font-medium text-foreground">{order?.customer?.name}</div>
                      <div className="text-xs text-muted-foreground">{order?.customer?.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-foreground">{formatDate(order?.date)}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-foreground">{formatCurrency(order?.total)}</div>
                  </td>
                  <td className="px-4 py-4">
                    <OrderStatusBadge status={order?.paymentStatus} type="payment" />
                  </td>
                  <td className="px-4 py-4">
                    <OrderStatusBadge status={order?.status} type="fulfillment" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-foreground">{order?.shippingMethod}</div>
                    {order?.trackingNumber && (
                      <div className="text-xs text-muted-foreground">#{order?.trackingNumber}</div>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(order)}
                        iconName="Eye"
                        className="h-8 w-8 p-0"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onStatusUpdate(order?.id)}
                        iconName="Edit"
                        className="h-8 w-8 p-0"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreHorizontal"
                        className="h-8 w-8 p-0"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No orders found</h3>
            <p className="text-muted-foreground">No orders match your current filters.</p>
          </div>
        )}
      </div>
      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        order={selectedOrderDetails}
        onStatusUpdate={onStatusUpdate}
      />
    </>
  );
};

export default OrderTable;