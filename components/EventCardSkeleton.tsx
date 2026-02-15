'use client';

import React from 'react';

export default function EventCardSkeleton() {
  return (
    <div className="relative bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
      <div className="flex flex-col md:flex-row">
        {/* LEFT SIDE - Image Skeleton */}
        <div className="w-full md:w-48 h-48 md:h-48 bg-card-hover" />

        {/* CENTER & RIGHT SECTIONS */}
        <div className="flex flex-col md:flex-row flex-1 p-6">
          {/* CENTER SECTION - Details Skeleton */}
          <div className="flex-1 mb-4 md:mb-0 md:pr-6">
            {/* Event Name */}
            <div className="h-6 bg-card-hover rounded w-3/4 mb-3" />

            {/* Event Description */}
            <div className="h-4 bg-card-hover rounded w-full mb-2" />
            <div className="h-4 bg-card-hover rounded w-5/6 mb-4" />

            {/* Venue */}
            <div className="h-4 bg-card-hover rounded w-1/2 mb-2" />

            {/* Date and Time */}
            <div className="h-4 bg-card-hover rounded w-2/3" />
          </div>

          {/* RIGHT SECTION - Status & Button Skeleton */}
          <div className="flex md:flex-col items-start md:items-end justify-between md:justify-start gap-3">
            {/* Status Tag Skeleton */}
            <div className="h-8 bg-card-hover rounded-full w-32" />

            {/* Button Skeleton */}
            <div className="h-10 bg-card-hover rounded-lg w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
