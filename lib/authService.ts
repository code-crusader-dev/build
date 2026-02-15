import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  User 
} from 'firebase/auth';
import { auth } from './firebase';
import { createOrUpdateUserOnLogin } from './userService';

// Domain restriction
const ALLOWED_DOMAIN = '@nitj.ac.in';

export interface AuthError {
  code: string;
  message: string;
}

/**
 * Validate if email belongs to allowed domain
 */
export const isAllowedDomain = (email: string | null): boolean => {
  if (!email) return false;
  return email.endsWith(ALLOWED_DOMAIN);
};

/**
 * Sign in with Google and validate domain
 */
export const signInWithGoogle = async (): Promise<{ success: boolean; error?: AuthError }> => {
  try {
    const provider = new GoogleAuthProvider();
    
    // Force account selection
    provider.setCustomParameters({
      prompt: 'select_account'
    });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Validate domain
    if (!isAllowedDomain(user.email)) {
      // Sign out immediately
      await firebaseSignOut(auth);
      
      return {
        success: false,
        error: {
          code: 'auth/invalid-domain',
          message: 'Only NIT Jalandhar accounts are allowed'
        }
      };
    }

    // Create or update user profile in Firestore
    // This will automatically assign admin role if email is devansh.cs.25@nitj.ac.in
    try {
      await createOrUpdateUserOnLogin(user);
      console.log('✅ User profile created/updated successfully');
    } catch (profileError) {
      console.error('⚠️ Error creating/updating user profile:', profileError);
      // Don't fail the login if profile creation fails
      // User can still authenticate, profile can be created later
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.code || 'auth/unknown',
        message: error.message || 'Authentication failed'
      }
    };
  }
};

/**
 * Sign out current user
 * Clears Firebase auth session and redirects to home
 */
export const signOut = async (): Promise<void> => {
  try {
    console.log('Signing out user...');
    await firebaseSignOut(auth);
    console.log('Sign out successful');
    // Session is automatically cleared by Firebase
    // Redirect will be handled by the component calling this function
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

/**
 * Get current user
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
