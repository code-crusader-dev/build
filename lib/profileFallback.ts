import { UserProfile } from '@/types/user';

/**
 * Default avatar placeholder image
 */
export const DEFAULT_AVATAR_URL = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop';

/**
 * Create a fallback profile when backend fetch fails
 * @param email - User's email (from auth)
 * @param uid - User's Firebase UID
 * @param displayName - User's display name from auth (optional)
 * @returns Dummy profile object
 */
export const createFallbackProfile = (
  email: string | null,
  uid: string,
  displayName?: string | null
): UserProfile => {
  const fallbackEmail = email || 'student@nitj.ac.in';
  const fallbackName = displayName || 'Student User';

  return {
    uid,
    email: fallbackEmail,
    displayName: fallbackName,
    photoURL: DEFAULT_AVATAR_URL,
    rollNumber: 'TEMP1234',
    role: 'user',
    followedClubs: [],
    createdAt: new Date().toISOString(),
  };
};

/**
 * Extended profile with additional fields for display
 */
export interface ExtendedProfile extends UserProfile {
  department?: string;
  year?: string;
  bio?: string;
}

/**
 * Create extended fallback profile with additional fields
 */
export const createExtendedFallbackProfile = (
  email: string | null,
  uid: string,
  displayName?: string | null
): ExtendedProfile => {
  return {
    ...createFallbackProfile(email, uid, displayName),
    department: 'CSE',
    year: '2nd Year',
    bio: 'Campus Platform User',
  };
};

/**
 * Log profile fetch error to console (dev mode)
 */
export const logProfileFetchError = (error: any, context: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🔴 Profile Fetch Error - ${context}`);
    console.error('Error:', error);
    console.log('Using fallback profile data');
    console.groupEnd();
  }
};
