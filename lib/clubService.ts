import { db } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { Club } from '@/types/club';

const CLUBS_COLLECTION = 'clubs';

/**
 * Get all clubs
 */
export async function getAllClubs(): Promise<Club[]> {
  try {
    const clubsRef = collection(db, CLUBS_COLLECTION);
    const q = query(clubsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert Firestore Timestamps to ISO strings
      createdAt: (doc.data().createdAt as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
      updatedAt: (doc.data().updatedAt as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
    })) as Club[];
  } catch (error) {
    console.error('Error fetching clubs:', error);
    throw error;
  }
}

/**
 * Get single club by ID
 */
export async function getClubById(clubId: string): Promise<Club | null> {
  try {
    const clubRef = doc(db, CLUBS_COLLECTION, clubId);
    const clubSnap = await getDoc(clubRef);
    
    if (!clubSnap.exists()) {
      return null;
    }
    
    const data = clubSnap.data();
    return {
      id: clubSnap.id,
      ...data,
      createdAt: (data.createdAt as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
      updatedAt: (data.updatedAt as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
    } as Club;
  } catch (error) {
    console.error('Error fetching club:', error);
    throw error;
  }
}

/**
 * Create new club
 */
export async function createClub(
  clubData: Omit<Club, 'id' | 'createdAt' | 'updatedAt' | 'followersCount'>
): Promise<{ success: true; clubId: string } | { success: false; error: string }> {
  try {
    const clubsRef = collection(db, CLUBS_COLLECTION);
    const docRef = await addDoc(clubsRef, {
      ...clubData,
      followersCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return { success: true, clubId: docRef.id };
  } catch (error: any) {
    console.error('Error creating club:', error);
    return { success: false, error: error.message || 'Failed to create club' };
  }
}

/**
 * Update existing club
 */
export async function updateClub(
  clubId: string,
  updates: Partial<Omit<Club, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>>
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const clubRef = doc(db, CLUBS_COLLECTION, clubId);
    await updateDoc(clubRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    
    return { success: true };
  } catch (error: any) {
    console.error('Error updating club:', error);
    return { success: false, error: error.message || 'Failed to update club' };
  }
}

/**
 * Delete club
 */
export async function deleteClub(clubId: string): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const clubRef = doc(db, CLUBS_COLLECTION, clubId);
    await deleteDoc(clubRef);
    
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting club:', error);
    return { success: false, error: error.message || 'Failed to delete club' };
  }
}
