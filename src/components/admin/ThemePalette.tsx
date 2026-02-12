'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'

type Palette = {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  heroGradientStart: string
  heroGradientEnd: string
  backgroundColor: string
  cardBackground: string
  textColor: string
  headingColor: string
}

const palettes: Record<string, Palette> = {
  'Indigo Night': {
    primaryColor: '#6366f1',
    secondaryColor: '#4f46e5',
    accentColor: '#f59e0b',
    heroGradientStart: '#1e1b4b',
    heroGradientEnd: '#312e81',
    backgroundColor: '#0f0e1a',
    cardBackground: '#1a1830',
    textColor: '#e2e8f0',
    headingColor: '#ffffff',
  },
  Ocean: {
    primaryColor: '#3b82f6',
    secondaryColor: '#2563eb',
    accentColor: '#06b6d4',
    heroGradientStart: '#0c1a3a',
    heroGradientEnd: '#1e3a5f',
    backgroundColor: '#0b1120',
    cardBackground: '#131d30',
    textColor: '#cbd5e1',
    headingColor: '#f1f5f9',
  },
  Emerald: {
    primaryColor: '#10b981',
    secondaryColor: '#059669',
    accentColor: '#fbbf24',
    heroGradientStart: '#052e1f',
    heroGradientEnd: '#134e35',
    backgroundColor: '#0a1410',
    cardBackground: '#111f1a',
    textColor: '#d1ddd8',
    headingColor: '#f0fdf4',
  },
  Rose: {
    primaryColor: '#f43f5e',
    secondaryColor: '#e11d48',
    accentColor: '#a855f7',
    heroGradientStart: '#310a18',
    heroGradientEnd: '#4c1130',
    backgroundColor: '#140a10',
    cardBackground: '#221520',
    textColor: '#e8d5df',
    headingColor: '#fff1f2',
  },
  Sunset: {
    primaryColor: '#f97316',
    secondaryColor: '#ea580c',
    accentColor: '#eab308',
    heroGradientStart: '#331505',
    heroGradientEnd: '#4a2512',
    backgroundColor: '#15100a',
    cardBackground: '#221a10',
    textColor: '#e0d5c8',
    headingColor: '#fff7ed',
  },
  Violet: {
    primaryColor: '#8b5cf6',
    secondaryColor: '#7c3aed',
    accentColor: '#ec4899',
    heroGradientStart: '#1a0a38',
    heroGradientEnd: '#2e1a56',
    backgroundColor: '#0e0a18',
    cardBackground: '#1a1428',
    textColor: '#ddd5ee',
    headingColor: '#f5f3ff',
  },
  Slate: {
    primaryColor: '#64748b',
    secondaryColor: '#475569',
    accentColor: '#38bdf8',
    heroGradientStart: '#0f172a',
    heroGradientEnd: '#1e293b',
    backgroundColor: '#0c1018',
    cardBackground: '#151c28',
    textColor: '#cbd5e1',
    headingColor: '#f8fafc',
  },
  Monochrome: {
    primaryColor: '#ffffff',
    secondaryColor: '#d4d4d8',
    accentColor: '#a1a1aa',
    heroGradientStart: '#18181b',
    heroGradientEnd: '#27272a',
    backgroundColor: '#09090b',
    cardBackground: '#18181b',
    textColor: '#a1a1aa',
    headingColor: '#fafafa',
  },
}

const colorKeys: (keyof Palette)[] = [
  'primaryColor',
  'secondaryColor',
  'accentColor',
  'heroGradientStart',
  'heroGradientEnd',
  'backgroundColor',
  'cardBackground',
  'textColor',
  'headingColor',
]

const defaults = palettes['Indigo Night']

export const ThemePalette: React.FC = () => {
  const fields = {
    primaryColor: useField<string>({ path: 'theme.primaryColor' }),
    secondaryColor: useField<string>({ path: 'theme.secondaryColor' }),
    accentColor: useField<string>({ path: 'theme.accentColor' }),
    heroGradientStart: useField<string>({ path: 'theme.heroGradientStart' }),
    heroGradientEnd: useField<string>({ path: 'theme.heroGradientEnd' }),
    backgroundColor: useField<string>({ path: 'theme.backgroundColor' }),
    cardBackground: useField<string>({ path: 'theme.cardBackground' }),
    textColor: useField<string>({ path: 'theme.textColor' }),
    headingColor: useField<string>({ path: 'theme.headingColor' }),
  }

  const c = Object.fromEntries(
    colorKeys.map((k) => [k, (fields[k].value as string) || defaults[k]]),
  ) as Palette

  const applyPalette = (palette: Palette) => {
    colorKeys.forEach((k) => {
      fields[k].setValue(palette[k])
    })
  }

  return (
    <div style={{ marginBottom: 24 }}>
      {/* Live Preview */}
      <div
        style={{
          background: c.backgroundColor,
          borderRadius: 12,
          padding: 20,
          marginBottom: 16,
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Nav bar mock */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <span style={{ color: c.headingColor, fontWeight: 700, fontSize: 16 }}>
            Site Name
          </span>
          <div style={{ display: 'flex', gap: 16 }}>
            {['Home', 'Blog', 'About'].map((item) => (
              <span
                key={item}
                style={{ color: c.textColor, fontSize: 13, opacity: 0.7 }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Hero gradient */}
        <div
          style={{
            background: `linear-gradient(135deg, ${c.heroGradientStart}, ${c.heroGradientEnd})`,
            borderRadius: 10,
            padding: 24,
            marginBottom: 14,
            textAlign: 'center' as const,
          }}
        >
          <div
            style={{
              color: c.headingColor,
              fontWeight: 700,
              fontSize: 20,
              marginBottom: 6,
            }}
          >
            Hero Section
          </div>
          <div style={{ color: c.textColor, fontSize: 13, marginBottom: 14, opacity: 0.8 }}>
            A short description goes here
          </div>
          <span
            style={{
              display: 'inline-block',
              background: c.primaryColor,
              color: '#fff',
              padding: '8px 20px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Get Started
          </span>
        </div>

        {/* Cards row */}
        <div style={{ display: 'flex', gap: 10 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: c.cardBackground,
                borderRadius: 8,
                padding: 14,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                style={{
                  color: c.headingColor,
                  fontWeight: 600,
                  fontSize: 13,
                  marginBottom: 4,
                }}
              >
                Card {i}
              </div>
              <div
                style={{
                  color: c.textColor,
                  fontSize: 11,
                  opacity: 0.7,
                  marginBottom: 10,
                  lineHeight: 1.4,
                }}
              >
                Sample text content here
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span
                  style={{
                    background: i === 1 ? c.primaryColor : c.secondaryColor,
                    color: '#fff',
                    padding: '3px 10px',
                    borderRadius: 5,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {i === 1 ? 'Primary' : 'Secondary'}
                </span>
                {i === 1 && (
                  <span
                    style={{
                      background: c.accentColor,
                      color: '#000',
                      padding: '3px 8px',
                      borderRadius: 4,
                      fontSize: 10,
                      fontWeight: 600,
                    }}
                  >
                    Accent
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Palette Presets */}
      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
        {Object.entries(palettes).map(([name, palette]) => (
          <button
            key={name}
            type="button"
            onClick={() => applyPalette(palette)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid var(--theme-elevation-150, rgba(255,255,255,0.1))',
              background: 'var(--theme-elevation-50, rgba(255,255,255,0.03))',
              color: 'var(--theme-text, #e2e8f0)',
              cursor: 'pointer',
              fontSize: 13,
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor =
                'var(--theme-elevation-300, rgba(255,255,255,0.2))'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                'var(--theme-elevation-150, rgba(255,255,255,0.1))'
            }}
          >
            <div style={{ display: 'flex', gap: 3 }}>
              {[
                palette.primaryColor,
                palette.accentColor,
                palette.backgroundColor,
                palette.cardBackground,
              ].map((color, i) => (
                <div
                  key={i}
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    background: color,
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
              ))}
            </div>
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}
