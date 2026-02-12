import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    imageSizes: [
      { name: 'thumbnail', width: 300, height: undefined, position: 'centre' },
      { name: 'medium', width: 768, height: undefined, position: 'centre' },
      { name: 'large', width: 1920, height: undefined, position: 'centre' },
    ],
    staticDir: 'media',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
