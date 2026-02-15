'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ProfileLayout from '@/components/profile/ProfileLayout';
import ProfileHeroCard from '@/components/profile/ProfileHeroCard';
import MyEventJourney from '@/components/profile/MyEventJourney';
import FollowedClubs from '@/components/profile/FollowedClubs';
import { UserProfile } from '@/types/user';
import { Event, EventStatus } from '@/types/event';
import { Club } from '@/types/club';
import { getUserProfile } from '@/lib/userService';
import { createFallbackProfile } from '@/lib/profileFallback';

export default function ProfilePage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [followedClubs, setFollowedClubs] = useState<Club[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, authLoading, router]);

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      try {
        // Simulate network delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800));

        // Fetch user profile with automatic fallback on error
        const profile = await getUserProfile(user.uid, user.email, user.displayName);
        
        // Check if using fallback data
        const isFallback = profile.rollNumber === 'TEMP1234';
        if (isFallback) {
          console.log('ℹ️ Profile sync pending - using fallback data');
        }

        // Mock registered events
        const mockRegisteredEvents: Event[] = [
          {
            id: 'hackathon-2024',
            clubId: 'tech-innovators',
            name: 'Annual Tech Hackathon 2024',
            description: 'Join us for 48 hours of coding, innovation, and collaboration.',
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
            id: 'web-dev-bootcamp',
            clubId: 'tech-innovators',
            name: 'Full Stack Web Development Bootcamp',
            description: 'Intensive 3-day bootcamp covering frontend and backend development.',
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
            id: 'tech-talk-feb',
            clubId: 'tech-innovators',
            name: 'Tech Talk: Future of Web Development',
            description: 'Live discussion on emerging web technologies.',
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
            description: 'Competitive coding event with algorithmic challenges.',
            venue: 'Main Campus Arena',
            startTime: '2024-01-10T09:00:00Z',
            endTime: '2024-01-10T17:00:00Z',
            registrationDeadline: '2024-01-08T23:59:59Z',
            capacity: 100,
            registeredCount: 98,
            status: EventStatus.COMPLETED,
            posterImageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=800&fit=crop',
          },
        ];

        // Mock followed clubs
        const mockFollowedClubs: Club[] = [
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
        ];

        setUserProfile(profile);
        setRegisteredEvents(mockRegisteredEvents);
        setFollowedClubs(mockFollowedClubs);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user]);

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-text-secondary">Loading...</div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Calculate stats
  const upcomingEvents = registeredEvents.filter(e => 
    new Date(e.startTime) > new Date()
  );
  const completedEvents = registeredEvents.filter(e => 
    e.status === EventStatus.COMPLETED
  );

  return (
    <ProfileLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      <div className="space-y-6">
        {/* Profile Hero Card */}
        {!loading && userProfile && (
          <ProfileHeroCard
            userProfile={userProfile}
            stats={{
              eventsRegistered: registeredEvents.length,
              eventsAttended: completedEvents.length,
              clubsFollowing: followedClubs.length,
            }}
          />
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-card rounded-2xl border border-border p-8 animate-pulse">
            <div className="h-24 bg-card-hover rounded mb-4" />
            <div className="h-6 bg-card-hover rounded w-1/3 mb-2" />
            <div className="h-4 bg-card-hover rounded w-1/2" />
          </div>
        )}

        {/* My Event Journey Section */}
        {(activeSection === 'overview' || activeSection === 'events') && !loading && (
          <MyEventJourney events={registeredEvents} />
        )}

        {/* Followed Clubs Section */}
        {(activeSection === 'overview' || activeSection === 'clubs') && !loading && (
          <FollowedClubs clubs={followedClubs} />
        )}

        {/* Settings Section */}
        {activeSection === 'settings' && !loading && (
          <div className="bg-card rounded-2xl border border-border p-8 animate-fade-in">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Settings
            </h2>
            <p className="text-text-secondary">
              Settings section coming soon...
            </p>
          </div>
        )}
      </div>
    </ProfileLayout>
  );
}
