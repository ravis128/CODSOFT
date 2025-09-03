import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage on app start
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email, password) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Preserve existing user profile (e.g., name from signup) if available
      const existing = localStorage.getItem('user');
      let existingUser = null;
      if (existing) {
        try {
          existingUser = JSON.parse(existing);
        } catch (_) {
          existingUser = null;
        }
      }

      // Use saved name if same email; otherwise fall back to a generated display name
      const displayName = existingUser && existingUser.email === email
        ? existingUser.name
        : email.split('@')[0];

      // Mock user data - in real app, this would come from your backend
      const mockUser = {
        id: existingUser?.id || Date.now(),
        email,
        name: displayName,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3b82f6&color=fff`,
        createdAt: existingUser?.createdAt || new Date().toISOString(),
        ...existingUser
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Sign in failed:', error);
      throw new Error('Invalid email or password');
    }
  };

  const signUp = async (userData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object with actual signup data
      const newUser = {
        id: Date.now(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        avatar: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=3b82f6&color=fff`,
        createdAt: new Date().toISOString(),
        preferences: {
          newsletter: userData.subscribeToNewsletter
        }
      };

      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Sign up failed:', error);
      throw new Error('Registration failed. Please try again.');
    }
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
