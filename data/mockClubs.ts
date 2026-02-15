import { Club } from '@/types/club';

// Mock data for clubs
// This structure is ready for Firebase integration
// Replace this with actual Firebase queries when backend is ready
export const mockClubs: Club[] = [
  {
    id: 'tech-innovators',
    name: 'Tech Innovators Club',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=800&fit=crop',
    upcomingEventsCount: 3,
  },
  {
    id: 'robotics-society',
    name: 'Robotics Society',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=800&fit=crop',
    upcomingEventsCount: 2,
  },
  {
    id: 'photography-club',
    name: 'Photography Club',
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=800&fit=crop',
    upcomingEventsCount: 5,
  },
  {
    id: 'debate-team',
    name: 'Debate Team',
    imageUrl: 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=800&h=800&fit=crop',
    upcomingEventsCount: 1,
  },
  {
    id: 'music-ensemble',
    name: 'Music Ensemble',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=800&fit=crop',
    upcomingEventsCount: 4,
  },
  {
    id: 'entrepreneurship-club',
    name: 'Entrepreneurship Club',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=800&fit=crop',
    upcomingEventsCount: 2,
  },
  {
    id: 'art-collective',
    name: 'Art Collective',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=800&fit=crop',
    upcomingEventsCount: 3,
  },
  {
    id: 'environmental-action',
    name: 'Environmental Action',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=800&fit=crop',
    upcomingEventsCount: 1,
  },
];

// Function structure ready for Firebase integration
// Example Firebase implementation:
/*
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function getClubs(): Promise<Club[]> {
  const clubsCollection = collection(db, 'clubs');
  const clubsSnapshot = await getDocs(clubsCollection);
  const clubs = clubsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Club[];
  return clubs;
}
*/
