import React from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PaginationControls = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) => {
  const pageSizeOptions = [
    { value: '12', label: '12 per page' },
    { value: '24', label: '24 per page' },
    { value: '48', label: '48 per page' },
    { value: '96', label: '96 per page' }
  ];

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, '...');
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className="bg-card border-t border-border px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Results Info */}
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">
            Showing {startItem} to {endItem} of {totalItems} projects
          </p>
          
          <Select
            options={pageSizeOptions}
            value={itemsPerPage?.toString()}
            onChange={onItemsPerPageChange}
            className="w-32"
          />
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconPosition="left"
            iconSize={16}
          >
            Previous
          </Button>

          {/* Page Numbers */}
          <div className="hidden sm:flex items-center space-x-1">
            {getVisiblePages()?.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-sm text-muted-foreground">...</span>
                ) : (
                  <Button
                    variant={currentPage === page ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onPageChange(page)}
                    className="w-10 h-10 p-0"
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Page Info */}
          <div className="sm:hidden flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
            iconSize={16}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;