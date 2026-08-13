import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'Super Admin' | 'Clinic Admin' | 'Dentist' | 'Receptionist' | 'Dental Assistant' | 'Accountant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, role: UserRole) => {
    // Mock login delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
