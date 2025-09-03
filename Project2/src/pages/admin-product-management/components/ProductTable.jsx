import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductTable = ({ 
  products, 
  selectedProducts, 
  onSelectProduct, 
  onSelectAll, 
  onEditProduct, 
  onToggleStatus, 
  onQuickPreview,
  sortConfig,
  onSort 
}) => {
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleCellEdit = (productId, field, currentValue) => {
    setEditingCell(`${productId}-${field}`);
    setEditValue(currentValue);
  };

  const handleCellSave = (productId, field) => {
    // Handle inline editing save
    console.log(`Saving ${field} for product ${productId}: ${editValue}`);
    setEditingCell(null);
    setEditValue('');
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-success/10', text: 'text-success', label: 'Active' },
      inactive: { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Inactive' },
      draft: { bg: 'bg-warning/10', text: 'text-warning', label: 'Draft' }
    };

    const config = statusConfig?.[status] || statusConfig?.inactive;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        {config?.label}
      </span>
    );
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { color: 'text-error', label: 'Out of Stock' };
    if (stock < 10) return { color: 'text-warning', label: 'Low Stock' };
    return { color: 'text-success', label: 'In Stock' };
  };

  return (
    <div className="bg-card">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="w-12 px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedProducts?.length === products?.length && products?.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-foreground">
                Product
              </th>
              {['name', 'sku', 'category', 'price', 'stock']?.map(column => (
                <th key={column} className="text-left px-6 py-4 text-sm font-medium text-foreground">
                  <button
                    onClick={() => onSort(column)}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    {column?.charAt(0)?.toUpperCase() + column?.slice(1)}
                    <Icon name={getSortIcon(column)} size={14} />
                  </button>
                </th>
              ))}
              <th className="text-left px-6 py-4 text-sm font-medium text-foreground">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-foreground">Last Modified</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products?.map((product) => (
              <tr key={product?.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts?.includes(product?.id)}
                    onChange={() => onSelectProduct(product?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={product?.image}
                        alt={product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => onQuickPreview(product)}
                      className="text-left hover:text-primary transition-colors"
                    >
                      <div className="font-medium text-foreground truncate max-w-48">
                        {product?.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ID: {product?.id}
                      </div>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{product?.name}</td>
                <td className="px-6 py-4 text-sm text-foreground font-mono">{product?.sku}</td>
                <td className="px-6 py-4 text-sm text-foreground">{product?.category}</td>
                <td className="px-6 py-4">
                  {editingCell === `${product?.id}-price` ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e?.target?.value)}
                        className="w-20 px-2 py-1 text-sm border border-border rounded"
                        step="0.01"
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => handleCellSave(product?.id, 'price')}
                        iconName="Check"
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={handleCellCancel}
                        iconName="X"
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => handleCellEdit(product?.id, 'price', product?.price)}
                      className="text-sm text-foreground hover:text-primary transition-colors"
                    >
                      {formatPrice(product?.price)}
                    </button>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingCell === `${product?.id}-stock` ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e?.target?.value)}
                        className="w-16 px-2 py-1 text-sm border border-border rounded"
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => handleCellSave(product?.id, 'stock')}
                        iconName="Check"
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={handleCellCancel}
                        iconName="X"
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => handleCellEdit(product?.id, 'stock', product?.stock)}
                      className="text-left"
                    >
                      <div className="text-sm text-foreground">{product?.stock}</div>
                      <div className={`text-xs ${getStockStatus(product?.stock)?.color}`}>
                        {getStockStatus(product?.stock)?.label}
                      </div>
                    </button>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onToggleStatus(product?.id, product?.status)}
                    className="hover:scale-105 transition-transform"
                  >
                    {getStatusBadge(product?.status)}
                  </button>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(product.lastModified)?.toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onQuickPreview(product)}
                      iconName="Eye"
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onEditProduct(product?.id)}
                      iconName="Edit"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card Layout */}
      <div className="lg:hidden divide-y divide-border">
        {products?.map((product) => (
          <div key={product?.id} className="p-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={selectedProducts?.includes(product?.id)}
                onChange={() => onSelectProduct(product?.id)}
                className="mt-1 rounded border-border"
              />
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground truncate">{product?.name}</h3>
                    <p className="text-sm text-muted-foreground">SKU: {product?.sku}</p>
                    <p className="text-sm text-muted-foreground">{product?.category}</p>
                  </div>
                  {getStatusBadge(product?.status)}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-foreground">{formatPrice(product?.price)}</span>
                    <span className={`text-sm ${getStockStatus(product?.stock)?.color}`}>
                      Stock: {product?.stock}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onQuickPreview(product)}
                      iconName="Eye"
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onEditProduct(product?.id)}
                      iconName="Edit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTable;