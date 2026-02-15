'use client';

import React from 'react';
import { UserProfile } from '@/types/user';
import Image from 'next/image';

interface ProfileHeroCardProps {
  userProfile: UserProfile;
  stats: {
    eventsRegistered: number;
    eventsAttended: number;
    clubsFollowing: number;
  };
}

export default function ProfileHeroCard({ userProfile, stats }: ProfileHeroCardProps) {
  return (
    <div className="bg-card rounded-2xl border border-border p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Avatar & Info */}
        <div className="flex flex-col items-center md:items-start gap-4">
          {/* Large Avatar */}
          <div className="flex-shrink-0">
            {userProfile.photoURL ? (
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-border">
                <Image
                  src={userProfile.photoURL}
                  alt={userProfile.displayName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-card-hover border-2 border-border flex items-center justify-center">
                <span className="text-5xl text-text-primary">
                  {userProfile.displayName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {userProfile.displayName}
            </h1>
            <p className="text-sm text-text-secondary mb-1">
              {userProfile.email}
            </p>
            {userProfile.rollNumber && (
              <p className="text-sm text-text-secondary">
                Roll No: {userProfile.rollNumber}
              </p>
            )}
          </div>

          {/* Bio (if exists) */}
          <div className="max-w-md">
            <p className="text-sm text-text-secondary text-center md:text-left">
              Passionate about technology and innovation. Always eager to learn new skills and participate in campus events.
            </p>
          </div>
        </div>

        {/* Right: Stats Chips */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-end gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-3 w-full md:w-auto">
            {/* Events Registered */}
            <div className="bg-card-hover border border-border rounded-xl px-6 py-4 text-center md:text-right">
              <div className="text-3xl font-bold text-text-primary mb-1">
                {stats.eventsRegistered}
              </div>
              <div className="text-xs text-text-secondary whitespace-nowrap">
                Events Registered
              </div>
            </div>

            {/* Events Attended */}
            <div className="bg-card-hover border border-border rounded-xl px-6 py-4 text-center md:text-right">
              <div className="text-3xl font-bold text-text-primary mb-1">
                {stats.eventsAttended}
              </div>
              <div className="text-xs text-text-secondary whitespace-nowrap">
                Events Attended
              </div>
            </div>

            {/* Clubs Following */}
            <div className="bg-card-hover border border-border rounded-xl px-6 py-4 text-center md:text-right">
              <div className="text-3xl font-bold text-text-primary mb-1">
                {stats.clubsFollowing}
              </div>
              <div className="text-xs text-text-secondary whitespace-nowrap">
                Clubs Following
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
