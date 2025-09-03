import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddProductModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    brand: '',
    weight: '',
    dimensions: '',
    tags: '',
    status: 'draft'
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports & Outdoors',
    'Books',
    'Health & Beauty',
    'Toys & Games',
    'Automotive'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData?.sku?.trim()) {
      newErrors.sku = 'SKU is required';
    }

    if (!formData?.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData?.price || parseFloat(formData?.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData?.stock || parseInt(formData?.stock) < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData?.price),
        stock: parseInt(formData?.stock),
        tags: formData?.tags?.split(',')?.map(tag => tag?.trim())?.filter(tag => tag),
        id: Date.now()?.toString(),
        image: `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop`,
        createdAt: new Date()?.toISOString(),
        lastModified: new Date()?.toISOString()
      };

      await onSave(productData);
      handleClose();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      sku: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      brand: '',
      weight: '',
      dimensions: '',
      tags: '',
      status: 'draft'
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Add New Product</h2>
          <Button
            variant="ghost"
            size="xs"
            onClick={handleClose}
            iconName="X"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
              
              <Input
                label="Product Name"
                type="text"
                placeholder="Enter product name"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                error={errors?.name}
                required
              />

              <Input
                label="SKU"
                type="text"
                placeholder="Enter SKU"
                value={formData?.sku}
                onChange={(e) => handleInputChange('sku', e?.target?.value)}
                error={errors?.sku}
                required
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category *
                </label>
                <select
                  value={formData?.category}
                  onChange={(e) => handleInputChange('category', e?.target?.value)}
                  className={`w-full border rounded-md px-3 py-2 bg-background text-foreground ${
                    errors?.category ? 'border-error' : 'border-border'
                  }`}
                  required
                >
                  <option value="">Select category</option>
                  {categories?.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors?.category && (
                  <p className="mt-1 text-sm text-error">{errors?.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <select
                  value={formData?.status}
                  onChange={(e) => handleInputChange('status', e?.target?.value)}
                  className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Pricing and Inventory */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Pricing & Inventory</h3>
              
              <Input
                label="Price"
                type="number"
                placeholder="0.00"
                value={formData?.price}
                onChange={(e) => handleInputChange('price', e?.target?.value)}
                error={errors?.price}
                step="0.01"
                min="0"
                required
              />

              <Input
                label="Stock Quantity"
                type="number"
                placeholder="0"
                value={formData?.stock}
                onChange={(e) => handleInputChange('stock', e?.target?.value)}
                error={errors?.stock}
                min="0"
                required
              />

              <Input
                label="Brand"
                type="text"
                placeholder="Enter brand name"
                value={formData?.brand}
                onChange={(e) => handleInputChange('brand', e?.target?.value)}
              />

              <Input
                label="Weight"
                type="text"
                placeholder="e.g., 1.5 kg"
                value={formData?.weight}
                onChange={(e) => handleInputChange('weight', e?.target?.value)}
              />

              <Input
                label="Dimensions"
                type="text"
                placeholder="e.g., 10 x 5 x 3 cm"
                value={formData?.dimensions}
                onChange={(e) => handleInputChange('dimensions', e?.target?.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description *
            </label>
            <textarea
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              placeholder="Enter product description"
              rows={4}
              className={`w-full border rounded-md px-3 py-2 bg-background text-foreground resize-none ${
                errors?.description ? 'border-error' : 'border-border'
              }`}
              required
            />
            {errors?.description && (
              <p className="mt-1 text-sm text-error">{errors?.description}</p>
            )}
          </div>

          {/* Tags */}
          <Input
            label="Tags"
            type="text"
            placeholder="Enter tags separated by commas"
            value={formData?.tags}
            onChange={(e) => handleInputChange('tags', e?.target?.value)}
            description="Separate multiple tags with commas"
          />

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
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
              variant="default"
              loading={isLoading}
              iconName="Plus"
              iconPosition="left"
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;