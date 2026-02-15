export type ClubTheme = 'default-mono' | 'dark-glass' | 'soft-mono';

export interface Club {
  id: string;
  name: string;
  description: string;
  logoUrl: string; // Club logo image URL
  bannerUrl?: string; // Club banner image URL (optional)
  theme: ClubTheme; // Visual theme for club page
  followersCount: number;
  createdBy: string; // User UID who created the club
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
  
  // Legacy fields for backward compatibility
  imageUrl?: string; // Alias for logoUrl
  upcomingEventsCount?: number;
}
