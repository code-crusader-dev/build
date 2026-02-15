'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createClub } from '@/lib/clubService';
import { uploadClubLogo, uploadClubBanner } from '@/lib/storageService';
import { ClubTheme } from '@/types/club';
import ThemeSelector from './ThemeSelector';

interface AddClubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddClubModal({ isOpen, onClose }: AddClubModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [theme, setTheme] = useState<ClubTheme>('default-mono');

  if (!isOpen) return null;

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBannerFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to create a club');
      return;
    }

    if (!name.trim() || !description.trim()) {
      setError('Name and description are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // First create a temporary club ID
      const tempId = `temp_${Date.now()}`;
      
      // Upload logo if provided
      let logoUrl = '';
      if (logoFile) {
        const logoResult = await uploadClubLogo(tempId, logoFile);
        if (logoResult.success) {
          logoUrl = logoResult.url;
        } else {
          throw new Error(logoResult.error);
        }
      }

      // Upload banner if provided
      let bannerUrl = '';
      if (bannerFile) {
        const bannerResult = await uploadClubBanner(tempId, bannerFile);
        if (bannerResult.success) {
          bannerUrl = bannerResult.url;
        } else {
          throw new Error(bannerResult.error);
        }
      }

      // Create club in Firestore
      const result = await createClub({
        name: name.trim(),
        description: description.trim(),
        logoUrl,
        bannerUrl,
        theme,
        createdBy: user.uid,
      });

      if (result.success) {
        // Success - reset form and close modal
        setName('');
        setDescription('');
        setLogoFile(null);
        setBannerFile(null);
        setTheme('default-mono');
        onClose();
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create club');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-text-primary">Add New Club</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
            disabled={loading}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Club Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Club Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-white transition-colors"
              placeholder="e.g., Tech Innovators Club"
              required
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-white transition-colors resize-none"
              placeholder="Describe what your club is about..."
              rows={4}
              required
              disabled={loading}
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Club Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white file:text-black file:font-medium hover:file:brightness-90 transition-all"
              disabled={loading}
            />
            {logoFile && (
              <p className="text-xs text-text-secondary mt-2">
                Selected: {logoFile.name}
              </p>
            )}
          </div>

          {/* Banner Upload */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Club Banner (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white file:text-black file:font-medium hover:file:brightness-90 transition-all"
              disabled={loading}
            />
            {bannerFile && (
              <p className="text-xs text-text-secondary mt-2">
                Selected: {bannerFile.name}
              </p>
            )}
          </div>

          {/* Theme Selector */}
          <ThemeSelector selectedTheme={theme} onChange={setTheme} />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-card-hover border border-border rounded-lg text-text-primary hover:bg-background transition-all duration-200"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-white text-black font-medium rounded-lg hover:brightness-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Club'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
