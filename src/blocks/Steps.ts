import type { Block } from 'payload'

export const Steps: Block = {
  slug: 'steps',
  labels: { singular: 'Steps Block', plural: 'Steps Blocks' },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'steps',
      type: 'array',
      required: true,
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'description', type: 'richText' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
