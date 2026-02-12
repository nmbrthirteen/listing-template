import type { Block } from 'payload'

export const ImageCard: Block = {
  slug: 'imageCard',
  labels: { singular: 'Image Card', plural: 'Image Cards' },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'link', type: 'text', admin: { description: 'Optional URL to link to' } },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
  ],
}
