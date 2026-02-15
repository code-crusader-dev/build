'use client';

import React from 'react';
import { ClubTheme } from '@/types/club';
import { getAllThemes, getTheme } from '@/lib/themes';

interface ThemeSelectorProps {
  selectedTheme: ClubTheme;
  onChange: (theme: ClubTheme) => void;
}

export default function ThemeSelector({ selectedTheme, onChange }: ThemeSelectorProps) {
  const themes = getAllThemes();

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-text-primary">
        Club Theme
      </label>
      
      <div className="grid grid-cols-1 gap-3">
        {themes.map((theme) => {
          const isSelected = selectedTheme === theme.id;
          
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onChange(theme.id)}
              className={`
                relative w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                ${isSelected 
                  ? 'border-white bg-card-hover' 
                  : 'border-border bg-card hover:border-text-secondary'
                }
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-text-primary">
                      {theme.name}
                    </h4>
                    {isSelected && (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary mb-2">
                    {theme.description}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {theme.preview}
                  </p>
                </div>
                
                {/* Color Preview */}
                <div className="flex gap-1 ml-4">
                  <div
                    className="w-6 h-6 rounded border border-border"
                    style={{ backgroundColor: theme.colors.background }}
                    title={`Background: ${theme.colors.background}`}
                  />
                  <div
                    className="w-6 h-6 rounded border border-border"
                    style={{ backgroundColor: theme.colors.cardBg }}
                    title={`Card: ${theme.colors.cardBg}`}
                  />
                  <div
                    className="w-6 h-6 rounded border border-border"
                    style={{ backgroundColor: theme.colors.textPrimary }}
                    title={`Text: ${theme.colors.textPrimary}`}
                  />
                  {theme.colors.accent && (
                    <div
                      className="w-6 h-6 rounded border border-border"
                      style={{ backgroundColor: theme.colors.accent }}
                      title={`Accent: ${theme.colors.accent}`}
                    />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
