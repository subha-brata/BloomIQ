"use client";
import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string;
  login: (name: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!(localStorage.getItem('userName'));
    } else {
      return false; // Handle the case when localStorage is not available
    }
  });
  
  const [userName, setUserName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userName') || '';
    } else {
      return ''; // Handle the case when localStorage is not available
    }
  });
  
  const router = useRouter();

  useEffect(() => {
    // Check if userName is in localStorage and update state
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
    }
  }, []);

  const login = (name: string, email: string) => {
    setIsAuthenticated(true);
    setUserName(email);
    localStorage.setItem('userName', email);
    router.push(`/dashboard/${name}`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName('');
    localStorage.removeItem('userName');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
