'use client';

import React from 'react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 animate-fade-in">
      <div className="text-center">
        {/* Icon */}
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        
        {/* Text */}
        <h3 className="text-xl font-medium text-text-primary mb-2">
          No clubs available
        </h3>
        <p className="text-text-secondary text-sm">
          Check back soon for new campus clubs and organizations
        </p>
      </div>
    </div>
  );
}
