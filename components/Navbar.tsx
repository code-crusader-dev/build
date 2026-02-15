'use client';

import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Platform Name */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-text-primary tracking-tight">
              CampusFlow
            </h1>
          </div>

          {/* Right: Profile/Login Button */}
          <div>
            <button className="px-4 py-2 rounded-lg border border-border text-text-primary hover:bg-card-hover transition-colors duration-200">
              Profile
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
