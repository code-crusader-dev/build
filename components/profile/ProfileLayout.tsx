'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import ProfileSidebar from './ProfileSidebar';

interface ProfileLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function ProfileLayout({ children, activeSection, onSectionChange }: ProfileLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 flex">
        {/* Sidebar - Fixed on desktop, hidden on mobile */}
        <ProfileSidebar 
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full lg:ml-64">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
