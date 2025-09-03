import React from "react";
import Routes from "./Routes";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
