'use client';

import React, { useState, useEffect } from 'react';
import ProtectedAdminRoute from '@/components/admin/ProtectedAdminRouteV2';
import AdminLayout from '@/components/admin/AdminLayout';
import AddEventModal from '@/components/admin/AddEventModal';
import EditEventModal from '@/components/admin/EditEventModal';
import { Event, EventStatus } from '@/types/event';
import { fetchEvents } from '@/lib/supabaseDatabase';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const loadEvents = async () => {
    setLoading(true);
    const result = await fetchEvents();
    if (result.success && result.data) {
      setEvents(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCloseModals = () => {
    setShowAddModal(false);
    setEditingEvent(null);
    loadEvents();
  };

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case EventStatus.REGISTRATION_OPEN:
        return 'bg-green-900 text-green-200 border-green-500';
      case EventStatus.REGISTRATION_CLOSED:
        return 'bg-yellow-900 text-yellow-200 border-yellow-500';
      case EventStatus.ONGOING:
        return 'bg-blue-900 text-blue-200 border-blue-500';
      case EventStatus.COMPLETED:
        return 'bg-gray-900 text-gray-200 border-gray-500';
      default:
        return 'bg-background text-text-secondary border-border';
    }
  };

  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Manage Events</h2>
              <p className="text-sm text-text-secondary mt-1">Add, edit, and manage all events</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-text-primary text-background rounded hover:brightness-90 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Event
            </button>
          </div>

          {loading && (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="w-12 h-12 border-4 border-text-secondary border-t-text-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text-secondary">Loading events...</p>
            </div>
          )}

          {!loading && events.length === 0 && (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <h3 className="text-xl font-medium text-text-primary mb-2">No events yet</h3>
              <p className="text-text-secondary mb-4">Get started by adding your first event</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-text-primary text-background rounded hover:brightness-90"
              >
                Add First Event
              </button>
            </div>
          )}

          {!loading && events.length > 0 && (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-background border-b border-border">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Event</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Date</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Venue</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Status</th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-text-secondary uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {events.map((event) => (
                    <tr key={event.id} className="hover:bg-card-hover transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-text-primary">{event.name}</p>
                        <p className="text-xs text-text-secondary">Event #{event.id}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-primary">
                        {new Date(event.startTime).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">{event.venue}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded text-xs font-medium border ${getStatusColor(event.status)}`}>
                          {event.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setEditingEvent(event)}
                          className="px-3 py-1.5 text-xs text-text-primary bg-background border border-border rounded hover:bg-card-hover"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <AddEventModal isOpen={showAddModal} onClose={handleCloseModals} />
          <EditEventModal event={editingEvent} onClose={handleCloseModals} />
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}
