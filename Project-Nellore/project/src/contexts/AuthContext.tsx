import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Fetch current user from backend on mount
  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Fetch from backend if not in localStorage
      const fetchCurrentUser = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/me', { credentials: 'include' });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          } else {
            setUser(null);
            localStorage.removeItem('user');
          }
        } catch {
          setUser(null);
          localStorage.removeItem('user');
        }
      };
      fetchCurrentUser();
    }
  }, []);

  // Add this function to send user to backend
  const saveUserToBackend = async (user: User) => {
    try {
      const response = await fetch('http://localhost:8080/api/save-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const data = await response.text();
      console.log('Backend response:', data);
    } catch (error) {
      console.error('Error saving user to backend:', error);
    }
  };

  // Store user in localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      saveUserToBackend(user); // Send to backend
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Remove email/password login, just provide a dummy login for compatibility
  const login = async () => {
    // After Google login, /api/me will be populated
    await new Promise((resolve) => setTimeout(resolve, 100));
    const response = await fetch('http://localhost:8080/api/me', { credentials: 'include' });
    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
      return true;
    } else {
      setUser(null);
      return false;
    }
  };

  const register = async () => {
    throw new Error('Registration is handled via Google login.');
  };

  const logout = () => {
    fetch('http://localhost:8080/api/logout', {
      method: 'GET',
      credentials: 'include',
    }).then(() => {
      setUser(null);
      window.location.href = '/';
    });
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};