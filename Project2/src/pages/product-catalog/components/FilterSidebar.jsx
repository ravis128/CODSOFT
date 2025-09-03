import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFilterChange, isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: true,
    rating: true
  });

  const [priceRange, setPriceRange] = useState({
    min: filters?.priceRange?.min || '',
    max: filters?.priceRange?.max || ''
  });

  const categories = [
    { id: 'electronics', label: 'Electronics', count: 245 },
    { id: 'clothing', label: 'Clothing', count: 189 },
    { id: 'home', label: 'Home & Garden', count: 156 },
    { id: 'sports', label: 'Sports & Outdoors', count: 134 },
    { id: 'books', label: 'Books', count: 98 },
    { id: 'beauty', label: 'Beauty & Personal Care', count: 87 }
  ];

  const brands = [
    { id: 'apple', label: 'Apple', count: 45 },
    { id: 'samsung', label: 'Samsung', count: 38 },
    { id: 'nike', label: 'Nike', count: 32 },
    { id: 'adidas', label: 'Adidas', count: 28 },
    { id: 'sony', label: 'Sony', count: 25 },
    { id: 'lg', label: 'LG', count: 22 }
  ];

  const ratings = [
    { id: '4plus', label: '4 Stars & Up', value: 4, count: 156 },
    { id: '3plus', label: '3 Stars & Up', value: 3, count: 234 },
    { id: '2plus', label: '2 Stars & Up', value: 2, count: 298 },
    { id: '1plus', label: '1 Star & Up', value: 1, count: 345 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleCategoryChange = (categoryId, checked) => {
    const updatedCategories = checked
      ? [...(filters?.categories || []), categoryId]
      : (filters?.categories || [])?.filter(id => id !== categoryId);
    
    onFilterChange({ ...filters, categories: updatedCategories });
  };

  const handleBrandChange = (brandId, checked) => {
    const updatedBrands = checked
      ? [...(filters?.brands || []), brandId]
      : (filters?.brands || [])?.filter(id => id !== brandId);
    
    onFilterChange({ ...filters, brands: updatedBrands });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ ...filters, rating: filters?.rating === rating ? null : rating });
  };

  const handlePriceRangeChange = () => {
    const min = priceRange?.min ? parseFloat(priceRange?.min) : null;
    const max = priceRange?.max ? parseFloat(priceRange?.max) : null;
    
    onFilterChange({ 
      ...filters, 
      priceRange: (min || max) ? { min, max } : null 
    });
  };

  const clearAllFilters = () => {
    setPriceRange({ min: '', max: '' });
    onFilterChange({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.categories?.length) count += filters?.categories?.length;
    if (filters?.brands?.length) count += filters?.brands?.length;
    if (filters?.rating) count += 1;
    if (filters?.priceRange) count += 1;
    return count;
  };

  const FilterSection = ({ title, section, children }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-muted/50 transition-colors duration-200"
      >
        <span className="font-medium text-foreground">{title}</span>
        <Icon 
          name={expandedSections?.[section] ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          className="text-muted-foreground" 
        />
      </button>
      {expandedSections?.[section] && (
        <div className="pb-4 space-y-3">
          {children}
        </div>
      )}
    </div>
  );

  const sidebarContent = (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Categories */}
        <FilterSection title="Categories" section="category">
          <div className="space-y-2">
            {categories?.map((category) => (
              <div key={category?.id} className="flex items-center justify-between">
                <Checkbox
                  label={category?.label}
                  checked={filters?.categories?.includes(category?.id) || false}
                  onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
                />
                <span className="text-xs text-muted-foreground">
                  {category?.count}
                </span>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" section="price">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={priceRange?.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e?.target?.value }))}
                onBlur={handlePriceRangeChange}
              />
              <Input
                type="number"
                placeholder="Max"
                value={priceRange?.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e?.target?.value }))}
                onBlur={handlePriceRangeChange}
              />
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>$0</span>
              <div className="flex-1 h-1 bg-muted rounded-full">
                <div className="h-full bg-primary rounded-full w-1/3"></div>
              </div>
              <span>$1000+</span>
            </div>
          </div>
        </FilterSection>

        {/* Brands */}
        <FilterSection title="Brands" section="brand">
          <div className="space-y-2">
            {brands?.map((brand) => (
              <div key={brand?.id} className="flex items-center justify-between">
                <Checkbox
                  label={brand?.label}
                  checked={filters?.brands?.includes(brand?.id) || false}
                  onChange={(e) => handleBrandChange(brand?.id, e?.target?.checked)}
                />
                <span className="text-xs text-muted-foreground">
                  {brand?.count}
                </span>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Customer Rating" section="rating">
          <div className="space-y-2">
            {ratings?.map((rating) => (
              <button
                key={rating?.id}
                onClick={() => handleRatingChange(rating?.value)}
                className={`w-full flex items-center justify-between p-2 rounded-md text-left transition-colors duration-200 ${
                  filters?.rating === rating?.value
                    ? 'bg-primary/10 text-primary' :'hover:bg-muted text-foreground'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={12}
                        className={`${
                          i < rating?.value ? 'text-amber-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm">{rating?.label}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {rating?.count}
                </span>
              </button>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 h-full">
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-1200 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-card shadow-lg animate-slide-in">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;