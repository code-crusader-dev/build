import { Event, EventStatus } from '@/types/event';

/**
 * Date range options for filtering
 */
export type DateRangeFilter = 'all' | 'today' | 'this-week' | 'this-month';

/**
 * Event filter options
 */
export interface EventFilters {
  statuses: EventStatus[];
  dateRange: DateRangeFilter;
  searchQuery: string;
}

/**
 * Default filter state
 */
export const DEFAULT_FILTERS: EventFilters = {
  statuses: [],
  dateRange: 'all',
  searchQuery: '',
};

/**
 * Status priority for sorting (lower number = higher priority)
 */
const STATUS_PRIORITY: Record<EventStatus, number> = {
  [EventStatus.REGISTRATION_OPEN]: 1,
  [EventStatus.REGISTRATION_CLOSED]: 2,
  [EventStatus.ONGOING]: 3,
  [EventStatus.COMPLETED]: 4,
};

/**
 * Sort events by status priority, then by start time
 * @param events - Array of events to sort
 * @returns Sorted array of events
 */
export const sortEventsByPriority = (events: Event[]): Event[] => {
  return [...events].sort((a, b) => {
    // First, sort by status priority
    const priorityDiff = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    // If same status, sort by start time (earliest first)
    const dateA = new Date(a.startTime).getTime();
    const dateB = new Date(b.startTime).getTime();
    return dateA - dateB;
  });
};

/**
 * Get date range boundaries
 * @param range - Date range filter option
 * @returns Start and end dates for the range
 */
const getDateRange = (range: DateRangeFilter): { start: Date; end: Date } | null => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (range) {
    case 'today':
      return {
        start: today,
        end: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      };

    case 'this-week':
      const dayOfWeek = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - dayOfWeek);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);
      return { start: startOfWeek, end: endOfWeek };

    case 'this-month':
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { start: startOfMonth, end: endOfMonth };

    case 'all':
    default:
      return null;
  }
};

/**
 * Filter events by status
 * @param events - Array of events
 * @param statuses - Array of statuses to filter by
 * @returns Filtered events
 */
const filterByStatus = (events: Event[], statuses: EventStatus[]): Event[] => {
  if (statuses.length === 0) return events;
  return events.filter(event => statuses.includes(event.status));
};

/**
 * Filter events by date range
 * @param events - Array of events
 * @param range - Date range filter
 * @returns Filtered events
 */
const filterByDateRange = (events: Event[], range: DateRangeFilter): Event[] => {
  const dateRange = getDateRange(range);
  if (!dateRange) return events;

  return events.filter(event => {
    const eventDate = new Date(event.startTime);
    return eventDate >= dateRange.start && eventDate < dateRange.end;
  });
};

/**
 * Filter events by search query (name or venue)
 * @param events - Array of events
 * @param query - Search query
 * @returns Filtered events
 */
const filterBySearch = (events: Event[], query: string): Event[] => {
  if (!query.trim()) return events;

  const lowerQuery = query.toLowerCase().trim();
  return events.filter(event => {
    const nameMatch = event.name.toLowerCase().includes(lowerQuery);
    const venueMatch = event.venue.toLowerCase().includes(lowerQuery);
    return nameMatch || venueMatch;
  });
};

/**
 * Apply all filters and sorting to events
 * @param events - Array of events
 * @param filters - Filter options
 * @returns Filtered and sorted events
 */
export const filterAndSortEvents = (events: Event[], filters: EventFilters): Event[] => {
  let filteredEvents = events;

  // Apply filters
  filteredEvents = filterByStatus(filteredEvents, filters.statuses);
  filteredEvents = filterByDateRange(filteredEvents, filters.dateRange);
  filteredEvents = filterBySearch(filteredEvents, filters.searchQuery);

  // Apply priority sorting
  return sortEventsByPriority(filteredEvents);
};

/**
 * Get display label for date range
 * @param range - Date range filter
 * @returns Display label
 */
export const getDateRangeLabel = (range: DateRangeFilter): string => {
  const labels: Record<DateRangeFilter, string> = {
    all: 'All Dates',
    today: 'Today',
    'this-week': 'This Week',
    'this-month': 'This Month',
  };
  return labels[range];
};

/**
 * Get display label for status
 * @param status - Event status
 * @returns Display label
 */
export const getStatusLabel = (status: EventStatus): string => {
  const labels: Record<EventStatus, string> = {
    [EventStatus.REGISTRATION_OPEN]: 'Registration Open',
    [EventStatus.REGISTRATION_CLOSED]: 'Registration Closed',
    [EventStatus.ONGOING]: 'Ongoing',
    [EventStatus.COMPLETED]: 'Completed',
  };
  return labels[status];
};
