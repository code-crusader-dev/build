import { supabase } from './supabase';
import { User, AuthError } from '@supabase/supabase-js';

/**
 * Auth result type
 */
export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

/**
 * Sign in with Google OAuth
 * Redirects to Google login page
 * @returns Auth result
 */
export const signInWithGoogle = async (): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
      },
    });

    if (error) {
      console.error('Google sign-in error:', error);
      return {
        success: false,
        error: error.message || 'Failed to sign in with Google',
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Sign in error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
};

/**
 * Get the current authenticated user
 * @returns Current user or null
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Get user error:', error);
      return null;
    }

    return user;
  } catch (error: any) {
    console.error('Get current user error:', error);
    return null;
  }
};

/**
 * Get the current session
 * @returns Current session or null
 */
export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Get session error:', error);
      return null;
    }

    return session;
  } catch (error: any) {
    console.error('Get session error:', error);
    return null;
  }
};

/**
 * Sign out the current user
 * @returns Success status
 */
export const signOut = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Sign out error:', error);
      return {
        success: false,
        error: error.message || 'Failed to sign out',
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Sign out error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
};

/**
 * Check if user has an active session
 * @returns True if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const session = await getSession();
    return session !== null;
  } catch (error) {
    return false;
  }
};

/**
 * Subscribe to auth state changes
 * @param callback - Function to call when auth state changes
 * @returns Unsubscribe function
 */
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
};
