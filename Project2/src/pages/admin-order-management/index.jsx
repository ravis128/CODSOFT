import React, { useState, useEffect } from 'react';
import AdminNavigation from '../../components/ui/AdminNavigation';
import OrderFilters from './components/OrderFilters';
import OrderTable from './components/OrderTable';
import OrderTimeline from './components/OrderTimeline';
import CustomerCommunication from './components/CustomerCommunication';

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const mockUser = {
    name: "Admin User",
    email: "admin@ecommercehub.com",
    role: "administrator"
  };

  // Mock orders data
  const mockOrders = [
    {
      id: 1,
      orderNumber: "ORD-2025-001",
      customer: {
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 (555) 123-4567"
      },
      date: new Date('2025-01-15T10:30:00'),
      total: 299.99,
      subtotal: 249.99,
      shipping: 25.00,
      tax: 25.00,
      paymentStatus: "paid",
      status: "processing",
      shippingMethod: "Standard Shipping",
      trackingNumber: "1Z999AA1234567890",
      shippingAddress: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States"
      },
      items: [
        {
          id: 1,
          name: "Wireless Bluetooth Headphones",
          sku: "WBH-001",
          price: 149.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
        },
        {
          id: 2,
          name: "Smartphone Case",
          sku: "SC-002",
          price: 49.99,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop"
        }
      ],
      timeline: [
        {
          type: "created",
          action: "Order created",
          date: new Date('2025-01-15T10:30:00'),
          user: "System",
          note: "Order placed by customer"
        },
        {
          type: "payment",
          action: "Payment confirmed",
          date: new Date('2025-01-15T10:32:00'),
          user: "Payment Gateway",
          note: "Credit card payment processed successfully"
        },
        {
          type: "processing",
          action: "Order processing started",
          date: new Date('2025-01-15T11:00:00'),
          user: "Admin User",
          note: "Items picked from warehouse"
        }
      ],
      communications: [
        {
          subject: "Order Confirmation - #ORD-2025-001",
          date: new Date('2025-01-15T10:35:00'),
          sender: "System"
        }
      ]
    },
    {
      id: 2,
      orderNumber: "ORD-2025-002",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 987-6543"
      },
      date: new Date('2025-01-14T14:20:00'),
      total: 159.99,
      subtotal: 139.99,
      shipping: 10.00,
      tax: 10.00,
      paymentStatus: "paid",
      status: "shipped",
      shippingMethod: "Express Shipping",
      trackingNumber: "1Z999AA1234567891",
      shippingAddress: {
        street: "456 Oak Avenue",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
        country: "United States"
      },
      items: [
        {
          id: 3,
          name: "Fitness Tracker",
          sku: "FT-003",
          price: 139.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop"
        }
      ],
      timeline: [
        {
          type: "created",
          action: "Order created",
          date: new Date('2025-01-14T14:20:00'),
          user: "System"
        },
        {
          type: "payment",
          action: "Payment confirmed",
          date: new Date('2025-01-14T14:22:00'),
          user: "Payment Gateway"
        },
        {
          type: "processing",
          action: "Order processing started",
          date: new Date('2025-01-14T15:00:00'),
          user: "Admin User"
        },
        {
          type: "shipped",
          action: "Order shipped",
          date: new Date('2025-01-15T09:00:00'),
          user: "Shipping Department",
          note: "Package handed to carrier"
        }
      ],
      communications: [
        {
          subject: "Order Confirmation - #ORD-2025-002",
          date: new Date('2025-01-14T14:25:00'),
          sender: "System"
        },
        {
          subject: "Your Order #ORD-2025-002 Has Shipped!",
          date: new Date('2025-01-15T09:05:00'),
          sender: "Admin User"
        }
      ]
    },
    {
      id: 3,
      orderNumber: "ORD-2025-003",
      customer: {
        name: "Michael Brown",
        email: "michael.brown@email.com",
        phone: "+1 (555) 456-7890"
      },
      date: new Date('2025-01-13T16:45:00'),
      total: 89.99,
      subtotal: 79.99,
      shipping: 5.00,
      tax: 5.00,
      paymentStatus: "pending",
      status: "pending",
      shippingMethod: "Standard Shipping",
      trackingNumber: null,
      shippingAddress: {
        street: "789 Pine Street",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        country: "United States"
      },
      items: [
        {
          id: 4,
          name: "Coffee Mug Set",
          sku: "CMS-004",
          price: 79.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop"
        }
      ],
      timeline: [
        {
          type: "created",
          action: "Order created",
          date: new Date('2025-01-13T16:45:00'),
          user: "System",
          note: "Awaiting payment confirmation"
        }
      ],
      communications: []
    },
    {
      id: 4,
      orderNumber: "ORD-2025-004",
      customer: {
        name: "Emily Davis",
        email: "emily.davis@email.com",
        phone: "+1 (555) 321-0987"
      },
      date: new Date('2025-01-12T11:15:00'),
      total: 449.99,
      subtotal: 399.99,
      shipping: 25.00,
      tax: 25.00,
      paymentStatus: "paid",
      status: "delivered",
      shippingMethod: "Express Shipping",
      trackingNumber: "1Z999AA1234567892",
      shippingAddress: {
        street: "321 Elm Street",
        city: "Miami",
        state: "FL",
        zipCode: "33101",
        country: "United States"
      },
      items: [
        {
          id: 5,
          name: "Laptop Stand",
          sku: "LS-005",
          price: 199.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop"
        },
        {
          id: 6,
          name: "Wireless Mouse",
          sku: "WM-006",
          price: 99.99,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop"
        }
      ],
      timeline: [
        {
          type: "created",
          action: "Order created",
          date: new Date('2025-01-12T11:15:00'),
          user: "System"
        },
        {
          type: "payment",
          action: "Payment confirmed",
          date: new Date('2025-01-12T11:17:00'),
          user: "Payment Gateway"
        },
        {
          type: "processing",
          action: "Order processing started",
          date: new Date('2025-01-12T12:00:00'),
          user: "Admin User"
        },
        {
          type: "shipped",
          action: "Order shipped",
          date: new Date('2025-01-13T08:00:00'),
          user: "Shipping Department"
        },
        {
          type: "delivered",
          action: "Order delivered",
          date: new Date('2025-01-14T16:30:00'),
          user: "Delivery Service",
          note: "Delivered to front door"
        }
      ],
      communications: [
        {
          subject: "Order Confirmation - #ORD-2025-004",
          date: new Date('2025-01-12T11:20:00'),
          sender: "System"
        },
        {
          subject: "Your Order #ORD-2025-004 Has Shipped!",
          date: new Date('2025-01-13T08:05:00'),
          sender: "Admin User"
        },
        {
          subject: "Your Order #ORD-2025-004 Has Been Delivered",
          date: new Date('2025-01-14T16:35:00'),
          sender: "System"
        }
      ]
    },
    {
      id: 5,
      orderNumber: "ORD-2025-005",
      customer: {
        name: "David Wilson",
        email: "david.wilson@email.com",
        phone: "+1 (555) 654-3210"
      },
      date: new Date('2025-01-11T09:30:00'),
      total: 199.99,
      subtotal: 179.99,
      shipping: 10.00,
      tax: 10.00,
      paymentStatus: "refunded",
      status: "cancelled",
      shippingMethod: "Standard Shipping",
      trackingNumber: null,
      shippingAddress: {
        street: "654 Maple Drive",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        country: "United States"
      },
      items: [
        {
          id: 7,
          name: "Gaming Keyboard",
          sku: "GK-007",
          price: 179.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop"
        }
      ],
      timeline: [
        {
          type: "created",
          action: "Order created",
          date: new Date('2025-01-11T09:30:00'),
          user: "System"
        },
        {
          type: "payment",
          action: "Payment confirmed",
          date: new Date('2025-01-11T09:32:00'),
          user: "Payment Gateway"
        },
        {
          type: "cancelled",
          action: "Order cancelled",
          date: new Date('2025-01-11T14:00:00'),
          user: "Customer Service",
          note: "Cancelled by customer request"
        }
      ],
      communications: [
        {
          subject: "Order Confirmation - #ORD-2025-005",
          date: new Date('2025-01-11T09:35:00'),
          sender: "System"
        },
        {
          subject: "Order #ORD-2025-005 Cancellation Confirmation",
          date: new Date('2025-01-11T14:05:00'),
          sender: "Customer Service"
        }
      ]
    }
  ];

  // Calculate order counts
  const getOrderCounts = (orders) => {
    return {
      all: orders?.length,
      pending: orders?.filter(o => o?.status === 'pending')?.length,
      processing: orders?.filter(o => o?.status === 'processing')?.length,
      shipped: orders?.filter(o => o?.status === 'shipped')?.length,
      delivered: orders?.filter(o => o?.status === 'delivered')?.length,
      cancelled: orders?.filter(o => o?.status === 'cancelled')?.length
    };
  };

  // Filter orders based on active filter, search term, and date range
  useEffect(() => {
    let filtered = [...orders];

    // Filter by status
    if (activeFilter !== 'all') {
      filtered = filtered?.filter(order => order?.status === activeFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm?.toLowerCase();
      filtered = filtered?.filter(order => 
        order?.orderNumber?.toLowerCase()?.includes(searchLower) ||
        order?.customer?.name?.toLowerCase()?.includes(searchLower) ||
        order?.customer?.email?.toLowerCase()?.includes(searchLower)
      );
    }

    // Filter by date range
    if (dateRange?.start) {
      filtered = filtered?.filter(order => 
        new Date(order.date) >= new Date(dateRange.start)
      );
    }
    if (dateRange?.end) {
      filtered = filtered?.filter(order => 
        new Date(order.date) <= new Date(dateRange.end + 'T23:59:59')
      );
    }

    setFilteredOrders(filtered);
  }, [orders, activeFilter, searchTerm, dateRange]);

  // Initialize data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Handle order selection
  const handleOrderSelect = (orderId, isSelected) => {
    if (isSelected) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders?.filter(id => id !== orderId));
    }
  };

  // Handle select all orders
  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedOrders(filteredOrders?.map(order => order?.id));
    } else {
      setSelectedOrders([]);
    }
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setSelectedOrders([]);
  };

  // Handle bulk actions
  const handleBulkAction = (action, orderIds) => {
    console.log('Bulk action:', action, 'for orders:', orderIds);
    // Implement bulk action logic here
    switch (action) {
      case 'update-status':
        // Show status update modal
        break;
      case 'generate-labels':
        // Generate shipping labels
        break;
      case 'export-orders':
        // Export selected orders
        break;
      case 'send-notifications':
        // Send notifications to customers
        break;
      default:
        break;
    }
  };

  // Handle status update
  const handleStatusUpdate = (orderId, updateData) => {
    setOrders(prevOrders => 
      prevOrders?.map(order => {
        if (order?.id === orderId) {
          const updatedOrder = {
            ...order,
            status: updateData?.status || order?.status,
            trackingNumber: updateData?.trackingNumber || order?.trackingNumber
          };

          // Add timeline entry
          if (updateData?.status && updateData?.status !== order?.status) {
            updatedOrder.timeline = [
              ...order?.timeline,
              {
                type: updateData?.status,
                action: `Order status updated to ${updateData?.status}`,
                date: new Date(),
                user: mockUser?.name,
                note: updateData?.adminNotes || ''
              }
            ];
          }

          return updatedOrder;
        }
        return order;
      })
    );
  };

  // Handle view order details
  const handleViewDetails = (order) => {
    setSelectedOrderForDetails(order);
  };

  // Handle add note to order
  const handleAddNote = (orderId, note) => {
    setOrders(prevOrders => 
      prevOrders?.map(order => {
        if (order?.id === orderId) {
          return {
            ...order,
            timeline: [
              ...order?.timeline,
              {
                type: 'note',
                action: 'Admin note added',
                date: new Date(),
                user: mockUser?.name,
                note: note
              }
            ]
          };
        }
        return order;
      })
    );
  };

  // Handle send email
  const handleSendEmail = (emailData) => {
    console.log('Sending email:', emailData);
    
    // Update order communications
    setOrders(prevOrders => 
      prevOrders?.map(order => {
        if (order?.id === emailData?.orderId) {
          return {
            ...order,
            communications: [
              ...order?.communications,
              {
                subject: emailData?.subject,
                date: new Date(),
                sender: mockUser?.name
              }
            ]
          };
        }
        return order;
      })
    );

    // Update selected order for details if it's the same order
    if (selectedOrderForDetails?.id === emailData?.orderId) {
      setSelectedOrderForDetails(prevOrder => ({
        ...prevOrder,
        communications: [
          ...prevOrder?.communications,
          {
            subject: emailData?.subject,
            date: new Date(),
            sender: mockUser?.name
          }
        ]
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminNavigation user={mockUser} />
        <div className="lg:pl-64">
          <div className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading orders...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation user={mockUser} />
      
      <div className="lg:pl-64">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Order Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage and track customer orders, update statuses, and communicate with customers.
            </p>
          </div>

          {/* Filters */}
          <OrderFilters
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            onBulkAction={handleBulkAction}
            selectedOrders={selectedOrders}
            orderCounts={getOrderCounts(orders)}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Orders Table */}
            <div className="xl:col-span-2">
              <OrderTable
                orders={filteredOrders}
                selectedOrders={selectedOrders}
                onOrderSelect={handleOrderSelect}
                onSelectAll={handleSelectAll}
                onStatusUpdate={handleStatusUpdate}
                onViewDetails={handleViewDetails}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Timeline */}
              <OrderTimeline
                selectedOrder={selectedOrderForDetails}
                onAddNote={handleAddNote}
              />

              {/* Customer Communication */}
              <CustomerCommunication
                selectedOrder={selectedOrderForDetails}
                onSendEmail={handleSendEmail}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderManagement;