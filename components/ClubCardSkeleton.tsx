'use client';

import React from 'react';

export default function ClubCardSkeleton() {
  return (
    <div className="relative bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
      {/* Skeleton Image */}
      <div className="aspect-square w-full bg-card-hover" />
      
      {/* Skeleton Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="h-5 bg-card-hover rounded w-3/4 mb-2" />
        <div className="h-3 bg-card-hover rounded w-1/2" />
      </div>
    </div>
  );
}
