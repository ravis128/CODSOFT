import React from 'react';
import Skeleton from '../../../components/ui/Skeleton';
import ProductCard from './ProductCard';
import Button from '../../../components/ui/Button';

const ProductGrid = ({ 
  products, 
  loading, 
  onViewDetails, 
  onQuickAdd,
  hasMore,
  fetchMoreData 
}) => {
  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex items-center space-x-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-8" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-12 h-12 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No products found
      </h3>
      <p className="text-muted-foreground max-w-md">
        We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* Loading Skeletons */}
        {loading && products?.length === 0 && (
          <>
            {[...Array(20)]?.map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </>
        )}

        {/* Product Cards */}
        {products?.map((product) => (
          <ProductCard
            key={product?.id}
            product={product}
            onProductClick={() => onViewDetails(product.id)}
            onQuickAdd={onQuickAdd}
          />
        ))}

        {/* Loading More Skeletons */}
        {loading && products?.length > 0 && (
          <>
            {[...Array(8)]?.map((_, index) => (
              <SkeletonCard key={`loading-skeleton-${index}`} />
            ))}
          </>
        )}
      </div>
      {/* Empty State */}
      {!loading && products?.length === 0 && <EmptyState />}
      {/* Load More Button */}
      {!loading && products?.length > 0 && hasMore && (
        <div className="flex justify-center pt-8">
          <Button size="lg" onClick={fetchMoreData} iconName="ChevronDown">
            Load More Products
          </Button>
        </div>
      )}
      {/* End of Results */}
      {!loading && products?.length > 0 && !hasMore && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            You've reached the end of our product catalog
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;