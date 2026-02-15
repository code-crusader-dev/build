import { useState, useMemo } from 'react';
import { Event } from '@/types/event';
import { EventFilters, DEFAULT_FILTERS, filterAndSortEvents } from '@/lib/eventFilters';

/**
 * Custom hook for managing event filtering and sorting
 * @param events - Array of all events
 * @returns Filtered events and filter controls
 */
export const useEventFilters = (events: Event[]) => {
  const [filters, setFilters] = useState<EventFilters>(DEFAULT_FILTERS);

  // Memoize filtered and sorted events to avoid unnecessary recalculations
  const filteredEvents = useMemo(() => {
    return filterAndSortEvents(events, filters);
  }, [events, filters]);

  return {
    filters,
    setFilters,
    filteredEvents,
    totalCount: events.length,
    filteredCount: filteredEvents.length,
  };
};
