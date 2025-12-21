// src/context/AuthContext.jsx - FIXED VERSION
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // login function:
// In AuthContext.jsx, update the login function:
const login = async (email, password) => {
  try {
    console.log('Login attempt:', { email, password });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check mock database for registered users
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = existingUsers.find(u => u.email === email);
    
    if (!user) {
      // User not found in registered users
      return { 
        success: false, 
        error: 'Invalid email or password' 
      };
    }
    
    // In real app, you'd verify password hash here
    // For mock, accept any password if user exists
    const mockResponse = {
      accessToken: `mock-jwt-token-${Date.now()}`,
      refreshToken: `mock-refresh-token-${Date.now()}`,
      user: user
    };

    localStorage.setItem('accessToken', mockResponse.accessToken);
    localStorage.setItem('refreshToken', mockResponse.refreshToken);
    localStorage.setItem('user', JSON.stringify(mockResponse.user));
    
    setUser(mockResponse.user);
    
    return { 
      success: true, 
      role: user.role 
    };
  } catch (error) {
    console.error('AuthContext login error:', error);
    return { 
      success: false, 
      error: error.message || 'Login failed' 
    };
  }
};

 // In AuthContext.jsx, update the register function:
const register = async (userData) => {
  try {
    // TODO: Replace with actual API call
    console.log('Registering:', userData); // Debug log
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if email already exists (mock)
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const emailExists = existingUsers.some(user => user.email === userData.email);
    
    if (emailExists) {
      throw new Error('Email already registered');
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    // Save to mock "database"
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    // Create auth response
    const mockResponse = {
      accessToken: `mock-jwt-token-${Date.now()}`,
      refreshToken: `mock-refresh-token-${Date.now()}`,
      user: newUser
    };

    localStorage.setItem('accessToken', mockResponse.accessToken);
    localStorage.setItem('refreshToken', mockResponse.refreshToken);
    localStorage.setItem('user', JSON.stringify(mockResponse.user));
    
    setUser(mockResponse.user);
    
    // Return the role
    return { 
      success: true, 
      role: userData.role 
    };
  } catch (error) {
    console.error('AuthContext registration error:', error);
    return { 
      success: false, 
      error: error.message || 'Registration failed' 
    };
  }
};

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    // Navigation will be handled by component
  };

  const determineRoleFromEmail = (email) => {
    if (email.includes('admin')) return 'admin';
    if (email.includes('trainer')) return 'trainer';
    if (email.includes('company')) return 'company';
    return 'student';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};