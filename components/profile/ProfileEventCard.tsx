'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Event, EventStatus } from '@/types/event';
import { mockClubs } from '@/data/mockClubs';
import Image from 'next/image';

interface ProfileEventCardProps {
  event: Event;
}

// Get status display text and color
const getStatusInfo = (status: EventStatus): { text: string; color: string } => {
  switch (status) {
    case EventStatus.REGISTRATION_OPEN:
      return { text: 'Registration Open', color: 'text-text-primary' };
    case EventStatus.REGISTRATION_CLOSED:
      return { text: 'Registration Closed', color: 'text-text-secondary' };
    case EventStatus.ONGOING:
      return { text: 'Ongoing', color: 'text-text-primary' };
    case EventStatus.COMPLETED:
      return { text: 'Completed', color: 'text-text-secondary' };
    default:
      return { text: '', color: 'text-text-secondary' };
  }
};

// Format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
};

export default function ProfileEventCard({ event }: ProfileEventCardProps) {
  const router = useRouter();
  const club = mockClubs.find(c => c.id === event.clubId);
  const statusInfo = getStatusInfo(event.status);

  const handleView = () => {
    router.push(`/event/${event.id}`);
  };

  return (
    <div className="bg-card-hover rounded-xl border border-border overflow-hidden hover:scale-[1.02] transition-transform duration-200">
      {/* Event Image */}
      <div className="relative h-32 w-full">
        <Image
          src={event.posterImageUrl}
          alt={event.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border">
            <span className={`text-xs font-medium ${statusInfo.color}`}>
              {statusInfo.text}
            </span>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-4">
        {/* Event Name */}
        <h3 className="text-base font-semibold text-text-primary mb-2 line-clamp-1">
          {event.name}
        </h3>

        {/* Club Name */}
        <p className="text-xs text-text-secondary mb-3">
          {club?.name || 'Unknown Club'}
        </p>

        {/* Date */}
        <div className="flex items-center mb-4">
          <svg
            className="w-4 h-4 text-text-secondary mr-2 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs text-text-secondary">
            {formatDate(event.startTime)}
          </span>
        </div>

        {/* View Button */}
        <button
          onClick={handleView}
          className="w-full px-4 py-2 rounded-lg border border-border text-sm text-text-primary hover:bg-background transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
