'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadFile, STORAGE_BUCKETS } from '@/lib/supabaseStorage';
import ThemeSelector from '@/components/admin/ThemeSelector';
import { Club, ClubTheme } from '@/types/club';

interface EditClubModalProps {
  club: Club | null;
  onClose: () => void;
}

export default function EditClubModal({ club, onClose }: EditClubModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    theme: 'default-mono' as ClubTheme,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (club) {
      setFormData({
        name: club.name,
        description: club.description,
        theme: club.theme,
      });
    }
  }, [club]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!club) return;

    setLoading(true);
    setError('');

    try {
      let logoUrl = club.logoUrl;
      let bannerUrl = club.bannerUrl;

      // Upload new logo if provided
      if (logoFile) {
        const logoResult = await uploadFile(STORAGE_BUCKETS.CLUB_LOGOS, logoFile);
        if (logoResult.success) logoUrl = logoResult.publicUrl || logoUrl;
      }

      // Upload new banner if provided
      if (bannerFile) {
        const bannerResult = await uploadFile(STORAGE_BUCKETS.CLUB_BANNERS, bannerFile);
        if (bannerResult.success) bannerUrl = bannerResult.publicUrl || bannerUrl;
      }

      // Update club in Supabase
      const { error: updateError } = await supabase
        .from('clubs')
        .update({
          name: formData.name,
          description: formData.description,
          logo_url: logoUrl,
          banner_url: bannerUrl,
          theme: formData.theme,
          updated_at: new Date().toISOString(),
        })
        .eq('id', club.id);

      if (updateError) throw updateError;

      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update club');
    } finally {
      setLoading(false);
    }
  };

  if (!club) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          <h2 className="text-xl font-bold text-text-primary mb-4">Edit Club</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-200 px-4 py-2 rounded text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm text-text-secondary mb-2">Club Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-background border border-border rounded px-3 py-2 text-text-primary"
              />
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">Description *</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-background border border-border rounded px-3 py-2 text-text-primary"
              />
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">Logo (optional - keep current if not changed)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                className="w-full text-text-primary"
              />
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">Banner (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
                className="w-full text-text-primary"
              />
            </div>

            <ThemeSelector
              selectedTheme={formData.theme}
              onChange={(theme) => setFormData({ ...formData, theme })}
            />

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-background border border-border rounded text-text-primary hover:bg-card-hover"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-text-primary text-background rounded hover:brightness-90 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Club'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
