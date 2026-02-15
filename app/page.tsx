'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ClubCard from '@/components/ClubCard';
import ClubCardSkeleton from '@/components/ClubCardSkeleton';
import EmptyState from '@/components/EmptyState';
import { mockClubs } from '@/data/mockClubs';
import { Club } from '@/types/club';

export default function Home() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch
    // Replace this with actual Firebase query when backend is ready
    const fetchClubs = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setClubs(mockClubs);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Title */}
          <h2 className="text-4xl font-bold text-text-primary mb-8 animate-fade-in">
            Campus Clubs
          </h2>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <ClubCardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && clubs.length === 0 && <EmptyState />}

          {/* Clubs Grid */}
          {!loading && clubs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {clubs.map((club) => (
                <ClubCard key={club.id} club={club} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
