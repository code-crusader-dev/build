'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ClubCard from '@/components/ClubCard';
import ClubCardSkeleton from '@/components/ClubCardSkeleton';
import EmptyState from '@/components/EmptyState';
import EventHorizontalCard from '@/components/EventHorizontalCard';
import EventCardSkeleton from '@/components/EventCardSkeleton';
import EventsEmptyState from '@/components/EventsEmptyState';
import EventFilterBar from '@/components/events/EventFilterBar';
import { mockClubs } from '@/data/mockClubs';
import { mockEvents } from '@/data/mockEvents';
import { Club } from '@/types/club';
import { Event } from '@/types/event';
import { useEventFilters } from '@/hooks/useEventFilters';

export default function Home() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Use event filtering hook
  const { filters, setFilters, filteredEvents, totalCount, filteredCount } = useEventFilters(events);

  useEffect(() => {
    // Simulate data fetch
    // Replace this with actual Firebase query when backend is ready
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setClubs(mockClubs);
        setEvents(mockEvents);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Clubs Section */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-8 animate-fade-in">
              Campus Clubs
            </h2>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <ClubCardSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && clubs.length === 0 && <EmptyState />}

            {/* Clubs Grid */}
            {!loading && clubs.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {clubs.map((club) => (
                  <ClubCard key={club.id} club={club} />
                ))}
              </div>
            )}
          </section>

          {/* Events Section with Filters */}
          <section>
            <h2 className="text-4xl font-bold text-text-primary mb-8 animate-fade-in">
              Upcoming Events
            </h2>

            {/* Event Filter Bar */}
            {!loading && events.length > 0 && (
              <EventFilterBar
                filters={filters}
                onFiltersChange={setFilters}
                totalEvents={totalCount}
                filteredCount={filteredCount}
              />
            )}

            {/* Loading State */}
            {loading && (
              <div className="space-y-4">
                {[...Array(4)].map((_, index) => (
                  <EventCardSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Empty State - No Events */}
            {!loading && events.length === 0 && <EventsEmptyState />}

            {/* Empty State - No Matches */}
            {!loading && events.length > 0 && filteredEvents.length === 0 && (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <svg
                  className="w-16 h-16 text-text-secondary mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="text-xl font-medium text-text-primary mb-2">No events match your filters</h3>
                <p className="text-text-secondary mb-4">Try adjusting your filters to see more events</p>
                <button
                  onClick={() => setFilters({ statuses: [], dateRange: 'all', searchQuery: '' })}
                  className="px-4 py-2 bg-text-primary text-background rounded hover:brightness-90 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Events List */}
            {!loading && filteredEvents.length > 0 && (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <EventHorizontalCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
