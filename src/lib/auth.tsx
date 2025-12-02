import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { config } from './config';
import { UserRole } from './types';

interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, name: string) => Promise<User>;
  getUserById: (userId: string) => Promise<User>;
  logout: () => void;
  isLoading: boolean;
  isAdmin: () => boolean;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      void fetchUserProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        if (userData && userData.id && !userData._id) {
          userData._id = userData.id;
        }
        setUser(userData);
      } else {
        // Only remove token when server explicitly indicates unauthorized
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('token');
          setUser(null);
        } else {
          console.warn('fetchUserProfile: server returned', response.status);
        }
      }
    } catch (err) {
      // Network / CORS / transient errors — keep token for now
      console.error('Network error while fetching user profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${config.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Login failed' }));
        throw new Error(error.error || 'Login failed');
      }

      const data = await response.json();
      if (data.user && data.user.id && !data.user._id) {
        data.user._id = data.user.id;
      }
      if (data.token) localStorage.setItem('token', data.token);
      setUser(data.user);
      return data.user;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<User> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${config.API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Registration failed' }));
        throw new Error(error.error || 'Registration failed');
      }

      const data = await response.json();
      if (data.user && data.user.id && !data.user._id) {
        data.user._id = data.user.id;
      }
      if (data.token) localStorage.setItem('token', data.token);
      setUser(data.user);
      return data.user;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserById = async (userId: string): Promise<User> => {
    const response = await fetch(`${config.API_BASE_URL}/auth/${userId}`);
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to fetch user' }));
      throw new Error(error.error || 'Failed to fetch user');
    }
    return await response.json();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAdmin = () => {
    return user?.role === UserRole.ADMIN;
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    getUserById,
    logout,
    isLoading,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
