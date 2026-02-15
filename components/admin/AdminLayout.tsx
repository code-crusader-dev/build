'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { label: 'Overview', path: '/admin' },
    { label: 'Clubs', path: '/admin/clubs' },
    { label: 'Events', path: '/admin/events' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-16">
        {/* Admin Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Admin Panel</h1>
                <p className="text-sm text-text-secondary mt-1">
                  Logged in as: {user?.email}
                </p>
              </div>
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border rounded hover:bg-card-hover transition-colors"
              >
                Back to Site
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-4 mt-6 border-b border-border">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      isActive
                        ? 'border-text-primary text-text-primary'
                        : 'border-transparent text-text-secondary hover:text-text-primary hover:border-text-secondary'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Admin Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
