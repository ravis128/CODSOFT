import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
const NotFound = lazy(() => import('pages/NotFound'));
const Landing = lazy(() => import('./pages/landing'));
const SignIn = lazy(() => import('./pages/signin'));
const SignUp = lazy(() => import('./pages/signup'));
const ShoppingCart = lazy(() => import('./pages/shopping-cart'));
const Checkout = lazy(() => import('./pages/checkout'));
const OrderSuccess = lazy(() => import('./pages/order-success'));
const ProductCatalog = lazy(() => import('./pages/product-catalog'));
const ProductDetails = lazy(() => import('./pages/product-details'));
const Profile = lazy(() => import('./pages/profile'));
const AdminDashboard = lazy(() => import('./pages/admin-dashboard'));
const AdminProductManagement = lazy(() => import('./pages/admin-product-management'));
const AdminOrderManagement = lazy(() => import('./pages/admin-order-management'));
const UserDashboard = lazy(() => import('./pages/user-dashboard'));

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-muted-foreground">Loading...</div>}>
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-product-management" element={<AdminProductManagement />} />
        <Route path="/admin-order-management" element={<AdminOrderManagement />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;