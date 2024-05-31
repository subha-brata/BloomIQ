"use client"
import { createContext, useState, ReactNode, useContext } from 'react';
import { useRouter } from 'next/navigation';



interface AuthContextType {
  isAuthenticated: boolean;
  login: (email:string,userName:string) => string
  logout: (uerid:string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const login = (name:string,email:string) => {
    setIsAuthenticated(true);
    router.push(`/dashboard/${name}`);
    return email;
  };

  const logout = (userid:string) => {
    setIsAuthenticated(false);
    router.push('/login');
    return isAuthenticated;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
