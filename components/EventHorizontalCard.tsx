'use client';

import React, { useState } from 'react';
import { Event, EventStatus } from '@/types/event';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoginRequiredModal from './LoginRequiredModal';
import Image from 'next/image';

interface EventHorizontalCardProps {
  event: Event;
}

// Get status display text based on backend status field
const getStatusText = (status: EventStatus): string => {
  switch (status) {
    case EventStatus.REGISTRATION_OPEN:
      return 'Registration Open';
    case EventStatus.REGISTRATION_CLOSED:
      return 'Registration Closed';
    case EventStatus.ONGOING:
      return 'Ongoing';
    case EventStatus.COMPLETED:
      return 'Completed';
    default:
      return '';
  }
};

// Format date and time
const formatDateTime = (startTime: string, endTime: string): string => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  const dateOptions: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  };
  const timeOptions: Intl.DateTimeFormatOptions = { 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  
  const dateStr = start.toLocaleDateString('en-US', dateOptions);
  const startTimeStr = start.toLocaleTimeString('en-US', timeOptions);
  const endTimeStr = end.toLocaleTimeString('en-US', timeOptions);
  
  return `${dateStr} • ${startTimeStr} - ${endTimeStr}`;
};

export default function EventHorizontalCard({ event }: EventHorizontalCardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking the register button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    router.push(`/event/${event.id}`);
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    // TODO: Implement registration handler for authenticated users
    console.log(`Register for event: ${event.id}`);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group relative bg-card rounded-2xl border border-border overflow-hidden cursor-pointer transition-all duration-300 hover:bg-card-hover animate-fade-in"
      >
      <div className="flex flex-col md:flex-row">
        {/* LEFT SIDE - Event Poster */}
        <div className="relative w-full md:w-48 h-48 md:h-48 flex-shrink-0">
          <Image
            src={event.posterImageUrl}
            alt={event.name}
            fill
            className="object-cover transition-all duration-300 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, 192px"
          />
        </div>

        {/* CENTER & RIGHT SECTIONS */}
        <div className="flex flex-col md:flex-row flex-1 p-6">
          {/* CENTER SECTION - Event Details */}
          <div className="flex-1 mb-4 md:mb-0 md:pr-6">
            {/* Event Name */}
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              {event.name}
            </h3>

            {/* Event Description */}
            <p className="text-sm text-text-secondary mb-3 line-clamp-2">
              {event.description}
            </p>

            {/* Venue */}
            <div className="flex items-center mb-2">
              <svg
                className="w-4 h-4 text-text-secondary mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span className="text-sm text-text-secondary">{event.venue}</span>
            </div>

            {/* Date and Time */}
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-text-secondary mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              <span className="text-sm text-text-secondary">
                {formatDateTime(event.startTime, event.endTime)}
              </span>
            </div>
          </div>

          {/* RIGHT SECTION - Status & Button */}
          <div className="flex md:flex-col items-start md:items-end justify-between md:justify-start gap-3">
            {/* Status Tag */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-card-hover border border-border">
              <span className="text-xs font-medium text-text-primary whitespace-nowrap">
                {getStatusText(event.status)}
              </span>
            </div>

            {/* Register Button - Only show if registration is open */}
            {event.status === EventStatus.REGISTRATION_OPEN && (
              <button
                onClick={handleRegisterClick}
                className="px-6 py-2.5 rounded-lg border-2 border-text-primary text-text-primary font-medium hover:bg-text-primary hover:text-background transition-all duration-200 whitespace-nowrap"
              >
                Register
              </button>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Login Required Modal */}
      <LoginRequiredModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        returnUrl={`/event/${event.id}`}
      />
    </>
  );
}
