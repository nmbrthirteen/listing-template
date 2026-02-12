import type { CollectionConfig } from 'payload'
import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    imageSizes: [
      { name: 'thumbnail', width: 300, position: 'centre' },
      { name: 'medium', width: 768, position: 'centre' },
      { name: 'large', width: 1920, position: 'centre' },
    ],
    staticDir: path.resolve(process.cwd(), 'media'),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
