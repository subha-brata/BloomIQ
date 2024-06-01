"use client"
import { createContext, useState, ReactNode, useContext,useEffect } from 'react';
import { useRouter } from 'next/navigation';



interface AuthContextType {
  isAuthenticated: boolean;
  userName:String,
  login: (email:string,userName:string) => void,
  logout: (uerid:string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName,setuserName]=useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if userName is in localStorage and update state
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setIsAuthenticated(true);
      setuserName(storedUserName);
    }
  }, []);

  const login = (name:string,email:string) => {
    setIsAuthenticated(true);
    router.push(`/dashboard/${name}`);
    localStorage.setItem('userName', email);
    setuserName(email);
  };

  const logout = (userid:string) => {
    setIsAuthenticated(false);
    router.push('/login');
    return isAuthenticated;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,userName, login, logout }}>
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
