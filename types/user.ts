export type UserRole = 'user' | 'admin' | 'club_admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  rollNumber?: string;
  role: UserRole; // User role for access control
  followedClubs: string[]; // Array of club IDs
  createdAt: string; // ISO 8601 format
}

export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  registeredAt: string; // ISO 8601 format
  status: 'confirmed' | 'cancelled' | 'attended';
}
