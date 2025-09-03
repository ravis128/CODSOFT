import React from 'react';

import Button from '../../../components/ui/Button';

const ProductFilters = ({ filters, onFilterChange, onClearFilters, isVisible }) => {
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

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'draft', label: 'Draft' }
  ];

  const stockLevels = [
    { value: 'in-stock', label: 'In Stock' },
    { value: 'low-stock', label: 'Low Stock (< 10)' },
    { value: 'out-of-stock', label: 'Out of Stock' }
  ];

  if (!isVisible) return null;

  return (
    <div className="bg-muted/30 border-b border-border p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Category
          </label>
          <select
            value={filters?.category}
            onChange={(e) => onFilterChange('category', e?.target?.value)}
            className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
          >
            <option value="">All Categories</option>
            {categories?.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Status
          </label>
          <select
            value={filters?.status}
            onChange={(e) => onFilterChange('status', e?.target?.value)}
            className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
          >
            <option value="">All Status</option>
            {statusOptions?.map(status => (
              <option key={status?.value} value={status?.value}>
                {status?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Level Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Stock Level
          </label>
          <select
            value={filters?.stockLevel}
            onChange={(e) => onFilterChange('stockLevel', e?.target?.value)}
            className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
          >
            <option value="">All Stock Levels</option>
            {stockLevels?.map(level => (
              <option key={level?.value} value={level?.value}>
                {level?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Price Range
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters?.priceMin}
              onChange={(e) => onFilterChange('priceMin', e?.target?.value)}
              className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters?.priceMax}
              onChange={(e) => onFilterChange('priceMax', e?.target?.value)}
              className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
            />
          </div>
        </div>
      </div>
      {/* Clear Filters */}
      <div className="mt-4 flex justify-end">
        <Button
          variant="outline"
          onClick={onClearFilters}
          iconName="X"
          iconPosition="left"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;