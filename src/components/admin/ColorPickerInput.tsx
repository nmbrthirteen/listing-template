'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'

export const ColorPickerInput: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path })

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: 6,
      }}
    >
      <input
        type="color"
        value={value || '#000000'}
        onChange={(e) => setValue(e.target.value)}
        style={{
          width: 32,
          height: 32,
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          padding: 0,
          background: 'transparent',
        }}
      />
      <div
        style={{
          width: 48,
          height: 24,
          borderRadius: 6,
          background: value || '#000000',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      />
    </div>
  )
}
