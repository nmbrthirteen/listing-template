import type { Block } from 'payload'

export const ListingGrid: Block = {
  slug: 'listingGrid',
  labels: { singular: 'Listing Grid', plural: 'Listing Grids' },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 12,
      admin: { description: 'Max listings to display' },
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
