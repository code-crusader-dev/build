import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  User 
} from 'firebase/auth';
import { auth } from './firebase';

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
 */
export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

/**
 * Get current user
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
