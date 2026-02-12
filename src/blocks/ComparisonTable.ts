import type { Block } from 'payload'

export const ComparisonTable: Block = {
  slug: 'comparisonTable',
  labels: { singular: 'Comparison Table', plural: 'Comparison Tables' },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'listings',
      type: 'relationship',
      relationTo: 'listings',
      hasMany: true,
    },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
  ],
}
