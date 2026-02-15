import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { UserRole } from '@/types/user';

/**
 * Hook to check if current user has admin access
 */
export function useAdmin() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>('user');

  useEffect(() => {
    async function checkAdminStatus() {
      if (!user || !isAuthenticated) {
        setIsAdmin(false);
        setUserRole('user');
        setLoading(false);
        return;
      }

      try {
        // Fetch user profile from Firestore
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const role = userData.role as UserRole || 'user';
          setUserRole(role);
          setIsAdmin(role === 'admin' || role === 'club_admin');
        } else {
          // User document doesn't exist - default to regular user
          setIsAdmin(false);
          setUserRole('user');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        setUserRole('user');
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      checkAdminStatus();
    }
  }, [user, isAuthenticated, authLoading]);

  return { isAdmin, userRole, loading: loading || authLoading };
}
