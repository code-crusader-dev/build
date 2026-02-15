'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { signOut } from '@/lib/authService';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    setShowDropdown(false);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Platform Name */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-text-primary tracking-tight cursor-pointer" onClick={() => router.push('/')}>
              CampusFlow
            </h1>
          </div>

          {/* Right: User Profile or Login/Sign Up */}
          <div className="relative">
            {isAuthenticated && user ? (
              <>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg border border-border text-text-primary hover:bg-card-hover transition-colors duration-200"
                >
                  {/* User Avatar */}
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-card-hover flex items-center justify-center text-xs">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="hidden sm:block text-sm">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg py-2 animate-fade-in">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium text-text-primary">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs text-text-secondary mt-1">
                        {user.email}
                      </p>
                    </div>

                    {/* Sign Out Button */}
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-card-hover transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 rounded-lg border border-border text-text-primary hover:bg-card-hover transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:brightness-90 transition-all duration-200"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </nav>
  );
}
