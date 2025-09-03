import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ sortBy, onSortChange, resultsCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match', icon: 'Target' },
    { value: 'price-low-high', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high-low', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'rating', label: 'Customer Rating', icon: 'Star' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'popularity', label: 'Most Popular', icon: 'TrendingUp' }
  ];

  const currentSort = sortOptions?.find(option => option?.value === sortBy) || sortOptions?.[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-background border-b border-border">
      {/* Results Count */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {resultsCount?.toLocaleString()} results
        </span>
      </div>
      {/* Sort Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          onClick={toggleDropdown}
          className="min-w-[180px] justify-between"
          iconName={isOpen ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="right"
        >
          <div className="flex items-center gap-2">
            <Icon name={currentSort?.icon} size={16} />
            <span className="hidden sm:inline">Sort by:</span>
            <span className="font-medium">{currentSort?.label}</span>
          </div>
        </Button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg z-1100 animate-fade-in">
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border mb-2">
                Sort Options
              </div>
              
              {sortOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleSortSelect(option?.value)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors duration-200 ${
                    sortBy === option?.value
                      ? 'bg-primary/10 text-primary' :'text-popover-foreground hover:bg-muted'
                  }`}
                >
                  <Icon 
                    name={option?.icon} 
                    size={16} 
                    className={sortBy === option?.value ? 'text-primary' : 'text-muted-foreground'} 
                  />
                  <span className="flex-1">{option?.label}</span>
                  {sortBy === option?.value && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;