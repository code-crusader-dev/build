'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/hooks/useAdmin';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

/**
 * Component to protect admin-only routes
 * Redirects non-admin users to home page
 */
export default function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { isAdmin, loading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdmin) {
      // Not an admin - redirect to home
      router.push('/');
    }
  }, [isAdmin, loading, router]);

  // Show loading while checking admin status
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-text-secondary">Loading...</div>
      </div>
    );
  }

  // Don't render if not admin (will redirect)
  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}
