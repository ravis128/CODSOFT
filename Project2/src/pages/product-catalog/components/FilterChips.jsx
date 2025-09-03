import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ filters, onFilterChange, onClearAll }) => {
  const getActiveFilters = () => {
    const activeFilters = [];

    // Categories
    if (filters?.categories?.length > 0) {
      filters?.categories?.forEach(categoryId => {
        const categoryNames = {
          'electronics': 'Electronics',
          'clothing': 'Clothing',
          'home': 'Home & Garden',
          'sports': 'Sports & Outdoors',
          'books': 'Books',
          'beauty': 'Beauty & Personal Care'
        };
        activeFilters?.push({
          type: 'category',
          id: categoryId,
          label: categoryNames?.[categoryId] || categoryId,
          value: categoryId
        });
      });
    }

    // Brands
    if (filters?.brands?.length > 0) {
      filters?.brands?.forEach(brandId => {
        const brandNames = {
          'apple': 'Apple',
          'samsung': 'Samsung',
          'nike': 'Nike',
          'adidas': 'Adidas',
          'sony': 'Sony',
          'lg': 'LG'
        };
        activeFilters?.push({
          type: 'brand',
          id: brandId,
          label: brandNames?.[brandId] || brandId,
          value: brandId
        });
      });
    }

    // Price Range
    if (filters?.priceRange) {
      const { min, max } = filters?.priceRange;
      let priceLabel = 'Price: ';
      if (min && max) {
        priceLabel += `$${min} - $${max}`;
      } else if (min) {
        priceLabel += `$${min}+`;
      } else if (max) {
        priceLabel += `Under $${max}`;
      }
      
      activeFilters?.push({
        type: 'priceRange',
        id: 'priceRange',
        label: priceLabel,
        value: filters?.priceRange
      });
    }

    // Rating
    if (filters?.rating) {
      activeFilters?.push({
        type: 'rating',
        id: 'rating',
        label: `${filters?.rating}+ Stars`,
        value: filters?.rating
      });
    }

    return activeFilters;
  };

  const removeFilter = (filterToRemove) => {
    const updatedFilters = { ...filters };

    switch (filterToRemove?.type) {
      case 'category':
        updatedFilters.categories = updatedFilters?.categories?.filter(
          id => id !== filterToRemove?.value
        );
        if (updatedFilters?.categories?.length === 0) {
          delete updatedFilters?.categories;
        }
        break;
      
      case 'brand':
        updatedFilters.brands = updatedFilters?.brands?.filter(
          id => id !== filterToRemove?.value
        );
        if (updatedFilters?.brands?.length === 0) {
          delete updatedFilters?.brands;
        }
        break;
      
      case 'priceRange':
        delete updatedFilters?.priceRange;
        break;
      
      case 'rating':
        delete updatedFilters?.rating;
        break;
      
      default:
        break;
    }

    onFilterChange(updatedFilters);
  };

  const activeFilters = getActiveFilters();

  if (activeFilters?.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 p-4 bg-muted/30 border-b border-border overflow-x-auto">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <span className="text-sm font-medium text-foreground whitespace-nowrap">
          Active Filters:
        </span>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {activeFilters?.map((filter) => (
            <div
              key={`${filter?.type}-${filter?.id}`}
              className="flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-sm whitespace-nowrap"
            >
              <span>{filter?.label}</span>
              <button
                onClick={() => removeFilter(filter)}
                className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
                aria-label={`Remove ${filter?.label} filter`}
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
      {activeFilters?.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground whitespace-nowrap"
        >
          Clear All
        </Button>
      )}
    </div>
  );
};

export default FilterChips;