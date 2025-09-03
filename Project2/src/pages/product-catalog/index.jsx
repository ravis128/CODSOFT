import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import CustomerNavigation from '../../components/ui/CustomerNavigation';
import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';
import FilterChips from './components/FilterChips';
import SortDropdown from './components/SortDropdown';
import ProductGrid from './components/ProductGrid';
import QuickAddModal from './components/QuickAddModal';
import { useCart } from '../../context/CartContext';

import Button from '../../components/ui/Button';
import SEO from '../../components/SEO';

const ProductCatalog = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, getCartItemCount } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('relevance');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const PRODUCTS_PER_PAGE = 20;

  // Mock user data
  const mockUser = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      category: "electronics",
      brand: "apple",
      price: 1199.99,
      originalPrice: 1299.99,
      rating: 4.8,
      reviewCount: 2847,
      stock: 15,
      isOnSale: true,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      category: "electronics",
      brand: "samsung",
      price: 1099.99,
      rating: 4.7,
      reviewCount: 1923,
      stock: 8,
      isOnSale: false,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Nike Air Max 270",
      category: "clothing",
      brand: "nike",
      price: 149.99,
      originalPrice: 179.99,
      rating: 4.6,
      reviewCount: 856,
      stock: 25,
      isOnSale: true,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "MacBook Pro 16-inch",
      category: "electronics",
      brand: "apple",
      price: 2399.99,
      rating: 4.9,
      reviewCount: 1456,
      stock: 5,
      isOnSale: false,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      name: "Adidas Ultraboost 22",
      category: "clothing",
      brand: "adidas",
      price: 189.99,
      rating: 4.5,
      reviewCount: 634,
      stock: 18,
      isOnSale: false,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop"
    },
    {
      id: 6,
      name: "Sony WH-1000XM5 Headphones",
      category: "electronics",
      brand: "sony",
      price: 399.99,
      originalPrice: 449.99,
      rating: 4.8,
      reviewCount: 2156,
      stock: 12,
      isOnSale: true,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
    },
    {
      id: 7,
      name: "The Great Gatsby - Classic Edition",
      category: "books",
      brand: "penguin",
      price: 12.99,
      rating: 4.4,
      reviewCount: 3421,
      stock: 45,
      isOnSale: false,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop"
    },
    {
      id: 8,
      name: "Organic Face Moisturizer",
      category: "beauty",
      brand: "naturals",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.3,
      reviewCount: 789,
      stock: 32,
      isOnSale: true,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop"
    },
    {
      id: 9,
      name: "Smart Garden Planter",
      category: "home",
      brand: "greentech",
      price: 89.99,
      rating: 4.2,
      reviewCount: 234,
      stock: 7,
      isOnSale: false,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop"
    },
    {
      id: 10,
      name: "Yoga Mat Premium",
      category: "sports",
      brand: "fitlife",
      price: 49.99,
      rating: 4.6,
      reviewCount: 567,
      stock: 28,
      isOnSale: false,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop"
    },
    {
      id: 11,
      name: "iPad Air 5th Generation",
      category: "electronics",
      brand: "apple",
      price: 599.99,
      rating: 4.7,
      reviewCount: 1234,
      stock: 20,
      isOnSale: false,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop"
    },
    {
      id: 12,
      name: "Wireless Bluetooth Speaker",
      category: "electronics",
      brand: "sony",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.4,
      reviewCount: 892,
      stock: 15,
      isOnSale: true,
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=400&fit=crop"
    }
  ];

  const generateMoreProducts = (page) => {
    if (mockProducts.length === 0) {
      return [];
    }
    const newProducts = [];
    const startId = (page - 1) * PRODUCTS_PER_PAGE + products.length + 1;
    for (let i = 0; i < PRODUCTS_PER_PAGE; i++) {
      const templateProduct = mockProducts[i % mockProducts.length];
      newProducts.push({
        ...templateProduct,
        id: startId + i,
        name: `${templateProduct.name} #${startId + i}`,
      });
    }
    return newProducts;
  };

  const applyFiltersAndSort = useCallback((prods) => {
    let tempProducts = [...prods];

    // Filtering
    if (filters.categories && filters.categories.length > 0) {
      tempProducts = tempProducts.filter(p => filters.categories.includes(p.category));
    }
    if (filters.brands && filters.brands.length > 0) {
      tempProducts = tempProducts.filter(p => filters.brands.includes(p.brand));
    }
    if (filters.priceRange) {
      tempProducts = tempProducts.filter(p => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max);
    }
    if (filters.rating && filters.rating > 0) {
      tempProducts = tempProducts.filter(p => p.rating >= filters.rating);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        tempProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        tempProducts.sort((a, b) => b.id - a.id);
        break;
      default: // relevance
        break;
    }

    return tempProducts;
  }, [filters, sortBy]);


  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['catalogProducts'],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 800));
      return mockProducts;
    }
  });

  useEffect(() => {
    setLoading(productsLoading);
    if (productsData) setProducts(productsData);
  }, [productsLoading, productsData]);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedAndFiltered = applyFiltersAndSort(filtered);
    setFilteredProducts(sortedAndFiltered);
  }, [products, searchTerm, filters, sortBy, applyFiltersAndSort]);


  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
  };

  const handleQuickAdd = (product) => {
    setSelectedProduct(product);
    setIsQuickAddModalOpen(true);
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
    setIsQuickAddModalOpen(false);
  };

  const handleViewDetails = (productId) => {
    const product = filteredProducts.find(p => p.id === productId) || products.find(p => p.id === productId);
    navigate(`/product/${productId}`, { state: { product } });
  };

  const fetchMoreData = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      const newProducts = generateMoreProducts(currentPage + 1);
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts(prevProducts => [...prevProducts, ...newProducts]);
        setCurrentPage(prevPage => prevPage + 1);
      }
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      <SEO
        title={`Products – EcommerceHub`}
        description="Browse products across electronics, fashion, home, beauty and more. Filter by category, price, brand and rating."
        canonical={window.location.origin + '/product-catalog'}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Product Catalog',
          url: window.location.origin + '/product-catalog',
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
              { '@type': 'ListItem', position: 2, name: 'Products', item: window.location.origin + '/product-catalog' }
            ]
          }
        }}
      />
      <CustomerNavigation user={mockUser} cartItemCount={getCartItemCount()} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-neutral-800">Products</h1>
          <div className="flex items-center gap-4">
            <SearchBar onSearch={handleSearch} />
            <Button
              variant="secondary"
              onClick={() => setIsFilterSidebarOpen(true)}
              className="lg:hidden"
            >
              Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          <FilterSidebar
            isOpen={isFilterSidebarOpen}
            onClose={() => setIsFilterSidebarOpen(false)}
            onFilterChange={handleFilterChange}
            filters={filters}
          />

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <FilterChips filters={filters} onFilterChange={handleFilterChange} onClearAll={() => setFilters({})} />
              <SortDropdown onSortChange={handleSortChange} />
            </div>

            <ProductGrid
              products={filteredProducts}
              loading={loading}
              onQuickAdd={handleQuickAdd}
              onViewDetails={handleViewDetails}
              fetchMoreData={fetchMoreData}
              hasMore={hasMore}
              isRefreshing={isRefreshing}
            />
          </div>
        </div>
      </main>

      {isQuickAddModalOpen && selectedProduct && (
        <QuickAddModal
          product={selectedProduct}
          isOpen={isQuickAddModalOpen}
          onClose={() => setIsQuickAddModalOpen(false)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default ProductCatalog;