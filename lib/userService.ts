import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { UserProfile, UserRole } from '@/types/user';
import { User } from 'firebase/auth';
import { createFallbackProfile, logProfileFetchError } from './profileFallback';

const USERS_COLLECTION = 'users';
const ADMIN_EMAIL = 'devansh.cs.25@nitj.ac.in';

/**
 * Determine user role based on email
 */
function determineRole(email: string): UserRole {
  if (email === ADMIN_EMAIL) {
    return 'admin';
  }
  return 'user';
}

/**
 * Get user profile from Firestore with fallback support
 * Returns fallback profile if fetch fails or profile doesn't exist
 */
export async function getUserProfile(
  userId: string, 
  email?: string | null,
  displayName?: string | null
): Promise<UserProfile> {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      console.warn('⚠️ Profile not found in Firestore, using fallback data');
      return createFallbackProfile(email || null, userId, displayName || null);
    }
    
    console.log('✅ Profile loaded from Firestore');
    return userSnap.data() as UserProfile;
  } catch (error) {
    logProfileFetchError(error, 'Firestore getUserProfile');
    return createFallbackProfile(email || null, userId, displayName || null);
  }
}

/**
 * Create new user profile in Firestore
 */
export async function createUserProfile(user: User): Promise<UserProfile> {
  try {
    const role = determineRole(user.email || '');
    
    const userProfile: Omit<UserProfile, 'createdAt'> & { createdAt: any } = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || user.email?.split('@')[0] || 'User',
      photoURL: user.photoURL,
      role,
      followedClubs: [],
      createdAt: serverTimestamp(),
    };
    
    const userRef = doc(db, USERS_COLLECTION, user.uid);
    await setDoc(userRef, userProfile);
    
    return {
      ...userProfile,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

/**
 * Update existing user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, updates);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

/**
 * Ensure user role is set correctly based on email
 * This function checks if role needs to be assigned/updated
 */
export async function ensureUserRole(user: User): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, user.uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const correctRole = determineRole(user.email || '');
      
      // Update role if missing or incorrect
      if (!userData.role || userData.role !== correctRole) {
        await updateDoc(userRef, { role: correctRole });
      }
    }
  } catch (error) {
    console.error('Error ensuring user role:', error);
    throw error;
  }
}

/**
 * Create or update user profile on login
 */
export async function createOrUpdateUserOnLogin(user: User): Promise<UserProfile> {
  try {
    // Check if user exists
    const userRef = doc(db, USERS_COLLECTION, user.uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      // User exists - ensure role is correct
      await ensureUserRole(user);
      
      // Return updated profile with fallback support
      return await getUserProfile(user.uid, user.email, user.displayName);
    } else {
      // User doesn't exist - create new profile
      return await createUserProfile(user);
    }
  } catch (error) {
    console.error('Error in createOrUpdateUserOnLogin:', error);
    logProfileFetchError(error, 'createOrUpdateUserOnLogin');
    // Return fallback profile on complete failure
    return createFallbackProfile(user.email, user.uid, user.displayName);
  }
}
