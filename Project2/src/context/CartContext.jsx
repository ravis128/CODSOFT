import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  // Load cart data from localStorage on mount
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    const savedSavedItems = localStorage.getItem('savedItems');
    
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
    
    if (savedSavedItems) {
      setSavedItems(JSON.parse(savedSavedItems));
    }
  }, []);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
  }, [savedItems]);

  const addToCart = (product, selectedSize = '', selectedColor = '', quantity = 1) => {
    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
      cartId: Date.now(),
      maxQuantity: 10,
      stock: product.stock || 10
    };

    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => 
        item.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      );

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, cartItem];
      }
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartId !== itemId));
  };

  const saveForLater = (itemId) => {
    const itemToSave = cartItems.find(item => item.cartId === itemId);
    if (itemToSave) {
      setSavedItems(prevItems => [...prevItems, { ...itemToSave, inStock: true }]);
      setCartItems(prevItems => prevItems.filter(item => item.cartId !== itemId));
    }
  };

  const moveToCart = (itemId) => {
    const itemToMove = savedItems.find(item => item.cartId === itemId);
    if (itemToMove && itemToMove.inStock) {
      setCartItems(prevItems => [...prevItems, { ...itemToMove, quantity: 1, maxQuantity: 10, stock: 10 }]);
      setSavedItems(prevItems => prevItems.filter(item => item.cartId !== itemId));
    }
  };

  const removeSavedItem = (itemId) => {
    setSavedItems(prevItems => prevItems.filter(item => item.cartId !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    cartItems,
    savedItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    saveForLater,
    moveToCart,
    removeSavedItem,
    clearCart,
    getCartItemCount,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

