import React from 'react';

import Button from '../../../components/ui/Button';

const ProductPagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange, 
  onItemsPerPageChange 
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages?.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      if (start > 1) {
        pages?.push(1);
        if (start > 2) pages?.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages?.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) pages?.push('...');
        pages?.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageSizeOptions = [10, 25, 50, 100];

  return (
    <div className="bg-card border-t border-border px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Items per page and info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e?.target?.value))}
              className="border border-border rounded-md px-2 py-1 text-sm bg-background text-foreground"
            >
              {pageSizeOptions?.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm text-muted-foreground">per page</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Showing {startItem}-{endItem} of {totalItems} products
          </div>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-2">
          {/* Previous button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
          />

          {/* Page numbers */}
          <div className="hidden sm:flex items-center gap-1">
            {getPageNumbers()?.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-sm text-muted-foreground">...</span>
                ) : (
                  <Button
                    variant={currentPage === page ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onPageChange(page)}
                    className="min-w-[40px]"
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile page indicator */}
          <div className="sm:hidden flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {/* Next button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPagination;