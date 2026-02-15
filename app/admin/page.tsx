'use client';

import React, { useState, useEffect } from 'react';
import ProtectedAdminRoute from '@/components/admin/ProtectedAdminRouteV2';
import AdminLayout from '@/components/admin/AdminLayout';
import { useRouter } from 'next/navigation';
import { fetchClubs, fetchEvents } from '@/lib/supabaseDatabase';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalClubs: 0,
    totalEvents: 0,
    upcomingEvents: 0,
    totalRegistrations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      
      // Fetch clubs
      const clubsResult = await fetchClubs();
      const totalClubs = clubsResult.success && clubsResult.data ? clubsResult.data.length : 0;

      // Fetch events
      const eventsResult = await fetchEvents();
      const totalEvents = eventsResult.success && eventsResult.data ? eventsResult.data.length : 0;
      
      // Count upcoming events
      const now = new Date();
      const upcomingEvents = eventsResult.success && eventsResult.data 
        ? eventsResult.data.filter(e => new Date(e.startTime) > now).length 
        : 0;

      setStats({
        totalClubs,
        totalEvents,
        upcomingEvents,
        totalRegistrations: 0, // Will be implemented later
      });
      
      setLoading(false);
    };

    loadStats();
  }, []);

  const statCards = [
    {
      label: 'Total Clubs',
      value: stats.totalClubs,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      action: () => router.push('/admin/clubs'),
    },
    {
      label: 'Total Events',
      value: stats.totalEvents,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      action: () => router.push('/admin/events'),
    },
    {
      label: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      action: () => router.push('/admin/events'),
    },
    {
      label: 'Total Registrations',
      value: stats.totalRegistrations,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      action: () => {},
    },
  ];

  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Dashboard Overview</h2>

          {/* Stats Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <div className="animate-pulse">
                    <div className="w-8 h-8 bg-background rounded mb-4"></div>
                    <div className="h-4 bg-background rounded w-20 mb-2"></div>
                    <div className="h-8 bg-background rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((stat, index) => (
                <button
                  key={index}
                  onClick={stat.action}
                  className="bg-card border border-border rounded-lg p-6 hover:bg-card-hover transition-colors text-left"
                >
                  <div className="text-text-secondary mb-4">{stat.icon}</div>
                  <p className="text-sm text-text-secondary mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
                </button>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => router.push('/admin/clubs')}
                className="bg-card border border-border rounded-lg p-4 hover:bg-card-hover transition-colors text-left flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Add New Club</p>
                  <p className="text-xs text-text-secondary">Create a new campus club</p>
                </div>
              </button>

              <button
                onClick={() => router.push('/admin/events')}
                className="bg-card border border-border rounded-lg p-4 hover:bg-card-hover transition-colors text-left flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Add New Event</p>
                  <p className="text-xs text-text-secondary">Create a new event</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}
