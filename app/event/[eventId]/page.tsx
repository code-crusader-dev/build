'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => router.back()}
            className="mb-6 px-4 py-2 rounded-lg border border-border text-text-primary hover:bg-card-hover transition-colors duration-200 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Events
          </button>
          
          <div className="text-center py-20 animate-fade-in">
            <h1 className="text-3xl font-bold text-text-primary mb-4">
              Event Detail Page
            </h1>
            <p className="text-text-secondary">
              Event ID: <span className="text-text-primary">{eventId}</span>
            </p>
            <p className="text-text-secondary mt-4 text-sm">
              This page will display detailed information about the event
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
