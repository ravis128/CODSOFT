import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CustomerNavigation from '../../components/ui/CustomerNavigation';
import SEO from '../../components/SEO';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { useCart } from '../../context/CartContext';

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart, getCartItemCount } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock featured products
  const mockFeaturedProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 1199.99,
      originalPrice: 1299.99,
      rating: 4.8,
      reviewCount: 2847,
      isOnSale: true,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "MacBook Pro 16-inch",
      price: 2399.99,
      rating: 4.9,
      reviewCount: 1456,
      isOnSale: false,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Sony WH-1000XM5 Headphones",
      price: 399.99,
      originalPrice: 449.99,
      rating: 4.8,
      reviewCount: 2156,
      isOnSale: true,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Nike Air Max 270",
      price: 149.99,
      originalPrice: 179.99,
      rating: 4.6,
      reviewCount: 856,
      isOnSale: true,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    }
  ];

  // Mock categories
  const mockCategories = [
    {
      id: 1,
      name: "Electronics",
      description: "Smartphones, laptops, headphones and more",
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop",
      productCount: 245,
      category: "electronics"
    },
    {
      id: 2,
      name: "Fashion & Clothing",
      description: "Trendy apparel and footwear",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      productCount: 189,
      category: "clothing"
    },
    {
      id: 3,
      name: "Books & Literature",
      description: "Best sellers and classic collections",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      productCount: 156,
      category: "books"
    },
    {
      id: 4,
      name: "Beauty & Personal Care",
      description: "Skincare, makeup and wellness products",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      productCount: 98,
      category: "beauty"
    },
    {
      id: 5,
      name: "Home & Garden",
      description: "Furniture, decor and gardening essentials",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      productCount: 134,
      category: "home"
    },
    {
      id: 6,
      name: "Sports & Fitness",
      description: "Equipment for active lifestyle",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      productCount: 87,
      category: "sports"
    }
  ];

  const { data: featuredData, isLoading: loadingFeatured } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 800));
      return mockFeaturedProducts;
    }
  });

  const { data: categoriesData, isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 800));
      return mockCategories;
    }
  });

  useEffect(() => {
    setIsLoading(loadingFeatured || loadingCategories);
    if (featuredData) setFeaturedProducts(featuredData);
    if (categoriesData) setCategories(categoriesData);
  }, [featuredData, categoriesData, loadingFeatured, loadingCategories]);

  const handleShopNow = () => {
    navigate('/product-catalog');
  };

  const handleCategoryClick = (category) => {
    navigate(`/product-catalog?category=${category}`);
  };

  const handleProductClick = (product) => {
    // Navigate to product detail or add to cart
    console.log('Product clicked:', product?.id);
    navigate('/product-catalog');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    // Show success message
    console.log('Added to cart:', product?.name);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerNavigation cartItemCount={getCartItemCount()} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="EcommerceHub – Shop Electronics, Fashion, Home & More"
        description="Discover amazing products at great prices. Fast shipping, secure checkout, and easy returns at EcommerceHub."
        canonical={window.location.origin + '/'}
        ogImage={"/public/assets/images/no_image.png"}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'EcommerceHub',
          url: window.location.origin + '/',
          potentialAction: {
            '@type': 'SearchAction',
            target: window.location.origin + '/product-catalog?search={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }}
      />
      <CustomerNavigation cartItemCount={getCartItemCount()} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Welcome to <span className="text-primary">EcommerceHub</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover amazing products, unbeatable prices, and exceptional shopping experience. 
            Everything you need, delivered right to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleShopNow}
              iconName="ShoppingBag"
              iconPosition="left"
              className="text-lg px-8 py-3"
            >
              Shop Now
            </Button>
            {!isAuthenticated ? (
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/signup')}
                iconName="User"
                iconPosition="left"
                className="text-lg px-8 py-3"
              >
                Get Started
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/user-dashboard')}
                iconName="User"
                iconPosition="left"
                className="text-lg px-8 py-3"
              >
                My Account
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground">
              Find exactly what you're looking for in our curated collections
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.map((category) => (
              <div
                key={category?.id}
                className="group relative bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleCategoryClick(category?.category)}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={category?.image}
                    alt={category?.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {category?.name}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {category?.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {category?.productCount} products
                    </span>
                    <Icon name="ArrowRight" size={16} className="text-primary group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover our handpicked selection of trending products
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts?.map((product) => (
              <div
                key={product?.id}
                className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product?.isOnSale && (
                    <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-full">
                      SALE
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {product?.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={`${
                            i < Math.floor(product?.rating)
                              ? 'text-yellow-500 fill-yellow-500' :'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product?.reviewCount})
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-foreground">
                      ${product?.price}
                    </span>
                    {product?.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product?.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleProductClick(product)}
                      className="flex-1"
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      iconName="ShoppingCart"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleShopNow}
              iconName="ArrowRight"
              iconPosition="right"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Shop With Us?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Free Shipping
              </h3>
              <p className="text-muted-foreground">
                Free delivery on orders over $50. Fast and reliable shipping worldwide.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Secure Payment
              </h3>
              <p className="text-muted-foreground">
                Your payment information is secure with industry-standard encryption.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="RotateCcw" size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Easy Returns
              </h3>
              <p className="text-muted-foreground">
                30-day return policy. Not satisfied? Return it hassle-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Subscribe to our newsletter for exclusive deals and new product announcements
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button 
              size="lg"
              iconName="Mail"
              iconPosition="left"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;