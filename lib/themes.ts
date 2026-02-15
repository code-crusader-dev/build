import { ClubTheme } from '@/types/club';

/**
 * Theme configuration for club pages
 */
export interface ThemeConfig {
  id: ClubTheme;
  name: string;
  description: string;
  colors: {
    background: string;
    cardBg: string;
    cardHover: string;
    border: string;
    textPrimary: string;
    textSecondary: string;
    accent?: string;
  };
  preview: string; // Preview image or description
}

/**
 * Available club themes
 */
export const CLUB_THEMES: Record<ClubTheme, ThemeConfig> = {
  'default-mono': {
    id: 'default-mono',
    name: 'Default Mono',
    description: 'Classic black and white minimal theme',
    colors: {
      background: '#000000',
      cardBg: '#111111',
      cardHover: '#151515',
      border: '#2A2A2A',
      textPrimary: '#FFFFFF',
      textSecondary: '#BFBFBF',
    },
    preview: 'Pure black & white, maximum contrast',
  },
  'dark-glass': {
    id: 'dark-glass',
    name: 'Dark Glass',
    description: 'Modern dark theme with glass morphism effects',
    colors: {
      background: '#0A0A0A',
      cardBg: 'rgba(20, 20, 20, 0.7)',
      cardHover: 'rgba(30, 30, 30, 0.8)',
      border: 'rgba(255, 255, 255, 0.1)',
      textPrimary: '#FFFFFF',
      textSecondary: '#A0A0A0',
      accent: '#3B82F6',
    },
    preview: 'Translucent cards with subtle blue accents',
  },
  'soft-mono': {
    id: 'soft-mono',
    name: 'Soft Mono',
    description: 'Softer monochrome with reduced contrast',
    colors: {
      background: '#121212',
      cardBg: '#1E1E1E',
      cardHover: '#252525',
      border: '#333333',
      textPrimary: '#E5E5E5',
      textSecondary: '#999999',
    },
    preview: 'Gentler on the eyes, softer contrast',
  },
};

/**
 * Get theme configuration by ID
 */
export function getTheme(themeId: ClubTheme): ThemeConfig {
  return CLUB_THEMES[themeId] || CLUB_THEMES['default-mono'];
}

/**
 * Get all available themes as array
 */
export function getAllThemes(): ThemeConfig[] {
  return Object.values(CLUB_THEMES);
}
