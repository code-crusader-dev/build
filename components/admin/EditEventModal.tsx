'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadFile, STORAGE_BUCKETS } from '@/lib/supabaseStorage';
import { Event, EventStatus } from '@/types/event';
import { fetchClubs } from '@/lib/supabaseDatabase';
import { Club } from '@/types/club';

interface EditEventModalProps {
  event: Event | null;
  onClose: () => void;
}

export default function EditEventModal({ event, onClose }: EditEventModalProps) {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [formData, setFormData] = useState({
    clubId: '',
    name: '',
    description: '',
    venue: '',
    startTime: '',
    endTime: '',
    capacity: 0,
    status: EventStatus.REGISTRATION_OPEN,
  });
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadClubs = async () => {
      const result = await fetchClubs();
      if (result.success && result.data) setClubs(result.data);
    };
    loadClubs();
  }, []);

  useEffect(() => {
    if (event) {
      setFormData({
        clubId: event.clubId,
        name: event.name,
        description: event.description,
        venue: event.venue,
        startTime: event.startTime,
        endTime: event.endTime,
        capacity: event.capacity,
        status: event.status,
      });
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    setLoading(true);
    setError('');

    try {
      let posterUrl = event.posterImageUrl;
      if (posterFile) {
        const result = await uploadFile(STORAGE_BUCKETS.EVENT_POSTERS, posterFile);
        if (result.success) posterUrl = result.publicUrl || posterUrl;
      }

      const { error: updateError } = await supabase
        .from('events')
        .update({
          club_id: formData.clubId,
          name: formData.name,
          description: formData.description,
          venue: formData.venue,
          start_time: formData.startTime,
          end_time: formData.endTime,
          capacity: formData.capacity,
          status: formData.status,
          poster_image_url: posterUrl,
        })
        .eq('id', event.id);

      if (updateError) throw updateError;
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          <h2 className="text-xl font-bold text-text-primary mb-4">Edit Event</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-200 px-4 py-2 rounded text-sm">{error}</div>}

            <div>
              <label className="block text-sm text-text-secondary mb-2">Club *</label>
              <select required value={formData.clubId} onChange={(e) => setFormData({ ...formData, clubId: e.target.value })} className="w-full bg-background border border-border rounded px-3 py-2 text-text-primary">
                <option value="">Select a club</option>
                {clubs.map(club => <option key={club.id} value={club.id}>{club.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">Event Name *</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-background border border-border rounded px-3 py-2 text-text-primary" />
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">Description *</label>
              <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-background border border-border rounded px-3 py-2 text-text-primary" />
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">Venue *</label>
              <input type="text" required value={formData.venue} onChange={(e) => setFormData({ ...formData, venue: e.target.value })} className="w-full bg-background border border-border rounded px-3 py-2 text-text-primary" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2">Start Time *</label>
                <input type="datetime-local" required value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} className="w-full bg-background border border-border rounded px-3 py-2 text-text-primary" />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">End Time *</label>
                <input type="datetime-local" required value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} className="w-full bg-background border border-border rounded px-3 py-2 text-text-primary" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">Capacity *</label>
              <input type="number" required min="1" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })} className="w-full bg-background border border-border rounded px-3 py-2 text-text-primary" />
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">Status *</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as EventStatus })} className="w-full bg-background border border-border rounded px-3 py-2 text-text-primary">
                <option value={EventStatus.REGISTRATION_OPEN}>Registration Open</option>
                <option value={EventStatus.REGISTRATION_CLOSED}>Registration Closed</option>
                <option value={EventStatus.ONGOING}>Ongoing</option>
                <option value={EventStatus.COMPLETED}>Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">Poster (optional - keep current if not changed)</label>
              <input type="file" accept="image/*" onChange={(e) => setPosterFile(e.target.files?.[0] || null)} className="w-full text-text-primary" />
            </div>

            <div className="flex gap-3 pt-4">
              <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-background border border-border rounded text-text-primary hover:bg-card-hover">Cancel</button>
              <button type="submit" disabled={loading} className="flex-1 px-4 py-2 bg-text-primary text-background rounded hover:brightness-90 disabled:opacity-50">{loading ? 'Updating...' : 'Update Event'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
