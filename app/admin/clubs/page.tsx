'use client';

import React, { useState, useEffect } from 'react';
import ProtectedAdminRoute from '@/components/admin/ProtectedAdminRouteV2';
import AdminLayout from '@/components/admin/AdminLayout';
import AddClubModal from '@/components/admin/AddClubModalV2';
import EditClubModal from '@/components/admin/EditClubModalV2';
import { Club } from '@/types/club';
import { fetchClubs } from '@/lib/supabaseDatabase';
import { getTheme } from '@/lib/themes';
import Image from 'next/image';

export default function AdminClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | null>(null);

  const loadClubs = async () => {
    setLoading(true);
    const result = await fetchClubs();
    if (result.success && result.data) {
      setClubs(result.data);
    } else {
      console.error('Failed to load clubs:', result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadClubs();
  }, []);

  const handleCloseModals = () => {
    setShowAddModal(false);
    setEditingClub(null);
    // Reload clubs after adding/editing
    loadClubs();
  };

  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Manage Clubs</h2>
              <p className="text-sm text-text-secondary mt-1">
                Add, edit, and manage all campus clubs
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-text-primary text-background rounded hover:brightness-90 transition-all flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Club
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="w-12 h-12 border-4 border-text-secondary border-t-text-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text-secondary">Loading clubs...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && clubs.length === 0 && (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <svg
                className="w-16 h-16 text-text-secondary mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <h3 className="text-xl font-medium text-text-primary mb-2">No clubs yet</h3>
              <p className="text-text-secondary mb-4">Get started by adding your first club</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-text-primary text-background rounded hover:brightness-90 transition-all"
              >
                Add First Club
              </button>
            </div>
          )}

          {/* Clubs Table */}
          {!loading && clubs.length > 0 && (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-background border-b border-border">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Club
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Theme
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Followers
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {clubs.map((club) => {
                    const theme = getTheme(club.theme);
                    return (
                      <tr key={club.id} className="hover:bg-card-hover transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-background border border-border flex-shrink-0">
                              {club.logoUrl && (
                                <Image
                                  src={club.logoUrl}
                                  alt={club.name}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-text-primary">
                                {club.name}
                              </p>
                              <p className="text-xs text-text-secondary line-clamp-1">
                                {club.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-background border border-border text-text-secondary">
                            {theme.name}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-text-primary">
                            {club.followersCount || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setEditingClub(club)}
                            className="px-3 py-1.5 text-xs text-text-primary bg-background border border-border rounded hover:bg-card-hover transition-colors"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Modals */}
          <AddClubModal isOpen={showAddModal} onClose={handleCloseModals} />
          <EditClubModal club={editingClub} onClose={handleCloseModals} />
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}
