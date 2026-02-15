import { Event, EventStatus } from '@/types/event';

// Mock data for events
// This structure is ready for Firebase integration
// Replace this with actual Firebase queries when backend is ready
export const mockEvents: Event[] = [
  {
    id: 'hackathon-2024',
    clubId: 'tech-innovators',
    name: 'Annual Tech Hackathon 2024',
    description: 'Join us for 48 hours of coding, innovation, and collaboration. Build amazing projects and win exciting prizes.',
    venue: 'Engineering Building, Hall A',
    startTime: '2024-03-15T09:00:00Z',
    endTime: '2024-03-17T18:00:00Z',
    registrationDeadline: '2024-03-10T23:59:59Z',
    capacity: 150,
    registeredCount: 87,
    status: EventStatus.REGISTRATION_OPEN,
    posterImageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=800&fit=crop',
  },
  {
    id: 'ai-workshop',
    clubId: 'tech-innovators',
    name: 'Machine Learning Workshop',
    description: 'Learn the fundamentals of machine learning and build your first AI model. Hands-on session with industry experts.',
    venue: 'Computer Lab 301',
    startTime: '2024-02-20T14:00:00Z',
    endTime: '2024-02-20T17:00:00Z',
    registrationDeadline: '2024-02-18T23:59:59Z',
    capacity: 50,
    registeredCount: 50,
    status: EventStatus.REGISTRATION_CLOSED,
    posterImageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=800&fit=crop',
  },
  {
    id: 'tech-talk-feb',
    clubId: 'tech-innovators',
    name: 'Tech Talk: Future of Web Development',
    description: 'Live discussion on emerging web technologies and frameworks. Q&A session with senior developers from leading tech companies.',
    venue: 'Auditorium B',
    startTime: '2024-02-15T10:26:00Z',
    endTime: '2024-02-15T18:00:00Z',
    registrationDeadline: '2024-02-14T23:59:59Z',
    capacity: 200,
    registeredCount: 145,
    status: EventStatus.ONGOING,
    posterImageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=800&fit=crop',
  },
  {
    id: 'code-sprint-jan',
    clubId: 'tech-innovators',
    name: 'Code Sprint Championship',
    description: 'Competitive coding event with algorithmic challenges. Test your problem-solving skills against the best coders.',
    venue: 'Main Campus Arena',
    startTime: '2024-01-10T09:00:00Z',
    endTime: '2024-01-10T17:00:00Z',
    registrationDeadline: '2024-01-08T23:59:59Z',
    capacity: 100,
    registeredCount: 98,
    status: EventStatus.COMPLETED,
    posterImageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=800&fit=crop',
  },
  {
    id: 'web-dev-bootcamp',
    clubId: 'tech-innovators',
    name: 'Full Stack Web Development Bootcamp',
    description: 'Intensive 3-day bootcamp covering frontend and backend development. Build and deploy a complete web application.',
    venue: 'Innovation Center, Room 205',
    startTime: '2024-03-22T09:00:00Z',
    endTime: '2024-03-24T18:00:00Z',
    registrationDeadline: '2024-03-18T23:59:59Z',
    capacity: 60,
    registeredCount: 23,
    status: EventStatus.REGISTRATION_OPEN,
    posterImageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=800&fit=crop',
  },
  {
    id: 'cybersecurity-seminar',
    clubId: 'tech-innovators',
    name: 'Cybersecurity Awareness Seminar',
    description: 'Learn about the latest security threats and best practices to protect your digital assets. Expert-led session.',
    venue: 'Library Conference Room',
    startTime: '2024-02-28T15:00:00Z',
    endTime: '2024-02-28T18:00:00Z',
    registrationDeadline: '2024-02-26T23:59:59Z',
    capacity: 80,
    registeredCount: 65,
    status: EventStatus.REGISTRATION_OPEN,
    posterImageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=800&fit=crop',
  },
];

// Function structure ready for Firebase integration
// Example Firebase implementation:
/*
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function getEventsByClubId(clubId: string): Promise<Event[]> {
  const eventsCollection = collection(db, 'events');
  const q = query(eventsCollection, where('clubId', '==', clubId));
  const eventsSnapshot = await getDocs(q);
  const events = eventsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Event[];
  return events;
}
*/
