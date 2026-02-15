import { Club } from '@/types/club';

// Mock data for clubs
// This structure is ready for Firebase integration
// Replace this with actual Firebase queries when backend is ready
export const mockClubs: Club[] = [
  {
    id: 'tech-innovators',
    name: 'Tech Innovators Club',
    description: 'Exploring the latest in technology and innovation',
    logoUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=800&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=800&fit=crop',
    theme: 'default-mono',
    followersCount: 245,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    upcomingEventsCount: 3,
  },
  {
    id: 'robotics-society',
    name: 'Robotics Society',
    description: 'Building the future with robotics and automation',
    logoUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=800&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=800&fit=crop',
    theme: 'dark-glass',
    followersCount: 189,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    upcomingEventsCount: 2,
  },
  {
    id: 'photography-club',
    name: 'Photography Club',
    description: 'Capturing moments and creating visual stories',
    logoUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=800&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=800&fit=crop',
    theme: 'soft-mono',
    followersCount: 312,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    upcomingEventsCount: 5,
  },
  {
    id: 'debate-team',
    name: 'Debate Team',
    description: 'Sharpening minds through structured argumentation',
    logoUrl: 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=800&h=800&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=800&h=800&fit=crop',
    theme: 'default-mono',
    followersCount: 156,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    upcomingEventsCount: 1,
  },
  {
    id: 'music-ensemble',
    name: 'Music Ensemble',
    description: 'Harmonizing talents and creating beautiful music',
    logoUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=800&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=800&fit=crop',
    theme: 'dark-glass',
    followersCount: 278,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    upcomingEventsCount: 4,
  },
  {
    id: 'entrepreneurship-club',
    name: 'Entrepreneurship Club',
    description: 'Fostering innovation and business leadership',
    logoUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=800&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=800&fit=crop',
    theme: 'soft-mono',
    followersCount: 201,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    upcomingEventsCount: 2,
  },
  {
    id: 'art-collective',
    name: 'Art Collective',
    description: 'Expressing creativity through various art forms',
    logoUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=800&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=800&fit=crop',
    theme: 'default-mono',
    followersCount: 267,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    upcomingEventsCount: 3,
  },
  {
    id: 'environmental-action',
    name: 'Environmental Action',
    description: 'Working towards a sustainable future',
    logoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=800&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=800&fit=crop',
    theme: 'dark-glass',
    followersCount: 334,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
