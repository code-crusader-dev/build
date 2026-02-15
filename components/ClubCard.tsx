'use client';

import React from 'react';
import { Club } from '@/types/club';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ClubCardProps {
  club: Club;
}

export default function ClubCard({ club }: ClubCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/club/${club.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-card rounded-2xl border border-border overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:bg-card-hover animate-fade-in"
    >
      {/* Club Image */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={club.imageUrl}
          alt={club.name}
          fill
          className="object-cover transition-all duration-300 group-hover:brightness-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Club Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            {club.name}
          </h3>
          
          {/* Upcoming Events Badge */}
          {club.upcomingEventsCount > 0 && (
            <div className="inline-block">
              <span className="text-xs text-text-secondary">
                Upcoming: {club.upcomingEventsCount} {club.upcomingEventsCount === 1 ? 'event' : 'events'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
