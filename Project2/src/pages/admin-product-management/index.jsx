import React, { useState, useEffect, useMemo } from 'react';
import AdminNavigation from '../../components/ui/AdminNavigation';
import ProductTableHeader from './components/ProductTableHeader';
import ProductFilters from './components/ProductFilters';
import ProductTable from './components/ProductTable';
import ProductPreviewModal from './components/ProductPreviewModal';
import ProductPagination from './components/ProductPagination';
import AddProductModal from './components/AddProductModal';

const AdminProductManagement = () => {
  // Mock user data
  const mockUser = {
    name: "Admin User",
    email: "admin@ecommercehub.com",
    role: "administrator"
  };

  // Mock products data
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      sku: "WBH-001",
      category: "Electronics",
      price: 79.99,
      stock: 45,
      status: "active",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
      brand: "AudioTech",
      weight: "250g",
      dimensions: "18 x 15 x 8 cm",
      tags: ["wireless", "bluetooth", "headphones", "audio"],
      createdAt: "2025-01-15T10:30:00Z",
      lastModified: "2025-08-25T14:22:00Z"
    },
    {
      id: "2",
      name: "Organic Cotton T-Shirt",
      sku: "OCT-002",
      category: "Clothing",
      price: 24.99,
      stock: 120,
      status: "active",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      description: "Comfortable organic cotton t-shirt available in multiple colors and sizes.",
      brand: "EcoWear",
      weight: "180g",
      dimensions: "Various sizes",
      tags: ["organic", "cotton", "t-shirt", "clothing"],
      createdAt: "2025-02-10T09:15:00Z",
      lastModified: "2025-08-20T11:45:00Z"
    },
    {
      id: "3",
      name: "Smart Home Security Camera",
      sku: "SHSC-003",
      category: "Electronics",
      price: 149.99,
      stock: 8,
      status: "active",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      description: "1080p HD security camera with night vision, motion detection, and mobile app control.",
      brand: "SecureHome",
      weight: "320g",
      dimensions: "10 x 10 x 12 cm",
      tags: ["security", "camera", "smart home", "surveillance"],
      createdAt: "2025-03-05T16:20:00Z",
      lastModified: "2025-08-28T09:30:00Z"
    },
    {
      id: "4",
      name: "Yoga Exercise Mat",
      sku: "YEM-004",
      category: "Sports & Outdoors",
      price: 39.99,
      stock: 0,
      status: "active",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
      description: "Non-slip yoga mat made from eco-friendly materials, perfect for all types of yoga practice.",
      brand: "ZenFit",
      weight: "1.2kg",
      dimensions: "183 x 61 x 0.6 cm",
      tags: ["yoga", "exercise", "mat", "fitness"],
      createdAt: "2025-04-12T12:00:00Z",
      lastModified: "2025-08-26T15:10:00Z"
    },
    {
      id: "5",
      name: "Stainless Steel Water Bottle",
      sku: "SSWB-005",
      category: "Home & Garden",
      price: 19.99,
      stock: 85,
      status: "inactive",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
      description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
      brand: "HydroLife",
      weight: "450g",
      dimensions: "26 x 7 x 7 cm",
      tags: ["water bottle", "stainless steel", "insulated", "eco-friendly"],
      createdAt: "2025-05-08T14:30:00Z",
      lastModified: "2025-08-22T10:15:00Z"
    },
    {
      id: "6",
      name: "Gaming Mechanical Keyboard",
      sku: "GMK-006",
      category: "Electronics",
      price: 129.99,
      stock: 32,
      status: "active",
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
      description: "RGB backlit mechanical keyboard with blue switches, perfect for gaming and typing.",
      brand: "GamePro",
      weight: "1.1kg",
      dimensions: "44 x 13 x 3.5 cm",
      tags: ["gaming", "keyboard", "mechanical", "rgb"],
      createdAt: "2025-06-15T11:45:00Z",
      lastModified: "2025-08-29T13:20:00Z"
    },
    {
      id: "7",
      name: "Essential Oil Diffuser",
      sku: "EOD-007",
      category: "Health & Beauty",
      price: 49.99,
      stock: 67,
      status: "draft",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
      description: "Ultrasonic essential oil diffuser with LED lights and timer settings for aromatherapy.",
      brand: "AromaZen",
      weight: "600g",
      dimensions: "16 x 16 x 14 cm",
      tags: ["essential oils", "diffuser", "aromatherapy", "wellness"],
      createdAt: "2025-07-20T08:30:00Z",
      lastModified: "2025-08-30T06:45:00Z"
    }
  ]);

  // State management
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    stockLevel: '',
    priceMin: '',
    priceMax: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(query) ||
        product?.sku?.toLowerCase()?.includes(query) ||
        product?.category?.toLowerCase()?.includes(query)
      );
    }

    // Category filter
    if (filters?.category) {
      filtered = filtered?.filter(product => product?.category === filters?.category);
    }

    // Status filter
    if (filters?.status) {
      filtered = filtered?.filter(product => product?.status === filters?.status);
    }

    // Stock level filter
    if (filters?.stockLevel) {
      switch (filters?.stockLevel) {
        case 'in-stock':
          filtered = filtered?.filter(product => product?.stock > 10);
          break;
        case 'low-stock':
          filtered = filtered?.filter(product => product?.stock > 0 && product?.stock <= 10);
          break;
        case 'out-of-stock':
          filtered = filtered?.filter(product => product?.stock === 0);
          break;
      }
    }

    // Price range filter
    if (filters?.priceMin) {
      filtered = filtered?.filter(product => product?.price >= parseFloat(filters?.priceMin));
    }
    if (filters?.priceMax) {
      filtered = filtered?.filter(product => product?.price <= parseFloat(filters?.priceMax));
    }

    return filtered;
  }, [products, searchQuery, filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    sorted?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];

      if (typeof aValue === 'string') {
        return sortConfig?.direction === 'asc'
          ? aValue?.localeCompare(bValue)
          : bValue?.localeCompare(aValue);
      }

      if (typeof aValue === 'number') {
        return sortConfig?.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });
    return sorted;
  }, [filteredProducts, sortConfig]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts?.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedProducts?.length / itemsPerPage);

  // Event handlers
  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev =>
      prev?.includes(productId)
        ? prev?.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts(
      selectedProducts?.length === paginatedProducts?.length
        ? []
        : paginatedProducts?.map(product => product?.id)
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Performing bulk action: ${action} on products:`, selectedProducts);
    
    switch (action) {
      case 'delete':
        setProducts(prev => prev?.filter(product => !selectedProducts?.includes(product?.id)));
        break;
      case 'activate':
        setProducts(prev => prev?.map(product =>
          selectedProducts?.includes(product?.id)
            ? { ...product, status: 'active', lastModified: new Date()?.toISOString() }
            : product
        ));
        break;
      case 'deactivate':
        setProducts(prev => prev?.map(product =>
          selectedProducts?.includes(product?.id)
            ? { ...product, status: 'inactive', lastModified: new Date()?.toISOString() }
            : product
        ));
        break;
      case 'export':
        // Handle export logic
        console.log('Exporting selected products...');
        break;
    }
    
    setSelectedProducts([]);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      status: '',
      stockLevel: '',
      priceMin: '',
      priceMax: ''
    });
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleToggleStatus = (productId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    setProducts(prev => prev?.map(product =>
      product?.id === productId
        ? { ...product, status: newStatus, lastModified: new Date()?.toISOString() }
        : product
    ));
  };

  const handleQuickPreview = (product) => {
    setPreviewProduct(product);
    setShowPreviewModal(true);
  };

  const handleEditProduct = (productId) => {
    console.log('Editing product:', productId);
    // Navigate to edit page or open edit modal
  };

  const handleAddProduct = () => {
    setShowAddModal(true);
  };

  const handleSaveNewProduct = (productData) => {
    setProducts(prev => [productData, ...prev]);
    console.log('New product added:', productData);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedProducts([]);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setSelectedProducts([]);
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
    setSelectedProducts([]);
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation user={mockUser} />
      <div className="lg:pl-64">
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <ProductTableHeader
            selectedCount={selectedProducts?.length}
            onBulkAction={handleBulkAction}
            onAddProduct={handleAddProduct}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleFilters={() => setShowFilters(!showFilters)}
            showFilters={showFilters}
          />

          {/* Filters */}
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isVisible={showFilters}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Results Summary */}
            <div className="bg-card px-6 py-3 border-b border-border">
              <p className="text-sm text-muted-foreground">
                {sortedProducts?.length === products?.length
                  ? `Showing all ${sortedProducts?.length} products`
                  : `Showing ${sortedProducts?.length} of ${products?.length} products`
                }
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>

            {/* Product Table */}
            <div className="flex-1">
              <ProductTable
                products={paginatedProducts}
                selectedProducts={selectedProducts}
                onSelectProduct={handleSelectProduct}
                onSelectAll={handleSelectAll}
                onEditProduct={handleEditProduct}
                onToggleStatus={handleToggleStatus}
                onQuickPreview={handleQuickPreview}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={sortedProducts?.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            )}
          </div>
        </div>
      </div>
      {/* Modals */}
      <ProductPreviewModal
        product={previewProduct}
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        onEdit={handleEditProduct}
      />
      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveNewProduct}
      />
    </div>
  );
};

export default AdminProductManagement;