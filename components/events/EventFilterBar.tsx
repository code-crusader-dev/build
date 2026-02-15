'use client';

import React, { useState } from 'react';
import { EventStatus } from '@/types/event';
import { EventFilters, DateRangeFilter, getDateRangeLabel, getStatusLabel } from '@/lib/eventFilters';

interface EventFilterBarProps {
  filters: EventFilters;
  onFiltersChange: (filters: EventFilters) => void;
  totalEvents: number;
  filteredCount: number;
}

export default function EventFilterBar({ filters, onFiltersChange, totalEvents, filteredCount }: EventFilterBarProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const allStatuses: EventStatus[] = [
    EventStatus.REGISTRATION_OPEN,
    EventStatus.REGISTRATION_CLOSED,
    EventStatus.ONGOING,
    EventStatus.COMPLETED,
  ];

  const dateRangeOptions: DateRangeFilter[] = ['all', 'today', 'this-week', 'this-month'];

  const toggleStatus = (status: EventStatus) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter(s => s !== status)
      : [...filters.statuses, status];

    onFiltersChange({ ...filters, statuses: newStatuses });
  };

  const setDateRange = (range: DateRangeFilter) => {
    onFiltersChange({ ...filters, dateRange: range });
  };

  const setSearchQuery = (query: string) => {
    onFiltersChange({ ...filters, searchQuery: query });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      statuses: [],
      dateRange: 'all',
      searchQuery: '',
    });
  };

  const hasActiveFilters = filters.statuses.length > 0 || filters.dateRange !== 'all' || filters.searchQuery !== '';

  return (
    <>
      {/* Desktop Filter Bar */}
      <div className="hidden lg:block bg-card border border-border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="text-sm font-medium text-text-primary">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-text-secondary hover:text-text-primary transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Filters */}
          <div>
            <label className="text-xs text-text-secondary mb-2 block">Event Status</label>
            <div className="flex flex-wrap gap-2">
              {allStatuses.map(status => (
                <button
                  key={status}
                  onClick={() => toggleStatus(status)}
                  className={`px-3 py-1.5 text-xs rounded border transition-all ${
                    filters.statuses.includes(status)
                      ? 'bg-text-primary text-background border-text-primary'
                      : 'bg-background text-text-secondary border-border hover:border-text-secondary'
                  }`}
                >
                  {getStatusLabel(status)}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="text-xs text-text-secondary mb-2 block">Date Range</label>
            <select
              value={filters.dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRangeFilter)}
              className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-text-secondary transition-colors"
            >
              {dateRangeOptions.map(option => (
                <option key={option} value={option}>
                  {getDateRangeLabel(option)}
                </option>
              ))}
            </select>
          </div>

          {/* Search Filter */}
          <div>
            <label className="text-xs text-text-secondary mb-2 block">Search</label>
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Event name or venue..."
              className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-secondary transition-colors"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-text-secondary">
            Showing <span className="text-text-primary font-medium">{filteredCount}</span> of{' '}
            <span className="text-text-primary font-medium">{totalEvents}</span> events
            {hasActiveFilters && ' (filtered)'}
          </p>
          <p className="text-xs text-text-secondary mt-1">
            Sorted by: <span className="text-text-primary">Priority Status → Start Time</span>
          </p>
        </div>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full bg-card border border-border rounded-lg px-4 py-3 flex items-center justify-between hover:bg-card-hover transition-colors"
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="text-sm text-text-primary">
              Filters {hasActiveFilters && `(${filteredCount}/${totalEvents})`}
            </span>
          </div>
          <svg
            className={`w-5 h-5 text-text-secondary transition-transform ${showMobileFilters ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Mobile Filter Drawer */}
        {showMobileFilters && (
          <div className="mt-2 bg-card border border-border rounded-lg p-4 space-y-4 animate-fade-in">
            {/* Status Filters */}
            <div>
              <label className="text-xs text-text-secondary mb-2 block">Event Status</label>
              <div className="flex flex-wrap gap-2">
                {allStatuses.map(status => (
                  <button
                    key={status}
                    onClick={() => toggleStatus(status)}
                    className={`px-3 py-1.5 text-xs rounded border transition-all ${
                      filters.statuses.includes(status)
                        ? 'bg-text-primary text-background border-text-primary'
                        : 'bg-background text-text-secondary border-border hover:border-text-secondary'
                    }`}
                  >
                    {getStatusLabel(status)}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="text-xs text-text-secondary mb-2 block">Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => setDateRange(e.target.value as DateRangeFilter)}
                className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-text-secondary transition-colors"
              >
                {dateRangeOptions.map(option => (
                  <option key={option} value={option}>
                    {getDateRangeLabel(option)}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Filter */}
            <div>
              <label className="text-xs text-text-secondary mb-2 block">Search</label>
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Event name or venue..."
                className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-secondary transition-colors"
              />
            </div>

            {/* Results Count & Clear */}
            <div className="pt-4 border-t border-border space-y-2">
              <p className="text-xs text-text-secondary">
                Showing <span className="text-text-primary font-medium">{filteredCount}</span> of{' '}
                <span className="text-text-primary font-medium">{totalEvents}</span> events
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="w-full px-3 py-2 text-sm text-text-primary bg-background border border-border rounded hover:bg-card-hover transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
