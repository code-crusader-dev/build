'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadFile, STORAGE_BUCKETS } from '@/lib/supabaseStorage';
import ThemeSelector from '@/components/admin/ThemeSelector';
import { ClubTheme } from '@/types/club';

interface AddClubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddClubModal({ isOpen, onClose }: AddClubModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    theme: 'default-mono' as ClubTheme,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let logoUrl = '';
      let bannerUrl = '';

      // Upload logo
      if (logoFile) {
        const logoResult = await uploadFile(STORAGE_BUCKETS.CLUB_LOGOS, logoFile);
        if (!logoResult.success) {
          throw new Error(logoResult.error || 'Failed to upload logo');
        }
        logoUrl = logoResult.publicUrl || '';
      }

      // Upload banner
      if (bannerFile) {
        const bannerResult = await uploadFile(STORAGE_BUCKETS.CLUB_BANNERS, bannerFile);
        if (!bannerResult.success) {
          throw new Error(bannerResult.error || 'Failed to upload banner');
        }
        bannerUrl = bannerResult.publicUrl || '';
      }

      // Insert club into Supabase
      const { error: insertError } = await supabase.from('clubs').insert({
        name: formData.name,
        description: formData.description,
        logo_url: logoUrl,
        banner_url: bannerUrl,
        theme: formData.theme,
        followers_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (insertError) throw insertError;

      // Reset form and close
      setFormData({ name: '', description: '', theme: 'default-mono' });
      setLogoFile(null);
      setBannerFile(null);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create club');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          <h2 className="text-xl font-bold text-text-primary mb-4">Add New Club</h2>
          
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
              <label className="block text-sm text-text-secondary mb-2">Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                className="w-full text-text-primary"
              />
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">Banner</label>
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
                {loading ? 'Creating...' : 'Create Club'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
