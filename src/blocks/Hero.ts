import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    {
      name: 'badges',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    { name: 'ctaText', type: 'text' },
    { name: 'ctaUrl', type: 'text' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
  ],
}
