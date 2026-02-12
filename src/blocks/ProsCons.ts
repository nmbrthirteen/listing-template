import type { Block } from 'payload'

export const ProsCons: Block = {
  slug: 'prosCons',
  labels: { singular: 'Pros & Cons', plural: 'Pros & Cons' },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'pros',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'cons',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}
