'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { isAllowedDomain } from '@/lib/authService';

export type UserRole = 'admin' | 'student';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  role: UserRole | null;
  isAdmin: boolean;
}

/**
 * Determine user role based on email
 * Admin email: devansh.cs.25@nitj.ac.in
 */
const getUserRole = (email: string | null): UserRole | null => {
  if (!email) return null;
  return email === 'devansh.cs.25@nitj.ac.in' ? 'admin' : 'student';
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  role: null,
  isAdmin: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Double-check domain validity on auth state change
        if (isAllowedDomain(currentUser.email)) {
          setUser(currentUser);
          // Determine and set user role
          const userRole = getUserRole(currentUser.email);
          setRole(userRole);
        } else {
          // Invalid domain - sign out
          await auth.signOut();
          setUser(null);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        role,
        isAdmin: role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
