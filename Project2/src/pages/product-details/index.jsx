import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CustomerNavigation from '../../components/ui/CustomerNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import { useCart } from '../../context/CartContext';

const fetchProductById = async (id) => {
  // For now, read product from navigation state or mock delay; in real app hit API
  await new Promise(r => setTimeout(r, 300));
  return null;
}

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, getCartItemCount } = useCart();
  const productFromState = location.state?.product || null;

  const { data: fetchedProduct, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !productFromState,
  });

  const product = productFromState || fetchedProduct;

  if (!product && isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerNavigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product && !isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerNavigation />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Product not found</h1>
          <p className="text-muted-foreground mb-6">The product you’re looking for may have been removed.</p>
          <Button onClick={() => navigate('/product-catalog')} iconName="ArrowLeft" iconPosition="left">Back to Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomerNavigation cartItemCount={getCartItemCount()} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Gallery */}
          <div className="lg:col-span-6">
            <div className="bg-card border border-border rounded-lg p-3">
              <div className="aspect-square overflow-hidden rounded-md bg-muted">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  sources={[{ type: 'image/webp', srcSet: `${product?.image}&fm=webp 1x, ${product?.image}&fm=webp&w=1200 2x` }]}
                />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{product?.name}</h1>
              <p className="text-sm text-muted-foreground">Category: {product?.category}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground">${product?.price?.toFixed(2)}</span>
              {product?.originalPrice && product?.originalPrice > product?.price && (
                <span className="text-muted-foreground line-through">${product?.originalPrice?.toFixed(2)}</span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Icon name="Star" size={16} className="text-amber-400" />
              <span className="text-foreground">{product?.rating}</span>
              <span className="text-muted-foreground">({product?.reviewCount} reviews)</span>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Brand: {product?.brand || '—'}</p>
              <p>Stock: {product?.stock > 0 ? `${product?.stock} available` : 'Out of stock'}</p>
              {product?.isOnSale && <p className="text-success">On Sale</p>}
            </div>

            <div className="pt-4 flex gap-3">
              <Button
                size="lg"
                iconName="ShoppingCart"
                iconPosition="left"
                onClick={() => addToCart(product, '', '', 1)}
                disabled={product?.stock === 0}
              >
                {product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/product-catalog')} iconName="ArrowLeft" iconPosition="left">Back</Button>
            </div>
          </div>
        </div>

        {/* Details */}
        <section className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">Product Details</h2>
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>High-quality materials</li>
                <li>1-year warranty</li>
                <li>30-day return policy</li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Shipping & Returns</h3>
              <p className="text-sm text-muted-foreground">Free shipping over $50. Standard delivery in 2-5 days. Easy returns within 30 days.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductDetails;


