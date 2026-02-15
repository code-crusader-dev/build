'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

/**
 * Protected route wrapper for admin-only pages
 * Redirects non-admin users to home page
 */
export default function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If not authenticated, redirect to login
      if (!user) {
        router.push('/login');
        return;
      }

      // If not admin, redirect to home
      if (!isAdmin) {
        router.push('/');
      }
    }
  }, [user, loading, isAdmin, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-text-secondary border-t-text-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting non-admin users
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary">Access denied. Redirecting...</p>
        </div>
      </div>
    );
  }

  // Render protected content for admin users
  return <>{children}</>;
}
