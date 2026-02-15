'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Club } from '@/types/club';
import Image from 'next/image';

interface FollowedClubsProps {
  clubs: Club[];
}

export default function FollowedClubs({ clubs }: FollowedClubsProps) {
  const router = useRouter();

  const handleUnfollow = (clubId: string) => {
    // TODO: Implement unfollow logic
    console.log('Unfollow club:', clubId);
  };

  const handleClubClick = (clubId: string) => {
    router.push(`/club/${clubId}`);
  };

  return (
    <div className="animate-fade-in">
      {/* Section Header */}
      <h2 className="text-2xl font-semibold text-text-primary mb-6">
        Followed Clubs
      </h2>

      {/* Clubs Container */}
      <div className="bg-card rounded-2xl border border-border p-6">
        {clubs.length === 0 ? (
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">
              No followed clubs
            </h3>
            <p className="text-text-secondary text-sm mb-6">
              Start following clubs to stay updated on their events
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2.5 rounded-lg border border-border text-text-primary hover:bg-card-hover transition-colors duration-200"
            >
              Browse Clubs
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-6 px-6">
            <div className="flex gap-4 pb-4">
              {clubs.map((club) => (
                <div
                  key={club.id}
                  className="flex-shrink-0 w-48 bg-card-hover rounded-xl border border-border overflow-hidden hover:scale-[1.02] transition-transform duration-200"
                >
                  {/* Club Image */}
                  <div
                    className="relative h-32 w-full cursor-pointer"
                    onClick={() => handleClubClick(club.id)}
                  >
                    <Image
                      src={club.imageUrl || club.logoUrl}
                      alt={club.name}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  </div>

                  {/* Club Info */}
                  <div className="p-4">
                    <h3
                      className="text-sm font-semibold text-text-primary mb-1 line-clamp-1 cursor-pointer hover:text-text-secondary transition-colors"
                      onClick={() => handleClubClick(club.id)}
                    >
                      {club.name}
                    </h3>
                    <p className="text-xs text-text-secondary mb-3">
                      {club.upcomingEventsCount || 0} upcoming events
                    </p>

                    {/* Unfollow Button */}
                    <button
                      onClick={() => handleUnfollow(club.id)}
                      className="w-full px-3 py-1.5 rounded-lg border border-border text-xs text-text-secondary hover:text-text-primary hover:bg-background transition-colors duration-200"
                    >
                      Unfollow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
