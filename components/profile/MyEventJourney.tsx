'use client';

import React, { useState, useMemo } from 'react';
import { Event, EventStatus } from '@/types/event';
import ProfileEventCard from './ProfileEventCard';

interface MyEventJourneyProps {
  events: Event[];
}

type TabType = 'upcoming' | 'ongoing' | 'completed';

export default function MyEventJourney({ events }: MyEventJourneyProps) {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');

  // Filter events by tab
  const filteredEvents = useMemo(() => {
    const now = new Date();

    switch (activeTab) {
      case 'upcoming':
        return events.filter(e => 
          new Date(e.startTime) > now && 
          e.status !== EventStatus.COMPLETED
        );
      case 'ongoing':
        return events.filter(e => 
          e.status === EventStatus.ONGOING ||
          (new Date(e.startTime) <= now && new Date(e.endTime) >= now)
        );
      case 'completed':
        return events.filter(e => 
          e.status === EventStatus.COMPLETED ||
          new Date(e.endTime) < now
        );
      default:
        return events;
    }
  }, [events, activeTab]);

  const tabs: { id: TabType; label: string; count: number }[] = [
    {
      id: 'upcoming',
      label: 'Upcoming',
      count: events.filter(e => 
        new Date(e.startTime) > new Date() && 
        e.status !== EventStatus.COMPLETED
      ).length,
    },
    {
      id: 'ongoing',
      label: 'Ongoing',
      count: events.filter(e => 
        e.status === EventStatus.ONGOING ||
        (new Date(e.startTime) <= new Date() && new Date(e.endTime) >= new Date())
      ).length,
    },
    {
      id: 'completed',
      label: 'Completed',
      count: events.filter(e => 
        e.status === EventStatus.COMPLETED ||
        new Date(e.endTime) < new Date()
      ).length,
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Section Header */}
      <h2 className="text-2xl font-semibold text-text-primary mb-6">
        My Event Journey
      </h2>

      {/* Tabs */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200
                ${
                  activeTab === tab.id
                    ? 'bg-card-hover text-text-primary border-b-2 border-text-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-card-hover'
                }
              `}
            >
              <span>{tab.label}</span>
              <span className="ml-2 text-xs opacity-60">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">
                No {activeTab} events
              </h3>
              <p className="text-text-secondary text-sm">
                {activeTab === 'upcoming' && "You haven't registered for any upcoming events yet"}
                {activeTab === 'ongoing' && "You don't have any ongoing events"}
                {activeTab === 'completed' && "You haven't completed any events yet"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEvents.map((event) => (
                <ProfileEventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
