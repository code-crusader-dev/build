'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import EventHorizontalCard from '@/components/EventHorizontalCard';
import EventCardSkeleton from '@/components/EventCardSkeleton';
import EventsEmptyState from '@/components/EventsEmptyState';
import { mockClubs } from '@/data/mockClubs';
import { mockEvents } from '@/data/mockEvents';
import { Event } from '@/types/event';
import { Club } from '@/types/club';

export default function ClubDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clubId = params.clubId as string;

  const [club, setClub] = useState<Club | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch
    // Replace this with actual Firebase query when backend is ready
    const fetchClubAndEvents = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Get club data
        const clubData = mockClubs.find(c => c.id === clubId);
        setClub(clubData || null);

        // Get events for this club
        const clubEvents = mockEvents.filter(e => e.clubId === clubId);
        setEvents(clubEvents);
      } catch (error) {
        console.error('Error fetching club and events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubAndEvents();
  }, [clubId]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mb-6 px-4 py-2 rounded-lg border border-border text-text-primary hover:bg-card-hover transition-colors duration-200 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Clubs
          </button>

          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-text-primary mb-2">
              {loading ? 'Loading...' : club?.name || 'Club Not Found'}
            </h1>
            <p className="text-text-secondary">
              {loading 
                ? 'Fetching club information...' 
                : club 
                ? 'Explore upcoming events, workshops, and activities organized by this club'
                : 'The club you are looking for does not exist'}
            </p>
          </div>

          {/* Events Section */}
          {club && (
            <div>
              <h2 className="text-2xl font-semibold text-text-primary mb-6">
                Events
              </h2>

              {/* Loading State */}
              {loading && (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <EventCardSkeleton key={index} />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && events.length === 0 && <EventsEmptyState />}

              {/* Events List */}
              {!loading && events.length > 0 && (
                <div className="space-y-4">
                  {events.map((event) => (
                    <EventHorizontalCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Club Not Found State */}
          {!loading && !club && (
            <div className="text-center py-20 animate-fade-in">
              <div className="mb-4">
                <svg
                  className="mx-auto h-16 w-16 text-text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-text-primary mb-2">
                Club not found
              </h3>
              <p className="text-text-secondary text-sm mb-6">
                The club you're looking for doesn't exist or has been removed
              </p>
              <button
                onClick={() => router.push('/')}
                className="px-6 py-2.5 rounded-lg border border-border text-text-primary hover:bg-card-hover transition-colors duration-200"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
