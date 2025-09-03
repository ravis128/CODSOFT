import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductPreviewModal = ({ product, isOpen, onClose, onEdit }) => {
  if (!isOpen || !product) return null;

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
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config?.bg} ${config?.text}`}>
        {config?.label}
      </span>
    );
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { color: 'text-error', label: 'Out of Stock', icon: 'AlertCircle' };
    if (stock < 10) return { color: 'text-warning', label: 'Low Stock', icon: 'AlertTriangle' };
    return { color: 'text-success', label: 'In Stock', icon: 'CheckCircle' };
  };

  const stockStatus = getStockStatus(product?.stock);

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Product Preview</h2>
          <Button
            variant="ghost"
            size="xs"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Additional Images */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4]?.map((index) => (
                  <div key={index} className="aspect-square rounded-md overflow-hidden bg-muted">
                    <Image
                      src={product?.image}
                      alt={`${product?.name} view ${index}`}
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-2xl font-bold text-foreground">{product?.name}</h3>
                  {getStatusBadge(product?.status)}
                </div>
                <p className="text-muted-foreground">{product?.description}</p>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">SKU</label>
                  <p className="text-foreground font-mono">{product?.sku}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Category</label>
                  <p className="text-foreground">{product?.category}</p>
                </div>
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Price</label>
                  <p className="text-2xl font-bold text-foreground">{formatPrice(product?.price)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Stock</label>
                  <div className="flex items-center gap-2">
                    <Icon name={stockStatus?.icon} size={16} className={stockStatus?.color} />
                    <span className="text-lg font-semibold text-foreground">{product?.stock}</span>
                    <span className={`text-sm ${stockStatus?.color}`}>
                      {stockStatus?.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Brand</span>
                  <span className="text-sm text-foreground">{product?.brand || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Weight</span>
                  <span className="text-sm text-foreground">{product?.weight || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Dimensions</span>
                  <span className="text-sm text-foreground">{product?.dimensions || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="text-sm text-foreground">
                    {new Date(product.createdAt)?.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Modified</span>
                  <span className="text-sm text-foreground">
                    {new Date(product.lastModified)?.toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Tags */}
              {product?.tags && product?.tags?.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {product?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="default"
            onClick={() => onEdit(product?.id)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPreviewModal;